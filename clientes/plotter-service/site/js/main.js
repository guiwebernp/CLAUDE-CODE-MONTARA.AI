// Smooth scroll for navbar logo
document.querySelector('.navbar__logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu toggle (optional enhancement)
const navbar = document.querySelector('.navbar');
const links = document.querySelectorAll('.navbar__link, .navbar__cta');

links.forEach(link => {
  link.addEventListener('click', () => {
    // Add any mobile-specific behavior here
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
