import React from 'react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'A Solange é muito prestativa e o time da Conte facilita muito minhas obrigações fiscais. Confio totalmente neles.',
    author: 'Ricardo Ponzio',
    role: 'Especialista SAP @ Electrolux',
    image: '/clientes/ricardo.jpg',
  },
  {
    quote: 'Saí de uma contabilidade online para a Conte e agora sou muito melhor atendido, tenho um ótimo acompanhamento e ainda pago menos imposto.',
    author: 'Enzo Tessaro',
    role: 'PM @ Toggl',
    image: '/clientes/enzo.jpg',
  },
  {
    quote: 'A Solange é muito atenciosa e sempre me ajuda com minhas dúvidas. Recomendo a todos que buscam uma contabilidade de qualidade.',
    author: 'Marcos',
    role: 'Engenheiro de Dados @ Ambev',
    image: '/clientes/marcos.jpg',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="scroll-mt-24 bg-paper-deep py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Clientes"
          title={
            <>
              Nossos clientes <span className="font-serif font-normal italic">amam</span> a Conte.
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <Reveal key={t.author} delay={index * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-paper-line bg-white p-7 shadow-card">
                <span aria-hidden className="font-serif text-6xl leading-none text-brand">“</span>
                <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-ink-soft">{t.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-paper-line pt-6">
                  <img src={t.image} alt={t.author} width={44} height={44} loading="lazy" decoding="async" className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-ink">{t.author}</p>
                    <p className="text-sm text-ink-muted">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
