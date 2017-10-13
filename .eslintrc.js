module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
};
