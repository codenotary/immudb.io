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
hugo --minify --gc          # Hugo extended, pinned by HUGO_VERSION
npx pagefind --site public  # writes public/pagefind/
```

Two things about it are load-bearing:

- **`extended: true`** on `peaceiris/actions-hugo`. The stylesheet goes through Hugo
  Pipes' PostCSS, which the plain build does not carry.
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
| `this feature is not available in your current Hugo version` | The plain Hugo build. `extended: true` on `peaceiris/actions-hugo`. |
| `n page(s) still contain unrendered '<p>:::'` | A container in `content/` is not one of the four shortcodes. Search the page for `:::`. |
| `snippet: "code-examples/…" not found` | A page includes an example that was moved or deleted. `./checks/examples-go.sh` lists every path the docs reference. |
| Every "last updated" date is the same | The checkout was shallow. `enableGitInfo` needs `fetch-depth: 0`. |
| Search finds nothing | `pagefind --site public` did not run, or ran before Hugo. It reads the built HTML. |
