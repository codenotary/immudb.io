# CI/CD

Everything lives in `.github/workflows/deploy.yml`. It replaced
`deploy-vuepress.yml` when the site moved from VitePress to Hugo.

## Jobs

| Job | Runs on | What it does |
| --- | --- | --- |
| `build` | every push and pull request | Builds the site and the search index, checks the output, uploads it as an artifact. |
| `deploy` | pushes to `master` | Publishes the artifact to GitHub Pages. |
| `performance-report` | pull requests | Lighthouse over five representative pages; scores land in the run summary. |
| `e2e` | pull requests | Playwright against the built artifact, in Chromium and Firefox. |

## The build

```bash
npm ci
hugo --minify --gc          # Hugo, pinned by HUGO_VERSION
npx pagefind --site public  # writes public/pagefind/
```

Two things about it are load-bearing:

- **`node-version: 22` or newer.** Hugo's PostCSS step runs node with `--permission`,
  which Node 20 does not support, so the whole build dies with
  `node: bad option: --permission`. This is the one version pin that is not cosmetic.
- **`extended: true`** on `peaceiris/actions-hugo`. Not strictly required — the editions
  differ only in LibSass and cloud deploy, and this site uses neither — but it is a
  superset and costs nothing, so it stays.
- **`fetch-depth: 0`** on the checkout. `enableGitInfo` reads each page's last commit
  for its "last updated" date; a shallow clone leaves every date wrong.

`HUGO_VERSION` is pinned rather than tracking `latest`, so a Hugo release cannot break
a deploy without someone choosing it. Keep it in step with the version in
`Dockerfile`, `docker-compose.yml` and the README.

## The output check

The build fails if any page ships `<p>:::`, `&lt;&lt;&lt; @` or `WrappedSection`.

That is not a stylistic rule. Under VitePress those three strings appeared as literal
text on 291, 195 and 250 pages respectively, because VitePress has no equivalent of the
VuePress `element-tabs` plugin and nothing noticed. The check is what keeps the
migration from quietly undoing itself.

It also asserts `public/CNAME` survives the build, since GitHub Pages drops the custom
domain without it.

A second step, **Check no page carries injected script**, guards the other thing the
migration turned on: `unsafe = true` in `hugo.toml`, which the docs need for their
raw `<img align>` blocks and which otherwise lets any merged markdown emit arbitrary
HTML. It fails the build on a `<script>` beyond the three the templates emit (the
anti-FOUC theme script, the JSON-LD, the module bundle), on any `javascript:` URL, and
on any inline `on<event>=` handler.

That covers a path the link render hook cannot reach: the hook neutralises
`[x](javascript:…)` written as markdown, but a raw `<a href="javascript:…">` is passed
straight through, because Goldmark never parses it as a link.

If a page ever legitimately needs to *show* one of those strings, the gate trips. Raise
the expectation in the step rather than widening the door.

## Secrets

None. Search is Pagefind, which is static files — the four Algolia secrets the old
pipeline needed (`ALGOLIA_API_KEY`, `ALGOLIA_APP_ID`, `ALGOLIA_INDEX`,
`ALGOLIA_WRIGHT_API_KEY`) can be deleted from the repository settings.

## Running the gates locally

```bash
npm run build
npm run lighthouse   # .lighthouserc.json holds the thresholds and the URLs
npm run test:e2e     # builds first, then drives the built site
```

## GitHub Pages settings

Pages must be set to **Source: GitHub Actions** in the repository settings. The
`deploy` job publishes with `actions/deploy-pages`, which the "Deploy from a branch"
setting ignores.

The custom domain comes from `static/CNAME`, which Hugo copies to `public/CNAME`. If
that file goes missing the domain resets to `codenotary.github.io/immudb.io` on the
next deploy, which is what the output check guards against.

## Rolling back

The deployed artifact is built from the commit, so a rollback is a revert:

```bash
git log --oneline -10
git revert <commit>
git push origin master
```

A push to `master` redeploys, so the revert is live once the workflow finishes —
usually about two minutes. `workflow_dispatch` can also re-run the deploy from any
commit without pushing, from the Actions tab.

## When the build fails

| Symptom | Cause |
| --- | --- |
| `node: bad option: --permission` | Node is older than 22. Hugo's PostCSS step needs it; bump `node-version`. |
| `this feature is not available in your current Hugo version` | A feature compiled out of the binary — LibSass, i.e. `css.Sass`. This site does not use it; PostCSS does **not** need the extended edition. |
| `n page(s) still contain unrendered '<p>:::'` | A container in `content/` is not one of the four shortcodes. Search the page for `:::`. |
| `snippet: "code-examples/…" not found` | A page includes an example that was moved or deleted. `./checks/examples-go.sh` lists every path the docs reference. |
| Every "last updated" date is the same | The checkout was shallow. `enableGitInfo` needs `fetch-depth: 0`. |
| Search finds nothing | `pagefind --site public` did not run, or ran before Hugo. It reads the built HTML. |
