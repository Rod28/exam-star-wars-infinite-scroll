// Screen sizes
const SCREEN = {
  XS: '350px',
  SM: '600px',
  MD: '905px',
  LG: '1280px',
  XL: '1440px',
  XX: '1920px'
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: SCREEN.XS,
      sm: SCREEN.SM,
      md: SCREEN.MD,
      lg: SCREEN.LG,
      xl: SCREEN.XL,
      xx: SCREEN.XX
    },
    extend: {
      colors: {
        primary: '#024881',
        secondary: '#11283d',
        complementary: '#dcdde1',
        black: '#1f2020',
        white: '#f8f8f8',
        successful: '#0c0',
        warning: '#da8908',
        error: '#c0392b',
        alert: '#8e44ad',
        info: '#2980b9'
      },
      zIndex: {
        100: '100',
        1000: '1000'
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          margin: 'auto',

          '@screen xs': {
            paddingLeft: '1rem',
            paddingRight: '1rem'
          },
          '@screen sm': {
            paddingLeft: '2rem',
            paddingRight: '2rem'
          },
          '@screen md': {
            maxWidth: SCREEN.MD
          },
          '@screen lg': {
            maxWidth: SCREEN.LG,
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem'
          },
          '@screen xl': {
            width: '90%',
            maxWidth: SCREEN.XX
          }
        }
      });
    }
  ]
};
