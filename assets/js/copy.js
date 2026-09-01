// A copy control on every code block. Added here rather than in the template so a
// reader without JS is not shown a button that cannot do anything.
export function initCopy() {
  document.querySelectorAll('.code-block').forEach((block) => {
    const code = block.querySelector('pre');
    if (!code) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    button.addEventListener('click', async () => {
      // Chroma's line numbers live in their own spans; excluding them keeps the
      // clipboard holding something a person can paste into a shell.
      const clone = code.cloneNode(true);
      clone.querySelectorAll('.ln, .lnt').forEach((n) => n.remove());
      try {
        await navigator.clipboard.writeText(clone.textContent.replace(/\n$/, ''));
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });

    block.append(button);
  });
}
