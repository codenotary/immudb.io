// The rail's mobile disclosure.
//
// The markup ships `open`, because that is the state a reader without
// JavaScript should get: a long rail on a phone reads fine, an empty one on a
// desktop does not. With JavaScript, a narrow window gets the collapsed rail the
// design asks for. After that the reader's own toggling stands, until the window
// crosses the breakpoint and the question is a different one.
const DESKTOP = '(min-width: 1024px)';

export function initRail() {
  const details = document.querySelector('nav[aria-label="Main"] details');
  const desktop = window.matchMedia?.(DESKTOP);
  if (!details || !desktop) return;

  const sync = () => {
    details.open = desktop.matches;
  };

  sync();
  desktop.addEventListener('change', sync);
}
