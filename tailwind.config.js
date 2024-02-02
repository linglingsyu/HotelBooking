/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: ' 0rem' }
    },
    extend: {
      colors: {
        primary: {
          120: '#7B6651',
          100: '#BF9D7D',
          80: '#AE9984',
          60: '#E1D1C2',
          40: '#F1EAE4',
          10: '#FAF7F5'
        },
        success: {
          120: '#299F65',
          100: '#52DD7E',
          20: '#BCFBBD',
          10: '#E8FEE7'
        },
        info: {
          120: '#1D66AC',
          100: '#3BADEF',
          20: '#B1EFFD',
          10: '#E6FBFE'
        },
        alert: {
          120: '#C22538',
          100: '#DA3E51',
          20: '#F5CCD1',
          10: '#FDECEF'
        },
        neutral: {
          bg: '#140F0A',
          80: '#4B4B4B',
          60: '#909090',
          40: '#ECECEC',
          10: '#F9F9F9'
        }
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
