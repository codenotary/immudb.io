// Marks the "on this page" entry for the section the reader is currently inside.
export function initToc() {
  const toc = document.querySelector('.toc');
  if (!toc) return;

  const links = new Map();
  toc.querySelectorAll('a[href^="#"]').forEach((a) => {
    const heading = document.getElementById(decodeURIComponent(a.hash.slice(1)));
    if (heading) links.set(heading, a);
  });
  if (!links.size) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        links.get(entry.target)?.classList.toggle('is-current', entry.isIntersecting);
      });
    },
    // A band just under the sticky band: a heading counts as current from the
    // moment it reaches the top, and stops when the next one gets there.
    { rootMargin: '-80px 0px -70% 0px' },
  );
  links.forEach((_, heading) => observer.observe(heading));
}
