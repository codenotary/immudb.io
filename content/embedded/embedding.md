---
title: "Embedding immudb"
weight: 580
aliases: ["/master/embedded/embedding/"]
---
There are cases where you don't want a separate server but embed immudb directly in the same application process, as a library.

immudb already provides an embeddable key-value store in the [embedded](https://github.com/codenotary/immudb/tree/master/embedded) package.
The following example shows how to create or open a store, write some data and read it back.

{{< snippet "/code-examples/go/embedded-kv-v1.5.0/main.go" >}}
