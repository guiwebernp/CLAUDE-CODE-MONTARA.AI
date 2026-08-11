function gerarConteudo(dadosCliente) {
  const { nomeAdvogado, nomeEscritorio, cidadeEstado, oab, whatsapp } = dadosCliente;
  const primeiroNome = nomeAdvogado.replace(/Dr\.?\s?/i, '').split(' ')[0];

  const posts = [
    {
      tipo: 'educativo',
      gancho: 'A maioria das vítimas não sabe que pode pedir na Justiça.',
      corpo: `A ludopatia é reconhecida pela OMS como doença. No Brasil, a Lei 14.790/2023 protege quem tem o diagnóstico — as apostas feitas podem ser juridicamente questionadas.\n\nIsso significa que existe base legal para discutir na Justiça a devolução dos valores perdidos em plataformas como Betano, Esportes da Sorte, Pixbet e outras.\n\nSe você ou alguém da sua família perdeu valores significativos apostando, vale conversar com um especialista.`,
      cta: `Manda mensagem para ${primeiroNome}. A avaliação é gratuita.`,
      hashtags: ['ludopatia', 'apostas', 'direitocivil', 'apostasonline', 'lei147902023']
    },
    {
      tipo: 'educativo',
      gancho: 'A plataforma de apostas pode ser responsabilizada. Entenda por quê.',
      corpo: `A Lei 14.790/2023 impõe às plataformas de apostas o dever de identificar apostadores com comportamento compulsivo e bloqueá-los.\n\nQuando a plataforma falha nesse dever, ela responde civilmente — independente do valor apostado ou do número de transações.\n\nJuntando esse fundamento com o Código de Defesa do Consumidor, temos duas vias jurídicas sólidas para agir.`,
      cta: 'Quer saber se o seu caso tem fundamento? Fale comigo sem compromisso.',
      hashtags: ['ludopatia', 'CDC', 'responsabilidadecivil', 'apostas', 'direitodigital']
    },
    {
      tipo: 'prova_social',
      gancho: 'Os tribunais já estão devolvendo o dinheiro.',
      corpo: `Não é teoria — é jurisprudência real:\n\n→ TJDFT: R$ 337.000 restituídos por nulidade das apostas\n→ TJRS: R$ 206.000 por falha no dever de cuidado da plataforma\n→ TJSC: R$ 180.000 combinando nulidade e responsabilidade civil\n→ TJSP: R$ 217.000 por saque bloqueado sem justificativa\n\nTJSP, TJSC, TJRS e TJDFT já têm precedentes favoráveis. A janela está aberta agora.`,
      cta: 'Perdeu valores em apostas? Avalia comigo — é gratuito.',
      hashtags: ['jurisprudencia', 'ludopatia', 'apostas', 'TJSP', 'direito']
    },
    {
      tipo: 'autoridade',
      gancho: 'Por que contratar um advogado especialista em ludopatia faz diferença.',
      corpo: `Um advogado generalista pode não conhecer a Lei 14.790/2023, os precedentes recentes ou as nuances do diagnóstico de ludopatia na perícia.\n\nUm especialista já montou a estratégia, conhece os tribunais e sabe como apresentar o caso da forma mais forte possível.\n\nNo nicho de ludopatia, a diferença entre um bom argumento e um argumento especializado pode ser a diferença entre perder e recuperar.`,
      cta: `${nomeAdvogado} atua exclusivamente nesse nicho. Fale comigo.`,
      hashtags: ['ludopatia', 'advocaciaespecializada', 'apostas', 'direito', nomeEscritorio.toLowerCase().replace(/\s+/g, '')]
    },
    {
      tipo: 'cta',
      gancho: 'Como é a primeira consulta — gratuita, sem burocracia.',
      corpo: `1. Você manda mensagem no WhatsApp\n2. Conta o que aconteceu (sem precisar de documentos de início)\n3. ${primeiroNome} avalia se existe fundamento jurídico\n4. Se sim, apresenta os caminhos possíveis\n5. Você decide se quer seguir em frente\n\nSem custo antecipado. Honorários só no resultado.`,
      cta: 'Manda mensagem agora — primeira conversa é gratuita.',
      hashtags: ['ludopatia', 'consultajuridica', 'apostas', 'gratuito', cidadeEstado.split('/')[0].toLowerCase()]
    },
    {
      tipo: 'autoridade',
      gancho: 'O que mudou com a Lei 14.790/2023 para apostadores.',
      corpo: `Antes dessa lei, era muito difícil responsabilizar plataformas de apostas judicialmente no Brasil.\n\nCom a Lei 14.790/2023, ficou explícito que quem tem ludopatia está impedido de apostar — e que a plataforma tem obrigação de identificar e bloquear esses usuários.\n\nIsso abriu uma nova frente jurídica que os tribunais estão acolhendo. Decisões favoráveis saem toda semana em todo o Brasil.`,
      cta: 'Quer entender se a lei se aplica ao seu caso? Avalia comigo.',
      hashtags: ['lei147902023', 'ludopatia', 'apostas', 'direitocivil', 'apostasonline']
    }
  ];

  const header = `# Pack de Conteúdo — ${nomeEscritorio}
Gerado por Nicho Certo · ${new Date().toLocaleDateString('pt-BR')}

---

`;
  const conteudo = posts.map((p, i) => {
    const hashtags = p.hashtags.map(h => `#${h.replace(/^#/, '')}`).join(' ');
    return `## Post ${i + 1} · ${p.tipo.replace('_', ' ')}

**Gancho:**
${p.gancho}

**Corpo:**
${p.corpo}

**CTA:**
${p.cta}

**Hashtags:**
${hashtags}

---
`;
  }).join('\n');

  const rodape = `
## Como usar

- Poste 3–4x por semana
- Use o **gancho** como primeira linha — é o que para o scroll
- Adicione foto ou identidade visual do escritório como imagem
- Responda todos os comentários com dúvidas
- Nunca prometa resultado — mantenha o tom informativo

**WhatsApp para incluir nos posts:** ${whatsapp}
**OAB:** ${oab}
`;

  return header + conteudo + rodape;
}

module.exports = { gerarConteudo };
