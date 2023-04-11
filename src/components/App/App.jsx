import { useState, useEffect } from 'react';

import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import * as API from 'services/api';

const API_KEY = '33614277-14313d1389d57b7e80a4c1e60';

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalImgs, setTotalImgs] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchValue) return;

    const fetch = async () => {
      setStatus('pending');

      try {
        const res = await API.searchImgs(searchValue, API_KEY, page);
        if (res.totalHits === 0) {
          setStatus('rejected');
          return;
        }
        setGallery(s => [...s, ...res.hits]);
        setTotalImgs(res.total);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    };

    fetch();
  }, [searchValue, page]);

  const handleSubmit = value => {
    if (value === '') {
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
    setTotalImgs(0);
    setGallery([]);
    setSearchValue(value);
    setPage(1);
  };

  const onLoadMore = () => {
    setStatus('pending');
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar
        onSubmit={handleSubmit}
        totalImgs={totalImgs}
        status={status}
      />
      {status === 'idle' && (
        <p className="start-text">Please enter your request</p>
      )}
      {status === 'rejected' && (
        <p className="start-text">
          Sorry, no result at your request "{searchValue}" :(
        </p>
      )}
      <ImageGallery items={gallery} status={status} searchValue={searchValue} />
      {gallery.length !== 0 && totalImgs > 12 && gallery.length < totalImgs && (
        <Button onClick={onLoadMore} classname={'Button'}>
          Load More
        </Button>
      )}
      <div className="loading">
        <RotatingLines
          strokeColor="#242424"
          strokeWidth="3"
          animationDuration="0.75"
          width="40"
          visible={status === 'pending'}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
