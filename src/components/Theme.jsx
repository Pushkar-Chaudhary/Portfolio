function ThemeToggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="theme-toggle-btn"
      aria-label={checked ? "Switch to light theme" : "Switch to dark theme"}
      title={checked ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {checked ? "🌙" : "🌞"}
      </span>
    </button>
  );
}

export default ThemeToggle;