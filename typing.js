const roles = [
  "Frontend Developer",
  "UI Designer",
  "Mobile App Developer"
];

const typingElement = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingElement.textContent =
      currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typingElement.textContent =
      currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();