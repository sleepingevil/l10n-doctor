module.exports = {
  roots: ["<rootDir>/src"],

  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  moduleFileExtensions: ["ts", "js", "json", "node"],

  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.js',
    '!src/**/*.d.ts',
    '!src/testUtils/**/*.ts',
    '!src/testUtils/**/*.tsx'
  ],

  globals: {
    L10NDR_URL: 'https://test.url'
  },

  clearMocks: true,

  reporters: [
    'default'
  ]
};