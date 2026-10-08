import { INSTAGRAM_URL, SIGNUP_URL, SITE_URL } from '../lib/links';

const ORG_ID = `${SITE_URL}/#organization`;

export const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'AccountingService'],
    '@id': ORG_ID,
    name: 'Conte',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.jpg`,
    image: `${SITE_URL}/og-image.png`,
    description: 'Contabilidade online para PJ e MEI com contadora dedicada e atendimento pelo WhatsApp.',
    telephone: '+55-41-98701-6965',
    taxID: '37.526.805/0001-83',
    priceRange: 'R$99–R$359/mês',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Curitiba',
      addressRegion: 'PR',
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-41-98701-6965',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    sameAs: [INSTAGRAM_URL],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Conte',
    url: `${SITE_URL}/`,
    inLanguage: 'pt-BR',
    publisher: { '@id': ORG_ID },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contabilidade online para PJ e MEI',
    serviceType: 'Contabilidade',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    offers: [
      { name: 'Para MEIs', price: '99.00' },
      { name: 'Para ME e EPP', price: '359.00' },
    ].map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      url: SIGNUP_URL,
      priceCurrency: 'BRL',
      price: plan.price,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.price,
        priceCurrency: 'BRL',
        unitCode: 'MON',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
    })),
  },
];
