// Scroll progress
window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scrollProgress").style.width = scrolled + "%";
});

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("show"));

// Avatar animation (only on index page)
const avatars = document.querySelectorAll(".avatar-container .avatar");
if(avatars.length){
  let index = 0;
  function animateAvatar() {
    avatars.forEach((img,i)=> img.style.display = i===index ? "block" : "none");
    index = (index + 1) % avatars.length;
  }
  setInterval(animateAvatar,200);
  animateAvatar();
}

// Theme toggle
const themeBtn = document.getElementById("themeBtn");
themeBtn?.addEventListener("click", ()=>{
  document.body.classList.toggle("light-theme");
  document.body.classList.toggle("dark-theme");
});