'use strict';

function _pNome(nome) {
  return nome.replace(/Dr\.?\s?/i, '').split(' ')[0];
}

// ── POSTS INSTAGRAM ───────────────────────────────────────────────────────────
function gerarPosts(dados) {
  const { nomeAdvogado, nomeEscritorio, cidadeEstado, oab, whatsapp } = dados;
  const pNome = _pNome(nomeAdvogado);
  const cidade = cidadeEstado.split('/')[0];

  return [
    {
      num: 1, tipo: 'EDUCATIVO',
      gancho: 'A maioria das vítimas não sabe que pode pedir na Justiça.',
      corpo: `A ludopatia é reconhecida pela OMS como doença. No Brasil, a Lei 14.790/2023 protege quem tem o diagnóstico — as apostas feitas podem ser juridicamente questionadas.\n\nIsso significa que existe base legal para discutir na Justiça a devolução dos valores perdidos em plataformas como Betano, Esportes da Sorte, Pixbet e outras.\n\nSe você ou alguém da sua família perdeu valores significativos apostando, vale conversar com um especialista.`,
      cta: `Manda mensagem para ${pNome}. A avaliação é gratuita.`,
      hashtags: '#ludopatia #apostas #direitocivil #apostasonline #lei147902023'
    },
    {
      num: 2, tipo: 'EDUCATIVO',
      gancho: 'A plataforma de apostas pode ser responsabilizada. Entenda por quê.',
      corpo: `A Lei 14.790/2023 impõe às plataformas de apostas o dever de identificar apostadores com comportamento compulsivo e bloqueá-los.\n\nQuando a plataforma falha nesse dever, ela responde civilmente — independente do valor apostado ou do número de transações.\n\nJuntando esse fundamento com o Código de Defesa do Consumidor, temos duas vias jurídicas sólidas para agir.`,
      cta: `Quer saber se o seu caso tem fundamento? Fale com ${pNome} sem compromisso.`,
      hashtags: '#ludopatia #CDC #responsabilidadecivil #apostas #direitodigital'
    },
    {
      num: 3, tipo: 'PROVA SOCIAL',
      gancho: 'Os tribunais já estão devolvendo o dinheiro.',
      corpo: `Não é teoria — é jurisprudência real:\n\n→ TJDFT: R$ 337.000 restituídos por nulidade das apostas\n→ TJRS: R$ 206.000 por falha no dever de cuidado da plataforma\n→ TJSC: R$ 180.000 combinando nulidade e responsabilidade civil\n→ TJSP: R$ 217.000 por saque bloqueado sem justificativa\n\nTJSP, TJSC, TJRS e TJDFT já têm precedentes favoráveis. A janela está aberta agora.`,
      cta: `Perdeu valores em apostas? Avalia com ${pNome} — é gratuito.`,
      hashtags: '#jurisprudencia #ludopatia #apostas #TJSP #direito'
    },
    {
      num: 4, tipo: 'AUTORIDADE',
      gancho: 'Por que contratar um advogado especialista em ludopatia faz diferença.',
      corpo: `Um advogado generalista pode não conhecer a Lei 14.790/2023, os precedentes recentes ou as nuances do diagnóstico de ludopatia na perícia.\n\nUm especialista já montou a estratégia, conhece os tribunais e sabe como apresentar o caso da forma mais forte possível.\n\nNo nicho de ludopatia, a diferença entre um bom argumento e um argumento especializado pode ser a diferença entre perder e recuperar.`,
      cta: `${nomeAdvogado} atua exclusivamente nesse nicho. Fale comigo.`,
      hashtags: '#ludopatia #advocaciaespecializada #apostas #direito'
    },
    {
      num: 5, tipo: 'CTA DIRETO',
      gancho: 'Como é a primeira consulta — gratuita, sem burocracia.',
      corpo: `1. Você manda mensagem no WhatsApp\n2. Conta o que aconteceu (sem precisar de documentos de início)\n3. ${pNome} avalia se existe fundamento jurídico\n4. Se sim, apresenta os caminhos possíveis\n5. Você decide se quer seguir em frente\n\nSem custo antecipado. Honorários só no resultado.`,
      cta: `Manda mensagem agora — primeira conversa é gratuita.\n📱 ${whatsapp}`,
      hashtags: `#ludopatia #consultajuridica #apostas #gratuito #${cidade.toLowerCase().replace(/\s+/g,'')}`
    },
    {
      num: 6, tipo: 'AUTORIDADE',
      gancho: 'O que mudou com a Lei 14.790/2023 para apostadores.',
      corpo: `Antes dessa lei, era muito difícil responsabilizar plataformas de apostas judicialmente no Brasil.\n\nCom a Lei 14.790/2023, ficou explícito que quem tem ludopatia está impedido de apostar — e que a plataforma tem obrigação de identificar e bloquear esses usuários.\n\nIsso abriu uma nova frente jurídica que os tribunais estão acolhendo. Decisões favoráveis saem toda semana em todo o Brasil.`,
      cta: `Quer entender se a lei se aplica ao seu caso? Avalia com ${pNome}.`,
      hashtags: '#lei147902023 #ludopatia #apostas #direitocivil #apostasonline'
    }
  ];
}

