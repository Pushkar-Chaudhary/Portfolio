
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