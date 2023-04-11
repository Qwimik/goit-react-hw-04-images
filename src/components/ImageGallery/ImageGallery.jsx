import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ items, searchValue, status }) {
  return (
    <ul className="ImageGallery">
      {items.map(item => (
        <ImageGalleryItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
