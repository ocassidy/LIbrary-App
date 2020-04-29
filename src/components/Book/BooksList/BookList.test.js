import React from 'react';
import { shallow } from 'enzyme';
import { BooksList } from './BooksList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: null,
  }),
}));

describe('BookPage test', () => {
  it('should render alternative text when no book present in props', () => {
    const wrapper = shallow(<BooksList />);
    expect(wrapper.find('#bookListContainer')).toHaveLength(1);
    expect(wrapper.find('#noBooksFound')).toHaveLength(1);
  });
});
