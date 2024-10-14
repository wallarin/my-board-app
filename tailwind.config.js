/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['GmarketSansMedium', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

