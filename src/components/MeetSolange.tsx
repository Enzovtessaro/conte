import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { CRC_REGISTRATION } from '../lib/links';

const MeetSolange: React.FC = () => {
  return (
    <section id="contadora" className="scroll-mt-24 bg-paper-deep py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Sua contadora"
          title={
            <>
              Conheça a Solange, <span className="font-serif font-normal italic">sua contadora.</span>
            </>
          }
          description="A rotina anda rápido pelo WhatsApp. Para dúvidas e decisões, você tem a Solange: ela conhece sua PJ, responde no mesmo WhatsApp e marca reuniões com você quando precisa."
        />

        <Reveal className="relative mx-auto max-w-4xl">
          <div className="rounded-[28px] bg-ink p-2 shadow-float">
            <div className="relative overflow-hidden rounded-[22px] bg-ink-soft" style={{ paddingTop: '56.25%' }}>
              <iframe
                src="https://go.screenpal.com/player/cT1eccn6sTn?width=100%&height=100%&ff=1&title=0&controls=0&a=0"
                className="absolute inset-0 h-full w-full border-0"
                scrolling="no"
                allowFullScreen
                loading="lazy"
                title="Conheça a Solange, sua contadora na Conte"
              />
            </div>
          </div>
          {CRC_REGISTRATION && (
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-muted">
              <ShieldCheck size={16} className="text-brand-dark" />
              Contadora registrada no {CRC_REGISTRATION}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default MeetSolange;
