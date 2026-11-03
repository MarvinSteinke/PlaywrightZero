import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                projectService: true
            }
        },
        rules: {
            // Code quality
            'no-console': 'warn',
            'no-debugger': 'error',

            // TypeScript
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-floating-promises': 'error',

            // General
            'eqeqeq': 'error',
            'no-var': 'error',
            'prefer-const': 'error'
        }
    }
);