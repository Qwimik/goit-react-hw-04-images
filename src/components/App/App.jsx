import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

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
  const scrollTo = useRef(null);

  useEffect(() => {
    if (!searchValue) return;

    const fetch = async () => {
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

  useEffect(() => {
    if (scrollTo.current) {
      scrollTo.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [gallery]);

  const handleSubmit = value => {
    setStatus('pending');
    setGallery([]);
    setTotalImgs(0);
    setSearchValue(value);
    setPage(1);
  };

  const onLoadMore = async () => {
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
      <ImageGallery items={gallery} status={status} searchValue={searchValue} />
      <div ref={scrollTo} />
      {gallery.length !== 0 && totalImgs > 12 && gallery.length < totalImgs && (
        <Button onClick={onLoadMore} classname={'Button'}>
          Load More
        </Button>
      )}
    </div>
  );
}

App.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  searchValue: PropTypes.string,
  page: PropTypes.number,
  totalImgs: PropTypes.number,
  status: PropTypes.string,
};
