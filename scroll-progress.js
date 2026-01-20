document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("scrollProgress");
  
  if (!progressBar) return;

  function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate scroll percentage
    const scrollableHeight = documentHeight - windowHeight;
    const scrolled = scrollTop;
    const scrollPercentage = (scrolled / scrollableHeight) * 100;
    
    // Update progress bar width
    progressBar.style.width = scrollPercentage + "%";
  }

  // Update on scroll
  window.addEventListener("scroll", updateProgressBar);
  
  // Initial update
  updateProgressBar();
});
