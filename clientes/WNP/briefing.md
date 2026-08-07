# Briefing — WNP Comunicação Visual

## Cliente
WNP — o "novo Montara": rebranding/reposicionamento com foco em comunicação visual + posicionamento digital.

## Sobre o negócio
Fundador: Guilherme Weber. Especialista em comunicação visual e automações com IA.
Perfil de serviço estruturado em 3 pilares (framework original da Montara, mantido no rebrand — ver `[[wnp-3-pilares-framework]]`):

1. **Tráfego** — Criação de Sites e LPs, SEO, Google Ads/Meta Ads, anúncios que convertem.
2. **Comercial** — Chatbots com IA, funis de conversão, CRM e automações, nutrição/relacionamento.
3. **Operacional** — Sistemas e dashboards, automações com IA, integrações personalizadas, relatórios.

## Escopo do site (homepage)
- Nav fixa (transparente → sólida ao rolar), com CTA "Falar com especialista"
- Hero com imagem de fundo (neon) + headline "Conectamos marcas ao lugar certo"
- 3 pilares (cards)
- "Por que escolher a WNP" (5 diferenciais)
- "Como funciona" (5 passos do processo)
- Seção sobre o fundador (retrato + bio + painéis "Como trabalho" / "Ferramentas")
- CTA band final
- Footer com navegação, serviços, contato e redes sociais
- Dialog modal de contato (abre em qualquer CTA "Falar com especialista")

## Origem do design
Handoff via Claude Design (projeto "Site WNP homepage", `1b0d213a-596f-4ed8-b8ff-a7b5be15ed8e`).
Componentes React/JSX + design tokens convertidos para HTML/CSS/JS vanilla (sem framework, sem build step),
seguindo o padrão do MazyOS. Fontes: Sora (display) e Manrope (texto), via Google Fonts.

## Paleta
- Fundo: quase preto (`--bg-page: #0D0E0E`)
- Coral (acento primário): `#FF8968`
- Mint (acento secundário, usado com moderação): `#6DB578`

## Status
Site implementado e testado (desktop + mobile) em 2026-08-07. Falta: conteúdo definitivo (telefone, e-mail,
redes sociais, cases reais no footer/logo-wall) — atualmente com placeholders.

## Próximos passos
- Confirmar contatos reais (telefone, e-mail, Instagram/LinkedIn) antes do deploy
- Decidir domínio e hospedagem (padrão Vercel)
- Ligar o formulário de contato a um backend/serviço de e-mail (atualmente só simula envio no front)
