/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: {
          DEFAULT: '#0A0A0A',
          subtle: '#121212',
          border: 'rgba(255, 255, 255, 0.1)',
          'border-hover': 'rgba(255, 222, 0, 0.4)',
        },
        brand: {
          yellow: '#FFDE00',
          yellowHover: '#E6C800',
          yellowLight: '#FFF275',
          yellowGlow: 'rgba(255, 222, 0, 0.25)',
        },
        accent: {
          DEFAULT: '#FFDE00',
          glow: 'rgba(255, 222, 0, 0.25)',
          emerald: '#10B981',
          cyan: '#06B6D4',
        },
        muted: {
          DEFAULT: '#A3A3A3',
          dark: '#525252',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'Syne', 'Arial Black', 'sans-serif'],
        druk: ['Unbounded', 'Syne', 'Impact', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        ultra: '0.08em',
      }
    },
  },
  plugins: [],
}
