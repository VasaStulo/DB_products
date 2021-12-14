module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 'plugin:vue/essential',
    // 'eslint:recommended',
    // '@vue/prettier',
    // 'plugin:vue/recommended'

    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false
      }
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'store', // for vuex store
          'state', // for vuex state
          'carry', // for reduce accumulators
          'acc', // for reduce accumulators
          'e' // for e.returnvalue
        ]
      }
    ]
  }
};
