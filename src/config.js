const development = {
  REACT_APP_API_URL: 'http://localhost:8080',
};

const staging = {
  REACT_APP_API_URL: 'https://staging-library-app-api.herokuapp.com/',
};

const production = {
  REACT_APP_API_URL: 'https://library-app-api.herokuapp.com/',
};

const config = () => {
  if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_ENV === 'staging') {
    return staging;
  }
  if (process.env.NODE_ENV === 'production') {
    return production;
  }
  return development;
};

export default config;
