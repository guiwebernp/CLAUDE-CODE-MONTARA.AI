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

// Smooth scroll for navbar logo
document.querySelector('.navbar__logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Counter animation
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30;
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 30);
}

// Trigger counter animation when hero stats are visible
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate counters
      const counters = entry.target.querySelectorAll('.count');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!counter.dataset.animated) {
          animateCounter(counter, target);
          counter.dataset.animated = 'true';
        }
      });

      // Fade in elements with data-reveal
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe hero stats
const heroStats = document.querySelector('.hero__stats');
if (heroStats) {
  observer.observe(heroStats);
}

// Observe elements with data-reveal
document.querySelectorAll('[data-reveal]').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.animationDelay = `${index * 0.1}s`;
  observer.observe(el);
});

// Pathology filter
const filterButtons = document.querySelectorAll('.filter-btn');
const pathologyCards = document.querySelectorAll('.pathology-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    // Filter cards
    pathologyCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Intersection Observer for fade-in animations on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

// Observe all elements with data-reveal
document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});
