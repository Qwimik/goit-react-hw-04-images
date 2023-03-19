export default function Button({ onClick, classname, children }) {
  return (
    <button type="button" className={classname} onClick={onClick}>
      {children}
    </button>
  );
}
