exports.config = {
  tests: 'src/**/*.integrationTest.js',
  output: './output',
  helpers: {
    Nightmare: {
      url: 'http://localhost:3000',
      show: false,
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: false,
  mocha: {},
  name: 'library-app',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: false,
    },
  },
};
