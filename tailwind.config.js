// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New color palette
        'sp-pink': '#F72585',
        'sp-purple': '#7209B7',
        'sp-indigo': '#3A0CA3',
        'sp-blue': '#4361EE',
        'sp-cyan': '#4CC9F0',
      },
      backgroundImage: {
        // New gradients
        'gradient-primary': 'linear-gradient(to right, #F72585, #7209B7)',
        'gradient-secondary': 'linear-gradient(to right, #7209B7, #3A0CA3)',
        'gradient-nav': 'linear-gradient(to right, #3A0CA3, #4361EE)',
        'gradient-footer': 'linear-gradient(to right, #4361EE, #4CC9F0)',
      }
    },
  },
  plugins: [],
}