const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  daisyui: {
    themes: [
      {
        docker: {
          primary: '#2496ED', // Docker 的主色调
          'primary-content': '#FFFFFF', // 主色调的文字颜色，使用白色以确保可读性
          secondary: '#4D4D4D', // 次要色调，使用一种中性的灰色
          'secondary-content': '#FFFFFF', // 次要色调的文字颜色，使用白色以确保可读性
          accent: '#0DB7ED', // 强调色，使用一种较浅的蓝色，用于强调和操作提示
          'accent-content': '#FFFFFF', // 强调色的文字颜色，使用白色以确保可读性
          neutral: '#F5F5F5', // 中性色，使用一种非常淡的灰色，用于背景和空白区域
          'neutral-content': '#4D4D4D', // 中性色的文字颜色，使用一种深灰色以确保可读性
          'base-100': '#F5F5F5', // 基础色，用于背景和空白区域
          'base-200': '#E0E0E0', // 基础色，用于边框和分隔线
          'base-300': '#BDBDBD', // 基础色，用于边框和分隔线
          'base-content': '#4D4D4D', // 基础色的文字颜色，使用一种深灰色以确保可读性
          info: '#0DB7ED', // 信息色，使用一种清新的蓝色，用于信息提示
          'info-content': '#FFFFFF', // 信息色的文字颜色，使用白色以确保可读性
          success: '#00C851', // 成功色，使用一种鲜明的绿色，用于成功提示
          'success-content': '#FFFFFF', // 成功色的文字颜色，使用白色以确保可读性
          warning: '#FFBB33', // 警告色，使用一种醒目的黄色，用于警告提示
          'warning-content': '#4D4D4D', // 警告色的文字颜色，使用一种深灰色以确保可读性
          error: '#FF4444', // 错误色，使用一种醒目的红色，用于错误提示
          'error-content': '#FFFFFF', // 错误色的文字颜色，使用白色以确保可读性
        },
      },
      'light',
      'dark',
      'cupcake',
    ],
  },
  // daisyui: {
  //   themes: ['light', 'dark', 'cupcake'],
  // },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
