import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from './Profile';

describe('Profile test', () => {
  it('should render spinner with no user data', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.find('.profileSpinner')).toHaveLength(1);
  });
  it('should render profile with user data', () => {
    const props = {
      currentUser: { username: 'testUser' },
    };
    const wrapper = shallow(<Profile {...props} />);
    expect(wrapper.find('.profileContainer')).toHaveLength(1);
    expect(wrapper.find('.nameContainer')).toHaveLength(1);
    expect(wrapper.find('.nameContainer').text()).toEqual('Hi testUser');
  });
});
