// Captador — variações de copy para landing pages de ludopatia
// Mesmo sentido, palavras diferentes. Combina com qualquer template de design.

const copies = [
  {
    // 01 — esconder / vergonha
    h1: `Você esconde de todo mundo<br><em>quanto já perdeu apostando?</em>`,
    tagline: `Isso não é falta de caráter — tem nome, é ludopatia, uma doença reconhecida pela OMS. A lei impõe deveres às casas de apostas.`,
    cta_titulo: `O primeiro passo é uma conversa`,
    cta_subtexto: `Conte sua situação. Você recebe orientação sobre cuidado e sobre os direitos previstos em lei — sem custo, sem compromisso.`,
    meta_sufixo: `Conversa sigilosa, sem julgamento. Lei 14.790/2023.`
  },
  {
    // 02 — força de vontade
    h1: `Você não perdeu por falta<br>de força de vontade.<br><em>Perdeu porque tem uma doença.</em>`,
    tagline: `Ludopatia é reconhecida pela OMS e pela lei brasileira. As plataformas de apostas têm obrigações com quem desenvolve esse transtorno — e quando falham, respondem.`,
    cta_titulo: `Uma conversa sigilosa. Sem julgamento.`,
    cta_subtexto: `Conte o que aconteceu. Você recebe orientação sobre cuidado e sobre os seus direitos — sem custo, sem compromisso.`,
    meta_sufixo: `Avaliação sigilosa, sem julgamento. Lei 14.790/2023.`
  },
  {
    // 03 — raiva de si mesmo
    h1: `Você não está com raiva<br>das apostas.<br><em>Está com raiva de si mesmo.</em>`,
    tagline: `Esse sentimento tem nome — é ludopatia. Uma doença que a OMS reconhece e a lei protege. Você não deveria carregar isso sozinho.`,
    cta_titulo: `A primeira conversa é gratuita`,
    cta_subtexto: `Sem formulário, sem burocracia. Conte o que aconteceu — e recebe orientação sobre cuidado e sobre o que a lei prevê. Sem julgamento.`,
    meta_sufixo: `Sigilo total, sem julgamento. Lei 14.790/2023.`
  },
  {
    // 04 — número no extrato
    h1: `Tem um número no extrato<br><em>que você não consegue<br>parar de pensar.</em>`,
    tagline: `Quando as perdas chegam a esse ponto, geralmente não é falta de controle — é ludopatia. Uma condição médica que impõe responsabilidades às plataformas de apostas.`,
    cta_titulo: `Descubra se você tem um caso`,
    cta_subtexto: `Compartilhe sua situação. Recebe orientação sobre cuidado e sobre os seus direitos previstos em lei — sem custo, sem compromisso.`,
    meta_sufixo: `Avaliação gratuita e sigilosa. Lei 14.790/2023.`
  },
  {
    // 05 — tentar recuperar
    h1: `Você aposta para tentar<br><em>recuperar o que perdeu.</em><br>Isso tem nome.`,
    tagline: `Apostar para recuperar perdas é um dos sinais mais claros de ludopatia — e a lei obriga as plataformas a identificar e conter esse comportamento.`,
    cta_titulo: `Fale sobre o seu caso`,
    cta_subtexto: `Sem julgamento. Sem custo. Conte o que aconteceu — e recebe orientação sobre cuidado e sobre os direitos que a lei prevê pra você.`,
    meta_sufixo: `Conversa sigilosa, orientação gratuita. Lei 14.790/2023.`
  },
  {
    // 06 — esconder da família
    h1: `Você esconde das pessoas<br>que mais ama<br><em>o quanto está sofrendo.</em>`,
    tagline: `Isso é ludopatia — não fraqueza, não falta de caráter. É uma doença reconhecida que a lei obriga as plataformas a prevenir. Quando falham, respondem.`,
    cta_titulo: `Ninguém da sua família precisa saber`,
    cta_subtexto: `A conversa é protegida pelo sigilo profissional. Ninguém é contatado sem a sua autorização. Conte sua situação e saiba o que a lei prevê pra você.`,
    meta_sufixo: `Sigilo absoluto, sem julgamento. Lei 14.790/2023.`
  },
  {
    // 07 — já tentou parar
    h1: `Você já tentou parar.<br>Mais de uma vez.<br><em>E não conseguiu.</em>`,
    tagline: `Isso não é fraqueza — é o mecanismo central da ludopatia. Uma doença real, com código na CID, que impõe deveres legais às casas de apostas.`,
    cta_titulo: `O próximo passo começa com uma conversa`,
    cta_subtexto: `Sem compromisso, sem custo. Você recebe orientação sobre tratamento e sobre o que a legislação prevê para quem desenvolveu ludopatia apostando online.`,
    meta_sufixo: `Orientação gratuita, conversa sigilosa. Lei 14.790/2023.`
  },
  {
    // 08 — dívidas
    h1: `As apostas criaram dívidas<br><em>que não existiriam<br>se a plataforma cumprisse a lei.</em>`,
    tagline: `A Lei 14.790/2023 obriga as casas de apostas a monitorar comportamentos compulsivos e impor limites. Quando ignoram isso, são responsáveis pelo que acontece.`,
    cta_titulo: `Saiba se as suas perdas têm base jurídica`,
    cta_subtexto: `Avaliação individual, gratuita e sigilosa. Sem custo, sem compromisso. Honorários somente no resultado.`,
    meta_sufixo: `Avaliação gratuita, honorários no resultado. Lei 14.790/2023.`
  },
  {
    // 09 — acorda de madrugada
    h1: `Você acorda de madrugada<br><em>pensando no que perdeu<br>na última aposta.</em>`,
    tagline: `Esse nível de sofrimento tem nome — é ludopatia. Uma condição médica reconhecida que impõe responsabilidades às plataformas que ignoram sinais de comportamento compulsivo.`,
    cta_titulo: `Fale com sigilo sobre o que está sentindo`,
    cta_subtexto: `A primeira conversa é gratuita, sigilosa e sem julgamento. Orientação sobre cuidado e sobre os direitos que a lei garante pra você — sem compromisso.`,
    meta_sufixo: `Conversa sigilosa e gratuita. Lei 14.790/2023.`
  },
  {
    // 10 — a lei reconhece
    h1: `A lei brasileira reconhece<br><em>o que você está vivendo.</em><br>As plataformas, não.`,
    tagline: `A Lei 14.790/2023 obriga as casas de apostas a proteger quem desenvolve ludopatia. Quando falham nesse dever, a responsabilidade é delas — não sua.`,
    cta_titulo: `Entenda seus direitos gratuitamente`,
    cta_subtexto: `Avaliação individual, sigilosa, sem compromisso. Você recebe orientação clara sobre cuidado e sobre o que a lei prevê para o seu caso.`,
    meta_sufixo: `Direitos previstos em lei, avaliação gratuita. Lei 14.790/2023.`
  },
  {
    // 11 — dor que não explica
    h1: `Apostas causam um tipo de dor<br><em>que você não consegue<br>explicar pra ninguém.</em>`,
    tagline: `Vergonha, segredo, isolamento — são sintomas da ludopatia, não falhas de caráter. Uma doença com código na CID que a legislação brasileira leva a sério.`,
    cta_titulo: `Aqui, você não precisa explicar nada`,
    cta_subtexto: `Pode contar tudo, sem julgamento. A conversa é sigilosa, gratuita e protegida pelo sigilo profissional. Ninguém da sua família é contatado.`,
    meta_sufixo: `Sem julgamento, sigilo total. Lei 14.790/2023.`
  },
  {
    // 12 — última aposta
    h1: `Quantas vezes você disse<br><em>"essa foi a última aposta"</em><br>e não conseguiu parar?`,
    tagline: `Não conseguir parar mesmo querendo é o sinal mais claro de ludopatia. Uma condição que obriga as plataformas de apostas a agir — e quando não agem, respondem juridicamente.`,
    cta_titulo: `Dê o primeiro passo, com sigilo`,
    cta_subtexto: `Conte sua situação, sem julgamento. Você recebe orientação sobre como tratar a doença e sobre os direitos que a lei garante pra você. Sem custo, sem compromisso.`,
    meta_sufixo: `Orientação sigilosa, sem julgamento. Lei 14.790/2023.`
  },
  {
    // 13 — falta de caráter
    h1: `Isso não é falta<br>de caráter.<br><em>É uma doença com nome e código.</em>`,
    tagline: `Ludopatia (CID-11 6C50) é reconhecida pela OMS e pela lei brasileira. As plataformas têm obrigação de identificar e proteger quem desenvolve esse transtorno.`,
    cta_titulo: `Conversa sigilosa, sem julgamento`,
    cta_subtexto: `Sem formulário. Sem burocracia. Você conta o que aconteceu — e recebe orientação sobre cuidado e sobre o que a lei prevê para você. Sem custo, sem compromisso.`,
    meta_sufixo: `Sigilo total, sem julgamento. CID-11 / Lei 14.790/2023.`
  },
  {
    // 14 — doença disfarçada
    h1: `A aposta não era<br>entretenimento.<br><em>Era uma doença disfarçada.</em>`,
    tagline: `Ludopatia começa parecendo lazer e evolui para uma compulsão que a pessoa não consegue controlar. A lei obriga as plataformas a monitorar esse processo e agir.`,
    cta_titulo: `Fale sobre o que aconteceu`,
    cta_subtexto: `A primeira conversa é sigilosa, gratuita e sem compromisso. Você recebe orientação sobre cuidado e sobre os seus direitos. Honorários somente no resultado.`,
    meta_sufixo: `Avaliação sigilosa e gratuita. Lei 14.790/2023.`
  },
  {
    // 15 — carregando sozinho
    h1: `Você está carregando isso<br><em>sozinho há tempo demais.</em>`,
    tagline: `Ludopatia é uma das condições mais solitárias que existem — a vergonha impede de pedir ajuda. Mas existe saída, existe tratamento e existe amparo legal.`,
    cta_titulo: `Você não precisa mais carregar sozinho`,
    cta_subtexto: `A conversa começa sem julgamento, sem custo e sem compromisso. Orientação sobre cuidado e sobre o que a lei prevê para o seu caso. Sigilo absoluto.`,
    meta_sufixo: `Sigilo absoluto, orientação gratuita. Lei 14.790/2023.`
  },
  {
    // 16 — o transtorno / obrigações
    h1: `O transtorno do jogo<br>gera obrigações legais<br><em>para as plataformas.</em>`,
    tagline: `Ludopatia é reconhecida pela OMS e pela legislação brasileira. As casas de apostas têm deveres legais com quem desenvolve esse transtorno — e quando falham, respondem civilmente.`,
    cta_titulo: `Uma avaliação. Sigilosa. Gratuita.`,
    cta_subtexto: `Conte o que aconteceu. Você recebe orientação sobre cuidado e sobre os caminhos que a lei prevê — sem custo, sem compromisso.`,
    meta_sufixo: `Avaliação técnica e sigilosa. Lei 14.790/2023.`
  },
  {
    // 17 — dinheiro que não volta
    h1: `O dinheiro que você perdeu<br><em>pode não ter ido embora<br>de forma legal.</em>`,
    tagline: `A Lei 14.790/2023 impõe deveres claros às plataformas de apostas. Quando esses deveres são descumpridos com quem tem ludopatia, existe base jurídica para agir.`,
    cta_titulo: `Saiba se o seu caso tem fundamento`,
    cta_subtexto: `Avaliação gratuita, sigilosa e sem compromisso. Você recebe orientação individual sobre cuidado e sobre os caminhos legais disponíveis.`,
    meta_sufixo: `Avaliação gratuita, sem compromisso. Lei 14.790/2023.`
  },
  {
    // 18 — decisão de hoje
    h1: `A decisão mais importante<br>que você pode tomar hoje<br><em>é pedir ajuda.</em>`,
    tagline: `Ludopatia tem tratamento. E as plataformas que lucraram enquanto você adoecia têm obrigações legais pelo que aconteceu. Os dois caminhos começam com uma conversa.`,
    cta_titulo: `Comece agora, com sigilo`,
    cta_subtexto: `Sem julgamento, sem custo, sem compromisso. Você recebe orientação sobre tratamento e sobre os seus direitos. Um passo de cada vez.`,
    meta_sufixo: `Ajuda e orientação jurídica sigilosa. Lei 14.790/2023.`
  },
  {
    // 19 — a plataforma sabia
    h1: `A plataforma sabia<br>que você estava doente.<br><em>E continuou deixando entrar.</em>`,
    tagline: `Ignorar sinais de comportamento compulsivo é uma violação direta da Lei 14.790/2023. A responsabilidade por isso não é sua — é da empresa que lucrou enquanto te via adoecer.`,
    cta_titulo: `Entenda o que aconteceu com você`,
    cta_subtexto: `Avaliação individual, sigilosa e gratuita. Você recebe orientação sobre os deveres que foram descumpridos e sobre os seus direitos. Sem compromisso.`,
    meta_sufixo: `Responsabilidade das plataformas. Lei 14.790/2023.`
  },
  {
    // 20 — ninguém entende
    h1: `Você sente que ninguém<br>entende o que<br><em>você está passando.</em>`,
    tagline: `Ludopatia é invisível para quem não viveu. Mas existe quem entende, existe tratamento e existe amparo na lei para quem passou por isso apostando online.`,
    cta_titulo: `Aqui alguém vai entender`,
    cta_subtexto: `Sem julgamento, sem custo. Você conta o que aconteceu e recebe orientação sobre cuidado e sobre os seus direitos previstos em lei. Conversa sigilosa.`,
    meta_sufixo: `Acolhimento e orientação jurídica. Lei 14.790/2023.`
  },
];

module.exports = { copies };
