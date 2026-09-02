<p align="center">
    <a href="https://codenotary.io/technologies/immudb">
        <img src="https://docs.immudb.io/mascot.png" alt="immudb logo" width=200>
    </a>
</p>

<h1 align="center">immudb docs</h1>

<p align="center">
    <a href="https://immudb.io">immudb</a> - world's fastest immutable database. This repository holds
    immudb's documentation, built with Hugo and published to GitHub Pages at
    <a href="https://docs.immudb.io/">docs.immudb.io</a>.
    <br/>
    <br/>
    <a href="https://codenotary.io/technologies/immudb">Homepage</a>
    ·
    <a href="https://docs.immudb.io/">Documentation</a>
    ·
    <a href="https://github.com/codenotary/immudb/issues">Issue Tracker</a>
</p>

<br/>

## What this is

A plain static site: no client framework, no search service, no build-time API keys.
Hugo renders the markdown in `content/`, Tailwind builds one stylesheet through Hugo
Pipes' PostCSS, and Pagefind indexes the finished HTML.

The site covers the **current release only**. Older version trees were removed; every
page that used to live under `/master/...` carries an alias so its old URL still lands
in the right place.

## Requirements

- **Hugo**, v0.165.0 or later. The *extended* edition is what CI uses and what the
  Docker image carries, but it is not required: the editions differ only in LibSass
  and direct cloud deploy, and this site uses neither. Verified — the standard
  edition builds it.
  ```bash
  curl -sL https://github.com/gohugoio/hugo/releases/download/v0.165.0/hugo_extended_0.165.0_linux-amd64.tar.gz \
    | tar -xz -C ~/.local/bin hugo
  hugo version
  ```
- **Node.js 22 or newer**, for Tailwind, PostCSS and Pagefind. 22 is a hard floor, not
  a preference: Hugo's PostCSS step runs node with `--permission`, a flag Node 20 does
  not have, so on Node 20 every build fails with `node: bad option: --permission`.

If you would rather not install either, `docker compose up docs` serves the site on
<http://localhost:1313> with live reload.

## Working on the docs

```bash
npm ci
npm run dev          # hugo server on http://localhost:1313
npm run build        # hugo --minify --gc, then the Pagefind index, into public/
npm run serve        # serve the built site on http://localhost:8080
```

`npm run build` is what CI runs; `public/` and `resources/` are build output and are
not committed.

## Layout

| Path | What lives there |
| --- | --- |
| `content/` | Every documentation page. One markdown file per page. |
| `data/sidebar.yaml` | The rail. It is also the page order, which sets each page's `weight` and the previous/next pair. |
| `layouts/` | Templates, partials, shortcodes and the markdown render hooks. |
| `assets/css/main.css` | Design tokens and prose styles. The token block is shared with AgentMon. |
| `assets/js/` | Theme switch, tab groups, copy buttons, search. All progressive enhancement. |
| `static/` | Images, fonts, favicons, `CNAME`, `robots.txt`. Copied to the site root verbatim. |
| `code-examples/` | Compilable examples the docs include via the `snippet` shortcode. |
| `checks/` | Scripts that check the docs against the real immudb binary. |

## Writing a page

Add a markdown file under `content/`, then add it to `data/sidebar.yaml` — a page that
is not in the sidebar still builds, but nothing links to it and it gets no weight.

Front matter:

```yaml
---
title: "Reading"          # the <h1>; do not repeat it in the body
weight: 500               # reading order, from the sidebar
aliases: ["/master/develop/reading/"]   # the page's old URL, if it had one
---
```

Four shortcodes cover what the old VuePress containers did:

````markdown
{{%/* tabs */%}}
{{%/* tab "Go" */%}}
```go
client.Set(ctx, []byte("key"), []byte("value"))
```
{{%/* /tab */%}}
{{%/* tab "Java" */%}}
...
{{%/* /tab */%}}
{{%/* /tabs */%}}

{{%/* callout "tip" "Multi-database operations" */%}}
Text that renders as markdown.
{{%/* /callout */%}}

{{</* snippet "/code-examples/go/develop-kv-get-set/main.go" */>}}
````

`callout` takes `tip`, `warning` or `danger`, plus an optional heading. `snippet`
includes a file from `code-examples/` so the docs cannot drift from code that compiles.

## Tests

```bash
npm run test:e2e     # Playwright, against a real build
npm run lighthouse   # performance and accessibility gates
./checks/examples-go.sh      # every included Go example still compiles
./checks/configuration.sh    # the flag table matches `immudb --help`
```

CI runs the end-to-end and Lighthouse suites on every pull request, and deploys
`master` to GitHub Pages. See [CI-CD-SETUP.md](CI-CD-SETUP.md).
