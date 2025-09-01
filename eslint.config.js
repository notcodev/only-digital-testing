import { eslint } from '@notcodev/eslint'

export default eslint({
  typescript: true,
  react: true,
  jsxA11y: true,
}).append({
  name: 'webpack/rules',
  rules: {
    'node/prefer-global/process': 'off',
  },
})
