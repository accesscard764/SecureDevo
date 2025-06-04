/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#13293D',
          dark: '#091729'
        },
        cyan: '#00F6FF',
        yellow: '#F7E733',
        gray: '#C0C6CF',
        black: '#000000'
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      transitionProperty: {
        'width': 'width'
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 246, 255, 0.5)'
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(200%)' }
        },
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        pulse: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.5'
          }
        }
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
};