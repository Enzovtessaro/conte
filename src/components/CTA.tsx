import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Button from './Button';
import Reveal from './Reveal';
import { SIGNUP_URL, WHATSAPP_URL } from '../lib/links';

const CTA: React.FC = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="relative overflow-hidden rounded-[36px] bg-ink px-6 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#FFFFFF1F_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]"
          />
          <h2 className="relative mx-auto max-w-3xl font-display text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white text-balance">
            Bora deixar a burocracia <span className="font-serif font-normal italic text-brand">para quem sabe?</span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl text-lg md:text-xl text-white/60 text-pretty">
            Seja Conte e não fique lidando com a contabilidade da sua empresa sozinho(a).
          </p>
          <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={SIGNUP_URL} size="lg" variant="white">
              Abrir empresa grátis
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href={WHATSAPP_URL} external size="lg" variant="accent">
              <MessageCircle size={18} />
              Falar no WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTA;
