// The documentation rail's two disclosure levels.
//
// The markup ships the mobile menu OPEN and each section CLOSED except the one
// holding the current page. Both defaults are what a reader without JavaScript
// should get: a desktop rail that is never empty, and sections that are already
// collapsed. This file only adds what needs a script — closing the mobile menu
// below the breakpoint, and remembering which sections the reader opened.
import { safeGet, safeSet } from './storage.js';

const DESKTOP = '(min-width: 1024px)';
const KEY = 'immudb-rail-open';

function readOpen() {
  try {
    const raw = safeGet(localStorage, KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    // A malformed value is not worth breaking the rail over.
    return new Set();
  }
}

export function initRail() {
  const nav = document.querySelector('nav[aria-label="Main"]');
  if (!nav) return;

  // Explicitly the root disclosure, not "the first <details>" — the sections are
  // <details> too now, and a tag selector would grab whichever came first.
  const root = nav.querySelector('[data-rail-root]');
  const desktop = window.matchMedia?.(DESKTOP);
  if (root && desktop) {
    const sync = () => {
      root.open = desktop.matches;
    };
    sync();
    desktop.addEventListener('change', sync);
  }

  const groups = [...nav.querySelectorAll('[data-rail-group]')];
  if (!groups.length) return;

  // Reopen what the reader had open. The server already opened the section for
  // the current page; this never closes it, so their position stays visible.
  const open = readOpen();
  for (const g of groups) {
    if (open.has(g.dataset.railGroup)) g.open = true;
  }

  // Every rail click is a full page load on a static site, so without this the
  // rail would re-collapse on every navigation.
  for (const g of groups) {
    g.addEventListener('toggle', () => {
      const next = new Set(readOpen());
      if (g.open) next.add(g.dataset.railGroup);
      else next.delete(g.dataset.railGroup);
      safeSet(localStorage, KEY, JSON.stringify([...next]));
    });
  }
}
