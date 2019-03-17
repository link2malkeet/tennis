module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
  ],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|js)x?$'
};
