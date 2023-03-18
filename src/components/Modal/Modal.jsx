import { Component } from 'react';
import { createPortal } from 'react-dom';

const rootModal = document.querySelector('#root-modal');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    document
      .querySelector('.Overlay')
      .addEventListener('click', this.onBackdropClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    document
      .querySelector('.Overlay')
      .removeEventListener('click', this.onBackdropClick);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay">
        <div className="Modal">{this.props.children}</div>
      </div>,
      rootModal
    );
  }
}
