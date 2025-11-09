/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        fontFamily: {
            // 1. Основной шрифт для всего текста (e-Ukraine-Regular)
            sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            // 2. Дополнительный шрифт для заголовков (e-UkraineHead-Medium)
            head: ['var(--font-head)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        }
    },
  },
  plugins: [],
}
