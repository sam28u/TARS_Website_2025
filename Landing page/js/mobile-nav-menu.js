const hamburger = document.getElementById('nav-menu');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('.show');
});