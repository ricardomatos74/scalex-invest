module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  clearMocks: true,
   maxWorkers: 1,
 verbose: true,
};
