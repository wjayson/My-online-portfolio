/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 根据你的项目路径调整
  ],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        notoSans: ['"Noto Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        spaceGrotesk: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


