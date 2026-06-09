export default {
  content: ['./index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    fontFamily: {
      serif: ['Noto Serif Thai', 'serif'],
      sans: ['Noto Sans Thai', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1192px',
    },
    extend: {
      colors: {
        ivory: '#faf7f2',
        cream: '#f1ebe1',
        ink: '#211c18',
        soft: '#6e6258',
        mocha: '#a47864',
        gold: '#c2a878',
      },
    },
  },
  plugins: [],
};
