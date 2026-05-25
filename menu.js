document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("navLinks");

  // Create and append overlay once
  const overlay = document.createElement("div");
  overlay.id = "sidebarOverlay";
  document.body.appendChild(overlay);

  function openMenu() {
    nav.classList.add("active");
    overlay.style.display = "block";
    overlay.style.pointerEvents = "auto";
    menuBtn.querySelector("i").classList.replace("fa-bars", "fa-xmark");
  }

  function closeMenu() {
    nav.classList.remove("active");
    overlay.style.display = "none";
    overlay.style.pointerEvents = "none";
    menuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
  }

  menuBtn.addEventListener("click", () => {
    nav.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });

  // Highlight active page
  const page = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});