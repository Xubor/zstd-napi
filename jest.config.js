const { createDefaultPreset } = require('ts-jest');
module.exports = {
  ...createDefaultPreset(),
  collectCoverageFrom: ['scBinding.js', 'lib/**/*.{js,ts}'],
  testMatch: ['**/tests/**/*.ts'],
};
