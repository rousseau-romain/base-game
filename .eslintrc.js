module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true
  },
  settings: {
    ecmascript: 6,
    jsx: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true
    },
    sourceType: "module",
  },
  plugins: ["react"],
  extends: [ "airbnb" ],
  rules: {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-absolute-path": 0,
    "no-underscore-dangle": 0,
    "react/no-unescaped-entities": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/prop-types": 0,
    "func-names": 0,
    "react/no-danger": 0,
    "no-bitwise": 0,
    "indent": ["error", 2],
    "no-restricted-globals": ["isNaN"]
  },
  globals: {
    "describe": "readonly",
    "it": "readonly"
  }
};
