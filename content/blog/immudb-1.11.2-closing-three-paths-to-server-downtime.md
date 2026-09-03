---
title: "immudb 1.11.2: Closing Three Paths to Server Downtime"
date: 2026-09-03
description: "immudb 1.11.2 fixes three ways a running server could be taken out of service: a snapshot leak from parse errors, a panic on an empty query, and a panic during shutdown."
excerpt: "immudb 1.11.2 is a small release with an outsized operational payoff. Versions 1.11.0 and 1.11.1 shipped three distinct ways to take a running server out of service — and this release closes all three."
tags: ["immudb", "release"]
image: "/blog/immudb.png"
---
immudb 1.11.2 is deliberately not a feature-heavy release. There is no new SQL surface and no new server capability. What it does contain is worth more than a feature list: versions 1.11.0 and 1.11.1 shipped three separate ways to take a running server out of service, and 1.11.2 closes all three.

None of them required a hostile client. One was triggered by a mistyped column name, one by a database driver saying hello, and one by a database that failed to open. If you are running 1.11.0 or 1.11.1, this is an upgrade worth scheduling.

![immudb](/blog/immudb.png)

## The transaction leak that needed a restart

The most serious of the three was reported from production. An application submitted a syntactically invalid statement inside a session transaction — the root cause on the reporter's side was a column named `uuid`, colliding with the `UUID` type keyword — and each such failure permanently degraded the server.

A statement rejected *before* the SQL engine runs it returns no transaction, while leaving the caller's ongoing one open and uncancelled. Both callers holding the only reference to that transaction overwrote it with the returned nil, orphaning a transaction that still held its tbtree snapshots. Snapshots are released only by commit or cancel, so each failure leaked one, permanently. After `maxActiveSnapshots` failures — 100 by default — every new transaction on the server failed with `tbtree: max active snapshots limit reached`, and stayed that way until the server was restarted.

The session path made it worse than a leak. With the transaction reference set to nil, `IsClosed` reported true, so the transaction was dropped from the session and neither the client's own rollback nor session expiry could ever reach it again. The reporting client saw its rollback answered with "no transaction found".

The fix guards both assignment sites on what actually happened to the transaction, rather than on the error: adopt the returned transaction only when the engine produced one, or when the previous one is genuinely closed. Execution-stage errors are unaffected, because there the engine cancels the transaction itself.

Worth being precise about who benefits: this affects **both** the PostgreSQL wire protocol path and the gRPC session path. The production report came in through immudb4j on the gRPC session API. If you use immudb over gRPC, this fix is yours.

## A driver ping could crash the server

Since 1.11.0, immudb's SQL grammar accepts empty and comment-only input, and returns an empty statement list with no error. The extended-query `Parse` handler in the PostgreSQL wire protocol guarded against *more* than one statement before indexing the first one — but never against zero.

So a `Parse` message carrying comment-only SQL crashed the entire server with `index out of range [0] with length 0`. The realistic trigger is not an attack; it is a driver liveness probe sending something like `-- ping`.

`Parse` of an empty query string is valid in the extended protocol, and immudb now behaves the way PostgreSQL does: parameter and result-column inference is skipped, the statement is registered, and a later `Execute` answers with `EmptyQueryResponse`.

## A storage read that failed on a valid offset

The storage layer fix in this release is easy to describe imprecisely, so here is what it actually is.

A foreground `ReadAt` cache miss opens and caches a chunk, then re-acquires it from the cache to take its reference. A concurrent insert — another foreground miss, or a background prefetch — could evict or replace that just-inserted entry in between. The re-acquire then returned "key not found", and `ReadAt` failed with a spurious error for a perfectly valid, readable offset.

This is not a close-while-reading race; the reader had not started, and that particular hazard was addressed in an earlier release by reference-counting the appendable cache. It is a narrower window, and it was caught in CI rather than in the field, surfacing as an intermittent failure in the remote-storage test suite after the parallel-prefetch read path was introduced.

