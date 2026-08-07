const WHATSAPP_NUMERO = '5548988288670';
const WHATSAPP_TEXTO = 'Olá! Vim pelo site e gostaria de falar sobre os produtos Ingleses.';

const linkWhatsapp = (texto = WHATSAPP_TEXTO) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(texto)}`;

document.querySelectorAll('.whatsapp-link').forEach((el) => {
  el.href = linkWhatsapp();
});

const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Palavra rotativa do hero */
const PALAVRAS = ['gerações', 'supermercados', 'padarias', 'conveniências', 'negócios'];
const rotativaEl = document.getElementById('palavra-rotativa');
let palavraIndex = 0;

if (rotativaEl && !semAnimacao) {
  setInterval(() => {
    palavraIndex = (palavraIndex + 1) % PALAVRAS.length;
    rotativaEl.style.animation = 'none';
    rotativaEl.offsetHeight;
    rotativaEl.style.animation = 'palavraIn 500ms ease-out both';
    rotativaEl.textContent = PALAVRAS[palavraIndex];
  }, 2600);
}

/* Nav fica sólido ao rolar (nas páginas internas já nasce sólido) */
const nav = document.getElementById('nav');

if (nav && !nav.classList.contains('nav-interna')) {
  const atualizarNav = () => nav.classList.toggle('solido', window.scrollY > 80);
  atualizarNav();
  window.addEventListener('scroll', atualizarNav, { passive: true });
}

/* Reveal das seções ao entrar na tela */
const alvosReveal = document.querySelectorAll('.reveal');

if (alvosReveal.length) {
  const ioReveal = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('visivel'), i * 80);
      ioReveal.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px' });

  alvosReveal.forEach((el) => ioReveal.observe(el));
}

/* Enquanto as fotos da seção "Nossa estrutura" não existirem, esconde o quadro
   em vez de mostrar ícone de imagem quebrada. Pode sair depois que subirem. */
const fotoEstrutura = document.querySelector('.estrutura-foto img');

if (fotoEstrutura) {
  fotoEstrutura.addEventListener('error', () => {
    fotoEstrutura.closest('.estrutura-foto').style.display = 'none';
  });
}

/* Formulário → WhatsApp com a mensagem montada */
const form = document.getElementById('form-contato');
const btnEnviar = document.getElementById('btn-enviar');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const texto = [
      `Olá! Vim pelo site da Ingleses.`,
      ``,
      `Nome: ${form.nome.value.trim()}`,
      `Telefone: ${form.telefone.value.trim()}`,
      `Estabelecimento: ${form.empresa.value.trim()}`,
      `Assunto: ${form.tipo.value}`,
      form.mensagem.value.trim() ? `\n${form.mensagem.value.trim()}` : '',
    ].join('\n');

    window.open(linkWhatsapp(texto), '_blank');

    btnEnviar.textContent = 'Mensagem enviada ✓';
    setTimeout(() => {
      btnEnviar.textContent = 'Enviar pelo WhatsApp';
      form.reset();
    }, 3000);
  });
}
