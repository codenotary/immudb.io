# Migrate docs.immudb.io to Hugo with the AgentMon orange design

## Context

`docs.immudb.io` is a documentation site that has already been migrated once (VuePress → **VitePress 2.0.0-alpha.19**; the `.vuepress` naming survives in `src/.vuepress/`, `package.json` scripts and the workflow filename, but the live config is `.vitepress/`). It carries a lot of weight it no longer needs:

- **25 versioned doc trees** under `src/` (0.8.0 … 1.11.0 + `master`) — 1050 markdown files, a 1627-line hand-maintained sidebar system where only 10 of 25 versions have a curated sidebar and the other 15 are *derived* at build time, and a `useVersion.ts` VERSIONS list that is factually wrong (lists `1.2.0`/`1.0.5`/`1.0.1`, which have no directory; omits `1.9DOM.0`/`1.9DOM.1`, which do).
- **A dead `src/.vuepress/` tree** that is still wired into live `package.json` scripts (`images:*`, `algolia:index`) and the CI cache — deleting it today breaks the build.
- **Dead blog machinery** — `blog.data.mts` loads `blog/**/*.md`; there are zero such files. `BlogIndex/BlogCard/BlogPost/ReadingTime`, `tests/e2e/blog.spec.ts` and `public/blog/*` are all orphaned.
- **A production rendering bug**: VitePress has no equivalent of the VuePress `element-tabs` plugin and `markdown.config` is an empty stub, so `:::: tabs` / `::: tab` never render. **291 of 1063 built pages currently ship literal `<p>:::` text** and 195 leak `&lt;&lt;&lt; @` where a code snippet should be.

Goal: a plain static Hugo site — no Vue runtime — serving **only the `master` docs** (62 files), restyled to the orange design system of `/home/dennis/github/AgentMon/standalone-server/frontend`, with the version switcher, Discord, the blockchain framing, the dead blog and the newsletter form removed. The tab bug gets fixed as a by-product, since the migration script has to interpret those containers anyway.

### Decisions already taken
| Question | Decision |
|---|---|
| Old versions | **Delete all**, keep `src/master` only |
| Search | **Pagefind** (static, no service, no API keys) — drop Algolia |
| Theme mode | **Match AgentMon exactly**: light default, `.dark` class toggle, `localStorage['amon-theme']` |
| Extra cuts | Blog machinery, `Subscribe.vue` + reCAPTCHA, `Terminal.vue`/`Carousel.vue` demos |

### Two findings that shrink the job
- **There is no AWS QLDB / ledgerdb content in `master`.** The only thing to cut is one sentence in `src/master/immudb.md:22` ("…just like blockchains, but without all the complexity. Unlike blockchains, immudb can handle millions of transactions per second…"). The "immutable ledger" wording in `production/performance-guide.md` is immudb's own terminology, unrelated to QLDB — keep it.
- **Every angle-bracket placeholder is inside a code fence** (`<SECRET KEY>`, `<BUCKET NAME>`, Java generics `List<Entry>`, `Iterator<ZEntry>`). Goldmark never touches fenced code, so `unsafe = true` is safe to enable.

### Conversion scope, measured in `src/master` only
| Pattern | Count | Handling |
|---|---|---|
| `<WrappedSection>` | 250 | strip — it is a layout `<div>` the prose container replaces |
| `:::: tabs` groups | 39 | → `{{% tabs %}}` shortcode |
| `::: tab <Lang>` | 224 | → `{{% tab %}}` (Go, Python, Java, .NET, Node.js, Others, Ruby, PHP, CLI, C) |
| `<<< @/code-examples/…` | 36 | → `{{< snippet >}}` shortcode over `readFile` |
| `::: tip/warning/danger` | 15 | → `{{% callout %}}` shortcode |
| `<CustomList>` / `<FeatureTable/>` / `<CnSocialButton>` | 2 / 1 / 2 | hand-edit (all in `index.md` and one or two others) |
| Relative `.md` links | ~50 | strip the `.md` extension |

---

## Target layout

Docs move to the **site root**, because the domain is already `docs.immudb.io` (`/docs/develop/reading` would stutter). `src/master/index.md` becomes the home page.

