// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const navbarToggle = document.querySelector('.navbar__toggle');
const navbarMenu = document.querySelector('.navbar__menu');
const navbarLinks = document.querySelectorAll('.navbar__link, .navbar__cta');

if (navbarToggle) {
  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });
}

// Scroll reveal — staggered per parent
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('[data-reveal]').forEach((el) => {
  const parent = el.parentElement;
  const siblings = parent
    ? Array.from(parent.children).filter(c => c.hasAttribute('data-reveal'))
    : [el];
  const index = siblings.indexOf(el);
  el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 0.08}s`);
  revealObserver.observe(el);
});

// Hero glow segue o cursor
const hero = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero__glow');
if (hero && heroGlow && window.matchMedia('(hover: hover)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    heroGlow.style.transform = `translate(calc(-50% + ${relX * 60}px), ${relY * 40}px)`;
  });
  hero.addEventListener('mouseleave', () => {
    heroGlow.style.transform = 'translate(-50%, 0)';
  });
}

// Tilt 3D nos cards ao passar o mouse
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.pillar, .portfolio-card, .highlight').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${relY * -6}deg) rotateY(${relX * 6}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
