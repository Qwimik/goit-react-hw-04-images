import ImageGalleryItem from 'components/ImageGalleryItem';
import { InfinitySpin } from 'react-loader-spinner';

const ImageGallery = ({ items, searchValue, status }) => {
  //'idle'
  if (status === 'idle') {
    return <p className="start-text">Please enter your request :)</p>;
  }

  //'pending'
  if (status === 'pending') {
    return (
      <div className="loading">
        <InfinitySpin width="200" color="#3f51b5" />
      </div>
    );
  }

  //'rejected'
  if (status === 'rejected') {
    return (
      <p className="start-text">
        Sorry, no result at your request "{searchValue}" :(
      </p>
    );
  }

  //'resolved'
  if (status === 'resolved') {
    return (
      <ul className="ImageGallery">
        {items.map(item => (
          <ImageGalleryItem item={item} key={item.id} />
        ))}
      </ul>
    );
  }
};

export default ImageGallery;
