const hamburger = document.getElementById('nav-menu');
const nav       = document.getElementById('nav');
const blurSvg   = document.getElementById('mobile-blur-shape');

function closeMenu() {
  nav.classList.remove('show');
  blurSvg.classList.remove('show');
  hamburger.textContent = '☰';
}

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('show');
  blurSvg.classList.toggle('show', isOpen);
  hamburger.textContent = isOpen ? '✕' : '☰';
});

// Auto‑close if you resize in or out of mobile
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 || window.innerWidth <= 768) {
    // On *any* resize, close it. Or guard:
    // if (window.innerWidth > 768) closeMenu();
    closeMenu();
  }
});
