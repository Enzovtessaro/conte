import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Seo from '../components/Seo';

const NotFound: React.FC = () => (
  <main className="flex min-h-[70vh] items-center justify-center px-4 pt-32 pb-24">
    <Seo title="Página não encontrada | Conte" description="Esta página não existe ou mudou de endereço." path="/404" noindex />
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">Erro 404</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink">
        Página não encontrada
      </h1>
      <p className="mt-4 text-lg text-ink-muted">Esta página não existe ou mudou de endereço.</p>
      <Button href="/" size="lg" className="mt-8">
        Voltar para o início
        <ArrowRight size={18} />
      </Button>
    </div>
  </main>
);

export default NotFound;
