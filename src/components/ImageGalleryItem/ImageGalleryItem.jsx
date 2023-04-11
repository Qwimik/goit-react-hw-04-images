import { useState } from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal';

export default function ImageGalleryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { webformatURL, largeImageURL, tags } = item;

  return (
    <li className="ImageGalleryItem" onClick={() => setIsModalOpen(true)}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <img src={largeImageURL} alt={tags} loading="lazy" />;
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