```
hugo.toml                     new — site config
archetypes/
assets/
  css/main.css                the AgentMon token block + @tailwind directives
  css/chroma.css              generated syntax theme
  js/theme.js  js/tabs.js  js/copy.js  js/search.js
content/                      ← from src/master/ (README.md dropped, index.md → _index.md)
  _index.md  immudb.md  releasenotes.md
  running/ samples/ production/ connecting/ develop/ embedded/ management/
code-examples/go/…            ← moved from src/code-examples/ (readFile needs project-root paths)
data/sidebar.yaml             ← ported from .vitepress/sidebars/master.ts
layouts/
  _default/baseof.html single.html list.html  404.html  index.html
  partials/…  shortcodes/…
static/                       ← from public/ (minus blog/, plus fonts/)
tailwind.config.js  postcss.config.js
```

**Deleted:** `src/` (all 25 version dirs incl. the dead `src/.vuepress/`), `.vitepress/`, `docs/` (gitignored build output), `public/blog*`, `tests/e2e/blog.spec.ts`, `tests/e2e/versions.spec.ts`, `tests/unit/components.test.ts`, `.github/workflows/deploy-vuepress.yml`.

**URL continuity:** every page gets a Hugo `aliases` entry for its old `/master/...` path — Hugo emits a meta-refresh stub, which is the only redirect mechanism GitHub Pages offers. Old `/1.9.6/...` URLs 404 by design. `sitemap` hostname changes from `https://immudb.io` to `https://docs.immudb.io` to match `public/CNAME` (currently mismatched).

---

## Key implementation choices

### Tailwind 3.4 through Hugo Pipes PostCSS — not Tailwind v4
Hugo has built-in `css.TailwindCSS`, but it drives the **Tailwind v4** CLI, which would mean rewriting AgentMon's `tailwind.config.ts` into CSS-first `@theme` and accepting v4's changed utility semantics. The whole point is to match AgentMon *exactly*, so use `css.PostCSS` with `tailwindcss@3.4` and copy `tailwind.config.ts` across as `tailwind.config.js` verbatim, changing only `content`:

```js
content: ['./layouts/**/*.html', './content/**/*.md', './assets/js/**/*.js'],
```

npm is already a build dependency here and in CI, so this costs nothing new. Needs `postcss-cli`, `postcss`, `autoprefixer`, `tailwindcss@^3.4` as devDeps.

### Hugo
Not installed on this machine. Install the **extended** build (Sass/PostCSS support is required) from the GitHub releases tarball into `~/.local/bin`, and pin the same version in CI via `peaceiris/actions-hugo` with `extended: true`.

### Design tokens
Copy `/home/dennis/github/AgentMon/standalone-server/frontend/src/index.css` into `assets/css/main.css` **unchanged** — the `:root` and `.dark` blocks, the `* { border-color }` base rule, the body rule, the scrollbar styling — then append the doc-specific prose styles. The two contrast rules AgentMon enforces with unit tests must hold here too:

1. `#F59300` (`--color-accent`) is **fill-only**. Filled orange buttons take `text-accent-ink` (near-black). Orange **text** is always `--color-accent-deep` (`#B84B1F` light / `#FDD08A` dark). The one exception is on the fixed dark `--color-strip` band, where the bare accent reads 5.8:1.
2. `--color-text-faint` is deliberately sub-AA — uppercase micro-labels only (rail group headings, table `<th>`).

### Fonts
Vendor the WOFF2 files directly into `static/fonts/` and hand-write `@font-face` in `main.css` — Manrope 400/600/700/800, DM Sans 400/500/700, JetBrains Mono 400/500. All `font-display: swap`; preload DM Sans 400 and Manrope 700 in `<head>`. This removes a build step and any `node_modules` path coupling. (Source them from the `@fontsource/*` packages AgentMon uses, so the exact same faces ship.)

### Tabs — progressive enhancement, not a build-time widget
The shortcode emits every panel; ~30 lines of `assets/js/tabs.js` upgrade them into the AgentMon underline tab bar and persist the chosen language in `localStorage`. Without JS the panels stack with visible language headings, which still reads correctly and keeps Lighthouse happy. Markup and active state reuse the AgentMon Tabs classes verbatim:

