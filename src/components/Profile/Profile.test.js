import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from './Profile';

describe('Profile test', () => {
  it('should render spinner when no user data present', () => {
    const props = {
      userActiveLoansDetailsPage: { totalPages: 0 },
      userInactiveLoansDetailsPage: { totalPages: 0 },
    };
    const wrapper = shallow(<Profile {...props} />);
    expect(wrapper.find('.profileSpinner')).toHaveLength(1);
  });

  it('should render profile with user data', () => {
    const props = {
      currentUser: {
        username: 'testUser', firstName: 'test', lastName: 'user', email: 'testUser@test.com',
      },
      userActiveLoansDetailsPage: { totalPages: 0 },
      userInactiveLoansDetailsPage: { totalPages: 0 },
    };
    const wrapper = shallow(<Profile {...props} />);
    expect(wrapper.find('#profileContainer')).toHaveLength(1);
    expect(wrapper.find('#userDetailsContainer')).toHaveLength(1);
    expect(wrapper.find('#userDetailsUsername').text()).toEqual('Hi testUser');
    expect(wrapper.find('#userDetailsFirstName').text()).toEqual('Firstname: test');
    expect(wrapper.find('#userDetailsLastName').text()).toEqual('Lastname: user');
    expect(wrapper.find('#userDetailsEmail').text()).toEqual('Email: testUser@test.com');
  });
});
