/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Background
        background: '#FAF6F1',
        surface: '#FFFFFF',
        'surface-elevated': '#F5EDE4',

        // Text
        'text-primary': '#2C2420',
        'text-secondary': '#8B7D72',
        'text-tertiary': '#B8ADA4',

        // Accent
        accent: '#D4845A',
        'accent-soft': '#F2DDD0',

        // Mood
        'mood-struggling': '#7B8FA1',
        'mood-low': '#A1A1C4',
        'mood-neutral': '#C4B89C',
        'mood-good': '#9DB88C',
        'mood-thriving': '#D4A76A',

        // Categories
        'cat-body': '#9DB88C',
        'cat-mind': '#7B8FA1',
        'cat-connect': '#C4889B',
        'cat-move': '#D4A76A',
        'cat-create': '#A1A1C4',
        'cat-rest': '#8FB8A8',

        // Dark mode base
        'dark-base': '#1C1917',
      },
      fontFamily: {
        sans: ['Satoshi-Regular', 'System'],
        'sans-medium': ['Satoshi-Medium', 'System'],
        'sans-bold': ['Satoshi-Bold', 'System'],
        mono: ['JetBrainsMono-Regular', 'Courier New'],
      },
    },
  },
  plugins: [],
};
