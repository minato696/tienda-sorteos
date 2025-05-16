/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sp-indigo': 'var(--color-primary)',
        'sp-blue': 'var(--color-secondary)',
        'sp-cyan': 'var(--color-accent)',
        'sp-yellow': 'var(--color-highlight)',
        // Colores temáticos
        theme: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          highlight: 'var(--color-highlight)',
          bg: {
            main: 'var(--color-bg-main)',
            alt: 'var(--color-bg-alt)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            inverted: 'var(--color-text-inverted)',
          },
          card: 'var(--color-ui-card)',
          border: 'var(--color-ui-border)',
          hover: 'var(--color-ui-hover)',
          success: 'var(--color-status-success)',
          warning: 'var(--color-status-warning)',
          error: 'var(--color-status-error)',
          info: 'var(--color-status-info)',
        }
      },
      backgroundImage: {
        'gradient-theme': 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
        'gradient-theme-alt': 'linear-gradient(to right, var(--color-accent), var(--color-primary))',
        'gradient-festive': 'linear-gradient(to right, var(--color-highlight), var(--color-secondary), var(--color-accent))',
      },
      boxShadow: {
        'theme-sm': '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'theme-md': '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'theme-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};