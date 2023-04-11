import PropTypes from 'prop-types';

export default function Button({ onClick, classname, children }) {
  return (
    <button type="button" className={classname} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  classname: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
