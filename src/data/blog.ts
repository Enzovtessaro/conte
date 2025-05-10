export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'your-inbox-is-a-panic-attack-heres-how-were-fixing-it-with-notion-mail',
    title: "Email wasn't designed for modern work—so we started from scratch",
    summary: 'Como a Notion repensou o email para o futuro do trabalho. Veja o que mudou e como isso pode impactar sua rotina.',
    content: `<h2>O futuro do email</h2><p>Desde Ray Tomlinson até hoje, o email evoluiu, mas ainda precisa se adaptar ao mundo moderno. Veja como a Notion está reinventando o conceito de inbox.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    author: 'Equipe Conte',
    date: '2024-06-01',
    tags: ['tecnologia', 'produtividade'],
  },
  {
    slug: 'como-escolher-o-melhor-regime-tributario',
    title: 'Como escolher o melhor regime tributário para sua empresa',
    summary: 'Descubra os principais fatores para escolher entre Simples Nacional, Lucro Presumido e Lucro Real.',
    content: `<h2>Regimes tributários</h2><p>Entenda as diferenças e vantagens de cada regime para pagar menos impostos e crescer com segurança.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    author: 'Equipe Conte',
    date: '2024-05-20',
    tags: ['contabilidade', 'impostos'],
  },
]; 