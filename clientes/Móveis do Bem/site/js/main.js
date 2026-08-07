// Menu mobile
const toggle = document.querySelector('.header__toggle');
const nav = document.querySelector('.header__nav');
toggle?.addEventListener('click', () => nav.classList.toggle('is-open'));

// Scroll reveal
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

// Crossfade de vídeo no hero
const videoA = document.getElementById('heroVideoA');
const videoB = document.getElementById('heroVideoB');

if (videoA && videoB) {
  let active = videoA;
  let idle = videoB;
  active.play();

  setInterval(() => {
    if (active.duration && active.duration - active.currentTime <= 1.4) {
      idle.currentTime = 0;
      idle.play();
      idle.classList.add('is-active');
      active.classList.remove('is-active');
      const finished = active;
      [active, idle] = [idle, finished];
      setTimeout(() => finished.pause(), 1400);
    }
  }, 150);
}

// Folhas caindo
const leavesContainer = document.getElementById('leaves');
if (leavesContainer) {
  for (let i = 0; i < 10; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.textContent = '🍃';
    leaf.style.left = `${i * 9.5 + 2}%`;
    leaf.style.fontSize = `${14 + (i % 4) * 5}px`;
    leaf.style.color = i % 2 === 0 ? '#7a9c7f' : '#a3541e';
    const dur = `${10 + (i % 5) * 2.4}s`;
    const swayDur = `${3 + (i % 3)}s`;
    leaf.style.animation = `leafFall ${dur} linear infinite, leafSway ${swayDur} ease-in-out infinite`;
    leaf.style.animationDelay = `${-(i * 1.7)}s`;
    leavesContainer.appendChild(leaf);
  }
}
