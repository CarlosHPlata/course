/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: "src",
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@test/(.*)": "<rootDir>/../test/$1",
  },
};
