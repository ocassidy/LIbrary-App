import React from 'react';
import { shallow } from 'enzyme';
import { Register } from './Register';

describe('Register test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('#registerContainer')).toHaveLength(1);
    expect(wrapper.find('#registerForm')).toHaveLength(1);
    expect(wrapper.find('#registerUsernameInput')).toHaveLength(1);
    expect(wrapper.find('#registerFirstNameInput')).toHaveLength(1);
    expect(wrapper.find('#registerLastNameInput')).toHaveLength(1);
    expect(wrapper.find('#registerEmailInput')).toHaveLength(1);
    expect(wrapper.find('#registerPasswordInput')).toHaveLength(1);
    expect(wrapper.find('#registerRetypePasswordInput')).toHaveLength(1);
    expect(wrapper.find('#registerFormButton')).toHaveLength(1);
    expect(wrapper.find('#loginLinkTo')).toHaveLength(1);
    expect(wrapper.find('#bookLinkTo')).toHaveLength(1);
  });
  it('should register user when form is correct and register is clicked', () => {
    const props = {
      onHandleRegister: jest.fn(),
    };
    const wrapper = shallow(<Register {...props} />);
    wrapper.find('#registerUsernameInput').simulate('change', { target: { value: 'testUser' } });
    wrapper.find('#registerFirstNameInput').simulate('change', { target: { value: 'testFirstName' } });
    wrapper.find('#registerLastNameInput').simulate('change', { target: { value: 'testLastName' } });
    wrapper.find('#registerEmailInput').simulate('change', { target: { value: 'testUser@email.com' } });
    wrapper.find('#registerForm').simulate('submit');
    expect(props.onHandleRegister).toHaveBeenCalled();
  });
});