When the post-open re-acquire misses, the data is still perfectly readable, so `ReadAt` now re-opens a detached, self-closing handle for that single read instead of failing. The handle is released exactly once by the read that owns it, so nothing leaks.

## A shutdown panic after a failed open

A database whose open failed left a reference behind in the manager's cache with no database attached to it. On shutdown, `CloseAll` iterated that reference and called `Close()` on a nil database, panicking with a nil pointer dereference and truncating the graceful shutdown path.

For anyone running immudb as infrastructure, an uneventful shutdown matters as much as an uneventful query — a truncated shutdown under Kubernetes or an automated orchestrator turns a routine restart into an incident. `CloseAll` now guards the nil case, mirroring every other close site in the file. This fix came from an external contributor, Damien Sauvée.

## Embedding immudb in-process

The most useful addition for developers in this release is documentation rather than runtime code, and it is worth being clear about that distinction: immudb has always been able to run fully in-process as a Go library, with no server and no container. Nothing in the repository explained how. Readers had to infer the approach from the test suite and guess which layer to build against.

There is now a dedicated embedding guide covering the choice between the `pkg/database` layer and the raw `embedded/store` plus `embedded/sql` engines, why the SQL engine needs a multi-indexing store, the on-disk layout, and how to confirm that a build links no server code. It ships with three runnable companions — an end-to-end walkthrough plus two Go Example tests with expected output, so `go test` fails if the documented behaviour ever drifts.

One constraint the guide is explicit about, and which anyone embedding immudb should read first: **immudb does not lock its data directory**. Two processes opening the same directory is not prevented by the database, so mutual exclusion is the embedder's responsibility.

Alongside the guide, the appendable file utilities now support the `wasip1` build target. Previously any build for `GOOS=wasip1` failed outright on undefined platform primitives, which blocked compiling the embedded engine to WebAssembly. This unblocks that compilation — with a caveat that belongs in the open: WASI preview 1 has no primitive for syncing a directory's entries, so the directory sync is a documented no-op there. A crash between a file being created and its parent directory entry being durably flushed could lose that file on some host filesystems. That is a real durability trade-off, not a footnote, and it should inform where you deploy such a build.

Together these lower the barrier for embedding immudb into security agents, edge applications and local audit systems, where operating a separate database service would be unnecessary overhead.

## Dependencies and CI

The release moves gRPC to v1.82.1 across every module in the repository, closing an advisory affecting all earlier versions, and updates `golang.org/x/net` to v0.57.0, `golang.org/x/crypto` to v0.54.0 and Viper to v1.21.0, alongside the usual build and security-analysis action bumps. A separate pass cleared outstanding CVEs in the nested Go modules, which had been lagging because dependency automation only watched the repository root — now widened to cover every module.

One CI change deserves a mention on its own. The coverage job ended its test run with `|| true`, which defeated the `pipefail` setting on the line above it. A failing or panicking package was discarded, partial coverage was uploaded anyway, and the job reported success. A real test failure surfaced only as a slightly lower coverage percentage — indistinguishable from ordinary measurement noise, and invisible in the job status. It no longer swallows failures.

Finally, a documentation clarification for Rust users: the `immudb` crate on crates.io is unofficial, third-party and unmaintained. The two supported paths are the PostgreSQL wire protocol for SQL, and generating a gRPC client from the proto files with tonic and prost.

![immudb-2](/blog/immudb-2.png)

## Why a release like this matters

It is tempting to read a release with no new features as a quiet one. This one is the opposite. Three of its fixes are the kind that only reveal themselves in production, under real client behaviour, at the moment when a database is least able to afford it — a hundred typos accumulating into a total transaction outage, a driver's health check taking down a server, a failed open turning a clean shutdown into a panic.

For a database whose entire purpose is that historical data remains verifiable, availability is not a separate concern from integrity. A server you cannot reach is a history you cannot verify. immudb 1.11.2 is a smaller release than 1.11.0, and a more important one to install.

Full release notes are on [GitHub](https://github.com/codenotary/immudb/releases/tag/v1.11.2).
