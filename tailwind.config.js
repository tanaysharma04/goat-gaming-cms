/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#090909',
        carbon: '#161616',
        steel: '#A6ADBB',
        ember: '#FF3B3B',
        plasma: '#3B82F6',
        trophy: '#E7B85A',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 24px 80px rgba(0, 0, 0, 0.42)',
        glow: '0 0 32px rgba(59, 130, 246, 0.35)',
      },
      backgroundImage: {
        'hero-texture':
          'linear-gradient(180deg, rgba(9,9,9,0.3), rgba(9,9,9,0.92)), radial-gradient(circle at 20% 24%, rgba(59,130,246,0.36), transparent 34%), radial-gradient(circle at 80% 30%, rgba(255,59,59,0.28), transparent 32%), linear-gradient(135deg, #10131d 0%, #080808 56%, #13090b 100%)',
      },
    },
  },
  plugins: [],
};