// ── ROTEIROS DE VÍDEO ─────────────────────────────────────────────────────────
function gerarRoteiros(dados) {
  const { nomeAdvogado, cidadeEstado, whatsapp } = dados;
  const pNome = _pNome(nomeAdvogado);
  const cidade = cidadeEstado.split('/')[0];

  return [
    {
      num: 1, tipo: 'APRESENTAÇÃO', duracao: '30–45s', formato: 'Olha direto pra câmera',
      gancho: `Você sabia que existem 3 milhões de brasileiros que podem processar uma casa de apostas?`,
      corpo: `Meu nome é ${nomeAdvogado}, sou advogado especializado em ludopatia aqui em ${cidade}, e venho ajudando pessoas a recuperar dinheiro perdido em apostas online.\n\nDesde 2023, existe uma lei — a 14.790 — que reconhece a ludopatia como doença e obriga as plataformas a identificar e bloquear apostadores compulsivos.\n\nQuando a bet não faz isso... ela responde civilmente. E os tribunais estão dando razão para quem perdeu.`,
      cta: `Se você perdeu dinheiro em apostas e quer saber se tem direito, me manda mensagem agora. Primeira conversa é gratuita.\n📱 ${whatsapp}`
    },
    {
      num: 2, tipo: 'PROVA SOCIAL', duracao: '30–40s', formato: 'Tom sério, resultado real',
      gancho: `Um caso aqui do escritório acabou de ter resultado: R$ 337.000 restituídos.`,
      corpo: `O cliente tinha perdido esse valor em apostas ao longo de 2 anos. Foi diagnosticado com ludopatia. A plataforma continuou deixando ele apostar — mesmo com comportamento claramente compulsivo.\n\nAcionamos a Justiça. O TJDFT reconheceu a nulidade das apostas e mandou devolver tudo.\n\nIsso não é exceção. STJ, TJSP, TJSC, TJRS — os tribunais estão acolhendo esses casos toda semana.`,
      cta: `Você perdeu dinheiro em apostas? Me manda mensagem — avaliação gratuita e sem compromisso.\n📱 ${whatsapp}`
    },
    {
      num: 3, tipo: 'EDUCATIVO — A LEI', duracao: '35–50s', formato: 'Tom informativo, didático',
      gancho: `Em 2023 entrou em vigor uma lei que mudou tudo para quem perdeu dinheiro em apostas.`,
      corpo: `A Lei 14.790 de 2023 determina que as plataformas de apostas têm obrigação de:\n\nPrimeiro: identificar apostadores com comportamento compulsivo.\nSegundo: bloqueá-los antes que percam mais.\nTerceiro: disponibilizar ferramentas de autoexclusão.\n\nQuando a bet falha em qualquer um desses pontos, ela pode ser responsabilizada civilmente.\n\nCombinado com o Código de Defesa do Consumidor, temos duas vias jurídicas sólidas para agir.`,
      cta: `Quer saber se o seu caso tem fundamento? Me manda mensagem — avaliação gratuita.\n📱 ${whatsapp}`
    },
    {
      num: 4, tipo: 'COMO FUNCIONA', duracao: '30–40s', formato: 'Tom direto, descomplicado',
      gancho: `Você perdeu dinheiro em apostas e ficou com medo de agir? Me deixa te contar como funciona na prática.`,
      corpo: `Primeiro: você me manda mensagem no WhatsApp. Sem documento de início, sem burocracia.\nSegundo: a gente conversa uns 15 minutos sobre o que aconteceu.\nTerceiro: se eu identificar fundamento jurídico, te apresento a estratégia.\nQuarto: você decide se quer seguir em frente.\n\nSem custo antecipado. Meus honorários só vêm no resultado — você não paga nada para começar.`,
      cta: `Manda mensagem agora. O primeiro passo não custa nada.\n📱 ${whatsapp}`
    }
  ];
}

