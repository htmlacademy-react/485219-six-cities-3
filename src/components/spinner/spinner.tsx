import './css/spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="spinner-text">Loading offers...</p>
      </div>
    </div>
  );
}

export { Spinner };
