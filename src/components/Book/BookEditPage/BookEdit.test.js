import React from 'react';
import { shallow } from 'enzyme';
import BookEditPage from './BookEdit';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: null,
  }),
}));

describe('BookEditPage test', () => {
  it('should render alternative text when no book present in props', () => {
    const wrapper = shallow(<BookEditPage />);
    expect(wrapper.find('#noBookTextContainer')).toHaveLength(1);
    expect(wrapper.find('#noBookTextContainer').text()).toEqual('Book details not found, please try again.');
  });
});
