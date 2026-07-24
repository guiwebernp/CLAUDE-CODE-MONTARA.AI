(() => {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Reusable video crossfade loop — two <video> layers alternate so the  */
  /* loop restart is masked by a fade instead of a hard cut               */
  /* ------------------------------------------------------------------ */
  function initCrossfadeLoop(idA, idB, options) {
    const A = document.getElementById(idA);
    const B = document.getElementById(idB);
    if (!A || !B) return;

    const IN = (options && options.inPoint) || 0;
    const CROSS = (options && options.crossfade) || 1;

    [A, B].forEach((v) => {
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute('muted', '');
      v.playsInline = true;
      v.loop = false;
      v.style.transition = 'opacity ' + CROSS + 's linear';
    });

    let active = A;
    let hidden = B;
    let swapping = false;

    const outAt = () => Math.max(IN + 0.2, (active.duration || 10) - CROSS);

    const start = (v) => {
      try { v.currentTime = IN; } catch (e) { /* not seekable yet */ }
      v.muted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };

    A.style.opacity = '1';
    B.style.opacity = '0';
    start(A);

    let raf = 0;
    const tick = () => {
      if (!swapping && active.currentTime >= outAt()) {
        swapping = true;
        start(hidden);
        hidden.style.opacity = '1';
        active.style.opacity = '0';
        const oldActive = active;
        active = hidden;
        hidden = oldActive;
        setTimeout(() => {
          try { hidden.pause(); } catch (e) {}
          swapping = false;
        }, CROSS * 1000 + 60);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // watchdog: keep the visible layer playing even if autoplay was blocked
    const watchdog = setInterval(() => {
      if (active.paused) {
        active.muted = true;
        const p = active.play();
        if (p && p.catch) p.catch(() => {});
      }
    }, 1000);

    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(raf);
      clearInterval(watchdog);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Mobile nav toggle                                                    */
  /* ------------------------------------------------------------------ */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    const close = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      links.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', () => {
      if (links.classList.contains('is-open')) close();
      else open();
    });

    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Portfolio filter                                                    */
  /* ------------------------------------------------------------------ */
  function initPortfolioFilter() {
    const pills = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('[data-cat]');
    if (!pills.length || !cards.length) return;

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-filter');

        pills.forEach((p) => p.classList.toggle('is-active', p === pill));

        cards.forEach((card) => {
          const show = cat === 'Todos' || card.getAttribute('data-cat') === cat;
          card.hidden = !show;
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Contact form — validation + submission                              */
  /* ------------------------------------------------------------------ */
  function initContactForm() {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    const successEl = document.getElementById('formSuccess');
    const errorBanner = document.getElementById('formErrorBanner');
    const submitBtn = form.querySelector('.btn-submit');

    const WHATSAPP_NUMBER = '554832848000';

    const fields = {
      name: form.querySelector('#f_name'),
      email: form.querySelector('#f_email'),
      phone: form.querySelector('#f_phone'),
    };

    function setFieldError(field, message) {
      const wrap = field.closest('.form-field');
      if (!wrap) return;
      wrap.classList.toggle('has-error', Boolean(message));
      const errEl = wrap.querySelector('.field-error');
      if (errEl) errEl.textContent = message || '';
    }

    function validate() {
      let valid = true;

      if (!fields.name.value.trim()) {
        setFieldError(fields.name, 'Informe seu nome.');
        valid = false;
      } else {
        setFieldError(fields.name, '');
      }

      const emailVal = fields.email.value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRe.test(emailVal)) {
        setFieldError(fields.email, 'Informe um e-mail válido.');
        valid = false;
      } else {
        setFieldError(fields.email, '');
      }

      if (!fields.phone.value.trim()) {
        setFieldError(fields.phone, 'Informe seu telefone.');
        valid = false;
      } else {
        setFieldError(fields.phone, '');
      }

      return valid;
    }

    function submitViaWhatsApp(data) {
      const lines = [
        'Novo pedido de orçamento pelo site:',
        '',
        'Nome: ' + data.name,
        'Empresa: ' + (data.company || '-'),
        'E-mail: ' + data.email,
        'Telefone: ' + data.phone,
        'Serviço de interesse: ' + data.service,
      ];
      if (data.message) {
        lines.push('', 'Detalhes do projeto:', data.message);
      }
      const text = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text, '_blank', 'noopener');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorBanner.classList.remove('is-visible');

      if (!validate()) return;

      const data = {
        name: fields.name.value.trim(),
        company: form.querySelector('#f_company').value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        service: form.querySelector('#f_service').value,
        message: form.querySelector('#f_msg').value.trim(),
      };

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      try {
        submitViaWhatsApp(data);
        form.hidden = true;
        successEl.hidden = false;
      } catch (err) {
        errorBanner.textContent = 'Não foi possível abrir o WhatsApp agora. Tente novamente ou fale pelo WhatsApp diretamente.';
        errorBanner.classList.add('is-visible');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar pedido de orçamento';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCrossfadeLoop('eyeVidA', 'eyeVidB', { inPoint: 0.9, crossfade: 1.1 });
    initCrossfadeLoop('empresaVidA', 'empresaVidB', { inPoint: 0, crossfade: 1.2 });
    initCrossfadeLoop('empresaMobVidA', 'empresaMobVidB', { inPoint: 0, crossfade: 1.2 });
    initMobileNav();
    initPortfolioFilter();
    initContactForm();
  });
})();
