const config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      babel: true,
      tsconfig: 'tsconfig.json'
    }]
  },
  moduleNameMapper: {
    '@external/(.*)': '<rootDir>/src/external/repositories/$1',
    '@http/(.*)': '<rootDir>/src/http/model/$1',
    '@testMocks/(.*)': '<rootDir>/test/mocks/$1',
    '@framework/(.*)': '<rootDir>/test/integration/framework/$1'
  }
}

module.exports = config
