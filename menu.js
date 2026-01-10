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
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navLinks");
const navHr = document.querySelector(".nav-hr");

// Toggle mobile dropdown
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.textContent = nav.classList.contains("active") ? "✕ Menu" : "☰ Menu";
});

// Close menu when clicking a link (on mobile)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if(window.innerWidth <= 767) {
      nav.classList.remove("active");
      menuBtn.textContent = "☰ Menu";
    }
  });
});

// Highlight current page
const currentPage = window.location.pathname.split("/").pop().split(".")[0];
document.querySelectorAll(".nav-link").forEach(link => {
  if(link.dataset.page === currentPage) link.classList.add("active");
});
