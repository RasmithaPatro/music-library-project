  module.exports = {
      testEnvironment: "jest-environment-jsdom", // Ensure jsdom environment is used for React testing
      transform: {
        "^.+\\.jsx?$": "babel-jest", // Ensure Babel transforms JSX files
      },
      moduleFileExtensions: ["js", "jsx"], // Ensures Jest understands .js and .jsx files
      testMatch: [
        "**/src/**/*.test.js",  // Matches all test files with .test.js suffix in the src folder
        "**/src/**/*.test.jsx", // Matches all test files with .test.jsx suffix in the src folder
      ],
      setupFilesAfterEnv: ["@testing-library/jest-dom","<rootDir>/jest.setup.js"], // Extends Jest with jest-dom for better assertions
      collectCoverage: true, // Enable code coverage
      coverageThreshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
      moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy" // Mock CSS imports
      },
    };
    