import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const rootModal = document.querySelector('#root-modal');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const overlay = document.querySelector('.Overlay');

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

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      overlay.removeEventListener('click', onBackdropClick);
    };
  }, [onClose]);

  return createPortal(
    <div className="Overlay">
      <div className="Modal">{children}</div>
    </div>,
    rootModal
  );
}
