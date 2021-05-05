module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      consilio: {
        100: '#d3faeb',
        200: '#8cf5d0',
        300: '#00f1b4',
        400: '#00ed91',
        500: '#00e35f',
        600: '#00cf55',
        700: '#00b54a',
        800: '#00983c',
        900: '#00772d',
      },
    },
  },
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      'content/**/*.md',
    ],
  },
}
