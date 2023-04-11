import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

const rootModal = document.querySelector('#root-modal');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const overlay = document.querySelector('.Overlay');
    const htmlEl = document.querySelector('html');

    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    const onBackdropClick = e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    overlay.addEventListener('click', onBackdropClick);
    htmlEl.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      overlay.removeEventListener('click', onBackdropClick);
      htmlEl.style.overflow = 'visible';
    };
  }, [onClose]);

  return createPortal(
    <div className="Overlay">
      <div className="Modal">{children}</div>
    </div>,
    rootModal
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
