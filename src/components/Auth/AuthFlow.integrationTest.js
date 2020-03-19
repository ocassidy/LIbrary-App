const path = require('path');

const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

const apiUrlEnvCheck = () => {
  let tempUrl;
  if (process.env.REACT_APP_ENV === 'development') {
    tempUrl = 'http://localhost:3000';
  } else if (process.env.REACT_APP_ENV === 'integration') {
    tempUrl = 'https://integration-library-app.herokuapp.com/';
  }
  return tempUrl;
};

const API_BASE_URL = apiUrlEnvCheck();

console.log('API_BASE_URL', API_BASE_URL);

Feature('Auth flow');
Scenario('Register/Login/Logout flow', (I) => {
  const username = `test${Math.random().toFixed(3)}`;
  I.amOnPage(`${API_BASE_URL}/register`);
  I.see('Register');
  I.fillField('.registerUsernameInput', username);
  I.fillField('.registerFirstNameInput', 'testFirst name');
  I.fillField('.registerLastNameInput', 'testLast name');
  I.fillField('.registerEmailInput', `${username}@test.com`);
  I.fillField('.registerPasswordInput', 'password');
  I.fillField('.registerRetypePasswordInput', 'password');
  I.click('Register');
  I.see('Login');
  I.amOnPage(`${API_BASE_URL}/login`);
  I.see('Login');
  I.fillField('.loginUsernameInput', username);
  I.fillField('.loginPasswordInput', 'password');
  I.click('Log In');
  I.see(`Hi ${username}`);
  I.see('Logout');
  I.wait(5);
  I.click('Logout');
  I.see('Login');
});
