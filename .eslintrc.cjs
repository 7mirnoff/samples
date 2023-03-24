module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        "no-console": 0,
        'react/react-in-jsx-scope': 0,
        'react/function-component-definition': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'no-plusplus': 0,
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
        "no-param-reassign": ["error", { "props": false }]
    },
};