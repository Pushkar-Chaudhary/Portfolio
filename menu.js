document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("navLinks");
  const checkbox = document.getElementById("menuCheckbox");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

    // toggle checkbox so SVG animation works
    checkbox.checked = nav.classList.contains("active");
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      checkbox.checked = false;
    });
  });
});