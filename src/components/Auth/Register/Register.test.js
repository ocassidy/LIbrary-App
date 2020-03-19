import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import { Register } from './Register';
import { postRegister } from '../../../redux/actions';
import { POST_REGISTER_SUCCESS } from '../../../redux/actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Register test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('.registerUsernameInput')).to.have.lengthOf(1);
    expect(wrapper.find('.registerFirstNameInput')).to.have.lengthOf(1);
    expect(wrapper.find('.registerLastNameInput')).to.have.lengthOf(1);
    expect(wrapper.find('.registerEmailInput')).to.have.lengthOf(1);
  });
});
