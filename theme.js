// 1. IMMEDIATE THEME SETUP (Prevents FOUC)
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Add preload class to disable transitions initially
    document.documentElement.classList.add('preload');
})();

// 2. UI & EVENT LISTENERS (Runs after DOM is ready)
document.addEventListener('DOMContentLoaded', () => {
    // Remove preload class to enable transitions after a slight delay
    setTimeout(() => {
        document.documentElement.classList.remove('preload');
    }, 100);

    const themeToggleParam = document.createElement('div');
    themeToggleParam.className = 'theme-switch-wrapper';

    // Determine initial icon based on current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const initialIconClass = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

    themeToggleParam.innerHTML = `
    <button id="themeToggle" class="theme-btn" aria-label="Toggle Theme">
      <i class="${initialIconClass}"></i>
    </button>
  `;

    // Insert button into the top bar (before the mobile menu button)
    const topBar = document.querySelector('.top-bar');
    const menuBtn = document.getElementById('menuBtn');
    if (topBar && menuBtn) {
        topBar.insertBefore(themeToggleParam, menuBtn);
    } else if (topBar) {
        topBar.appendChild(themeToggleParam);
    }

    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return; // Guard clause

    const icon = toggleBtn.querySelector('i');

    // Toggle Logic
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update Icon
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

        // Animate button
        toggleBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            toggleBtn.style.transform = 'rotate(0deg)';
        }, 300);
    });
});
