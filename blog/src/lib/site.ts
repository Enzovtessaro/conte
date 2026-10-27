export const SITE = {
  name: 'Blog da Conte',
  url: 'https://blog.sejaconte.com.br',
  description:
    'Contabilidade para profissionais de tecnologia que trabalham como PJ: impostos, nota fiscal, Simples Nacional, pró-labore e recebimento do exterior, explicados por contadoras.',
  locale: 'pt_BR',
  lang: 'pt-BR',
  logo: '/brand/logo-conte.png',
  mainSite: 'https://sejaconte.com.br',
  whatsapp: 'https://wa.me/5541987016965?text=Ol%C3%A1%2C%20vim%20do%20blog%20e%20quero%20saber%20mais%20sobre%20a%20Conte',
  postsPerPage: 12,
};

export const ORG = {
  '@type': 'Organization',
  '@id': `${SITE.mainSite}/#organization`,
  name: 'Conte',
  legalName: 'Conte Contabilidade',
  url: SITE.mainSite,
  logo: { '@type': 'ImageObject', url: `${SITE.url}${SITE.logo}` },
  description: 'Contabilidade online com atendimento humano para profissionais de tecnologia que atuam como PJ no Brasil.',
  areaServed: 'BR',
};

export const CATEGORIES = {
  'contabilidade': { name: 'Contabilidade', description: 'Rotina contábil da PJ: obrigações, fechamento, troca de contador e organização financeira.' },
  'planejamento-fiscal': { name: 'Planejamento Fiscal', description: 'Como pagar menos imposto dentro da lei: regime tributário, Fator R, pró-labore e distribuição de lucros.' },
  'tributacao': { name: 'Tributação', description: 'Simples Nacional, Lucro Presumido, ISS, IRPF e os impostos que incidem sobre quem trabalha como PJ.' },
  'prestacao-de-servico': { name: 'Prestação de Serviço', description: 'Contratos, nota fiscal de serviço, clientes no exterior e o dia a dia de quem presta serviço como PJ.' },
  'servicos-digitais': { name: 'Serviços Digitais', description: 'Ferramentas e serviços digitais para a PJ: certificado, emissores de nota, bancos e automação.' },
  'burocracia': { name: 'Burocracia', description: 'Abertura, alteração e baixa de CNPJ, CNAE, alvarás e cadastros sem dor de cabeça.' },
  'certificacao': { name: 'Certificação', description: 'Certificado digital e-CNPJ: quando precisa, qual escolher e como usar.' },
  'atendimento-humano': { name: 'Atendimento Humano', description: 'Por que contabilidade com gente de verdade faz diferença para quem trabalha como PJ.' },
} as const;
export type CategorySlug = keyof typeof CATEGORIES;
export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as [CategorySlug, ...CategorySlug[]];

export const AUTHORS = {
  'solange-vaz': {
    name: 'Solange Vaz',
    role: 'Contadora e fundadora da Conte',
    image: '/brand/solange-vaz.jpg',
    bio: 'Contadora há mais de 20 anos, ajuda profissionais de tecnologia que trabalham como PJ a pagar o imposto certo e cuidar do CNPJ sem dor de cabeça.',
    sameAs: [] as string[],
  },
} as const;
export type AuthorSlug = keyof typeof AUTHORS;
export const AUTHOR_SLUGS = Object.keys(AUTHORS) as [AuthorSlug, ...AuthorSlug[]];
