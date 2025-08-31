/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    // https://github.com/jestjs/jest/tree/main/packages/babel-jest#setup
    '^.+\\.(t|j)sx?$': ['babel-jest', { "extends": "./test-babel.config.js" }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!gsap)/',
    'subProjects/'
  ],
  testPathIgnorePatterns: [
    '/subProjects/',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'test-tsconfig.json',
      babelConfig: 'test-babel.config.js'
    }
  },
  babelConfig: 'test-babel.config.js'
};