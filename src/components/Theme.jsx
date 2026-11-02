import { FaMoon } from "react-icons/fa";

function ThemeToggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="theme-toggle-btn"
      aria-label={checked ? "Switch to light theme" : "Switch to dark theme"}
      title={checked ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="theme-toggle-icon">
        {checked ? (
          <span aria-hidden="true">☀️</span>
        ) : (
          <FaMoon aria-hidden="true" />
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;