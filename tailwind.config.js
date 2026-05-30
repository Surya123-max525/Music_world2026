/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#00d9ff',
        gold: '#f7c948',
        night: '#020617',
      },
      boxShadow: {
        glow: '0 0 30px rgba(0, 217, 255, 0.45)',
        gold: '0 0 26px rgba(247, 201, 72, 0.35)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
