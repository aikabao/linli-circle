/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cinnabar': '#C92E20',     // 朱红
        'rice-paper': '#F9F8F6',   // 宣纸白
        'ink': '#1A1A1A',          // 墨色
        'deep-red': '#A61B1A',     // 深朱红
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
