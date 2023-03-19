import { useState } from 'react';

import Modal from 'components/Modal';

export default function ImageGalleryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id, webformatURL, largeImageURL, tags } = item;

  return (
    <li
      key={id}
      className="ImageGalleryItem"
      onClick={() => setIsModalOpen(true)}
    >
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
