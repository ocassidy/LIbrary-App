const { setHeadlessWhen } = require('@codeceptjs/configure');

const apiUrlEnvCheck = () => {
  console.log(process.env.REACT_APP_ENV)
  let tempUrl;
  if (process.env.REACT_APP_ENV === 'development') {
    tempUrl = 'http://localhost:3000';
  } else if (process.env.REACT_APP_ENV === 'integration') {
    tempUrl = 'https://integration-library-app.herokuapp.com';
  }
  return tempUrl;
};

const API_BASE_URL = apiUrlEnvCheck();

setHeadlessWhen(process.env.REACT_APP_ENV !== 'development');
console.log(setHeadlessWhen)

exports.config = {
  tests: 'src/**/*.integrationTest.js',
  output: './output',
  helpers: {
    Nightmare: {
      url: API_BASE_URL,
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
