/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF4D1',
          100: '#FFE28A',
          200: '#FFD35A',
          300: '#FFB72C',
          400: '#FF9F00',
          500: '#FF8A00',
          600: '#E67A00',
          700: '#B86600',
          800: '#8C5100',
          900: '#6A3B00',
          950: '#4D2A00',
        },
        secondary: {
          50: '#F9F5EB',
          100: '#F2E8D5',
          200: '#E2D1A4',
          300: '#D1B671',
          400: '#B59C4F',
          500: '#9A8536',
          600: '#7F6C28',
          700: '#65501D',
          800: '#4A3912',
          900: '#332711',
          950: '#1F1607',
        },
      },
    },
  },
  plugins: [],
}
