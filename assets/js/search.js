// Pagefind's own UI, mounted lazily into the dialog: its bundle and index only
// load once someone actually searches, so the docs pay nothing for it otherwise.
// Pagefind writes /pagefind/* after the Hugo build, which is why nothing here is
// resolved at build time.
const UI_CSS = '/pagefind/pagefind-ui.css';
const UI_JS = '/pagefind/pagefind-ui.js';

function loadOnce() {
  if (window.__pagefindLoading) return window.__pagefindLoading;
  window.__pagefindLoading = new Promise((resolve, reject) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = UI_CSS;
    document.head.append(css);

    const js = document.createElement('script');
    js.src = UI_JS;
    js.onload = resolve;
    js.onerror = reject;
    document.head.append(js);
  });
  return window.__pagefindLoading;
}

function showUnavailable(mount) {
  const note = document.createElement('p');
  note.className = 'p-6 text-sm text-text-secondary';
  note.textContent = 'Search is unavailable — the index has not been built.';
  mount.replaceChildren(note);
}

export function initSearch() {
  const dialog = document.querySelector('[data-search-dialog]');
  const mount = document.querySelector('[data-search-mount]');
  const openers = document.querySelectorAll('[data-search-open]');
  if (!dialog || !mount || !openers.length) return;

  let mounted = false;
  let lastFocus = null;

  async function open() {
    lastFocus = document.activeElement;
    dialog.hidden = false;
    if (!mounted) {
      mounted = true;
      try {
        await loadOnce();
        new window.PagefindUI({
          element: mount,
          showSubResults: true,
          showImages: false,
          pageSize: 8,
        });
      } catch {
        showUnavailable(mount);
      }
    }
    dialog.querySelector('input')?.focus();
  }

  function close() {
    dialog.hidden = true;
    lastFocus?.focus();
  }

  openers.forEach((o) => o.addEventListener('click', open));
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !dialog.hidden) close();
    // `/` is the search key everywhere else in developer tooling; it must not
    // steal the keystroke from someone typing into a field.
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? '');
    if (e.key === '/' && dialog.hidden && !typing) {
      e.preventDefault();
      open();
    }
  });
}
