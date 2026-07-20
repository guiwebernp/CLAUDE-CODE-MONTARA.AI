// Hero interactive drops
const hero = document.querySelector('.hero__bg');
const drops = document.querySelectorAll('.drop');

if (hero && drops.length > 0) {
  document.addEventListener('mousemove', (e) => {
    const heroRect = hero.getBoundingClientRect();

    // Only apply effect if mouse is over hero
    if (e.clientY > heroRect.top && e.clientY < heroRect.bottom) {
      const x = (e.clientX - heroRect.left) / heroRect.width;
      const y = (e.clientY - heroRect.top) / heroRect.height;

      drops.forEach((drop, index) => {
        const speed = (index + 1) * 15;
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;

        drop.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    }
  });

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    drops.forEach(drop => {
      drop.style.transform = 'translate(0, 0)';
    });
  });
}

// Smooth scroll for navbar logo
document.querySelector('.navbar__logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu toggle
const navbarToggle = document.querySelector('.navbar__toggle');
const navbarMenu = document.querySelector('.navbar__menu');
const navbarLinks = document.querySelectorAll('.navbar__link, .navbar__cta');

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

// Intersection Observer for fade-in animations (optional)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});
