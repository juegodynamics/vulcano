module.exports = {
  env: {
    node: true,
    jest: true,
  },
  plugins: ['import', 'react-hooks', 'prettier'],
  ignorePatterns: ['src/ui/_dist'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:import/typescript',
  ],
  globals: {
    Promise: 'writable',
    Set: 'writable',
    window: 'writable',
    document: 'writable',
    Event: 'writable',
  },
  settings: {
    'import/internal-regex': '^src/',
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/newline-after-import': 'error',
    // 'sort-imports': '[
    //   'error',
    //   {
    //     ignoreCase: false,
    //     ignoreDeclarationSort: false,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    //     allowSeparatedGroups: false,
    //   },
    // ]',
    '@typescript-eslint/interface-name-prefix': 'off',
    'jest/no-mocks-import': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'prettier/prettier': 'error',
    'no-shadow': 'error',
    'object-shorthand': ['error', 'properties'],
  },
};
