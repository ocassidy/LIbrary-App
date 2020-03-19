exports.config = {
  tests: 'src/**/*.integrationTest.js',
  output: './output',
  helpers: {
    Nightmare: {
      url: 'http://localhost:3000',
      show: true,
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: true,
  mocha: {},
  name: 'library-app',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
