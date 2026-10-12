// Opt-in Google Analytics. The ID arrives through <meta name="ga-id">, which only
// production builds emit, so dev and preview builds never reach Google. No gtag
// code runs and no request leaves the page until the visitor accepts.
import { safeGet, safeSet } from './storage.js';

const KEY = 'immudb-consent';

function loadGtag(id) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  // Analytics only: the advertising signals stay denied even after consent.
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  });
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

// gtag sets its cookies on the registrable domain, so clear them there and on
// the bare host to be sure a withdrawn consent leaves nothing behind.
function clearGaCookies() {
  const host = location.hostname;
  const domains = ['', host, `.${host.split('.').slice(-2).join('.')}`];
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim();
    if (!name.startsWith('_ga')) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    }
  }
}

export function initConsent() {
  const id = document.querySelector('meta[name="ga-id"]')?.content;
  const banner = document.querySelector('[data-consent-banner]');
  if (!id || !banner) return;

  let choice = safeGet(localStorage, KEY);
  if (choice === 'granted') loadGtag(id);
  else if (choice !== 'denied') banner.hidden = false;

  banner.querySelectorAll('[data-consent]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.consent;
      safeSet(localStorage, KEY, next);
      banner.hidden = true;
      if (next === choice) return;
      const wasGranted = choice === 'granted';
      choice = next;
      if (next === 'granted') loadGtag(id);
      else if (wasGranted) {
        // gtag cannot be unloaded from a running page; drop its cookies and
        // start clean.
        clearGaCookies();
        location.reload();
      }
    });
  });

  document.querySelector('[data-consent-reopen]')?.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('[data-consent="granted"]')?.focus();
  });
}
