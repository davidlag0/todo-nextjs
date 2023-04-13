const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "<rootDir>/lib/prismaMockSingleton.js",
  ],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^jose$": require.resolve("jose"),
    "^@panva/hkdf$": require.resolve("@panva/hkdf"),
    "^uuid$": require.resolve("uuid"),
    "^preact-render-to-string$": require.resolve("preact-render-to-string"),
    "^preact$": require.resolve("preact"),
  },
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
