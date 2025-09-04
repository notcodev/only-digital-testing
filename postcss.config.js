/**
 * @type {import('postcss-load-config').Config}
 */
const postcssConfig = {
  plugins: {
    autoprefixer: {},
    'postcss-simple-vars': {
      variables: {
        'breakpoint-xs': '40em',
        'breakpoint-sm': '48em',
        'breakpoint-md': '64em',
        'breakpoint-lg': '80em',
        'breakpoint-xl': '96em',
      },
    },
  },
}

export default postcssConfig