```
list:    inline-flex items-center gap-1 border-b border-border
trigger: relative px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary
active:  text-text-primary  +  after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-accent
```

### Code blocks
Code sits on the fixed dark `bg-strip` band in **both** themes, so one Chroma style suffices: `hugo gen chromastyles --style=github-dark > assets/css/chroma.css`, then override the background to `rgb(var(--color-strip))`. Line numbers stay on (VitePress had `lineNumbers: true`). A copy button reuses the AgentMon `CommandBlock` treatment: `rounded-[6px] bg-strip-action/10 px-2.5 py-1 text-[11px] font-bold text-strip-ink hover:bg-strip-action/20`.

---

## Files to create

### `hugo.toml`
```toml
baseURL = 'https://docs.immudb.io/'
languageCode = 'en-US'
title = 'immudb'
enableGitInfo = true

[params]
  description = 'immudb - the lightweight, high-speed immutable database for systems and applications.'
  editURL = 'https://github.com/codenotary/immudb.io/edit/master/content/'

[markup.goldmark.renderer]
  unsafe = true          # required: raw <img align> blocks and angle-bracket placeholders

[markup.highlight]
  noClasses = false      # use assets/css/chroma.css
  lineNos = true
  lineNumbersInTable = false
  tabWidth = 4

[markup.tableOfContents]
  startLevel = 2
  endLevel = 3

[outputs]
  home = ['HTML', 'RSS', 'SITEMAP']

[sitemap]
  filename = 'sitemap.xml'
```

### Layouts
- `_default/baseof.html` — the AgentMon shell: `body.bg-page` → `div.mx-auto.w-full.max-w-[1600px].bg-surface-0` → CommandStrip → `div.flex.flex-col.lg:flex-row` → rail + `div.flex.min-w-0.flex-1.flex-col` → `main.flex-1.px-4.pb-6.pt-[26px].sm:px-8` → footer `mt-auto`.
- `partials/head.html` — meta/OG/Twitter (ported from `.vitepress/config.mts:35-89`), the favicon `<link>` set, the schema.org JSON-LD, font preloads, and the **anti-FOUC script verbatim**:
  ```html
  <script>try{if(localStorage.getItem('amon-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}</script>
  ```
  Drop the reCAPTCHA script (only existed for the removed `Subscribe.vue`).
