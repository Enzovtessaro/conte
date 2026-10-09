import { BLOG_URL } from '../lib/links';

const post = (slug: string, title: string) => ({ title, url: `${BLOG_URL}/post/${slug}` });

export const faqs = [
  {
    q: 'Já tenho contabilidade. É complicado trocar para a Conte?',
    a: 'Não. Você faz seu cadastro e a gente cuida da troca junto com a sua contabilidade atual.',
    post: post('trocar-de-contador-sem-perder-informacoes-checklist', 'Como trocar de contador sem perder suas informações: checklist'),
  },
  {
    q: 'A abertura da empresa é grátis mesmo?',
    a: 'Sim. A Conte não cobra para abrir a sua empresa, em nenhum dos planos.',
  },
  {
    q: 'Vou falar com um contador de verdade?',
    a: 'Sim. Você tem uma contadora dedicada que conhece você e sua PJ, e fala com ela direto pelo WhatsApp. Nada de robô ou fila de tickets.',
    post: post('contador-pessoal-aumenta-lucro-pj', 'Como o contador pessoal pode aumentar seu lucro sendo PJ'),
  },
  {
    q: 'Recebo de empresa do exterior. A Conte atende o meu caso?',
    a: 'Sim. O plano para ME e EPP é feito também para quem presta serviços para empresas de fora do Brasil.',
    post: post('tributacao-servicos-para-exterior-o-que-muda', 'Tributação para quem presta serviço ao exterior: o que muda?'),
  },
  {
    q: 'Qual plano é o meu?',
    a: 'Se você é MEI, o plano para MEIs (R$99/mês). Se já passou do MEI, o plano para ME e EPP (R$359/mês). Na dúvida, chama a gente no WhatsApp que a gente te ajuda a escolher.',
    post: post('mudando-de-mei-para-simples-guia-2025', 'Mudando de MEI para Simples: guia rápido e prático'),
  },
];
