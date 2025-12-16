document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobileNav");
  const btn = document.querySelector(".menu-btn");

  if (!menu || !btn) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  /* Swipe to close */
  let startX = 0;

  menu.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  menu.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 80) {
      menu.classList.remove("active");
    }
  });
});
const progress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + "%";
  progress.style.opacity = h.scrollTop < 50 ? "0" : "1";
}, { passive: true });
