// Menu mobile
const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navbar__menu');

toggle.addEventListener('click', () => menu.classList.toggle('is-open'));
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('is-open'));
});

// Navbar sólida ao rolar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(11,13,15,0.92)'
    : 'linear-gradient(to bottom, rgba(11,13,15,0.75), transparent)';
}, { passive: true });

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Contador animado
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count').forEach(el => counterObserver.observe(el));

// Explorador interativo da frota
const explorerItems = document.querySelectorAll('.explorer__list li');
const explorerImgs = document.querySelectorAll('.explorer__img');
const explorerTag = document.getElementById('explorerTag');

function setActiveModel(id) {
  explorerItems.forEach(li => li.classList.toggle('is-active', li.dataset.id === id));
  explorerImgs.forEach(img => img.classList.toggle('is-active', img.dataset.id === id));
  const active = document.querySelector(`.explorer__list li[data-id="${id}"]`);
  if (active) explorerTag.textContent = active.querySelector('.explorer__sub').textContent;
}

explorerItems.forEach(li => {
  li.addEventListener('mouseenter', () => setActiveModel(li.dataset.id));
  li.addEventListener('click', () => setActiveModel(li.dataset.id));
});

// Cursor customizado "Ver" sobre imagens interativas
const cursorTag = document.getElementById('cursorTag');
const hoverTargets = document.querySelectorAll('.explorer__visual, .linha-destaque__imagem');

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorTag.style.left = e.clientX + 'px';
    cursorTag.style.top = e.clientY + 'px';
  });

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorTag.classList.add('is-visible'));
    el.addEventListener('mouseleave', () => cursorTag.classList.remove('is-visible'));
  });
}

// Parallax leve na seção de experiência
const experienciaImg = document.getElementById('experienciaImg');

window.addEventListener('scroll', () => {
  const expoRect = experienciaImg?.parentElement.getBoundingClientRect();
  if (experienciaImg && expoRect && expoRect.top < window.innerHeight && expoRect.bottom > 0) {
    const offset = (expoRect.top - window.innerHeight) * 0.15;
    experienciaImg.style.transform = `translateY(${offset}px) scale(1.15)`;
  }
}, { passive: true });
