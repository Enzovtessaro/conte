import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import PhoneChat from './PhoneChat';
import { SIGNUP_URL, WHATSAPP_URL } from '../lib/links';

const ease = [0.22, 1, 0.36, 1] as const;

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 9.42 9.43c0 5.2-4.23 9.42-9.43 9.42m8.02-17.45A11.26 11.26 0 0 0 12.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.65l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.35-11.35a11.28 11.28 0 0 0-3.33-8.03" />
  </svg>
);

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Contabilidade para quem é PJ
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="mt-6 font-display text-[44px] leading-[1.02] sm:text-6xl lg:text-[68px] font-semibold tracking-[-0.045em] text-ink text-balance"
            >
              Foque no seu serviço. Nós cuidamos da{' '}
              <span className="font-serif font-normal italic tracking-[-0.02em]">sua PJ.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
              className="mx-auto mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-ink-muted text-pretty lg:mx-0"
            >
              Nota fiscal, imposto e dúvidas resolvidos no WhatsApp, com uma contadora que conhece você e sua PJ.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button href={SIGNUP_URL} size="lg">
                Abra ou migre sua PJ
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-4 hover:underline"
              >
                <WhatsAppIcon className="h-5 w-5 text-brand" />
                Falar com a gente no WhatsApp
              </a>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <PhoneChat />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
