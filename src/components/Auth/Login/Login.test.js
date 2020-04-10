import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './Login';

describe('Login test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('.loginForm')).toHaveLength(1);
    expect(wrapper.find('.loginUsernameInput')).toHaveLength(1);
    expect(wrapper.find('.loginPasswordInput')).toHaveLength(1);
    expect(wrapper.find('.loginButton')).toHaveLength(1);
    expect(wrapper.find('.loginLinkTo')).toHaveLength(2);
  });
  it('should login user when form is correct and log in is clicked', () => {
    const props = {
      onHandleLogin: jest.fn(),
    };
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('.loginUsernameInput').simulate('change', { target: { value: 'testUser' } });
    wrapper.find('.loginPasswordInput').simulate('change', { target: { value: 'testFirstName' } });
    wrapper.find('.loginForm').simulate('submit');
    expect(props.onHandleLogin).toHaveBeenCalled();
  });
});
