document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

    const icon = menuBtn.querySelector(".menu-icon");
    icon.textContent = nav.classList.contains("active") ? "✕" : "☰";
  });

  // Close menu on link click (mobile)
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.querySelector(".menu-icon").textContent = "☰";
    });
  });

  // Highlight active page
  const currentPage = window.location.pathname.split("/").pop().replace(".html","");
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".profile-section").classList.add("show");
});
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });
});