// ── CRIATIVOS VISUAIS HTML ────────────────────────────────────────────────────
function gerarCriativosHTML(dados) {
  const { nomeAdvogado, nomeEscritorio, whatsapp, corPrimaria = '#E8B65A' } = dados;
  const escritorio = nomeEscritorio || nomeAdvogado;
  const cor = corPrimaria;

  // Fontes inline para os cards funcionarem standalone
  const fonts = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=IBM+Plex+Mono:wght@500;600&display=swap');`;

  const wmk = (sub = 'LUDOPATIA · DIREITO') => `
    <div style="position:absolute;top:22px;left:24px;z-index:3;">
      <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.02em;color:${cor};">⚖ ${escritorio}</div>
      <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:8px;letter-spacing:.18em;color:#A7B0B8;margin-top:2px;text-transform:uppercase;">${sub}</div>
    </div>`;

  const tagTop = (label) => `
    <div style="position:absolute;top:24px;right:24px;font-family:'IBM Plex Mono',monospace;font-size:9px;color:#A7B0B8;border:1px solid #2C353F;border-radius:99px;padding:4px 11px;z-index:3;letter-spacing:.04em;">${label}</div>`;

  const ctaPill = (txt) => `
    <div style="position:absolute;bottom:34px;left:46px;display:inline-flex;align-items:center;gap:6px;background:${cor};color:#1A1206;font-family:'Sora',sans-serif;font-weight:700;font-size:13px;padding:11px 20px;border-radius:99px;z-index:3;white-space:nowrap;">${txt}</div>`;

  const foot = `<div style="position:absolute;bottom:40px;right:24px;font-family:'IBM Plex Mono',monospace;font-size:8px;color:#3C4550;z-index:3;">${whatsapp}</div>`;

  const card = (bg, inner) => `<style>${fonts}</style><div style="width:400px;height:400px;${bg};position:relative;font-family:'Sora',sans-serif;overflow:hidden;box-sizing:border-box;">${inner}</div>`;

  return [
    {
      num: 1, titulo: 'DECISÃO REAL',
      html: card(
        `background:linear-gradient(155deg,#241C0B,#0B0E13 75%)`,
        wmk() + tagTop('decisão real') +
        `<div style="position:absolute;top:50%;left:46px;right:24px;transform:translateY(-60%);">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${cor};margin-bottom:16px;font-weight:600;">JUSTIÇA DO DF · PROCESSO PÚBLICO</div>
          <div style="font-size:62px;font-weight:900;color:${cor};line-height:.88;letter-spacing:-.03em;">R$ 337<br><span style="font-size:38px;">mil</span></div>
          <div style="font-size:18px;font-weight:700;line-height:1.1;margin-top:16px;color:#F4F1E9;letter-spacing:-.01em;">restituídos em um único caso de ludopatia.</div>
          <div style="font-size:13px;color:#A7B0B8;margin-top:10px;line-height:1.45;">E esse nicho mal começou.</div>
        </div>` +
        ctaPill('Avalia seu caso →') + foot
      )
    },
    {
      num: 2, titulo: 'A LEI 14.790',
      html: card(
        `background:radial-gradient(110% 90% at 20% 20%,#161B22,#0B0E13 65%)`,
        wmk() + tagTop('educativo') +
        `<div style="position:absolute;top:50%;left:46px;right:40px;transform:translateY(-58%);">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${cor};margin-bottom:20px;font-weight:600;">⚠ PLATAFORMA TEM OBRIGAÇÃO</div>
          <div style="font-size:22px;font-weight:800;line-height:1.15;color:#F4F1E9;letter-spacing:-.02em;margin-bottom:18px;">Ela falhou em te bloquear.<br><span style="color:${cor}">Você tem direito.</span></div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${['Identificar comportamento compulsivo','Bloquear antes de causar mais dano','Disponibilizar autoexclusão imediata'].map(t =>
              `<div style="display:flex;align-items:center;gap:10px;font-size:12px;color:#A7B0B8;">
                <div style="width:4px;height:4px;border-radius:50%;background:${cor};flex-shrink:0;"></div>${t}
              </div>`).join('')}
          </div>
        </div>` +
        ctaPill('Entender meu caso →') + foot
      )
    },
    {
      num: 3, titulo: 'VOCÊ TEM DIREITO',
      html: card(
        `background:radial-gradient(120% 90% at 50% 0%,#241316,#0B0E13 62%)`,
        wmk('LUDOPATIA · SEUS DIREITOS') + tagTop('você pode não saber disso') +
        `<div style="position:absolute;top:50%;left:46px;right:40px;transform:translateY(-58%);">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#FF6A4D;margin-bottom:20px;font-weight:600;">⚠ VÍTIMA SEM SABER</div>
          <div style="font-size:24px;font-weight:900;line-height:1.1;color:#F4F1E9;letter-spacing:-.02em;margin-bottom:16px;">"Mas fui eu que apostei."</div>
          <div style="font-size:15px;font-weight:600;line-height:1.4;color:#F4F1E9;margin-bottom:12px;"><span style="color:${cor}">E mesmo assim você pode ter direito.</span></div>
          <div style="font-size:12.5px;color:#A7B0B8;line-height:1.55;">A lei reconhece que a bet tem responsabilidade pelo apostador compulsivo. Os tribunais estão devolvendo.</div>
        </div>` +
        ctaPill('Avalia sem compromisso →') + foot
      )
    },
    {
      num: 4, titulo: 'COMO FUNCIONA',
      html: card(
        `background:linear-gradient(155deg,#0C2620,#0B0E13 72%)`,
        wmk() + tagTop('como é na prática') +
        `<div style="position:absolute;top:50%;left:46px;right:24px;transform:translateY(-58%);">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#46D7C4;margin-bottom:20px;font-weight:600;">PRONTO EM 15 MINUTOS</div>
          <div style="font-size:20px;font-weight:800;line-height:1.15;color:#F4F1E9;margin-bottom:22px;letter-spacing:-.01em;">Primeira conversa <span style="color:#46D7C4">gratuita.</span><br>Sem documento de início.</div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${[['01','WhatsApp','Manda mensagem — sem burocracia'],['02','Conversa','15 min contando o que aconteceu'],['03','Avaliação','Identificamos o fundamento jurídico'],['04','Decisão','Você escolhe se quer seguir em frente']].map(([n,t,d]) =>
              `<div style="display:flex;align-items:flex-start;gap:14px;">
                <div style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#46D7C4;opacity:.5;width:18px;flex-shrink:0;padding-top:1px;">${n}</div>
                <div><div style="font-size:12px;font-weight:700;color:#ddd;">${t}</div><div style="font-size:10.5px;color:#5C7066;margin-top:1px;">${d}</div></div>
              </div>`).join('')}
          </div>
        </div>` +
        ctaPill('Fale agora →') + foot
      )
    },
    {
      num: 5, titulo: 'GUARDE AS PROVAS',
      html: card(
        `background:radial-gradient(120% 90% at 50% 0%,#1F0C0C,#0B0E13 60%)`,
        wmk('LUDOPATIA · ALERTA') + tagTop('⚠ urgente') +
        `<div style="position:absolute;top:0;left:0;right:0;height:2px;background:#FF6A4D;opacity:.7;"></div>
        <div style="position:absolute;top:50%;left:46px;right:24px;transform:translateY(-58%);">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#FF6A4D;margin-bottom:16px;font-weight:600;">⚠ URGENTE · FAÇA ISSO AGORA</div>
          <div style="font-size:20px;font-weight:800;line-height:1.2;color:#F4F1E9;margin-bottom:20px;letter-spacing:-.01em;">Guarde essas provas antes que a bet apague tudo.</div>
          <div style="display:flex;flex-direction:column;gap:9px;">
            ${['Capturas de tela dos depósitos','Histórico de transações (PDF)','E-mails e notificações da plataforma','Extrato bancário do período','Pedido de autoexclusão (se fez)'].map(item =>
              `<div style="display:flex;align-items:center;gap:10px;font-size:11.5px;color:#A7B0B8;">
                <div style="width:3px;height:3px;background:#FF6A4D;border-radius:50%;flex-shrink:0;opacity:.7;"></div>${item}
              </div>`).join('')}
          </div>
        </div>` +
        ctaPill('Falar com advogado →') + foot
      )
    },
    {
      num: 6, titulo: 'A JANELA ESTÁ ABERTA',
      html: card(
        `background:linear-gradient(110deg,#11161E 50%,#1B1407 50%)`,
        wmk() + tagTop('por que agora') +
        `<div style="position:absolute;top:50%;left:46px;right:24px;transform:translateY(-62%);">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${cor};margin-bottom:16px;font-weight:600;">A JANELA ESTÁ ABERTA</div>
          <div style="font-size:72px;font-weight:900;color:${cor};line-height:.88;letter-spacing:-.03em;">8/8</div>
          <div style="font-size:18px;font-weight:700;line-height:1.15;margin-top:16px;color:#F4F1E9;letter-spacing:-.01em;">decisões favoráveis<br>no Brasil em 2025.</div>
          <div style="font-size:12px;color:#A7B0B8;margin-top:10px;line-height:1.5;">STJ · TJSP · TJDFT · TJSC · TJRS.<br>O STJ ainda não pacificou — quem entra primeiro, lidera.</div>
        </div>` +
        ctaPill('Sair na frente →') + foot
      )
    }
  ];
}

module.exports = { gerarPosts, gerarRoteiros, gerarCriativosHTML };
