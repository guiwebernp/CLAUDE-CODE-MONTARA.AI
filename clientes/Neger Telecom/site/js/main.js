const navToggle = document.getElementById('nav-toggle');
const navLinksMobile = document.getElementById('nav-links-mobile');

navToggle.addEventListener('click', () => {
  const isOpen = navLinksMobile.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinksMobile.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksMobile.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
