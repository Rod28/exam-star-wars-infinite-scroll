/**
 * To review the configuration of this file, as well as add or delete properties,
 * consult the following link.
 *
 * @see https://eslint.org/docs/latest/user-guide/configuring/configuration-files
 */
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        endOfLine: 'auto' // Disabled error in windows - Delete ␍⏎eslint (prettier/prettier)
      }
    ]
  },
  ignorePatterns: ['node_modules', 'dist', '.husky']
};
