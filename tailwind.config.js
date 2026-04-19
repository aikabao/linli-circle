/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cinnabar': '#C41E24',
        'deep-red': '#8B1A1A',
        'gold': '#D4A017',
        'bright-gold': '#F5D300',
        'jade-white': '#F5F2EB',
        'palace-gray': '#4A4A4A',
      },
      fontFamily: {
        'hanYi': ['"HanYi RunYuan W"', 'serif'],
        'kai': ['"KaiTi"', 'serif'],
        'liSu': ['"LiSu"', 'serif'],
      },
      backgroundImage: {
        'gold-cloud': "url('/images/gold-cloud.png')",
        'rice-paper-texture': "url('/images/rice-paper.png')",
      },
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
        'wax-melt': 'waxMelt 0.4s ease-out forwards',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        waxMelt: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5) translateY(10px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
