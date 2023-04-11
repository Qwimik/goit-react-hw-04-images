import { useState } from 'react';

import PropTypes from 'prop-types';

import { AiOutlineSearch } from 'react-icons/ai';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" autoComplete="off" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">
            <AiOutlineSearch />
          </span>
        </button>
        <input
          name="search"
          className="SearchForm-input"
          type="text"
          placeholder="Search images and photos"
          autoFocus
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
