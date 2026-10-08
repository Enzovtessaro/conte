import React from 'react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

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
          description="Na Conte você não fala com robô nem com uma pessoa diferente a cada vez. É a Solange que acompanha sua PJ e te responde no WhatsApp."
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
        </Reveal>
      </div>
    </section>
  );
};

export default MeetSolange;
