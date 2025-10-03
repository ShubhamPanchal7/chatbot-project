import './ToggleButton.css';

export function ToggleButton({ position, setPosition }) {
  const label =
    position === "top" ? "Move chatInput bottom" : "Move chatInput top";
  const placeClass =
    position === "top" ? "toggle-btn bottom" : "toggle-btn top";
  return (
    <button
      className={placeClass}
      onClick={() => setPosition(position === "top" ? "bottom" : "top")}
    >
      {label}
    </button>
  );
}