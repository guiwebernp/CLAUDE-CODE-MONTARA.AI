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
const navbarLogo = document.querySelector('.navbar__logo');
if (navbarLogo) {
  navbarLogo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

// Trigger counter animation when hero stats become visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.count');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (!counter.dataset.animated) {
          animateCounter(counter, target);
          counter.dataset.animated = 'true';
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// Scroll reveal — single source of truth, staggered per parent (not per whole page)
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

// Pathology filter
const filterButtons = document.querySelectorAll('.filter-btn');
const pathologyCards = document.querySelectorAll('.pathology-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    pathologyCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const matches = filter === 'all' || category === filter;
      card.style.display = matches ? 'flex' : 'none';
      if (matches) {
        card.classList.remove('is-visible');
        // Force reflow so the transition replays on re-filter
        void card.offsetWidth;
        card.classList.add('is-visible');
      }
    });
  });
});

// Hero 3D accent — subtle drifting particle field (three.js)
(function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero || typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 900) return;

  let width = hero.clientWidth;
  let height = hero.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.z = 22;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);

  // Particle field: slow, upward drift suggesting movement and recovery
  const count = 220;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 36;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    speeds[i] = 0.004 + Math.random() * 0.008;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xF04E4E,
    size: 0.12,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });

  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);

    const pos = geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 11) pos[i * 3 + 1] = -11;
    }
    geometry.attributes.position.needsUpdate = true;

    points.rotation.y += 0.0007;
    camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 1.4 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (window.innerWidth < 900) {
      cancelAnimationFrame(frameId);
      canvas.style.display = 'none';
      return;
    }
    width = hero.clientWidth;
    height = hero.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();
