import Nightmare from 'nightmare';
import assert from 'assert';

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

// eslint-disable-next-line func-names
describe('Register tests', function () {
  this.timeout('60s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({ show: false });
  });

  describe('/register', () => {
    it('should load without error', (done) => {
      nightmare.goto(`${API_BASE_URL}/register`)
        .end()
        .then((result) => {
          done();
        })
        .catch((done) => {
          console.log(done);
        });
    });
    it('should be able to type without error', (done) => {
      nightmare.goto(`${API_BASE_URL}/register`)
        .end()
        .type('.registerUsernameInput', 'test')
        .type('.registerFirstNameInput', 'test first name')
        .type('.registerLastNameInput', 'test last name')
        .type('.registerEmailInput', 'testEmail@123.com')
        .type('.registerPasswordInput', 'password')
        .type('.registerRetypePasswordInput', 'password')
        .then((result) => {
          done();
        })
        .catch((done) => {
          console.log(done);
        });
    });
  });
});
