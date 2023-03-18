import { Component } from 'react';

import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { item } = this.props;

    return (
      <li key={item.id} className="ImageGalleryItem" onClick={this.openModal}>
        <img
          src={item.webformatURL}
          alt={item.tags}
          className="ImageGalleryItem-image"
        />
        {this.state.isModalOpen && (
          <Modal onClose={this.closeModal}>
            <img src={item.largeImageURL} alt={item.tags} loading="lazy" />;
          </Modal>
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
