// Ported verbatim from AgentMon's tailwind.config.ts; only `content` differs.
// Theme colors are stored as space-separated RGB channels (assets/css/main.css) so
// Tailwind can inject the /opacity modifier's alpha. Wrap each channel var for that.
const withAlpha = (v) => `rgb(var(${v}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./layouts/**/*.html', './content/**/*.md', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        page: withAlpha('--color-page'),
        header: withAlpha('--color-header'),
        strip: {
          DEFAULT: withAlpha('--color-strip'),
          ink: withAlpha('--color-strip-ink'),
          action: withAlpha('--color-strip-action'),
          'action-ink': withAlpha('--color-strip-action-ink'),
        },
        surface: {
          0: withAlpha('--color-surface-0'),
          1: withAlpha('--color-surface-1'),
          2: withAlpha('--color-surface-2'),
          3: withAlpha('--color-surface-3'),
        },
        border: {
          DEFAULT: withAlpha('--color-border'),
          subtle: withAlpha('--color-border-subtle'),
          input: withAlpha('--color-border-input'),
        },
        text: {
          primary: withAlpha('--color-text-primary'),
          secondary: withAlpha('--color-text-secondary'),
          tertiary: withAlpha('--color-text-tertiary'),
          faint: withAlpha('--color-text-faint'),
          muted: withAlpha('--color-text-muted'),
          heading: withAlpha('--color-text-heading'),
        },
        accent: {
          DEFAULT: withAlpha('--color-accent'),
          hover: withAlpha('--color-accent-hover'),
          deep: withAlpha('--color-accent-deep'),
          ink: withAlpha('--color-accent-ink'),
          // Pre-composed token — intentionally not run through withAlpha.
          muted: 'var(--color-accent-muted)',
        },
        notice: {
          DEFAULT: withAlpha('--color-notice'),
          border: withAlpha('--color-notice-border'),
          soft: withAlpha('--color-notice-soft'),
        },
        info: {
          DEFAULT: withAlpha('--color-info'),
          border: withAlpha('--color-info-border'),
          ink: withAlpha('--color-info-ink'),
        },
        success: withAlpha('--color-success'),
        warning: withAlpha('--color-warning'),
        error: {
          DEFAULT: withAlpha('--color-error'),
          soft: withAlpha('--color-error-soft'),
          border: withAlpha('--color-error-border'),
        },
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        panel: '14px',
        card: '12px',
        chip: '10px',
        cell: '8px',
      },
      boxShadow: {
        hover: '0 10px 26px rgba(15,23,41,.10)',
        lift: '0 20px 50px rgba(15,23,41,.10)',
      },
    },
  },
  plugins: [],
};
