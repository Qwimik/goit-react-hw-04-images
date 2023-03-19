import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let searchText = '';

export default function Searchbar({ onSubmit, totalImgs, status }) {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (search === '') {
      toast.error('Please enter your request!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    onSubmit(search);
    searchText = search;
    setSearch('');
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
      {totalImgs !== 0 && (
        <div className="result_text-container">
          <p className="result_text">
            {totalImgs} pictures were found on the{' '}
            <span>"{searchText ? searchText : 'random'}"</span> request.
          </p>
        </div>
      )}
      {status === 'pending' && (
        <div className="loading">
          <RotatingLines
            strokeColor="#fff"
            strokeWidth="3"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        </div>
      )}
      <ToastContainer />
    </header>
  );
}
