
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            50: '#fff6ed',
            100: '#ffe9d3',
            200: '#ffceac',
            300: '#ffab6f',
            400: '#ff8534',
            500: '#f9670f',
            600: '#ea4d09',
            700: '#c1360a',
            800: '#9a2c10',
            900: '#7c2810',
          },
          blue: {
            50: '#eef4ff',
            100: '#dbe7ff',
            200: '#b9d1ff',
            300: '#8bb1ff',
            400: '#5c8bff',
            500: '#3766f5',
            600: '#2549dd',
            700: '#1f3ab3',
            800: '#1e328c',
            900: '#1c2d6f',
          },
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(249,103,15,0.35)' },
          '70%': { boxShadow: '0 0 0 14px rgba(249,103,15,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(249,103,15,0)' },
        },
        gradientPan: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
  fadeUp: 'fadeUp 0.7s ease forwards',
  'fadeUp-200': 'fadeUp 0.7s ease 0.2s forwards',
  'fadeUp-400': 'fadeUp 0.7s ease 0.4s forwards',
  floatSlow: 'floatSlow 6s ease-in-out infinite',
  bob: 'bob 3s ease-in-out infinite',
  pulseRing: 'pulseRing 2.2s ease-out infinite',
  gradientPan: 'gradientPan 8s ease infinite',
  gradientText: 'gradientText 6s ease infinite',
  shimmer: 'shimmer 3s ease-in-out infinite',
},
    },
  },
  plugins: [],
};
