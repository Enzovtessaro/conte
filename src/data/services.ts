import { BLOG_URL } from '../lib/links';

export interface ServiceLink {
  title: string;
  url: string;
}

export interface ServiceContent {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  audience: string[];
  steps: { title: string; description: string }[];
  included: string[];
  price: { value: string; label: string; note: string };
  faqs: { q: string; a: string }[];
  reading: ServiceLink[];
  tool?: { to: string; title: string; description: string };
  source?: ServiceLink;
}

const post = (slug: string, title: string): ServiceLink => ({ title, url: `${BLOG_URL}/post/${slug}` });

const completeIncluded = [
  'Contabilidade completa',
  'Notas fiscais ilimitadas, emitidas pela Conte',
  'Guias de imposto prontas no seu WhatsApp',
  'Planejamento e consultoria tributária',
  'Pró-labore do sócio',
  'Declarações acessórias mensais',
  'Contadora dedicada e atendimento prioritário',
  'Endereço fiscal gratuito',
];

export const services: ServiceContent[] = [
  {
    slug: 'abrir-empresa',
    seoTitle: 'Abrir empresa grátis: CNPJ para PJ com contadora | Conte',
    seoDescription:
      'Abra sua empresa (CNPJ) de graça com a Conte. A contadora define o melhor enquadramento para você pagar menos imposto e tudo acontece pelo WhatsApp.',
    eyebrow: 'Abertura de empresa',
    h1: 'Abra sua empresa grátis, com uma contadora do seu lado',
    intro:
      'A Conte abre sua empresa (CNPJ) sem cobrar nada pela abertura. Antes de abrir, sua contadora entende o que você faz e escolhe o melhor enquadramento para você pagar menos imposto. Depois, nota fiscal e imposto ficam com a gente, direto no seu WhatsApp.',
    audience: [
      'Quem vai sair da CLT e começar a trabalhar como PJ',
      'Quem recebeu uma proposta PJ de empresa do Brasil ou do exterior',
      'Quem trabalha como autônomo e quer pagar menos imposto com um CNPJ',
      'Quem quer começar como MEI e crescer depois',
    ],
    steps: [
      { title: 'Faça seu cadastro', description: 'Crie sua conta em poucos minutos. Ainda não precisa ter os documentos em mãos.' },
      { title: 'Converse com sua contadora', description: 'Ela entende sua atividade, seu faturamento e seus clientes para definir o melhor enquadramento.' },
      { title: 'A gente abre seu CNPJ', description: 'Cuidamos de todo o processo de abertura e te mantemos informado pelo WhatsApp.' },
      { title: 'Emita sua primeira nota', description: 'Com a empresa aberta, você pede a nota no WhatsApp e a gente emite.' },
    ],
    included: ['Abertura de empresa grátis', ...completeIncluded],
    price: { value: '359', label: 'Plano completo', note: 'Abertura grátis. Se for abrir como MEI, o plano é de R$99/mês.' },
    faqs: [
      { q: 'Quanto custa abrir uma empresa com a Conte?', a: 'A Conte não cobra nada pela abertura da sua empresa, em nenhum dos planos.' },
      { q: 'É melhor abrir como MEI ou como ME?', a: 'Depende da sua atividade e de quanto você vai faturar. Sua contadora analisa o seu caso antes da abertura e indica o enquadramento que faz mais sentido.' },
      { q: 'Vale a pena sair da CLT para ser PJ?', a: 'Depende da proposta. Use a calculadora CLT vs PJ para comparar salário, benefícios e impostos, e tire suas dúvidas com a gente no WhatsApp.' },
    ],
    reading: [
      post('vale-a-pena-migrar-para-pj-profissionais-ti', 'Vale a pena migrar para PJ?'),
      post('autonomo-ou-pj-diferencas-tributos-2026', 'Autônomo ou PJ: diferenças nos tributos'),
      post('abrir-gerenciar-microempresa-me-brasil', 'Como abrir e gerenciar uma microempresa (ME)'),
    ],
    tool: { to: '/clt-vs-pj', title: 'Calculadora CLT vs PJ', description: 'Compare seu salário CLT com uma proposta PJ.' },
    source: { title: 'Redesim: abertura de empresas (gov.br)', url: 'https://www.gov.br/empresas-e-negocios/pt-br/redesim' },
  },
  {
    slug: 'trocar-de-contador',
    seoTitle: 'Trocar de contador: migre sua PJ para a Conte | Conte',
    seoDescription:
      'Quer trocar de contabilidade? A Conte cuida da migração junto com seu contador atual. Rotina no WhatsApp e uma contadora dedicada que conhece sua PJ.',
    eyebrow: 'Troca de contabilidade',
    h1: 'Troque de contador sem dor de cabeça',
    intro:
      'A Conte cuida da troca de contabilidade para você: fazemos a transição junto com o seu contador atual e você segue trabalhando normalmente. Depois da troca, a rotina anda pelo WhatsApp e você tem uma contadora dedicada que conhece a sua PJ.',
    audience: [
      'Quem está numa contabilidade online e se sente sozinho com a plataforma',
      'Quem demora dias para ter resposta do contador atual',
      'Quem acha que paga imposto demais e nunca teve um planejamento',
      'Quem quer resolver nota e imposto sem entrar em sistema nenhum',
    ],
    steps: [
      { title: 'Faça seu cadastro', description: 'Conte um pouco sobre a sua empresa e a sua contabilidade atual.' },
      { title: 'A gente fala com seu contador atual', description: 'Cuidamos da transição e da passagem dos documentos da sua empresa.' },
      { title: 'Sua contadora revisa sua PJ', description: 'Ela olha seu enquadramento e seus impostos para ver onde dá para melhorar.' },
      { title: 'Rotina no WhatsApp', description: 'A partir daí, nota, guias e dúvidas acontecem na mesma conversa.' },
    ],
    included: completeIncluded,
    price: { value: '359', label: 'Plano completo', note: 'Se sua empresa é MEI, o plano é de R$99/mês.' },
    faqs: [
      { q: 'É complicado trocar de contador?', a: 'Não. Você faz seu cadastro e a gente cuida da troca junto com a sua contabilidade atual.' },
      { q: 'Posso trocar de contador no meio do ano?', a: 'Pode. Fale com a gente no WhatsApp que a sua contadora explica como fica a transição no seu caso.' },
      { q: 'Vou pagar menos imposto trocando para a Conte?', a: 'Depende do seu caso. Na prática, é comum quem chega pagando cerca de 10% de imposto passar a pagar perto de 6% com o enquadramento e o planejamento certos.' },
    ],
    reading: [
      post('trocar-de-contador-sem-perder-informacoes-checklist', 'Como trocar de contador sem perder suas informações: checklist'),
      post('7-sinais-que-seu-cnpj-deve-mudar-de-contabilidade', '7 sinais de que seu CNPJ deve mudar de contabilidade'),
      post('custo-oculto-contabilidades-online-pj-tech-2025', 'O custo oculto das contabilidades online'),
    ],
  },
  {
    slug: 'contabilidade-para-exterior',
    seoTitle: 'Contabilidade para PJ que recebe do exterior | Conte',
    seoDescription:
      'Contabilidade para quem presta serviço como PJ para empresas de fora do Brasil. Nota fiscal, imposto e planejamento com uma contadora dedicada, pelo WhatsApp.',
    eyebrow: 'PJ para o exterior',
    h1: 'Contabilidade para quem trabalha como PJ para o exterior',
    intro:
      'A Conte é a contabilidade para quem presta serviço como PJ para empresas de fora do Brasil. A gente emite suas notas, calcula seus impostos e sua contadora monta o planejamento para você pagar só o necessário sobre o que recebe de fora.',
    audience: [
      'Desenvolvedores, designers e profissionais de produto contratados por empresas de fora',
      'Quem recebe em dólar, euro, libra ou outra moeda como PJ',
      'Quem vai sair da CLT para trabalhar para uma empresa estrangeira',
      'Quem já recebe do exterior e quer revisar quanto paga de imposto',
    ],
    steps: [
      { title: 'Faça seu cadastro', description: 'Conte para quem você trabalha e como recebe.' },
      { title: 'Planejamento com sua contadora', description: 'Ela define o enquadramento e verifica se seu serviço exportado tem isenções, como ISS, PIS e COFINS.' },
      { title: 'Nota a cada recebimento', description: 'Você avisa no WhatsApp e a gente emite a nota do serviço prestado para o exterior.' },
      { title: 'Impostos no automático', description: 'A guia chega pronta no seu WhatsApp, com o valor calculado.' },
    ],
    included: completeIncluded,
    price: { value: '359', label: 'Plano completo', note: 'Inclui atendimento para quem presta serviços para o exterior.' },
    faqs: [
      { q: 'A Conte atende quem recebe de empresa do exterior?', a: 'Sim. O plano completo, de R$359/mês, é feito também para quem presta serviços para empresas de fora do Brasil.' },
      { q: 'Quem exporta serviço paga menos imposto?', a: 'Serviços exportados podem ter isenção de alguns tributos, como ISS, PIS e COFINS, dependendo do caso. Sua contadora verifica o que se aplica a você.' },
      { q: 'Quanto sobra no meu bolso trabalhando para fora?', a: 'Use a calculadora PJ exterior para simular quanto sobra depois de impostos e taxas e comparar o Simples Nacional com o Lucro Presumido.' },
    ],
    reading: [
      post('tributacao-servicos-para-exterior-o-que-muda', 'Tributação para quem presta serviço ao exterior: o que muda?'),
      post('nota-fiscal-internacional-erros-comuns-e-como-corrigir-rapido', 'Nota fiscal internacional: erros comuns'),
      post('gestao-financeira-pj-tech-exterior', 'Gestão financeira para PJ que trabalha para o exterior'),
    ],
    tool: { to: '/calculadora', title: 'Calculadora PJ exterior', description: 'Simule quanto sobra no seu bolso recebendo de fora.' },
    source: { title: 'Portal do Simples Nacional (Receita Federal)', url: 'https://www8.receita.fazenda.gov.br/simplesnacional/' },
  },
  {
    slug: 'contabilidade-mei',
    seoTitle: 'Contabilidade para MEI por R$99/mês, pelo WhatsApp | Conte',
    seoDescription:
      'Contabilidade para MEI por R$99/mês: guia de imposto, nota fiscal e declaração anual com atendimento humano pelo WhatsApp. Abertura do MEI grátis.',
    eyebrow: 'Contabilidade para MEI',
    h1: 'Contabilidade para MEI por R$99 por mês',
    intro:
      'A Conte cuida da rotina do seu MEI (microempreendedor individual) por R$99/mês: guia de imposto todo mês, nota fiscal e declaração anual, com atendimento humano pelo WhatsApp. E quando você crescer e passar do MEI, a mesma contadora cuida da mudança.',
    audience: [
      'Quem é MEI e quer parar de se preocupar com guia e declaração',
      'Quem vai abrir um MEI agora',
      'Quem está chegando perto do limite de faturamento do MEI',
    ],
    steps: [
      { title: 'Faça seu cadastro', description: 'Leva poucos minutos.' },
      { title: 'A gente assume a rotina', description: 'Guia de imposto e nota fiscal passam a chegar pelo WhatsApp.' },
      { title: 'Declaração anual em dia', description: 'Cuidamos da declaração anual do MEI para você.' },
      { title: 'Cresceu? A gente muda junto', description: 'Quando passar do MEI, sua contadora cuida da transição para ME.' },
    ],
    included: ['Abertura do MEI', 'Uma nota fiscal por mês', 'Emissão de guia de imposto', 'Declaração anual', 'Atendimento humanizado'],
    price: { value: '99', label: 'Plano MEI', note: 'O plano MEI é só para MEI e não inclui contabilidade completa nem pró-labore.' },
    faqs: [
      { q: 'Quanto custa a contabilidade para MEI na Conte?', a: 'R$99 por mês, com guia de imposto, uma nota fiscal por mês, declaração anual e atendimento pelo WhatsApp.' },
      { q: 'MEI precisa de contador?', a: 'Não é obrigatório, mas um contador evita multas, garante que guias e declaração estejam em dia e te avisa quando for a hora de deixar o MEI.' },
      { q: 'O que acontece quando eu passar do limite do MEI?', a: 'Sua empresa precisa mudar de enquadramento. A sua contadora cuida dessa transição e você passa para o plano completo.' },
    ],
    reading: [
      post('mudando-de-mei-para-simples-guia-2025', 'Mudando de MEI para Simples: guia rápido e prático'),
      post('migrar-mei-para-ltda-checklist-prazos', 'Como migrar de MEI para LTDA sem perder prazos'),
      post('guia-pj-como-evitar-multas-desenquadramento-fiscal', 'Como evitar multas no desenquadramento'),
    ],
    source: { title: 'O que é MEI (Portal do Empreendedor, gov.br)', url: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor' },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
