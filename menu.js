document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("navLinks");

  // 1. TOGGLE MENU WHEN HAMBURGER IS CLICKED
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
    
    // Change icon to X (✕) or Hamburger (☰)
    if (nav.classList.contains("active")) {
      menuBtn.textContent = "✕";
    } else {
      menuBtn.textContent = "☰";
    }
  });

  // 2. HIGHLIGHT ACTIVE PAGE (Home/About/Projects/Contact)
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage || (currentPage === "" && link.getAttribute("href") === "index.html")) {
      link.classList.add("active");
    }
  });

  // 3. CLOSE MENU WHEN A LINK IS CLICKED (Mobile Experience)
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      // Only close if it is currently open (mobile view)
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuBtn.textContent = "☰"; // Reset icon to hamburger
      }
    });
  });
});