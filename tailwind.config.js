/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0096B5',
          light: '#eaf1ff',
          'dark-light': 'rgba(67,97,238,.15)',
        },
        primaryDark: {
          DEFAULT: '#008099',
          light: '#eaf1ff',
          'dark-light': 'rgba(67,97,238,.15)',
        },
        secondary: {
          DEFAULT: '#E8E8E8',
          light: '#e6e6e6',
          'dark-light': 'rgb(128 93 202 / 15%)',
        },
        success: {
          DEFAULT: '#00AF8F',
          light: '#66DCC1',
          'dark-light': 'rgba(0,171,85,.15)',
        },
        successDark: {
          DEFAULT: '#00846E',
          light: '#009980',
          'dark-light': 'rgba(0,171,85,.15)',
        },
        secondaryDark: {
          DEFAULT: '#4d4d4d',
          light: '#666666',
          'dark-light': 'rgba(0,171,85,.15)',
        },

        danger: {
          DEFAULT: '#e7515a',
          dark: '#d64049',
          light: '#f0747c',
          'dark-light': 'rgba(231,81,90,.15)',
        },
         dangerDark: {
          DEFAULT: '#c9343e',
          dark: '#d64049',
          light: '#f0747c',
          'dark-light': 'rgba(231,81,90,.15)',
        },
        warning: {
          DEFAULT: '#e2a03f',
          dark: '#d19234',
          light: '#e8b364',
          'dark-light': 'rgba(226,160,63,.15)',
        },
        info: {
          DEFAULT: '#344054',
          light: '#44546f',
          'dark-light': 'rgba(33,150,243,.15)',
        },
        dark: {
          DEFAULT: '#303c4f',
          light: '#eaeaec',
          'dark-light': 'rgba(59,63,92,.15)',
        },
        black: {
          DEFAULT: '#0e1726',
          medium: '#1e293b',
          light: '#334155',
          lighter: '#475569',
          'dark-light': 'rgba(14,23,38,.15)',
        },
        white: {
          DEFAULT: '#ffffff',
          light: '#e0e6ed',
          dark: '#888ea8',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      spacing: {
        4.5: '18px',
      },
      boxShadow: {
        '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-invert-headings': theme('colors.white.dark'),
            '--tw-prose-invert-links': theme('colors.white.dark'),
            h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0 },
            h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
            h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
            h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
            h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
            h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
            p: { marginBottom: '0.5rem' },
            li: { margin: 0 },
            img: { margin: 0 },
          },
        },
      }),
    },
  },
  plugins: [],
}