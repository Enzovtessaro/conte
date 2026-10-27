import { BLOG_URL } from '../lib/links';

const post = (slug: string, title: string) => ({ title, url: `${BLOG_URL}/post/${slug}` });
const source = (title: string, url: string) => ({ title, url });

export const faqs = [
  {
    q: 'Já tenho contabilidade. É complicado trocar para a Conte?',
    a: 'Não. Você faz seu cadastro e a gente cuida da troca junto com a sua contabilidade atual.',
    post: post('trocar-de-contador-sem-perder-informacoes-checklist', 'Como trocar de contador sem perder suas informações: checklist'),
  },
  {
    q: 'A abertura da empresa é grátis mesmo?',
    a: 'Sim. A Conte não cobra para abrir a sua empresa, em nenhum dos planos.',
    source: source('Redesim: abertura de empresas (gov.br)', 'https://www.gov.br/empresas-e-negocios/pt-br/redesim'),
  },
  {
    q: 'Vou falar com um contador de verdade?',
    a: 'Sim. A rotina, como pedir nota e receber guia, anda rápido pelo WhatsApp. Para dúvidas e decisões, você fala com a sua contadora dedicada no mesmo WhatsApp e pode marcar reuniões com ela.',
    post: post('contador-pessoal-aumenta-lucro-pj', 'Como o contador pessoal pode aumentar seu lucro sendo PJ'),
  },
  {
    q: 'Quanto dá para economizar de imposto?',
    a: 'Depende da sua atividade e do seu faturamento. Na prática, é comum quem chega pagando cerca de 10% de imposto sobre o faturamento passar a pagar perto de 6% com o enquadramento e o planejamento certos. São cerca de 4 pontos percentuais a menos.',
  },
  {
    q: 'Preciso aprender alguma plataforma?',
    a: 'Não. O dia a dia acontece pelo WhatsApp: você pede a nota, recebe as guias de imposto e tira dúvidas na mesma conversa.',
  },
  {
    q: 'Recebo de empresa do exterior. A Conte atende o meu caso?',
    a: 'Sim. O plano completo, de R$359/mês, é feito também para quem presta serviços para empresas de fora do Brasil.',
    source: source('Portal do Simples Nacional (Receita Federal)', 'https://www8.receita.fazenda.gov.br/simplesnacional/'),
    post: post('tributacao-servicos-para-exterior-o-que-muda', 'Tributação para quem presta serviço ao exterior: o que muda?'),
  },
  {
    q: 'Qual plano é o meu?',
    a: 'O plano completo, de R$359/mês, serve para qualquer PJ (pessoa jurídica), trabalhando para o Brasil ou para o exterior. Se você ainda é MEI (microempreendedor individual), o plano é de R$99/mês. Ele é só para MEI e não inclui contabilidade completa nem pró-labore. Na dúvida, chama a gente no WhatsApp que a gente te ajuda a escolher.',
    source: source('O que é MEI (Portal do Empreendedor, gov.br)', 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor'),
    post: post('mudando-de-mei-para-simples-guia-2025', 'Mudando de MEI para Simples: guia rápido e prático'),
  },
];
