/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C4295',
          dark: '#1C2E6C',
          light: '#3D57B8',
          hover: '#24377D',
        },
        secondary: {
          DEFAULT: '#D4EDFC',
          light: '#EBF6FE',
          dark: '#A8D9F9',
          muted: '#C2E4FA',
        },
        accent: {
          DEFAULT: '#F28C48',
          hover: '#E0772F',
          light: '#FDEEE4',
          dark: '#C8621E',
        },
        brand: {
          blue: '#2C4295',
          lightblue: '#D4EDFC',
          orange: '#F28C48',
        },
        sand: {
          DEFAULT: '#D7C4B7',
          light: '#EDE5DF',
          dark: '#B09A8B',
        },
        slateCover: {
          DEFAULT: '#606470',
          light: '#828694',
          dark: '#3E424D',
        }
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 10px 30px -10px rgba(44, 66, 149, 0.35)',
        'glow-accent': '0 10px 30px -10px rgba(242, 140, 72, 0.45)',
        'card-soft': '0 20px 40px -15px rgba(44, 66, 149, 0.08)',
        'card-hover': '0 30px 60px -20px rgba(44, 66, 149, 0.16)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
