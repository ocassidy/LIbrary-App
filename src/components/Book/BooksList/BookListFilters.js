import React, { forwardRef, useState } from 'react';
import {
  Button, Dropdown, FormControl,
} from 'react-bootstrap';
import './BookListFilters.css';
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BooksListFilters(props) {
  const [genreFilter, setGenreFilter] = useState('');
  const genreFilters = ['Horror', 'Action & Adventure', 'History', 'Chlidren', 'Comic', 'Drama', 'Crime', 'Fantasy', 'Fiction'];

  const mappedFilters = genreFilters.map((genre) => (
    <Dropdown.Item key={genre} eventKey="1">{genre}</Dropdown.Item>
  ));

  const GenreToggle = forwardRef(({ children, onClick }, ref) => (
    <Button
      variant="info"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FontAwesomeIcon icon={faFilter} style={{ marginRight: 10 }} />
      {children}
    </Button>
  ));

  const GenreMenu = forwardRef(
    ({
      children, style, className, 'aria-labelledby': labeledBy,
    }, ref) => (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setGenreFilter(e.target.value)}
          value={genreFilter}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) => !genreFilter || child.props.children.toLowerCase().startsWith(genreFilter),
          )}
        </ul>
      </div>
    ),
  );

  const filters = (
    <div className="filtersContainer">
      <Dropdown>
        <Dropdown.Toggle as={GenreToggle} id="dropdown-custom-components">
          Genre Filter
        </Dropdown.Toggle>

        <Dropdown.Menu as={GenreMenu}>
          {mappedFilters}
        </Dropdown.Menu>
      </Dropdown>
      {/* <Form> */}
      {/*  <Form.Check */}
      {/*    inline */}
      {/*    type="switch" */}
      {/*    id="custom-switch" */}
      {/*    label="Check this switch" */}
      {/*  /> */}
      {/*  <Form.Check */}
      {/*    inline */}
      {/*    type="switch" */}
      {/*    label="disabled switch" */}
      {/*    id="disabled-custom-switch" */}
      {/*  /> */}
      {/* </Form> */}
    </div>
  );

  return (
    <div>
      {filters}
    </div>
  );
}

export default BooksListFilters;
