module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/standard',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-control-statements/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'import', 'react-hooks', 'prettier', 'jsx-control-statements'],
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'object-curly-newline': 0,
    'global-require': 'off',

    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/state-in-constructor': [1, 'never'],
    'react/static-property-placement': [
      'error',
      'property assignment',
      {
        childContextTypes: 'static getter',
        contextTypes: 'static public field',
        contextType: 'static public field',
        displayName: 'static public field',
        propTypes: 'static public field',
        defaultProps: 'static public field',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/button-has-type': 0,
    'react/jsx-closing-bracket-location': [
      'error',
      {
        nonEmpty: 'after-props',
        selfClosing: 'tag-aligned',
      },
    ],

    // React-Hooks Plugin
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // React-Native Plugin
    'react-native/no-inline-styles': 'warn',
    'react/jsx-no-undef': [2, { allowGlobals: true }],
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
      },
      node: {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        paths: ['~'],
      },
    },
  },
};
