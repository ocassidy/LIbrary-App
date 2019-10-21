export let API_BASE_URL;

const apiUrlEnvCheck = () => {
  if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_ENV === 'staging') {
    return API_BASE_URL = process.env.REACT_APP_STAGING_API_URL;
  }
  else if (process.env.NODE_ENV === 'production') {
    return API_BASE_URL = process.env.REACT_APP_PROD_API_URL
  }
  else {
    return API_BASE_URL = process.env.REACT_APP_DEV_API_URL
  }
};

API_BASE_URL = apiUrlEnvCheck();

export const ACCESS_TOKEN = 'token';

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 100;

export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 32;

export const EMAIL_MAX_LENGTH = 100;

export const PASSWORD_MIN_LENGTH = 6;
