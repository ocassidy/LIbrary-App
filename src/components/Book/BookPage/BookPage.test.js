import React from 'react';
import { shallow } from 'enzyme';
import BookPage from './BookPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: null,
  }),
}));

describe('BookPage test', () => {
  it('should render alternative text when no book present in props', () => {
    const wrapper = shallow(<BookPage />);
    expect(wrapper.find('#bookNotFoundText')).toHaveLength(1);
    expect(wrapper.find('#bookNotFoundText').text()).toEqual('Book details not found, please try again.');
  });
});
