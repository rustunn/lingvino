module.exports = {
  root: true,
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "google": true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': 0,
    'no-mixed-operators': 0,
    'arrow-parens': ["error", "as-needed"],
    'no-plusplus': 0,
    'no-useless-escape': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
  }
}
