// Progressive enhancement for the {{% tabs %}} shortcode. The page ships every
// panel stacked under a visible language heading; this turns each group into the
// underline tab bar and remembers the language across pages.
import { safeGet, safeSet } from './storage.js';

const KEY = 'immudb-tab-lang';

const LIST_CLASS = 'inline-flex items-center gap-1 border-b border-border';
const TRIGGER_CLASS =
  'relative inline-flex items-center whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors ' +
  "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:content-['']";
const IDLE_CLASS = 'text-text-secondary hover:text-text-primary after:bg-transparent';
const ACTIVE_CLASS = 'text-text-primary after:bg-accent';

/** Show one panel of a group and paint its trigger; `label` need not exist here. */
function select(group, label) {
  const panels = group.querySelectorAll(':scope > .tab-panel');
  const triggers = group.querySelectorAll(':scope > [role="tablist"] > [role="tab"]');
  let index = [...panels].findIndex((p) => p.dataset.label === label);
  if (index < 0) index = 0;

  panels.forEach((panel, i) => {
    panel.hidden = i !== index;
  });
  triggers.forEach((trigger, i) => {
    const on = i === index;
    trigger.className = `${TRIGGER_CLASS} ${on ? ACTIVE_CLASS : IDLE_CLASS}`;
    trigger.setAttribute('aria-selected', String(on));
    trigger.tabIndex = on ? 0 : -1;
  });
}

function enhance(group, index) {
  const panels = [...group.querySelectorAll(':scope > .tab-panel')];
  if (panels.length < 2) return;

  const list = document.createElement('div');
  list.setAttribute('role', 'tablist');
  list.className = LIST_CLASS;

  panels.forEach((panel, i) => {
    const label = panel.dataset.label ?? `Tab ${i + 1}`;
    const id = `tab-${index}-${i}`;
    panel.id = `${id}-panel`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', id);

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = id;
    trigger.setAttribute('role', 'tab');
    trigger.setAttribute('aria-controls', panel.id);
    trigger.textContent = label;
    trigger.addEventListener('click', () => {
      safeSet(localStorage, KEY, label);
      // Every group on the page follows, so a reader picking Go once reads Go.
      document.querySelectorAll('.tabs[data-enhanced="true"]').forEach((g) => select(g, label));
    });
    trigger.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = list.children[(i + step + panels.length) % panels.length];
      next.focus();
      next.click();
    });
    list.append(trigger);
  });

  group.prepend(list);
  group.dataset.enhanced = 'true';
}

export function initTabs() {
  const groups = document.querySelectorAll('.tabs');
  groups.forEach(enhance);
  const label = safeGet(localStorage, KEY);
  document
    .querySelectorAll('.tabs[data-enhanced="true"]')
    .forEach((group) => select(group, label));
}
