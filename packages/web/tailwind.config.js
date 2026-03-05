/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        future: {
          dark: '#101418',
          darker: '#0b0f13',
          darkest: '#070a0d',
          primary: '#ff6a3d',
          secondary: '#ffb347',
          accent: '#3ad0c3',
          light: '#ecf4f7',
          success: '#1fbe6b',
          warning: '#f08c2a',
        },
      },
      fontFamily: {
        sans: ['Sora', 'Avenir Next', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glass': '0 10px 30px rgba(0, 0, 0, 0.45)',
        'glow': '0 0 32px rgba(255, 106, 61, 0.2)',
        'glow-lg': '0 0 56px rgba(58, 208, 195, 0.24)',
      },
    },
  },
  plugins: [],
}

