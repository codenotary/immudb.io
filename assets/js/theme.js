// The theme switch. The class is already on <html> by the time this runs — the
// anti-FOUC script in head.html put it there — so this only owns the control and
// the write-back. Same storage key as AgentMon, so the two products agree.
const KEY = 'amon-theme';

function readPreference() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'dark' || v === 'light' || v === 'system' ? v : 'light';
  } catch {
    return 'light';
  }
}

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolve(preference) {
  return preference === 'system' ? systemTheme() : preference;
}

function apply(theme, toggle) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  if (!toggle) return;
  toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  toggle.querySelector('[data-theme-icon="light"]').hidden = theme === 'dark';
  toggle.querySelector('[data-theme-icon="dark"]').hidden = theme !== 'dark';
}

export function initTheme() {
  const toggle = document.querySelector('[data-theme-toggle]');
  let preference = readPreference();
  apply(resolve(preference), toggle);

  // Following the machine means following it afterwards too, not copying its
  // answer once: a person switching their OS to dark at dusk expects this to move.
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (preference === 'system') apply(systemTheme(), toggle);
  });

  if (!toggle) return;
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    preference = resolve(preference) === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(KEY, preference);
    } catch {
      /* private mode: the choice holds for this page only */
    }
    apply(preference, toggle);
  });
}
