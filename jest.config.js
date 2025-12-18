module.exports = {
  preset: 'jest-expo',

  transformIgnorePatterns: [
    // Whitelist all ESM modules that need transformation
    'node_modules/(?!(jest-expo|expo|expo-modules-core|react-native|@react-native|@expo|@testing-library|react-redux|redux|@reduxjs|@react-navigation|@react-native-community|immer)/)',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