- `partials/command-strip.html` — sticky dark band, `sticky top-0 z-40 … bg-strip px-4 py-[9px]`, holding the logo, the `docker run` one-liner with an orange `$`, the Pagefind search trigger, the theme toggle and the GitHub/Twitter links. Set `--header-h: 49px` in CSS with a media query for the wrapped case rather than porting AgentMon's `useLayoutEffect` measurement.
- `partials/rail.html` — renders `data/sidebar.yaml`; active item `bg-accent-muted py-[9px] font-bold text-accent-deep`, idle `py-2 text-text-secondary hover:bg-surface-2 hover:text-text-primary`, group headings `text-[11px] font-bold uppercase tracking-[.1em] text-text-faint`. Collapses to a `<details>` disclosure below `lg` — see [Deviations](#deviations-from-this-plan) for how that had to be wired.
- `partials/toc.html`, `partials/prev-next.html`, `partials/edit-link.html`, `partials/footer.html`, `partials/theme-toggle.html`.
- `index.html` — home. Uses the AgentMon hero: the two-tone headline (line 1 `text-text-heading`, line 2 `<span class="text-accent-deep">`), the radial wash background, the free-tier-style pill, and a feature card grid built from existing `static/features/` and `static/logos/immudb-mascot.svg` assets. Body copy comes from the current `src/master/index.md` welcome text; the two-tone headline is the one piece written for this page — see [Deviations](#deviations-from-this-plan).
- `404.html`.

### Shortcodes (`layouts/shortcodes/`)
| File | Replaces | Notes |
|---|---|---|
| `tabs.html` | `:::: tabs` | wrapper `<div class="tabs">`, emits `.Inner` |
| `tab.html` | `::: tab X` | `<div class="tab-panel" data-label="X">`; `%`-delimited so inner markdown renders |
| `callout.html` | `::: tip/warning/danger` | AgentMon notice tones — `border-notice-border bg-notice-soft text-accent-deep` for tip/warning, `border-error-border bg-error-soft` for danger |
| `snippet.html` | `<<< @/code-examples/…` | `readFile` + `highlight`, path relative to the repo root |

### `data/sidebar.yaml`
Straight port of `.vitepress/sidebars/master.ts` (130 lines, 11 groups: Introduction, Running immudb, Running samples, immudb in production, Connecting with immudb, Management, Develop with Key Value, Develop with SQL, Develop with Document, Embedded, Release Notes), rewriting every `/master/x` link to `/x`:
```yaml
- title: Introduction
  open: true
  items:
    - { title: Overview,      url: / }
    - { title: About immudb,  url: /immudb/ }
- title: Running immudb
  items:
    - { title: Download, url: /running/download/ }
    ...
```

### `scripts/migrate-to-hugo.mjs`
One idempotent pass over `src/master/**/*.md` writing into `content/`:
1. `README.md` dropped where an `index.md` exists (they are byte-identical in `master`); `index.md` → `_index.md`; section dirs get an `_index.md` generated from `data/sidebar.yaml` group titles.
2. Prepend front matter: `title` from the H1 (then strip that H1, since the layout renders the title), `weight` from sidebar order, `aliases: ["/master/<oldpath>/"]`.
3. `:::: tabs` … `::::` → `{{% tabs %}}` … `{{% /tabs %}}`; `::: tab X` … `:::` → `{{% tab "X" %}}` … `{{% /tab %}}`.
4. `<<< @/code-examples/P` → `{{< snippet "P" >}}`.
5. `::: tip|warning|danger [title]` → `{{% callout "tip" "title" %}}`.
6. Strip `<WrappedSection>` / `</WrappedSection>`.
7. Relative links: `foo.md` → `foo/`, `../x/foo.md` → `/x/foo/`.
8. Report any residual `:::`, `<<< @`, or capitalised Vue tag **outside a code fence** and exit non-zero — this is the guard against silently reproducing the current production bug.

`<CustomList>` (2), `<FeatureTable/>` (1) and `<CnSocialButton>` (2) are hand-edited afterwards, not scripted.

### `.github/workflows/deploy.yml`
Replaces `deploy-vuepress.yml`. Jobs: checkout (`fetch-depth: 0` for `enableGitInfo`) → setup-node + `npm ci` → `peaceiris/actions-hugo` extended → `hugo --minify --gc` → `npx pagefind --site public` → `upload-pages-artifact` → `deploy-pages@v4`. **Delete** the `index-algolia` job and the 4 Algolia secrets. **Keep** the PR Lighthouse job, updating `.lighthouserc.json`'s URLs from `/master/...` to the new root paths.

---

## Files to modify or delete

| Path | Action |
|---|---|
| `src/0.8.0` … `src/1.11.0` (24 dirs), `src/.vuepress/` | delete |
| `src/master/` | migrate → `content/`, then delete |
| `src/code-examples/` | move → `code-examples/`; update `checks/examples-go.sh` paths |
| `.vitepress/` | delete after `sidebars/master.ts` and `config.mts` metadata are ported |
| `public/` | move → `static/`; drop `blog/`, `blog/fullsize/`, `blog/thumbnail/`; keep `CNAME`, `robots.txt`, both Google verification files |
| `src/master/immudb.md:22` | rewrite the blockchain-comparison sentence |
| `package.json` | drop `vitepress`/`vue`/`@fortawesome/*`/`algoliasearch`/`axios`/`sharp*` and the `images:*`, `algolia:index`, `docs:*`, `typecheck` scripts; add `tailwindcss@^3.4`, `postcss`, `postcss-cli`, `autoprefixer`, `pagefind`; add `dev`/`build` wrapping Hugo |
| `tests/unit/`, `tests/integration/`, `tests/e2e/blog.spec.ts`, `tests/e2e/versions.spec.ts`, `tests/e2e/helpers.ts` | delete (all couple to the Vue theme, to Algolia, or to removed features) |
| `tests/e2e/navigation.spec.ts` | rewrite against the Hugo build |
| `playwright.config.ts` | `webServer` → a full build served statically, not `hugo server` — see [Deviations](#deviations-from-this-plan) |
| `vitest.config.ts`, `tsconfig.json`, `.github/workflows/deploy-vuepress.yml`, `MIGRATION_COMPLETE.md`, `VITEPRESS_MIGRATION_COMPLETE.md`, `MULTI_VERSION_IMPLEMENTATION.md` | delete |
| `Dockerfile`, `docker-compose.yml`, `predeploy.sh`, `README.md`, `CI-CD-SETUP.md` | update for the Hugo toolchain |

---

## Phasing

Each step ends with a check that must pass before moving on.

1. **Branch + Hugo install.** `git checkout -b hugo-migration`; install Hugo extended. → `hugo version` shows `+extended`.
2. **Scaffold + Tailwind pipeline.** `hugo.toml`, `assets/css/main.css` (AgentMon tokens copied verbatim), `tailwind.config.js`, `postcss.config.js`, a stub `baseof.html`. → `hugo server` renders a page whose computed `background-color` is `#F7F9FC` light / `#0B0E14` dark.
3. **Fonts + Chroma.** Vendor WOFF2s, generate `chroma.css`. → a fenced Go block renders on the `bg-strip` band in Manrope/DM Sans/JetBrains Mono.
4. **Layouts + partials + shortcodes.** Full shell, rail, TOC, footer, theme toggle, the four shortcodes. → hand-write one test page exercising tabs, callout, snippet and a table; all four render.
5. **Sidebar data.** Port `master.ts` → `data/sidebar.yaml`. → rail shows 11 groups, active item is orange-tinted.
6. **Content migration.** Move `code-examples/`, run `scripts/migrate-to-hugo.mjs`, hand-fix the 5 remaining Vue tags, rewrite the blockchain sentence. → script exits 0; `grep -rn ':::' content/` is empty.
7. **Search.** Pagefind + the AgentMon-styled UI in the CommandStrip. → build, search "replication", get the right page.
8. **Home page.** → `/` renders the hero with the two-tone headline, no redirect.
9. **Deletions.** Remove `src/`, `.vitepress/`, `docs/`, dead deps and scripts. → `hugo --minify` still succeeds from a clean `git clean -xdf` + `npm ci`.
10. **CI/CD + tests.** New workflow, rewritten Playwright spec, updated Lighthouse URLs.

---

## Verification

```bash
# Build clean
rm -rf public resources && npm ci && hugo --minify --gc && npx pagefind --site public

# 1. The bug that motivated this: no leaked container syntax anywhere in the output
grep -rl '<p>:::'   public --include='*.html' | tee /dev/stderr | wc -l   # must be 0 (is 291 today)
grep -rl '&lt;&lt;&lt; @' public --include='*.html' | wc -l              # must be 0 (is 195 today)
grep -rl 'WrappedSection' public --include='*.html' | wc -l               # must be 0

# 2. Page count and URL continuity
find public -name '*.html' | wc -l          # ~62 docs + home + 404 + alias stubs
test -f public/master/develop/reading/index.html   # alias stub for the old URL
grep -q 'docs.immudb.io' public/sitemap.xml        # hostname matches CNAME
test -f public/CNAME && test -f public/robots.txt

# 3. Removed things stay removed
grep -ril 'discord\|algolia\|recaptcha' public | wc -l   # 0
grep -ri 'blockchain' content/ | wc -l                    # 0

# 4. Code examples still compile (path updated for the move)
./checks/examples-go.sh

# 5. Browser
npx playwright test
npx lhci autorun     # a11y and perf gates on the new routes
```

Manual pass in the browser at `hugo server`:
- Toggle the theme — the accent stays `#F59300`, orange **text** flips `#B84B1F` → `#FDD08A`, and no flash of the wrong theme on reload.
- A tab group on `/develop/reading/` switches languages, and the choice persists to `/develop/transactions/`.
- Disable JS: tab panels stack with visible language labels and remain readable.
- Narrow to 375px: the rail collapses, the CommandStrip wraps without covering content.
- Every filled orange button has near-black ink; no orange text on a light surface.

---

## Deviations from this plan

Written after the fact. Everything above is the plan as it stood before
implementation; this section records where the build diverged from it and why,
so the reasoning is not lost to a silent edit. Corrections to the plan's own
factual errors — the sidebar has 11 groups, not 8 — were made in place above
rather than listed here, since those were never decisions.

### Playwright runs against a full build, not `hugo server`

The action table says `webServer` → `hugo server -D --port 1313`. It is
`npm run preview` instead — `hugo --minify --gc`, then `pagefind --site public`,
then `http-server public -p 8080` (in CI, just the static server over the
already-built artifact).

`hugo server` produces neither the Pagefind index nor fingerprinted assets, and
the suite asserts on both: one test searches for "replication" and checks the
hit's URL, and the anti-FOUC and bundle-integrity behaviour only exists in a
production build. Testing the dev server would have meant testing something the
deploy never ships. The plan's command is still available as `npm run dev`.

### The rail disclosure ships open, and JavaScript closes it

The plan says the rail "collapses to a `<details>` disclosure below `lg`", which
implied the obvious CSS-only construction. Two browser behaviours ruled that out,
both found by the e2e suite rather than by reading:

- `display: contents` on a **closed** `<details>` does not reveal its children —
  the UA hides them through a shadow root that author CSS cannot reach. The
  desktop rail rendered empty.
- Moving the groups to a sibling and driving them from `details[open] ~ .groups`
  works in Chromium and Firefox but **not in WebKit**, which does not invalidate
  that selector when the `open` attribute changes. Verified directly: `open`
  became `true` while the computed `display` stayed `none`, and stayed that way.

So the markup ships `open` and `assets/js/rail.js` closes it below `lg`. That
ordering is deliberate: without JavaScript a phone gets a long rail, which reads
fine, whereas the alternative gave a desktop an empty one. A `<summary>` also
keeps its default display — WebKit stops honouring the click that opens a
disclosure once its summary is laid out as a flex box — so the row inside it
does the layout.

### The home page headline is written, not migrated

The plan says the home page's content comes from `src/master/index.md` "so
nothing is invented". The body copy does. The two-tone headline — *"immudb keeps
a history / nobody can rewrite."* — does not; the old page's only heading was
"Welcome", which cannot carry the AgentMon hero. It is the one piece of new copy
on the site and should be reviewed as copy, not as a migration.

### Deletions beyond the action table

The plan's Deleted list named specific files. These went too, all stale
descriptions of the toolchain being replaced:

| Path | Why |
|---|---|
| `DEPLOYMENT_STATUS.md` | a point-in-time status report on the VitePress build |
| `.github/DEPLOYMENT.md` | 406 lines duplicating `CI-CD-SETUP.md` for the old pipeline; its still-true parts (Pages settings, rollback, failure modes) were folded in |
| `predeploy.sh` | regenerated `package-lock.json` for the removed dependency tree |
| `tests/{README,QUICKSTART,SUMMARY}.md` | documented the vitest suite that this branch deletes |
| `tests/unit/`, `tests/integration/` | the whole vitest tree, not only `components.test.ts` — the rest tested Algolia, the version switcher, and a mock markdown parser |

`SECURITY_PATCH_SUMMARY.md` and `SECURITY_REMEDIATION_REPORT.md` were left
alone: they record past incidents rather than describe the toolchain.

### Hardening added after the pre-merge review

Not in the plan, and not migration work — findings from `/codenotary:review`
that were worth closing before merge:

- `layouts/_default/_markup/render-link.html` does **not** pipe `.Destination`
  through `safeURL`. Hugo's own default hook does, which disables Go's href URL
  filter and lets `[x](javascript:…)` in a page render as a live handler.
- `peaceiris/actions-hugo` is pinned to a commit SHA, and `dependabot.yml` gained
  the `github-actions` ecosystem so the pin cannot rot.
- `pages: write` / `id-token: write` moved from workflow scope to the `deploy`
  job, so the PR-only Lighthouse and Playwright jobs no longer hold them while
  running PR-authored code.
- `assets/js/storage.js` — one safe-storage helper, ported from AgentMon's
  `lib/storage.ts`, shared by the theme switch and the tab groups.
