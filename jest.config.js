module.exports = {
  // For having the __mocks__ dir in src
  roots: ["<rootDir>/src/"],
  // Because we use typescript
  preset: "ts-jest",
  // Our environment needs window
  // testEnvironment: "jsdom",
  // setupFilesAfterEnv: ["<rootDir>/src/setup-tests.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.storage/",
    "/.history/",
    "/cypress/",
  ],
  // Jest by default expect stuff in node_modules to be compiled
  // https://github.com/kulshekhar/ts-jest/issues/881
  transformIgnorePatterns: ["/node_modules/(?!@juegodynamics/)"],
  globals: {
    "ts-jest": {
      // Needed for docker tests not to fail
      // https://github.com/kulshekhar/ts-jest/issues/805
      isolatedModules: true,
    },
  },
  // Otherwise importing css and other files will fail
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.ts",
    "\\.(css|scss|less)$": "<rootDir>/src/__mocks__/styleMock.ts",
  },
  moduleDirectories: ["node_modules", "src"],
};
