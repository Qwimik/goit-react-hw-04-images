import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ items, searchValue, status }) {
  //'idle'
  if (status === 'idle') {
    return <p className="start-text">Please enter your request :)</p>;
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
  return (
    <ul className="ImageGallery">
      {items.map(item => (
        <ImageGalleryItem item={item} key={item.id} />
      ))}
    </ul>
  );
}
