import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from './Button';

const Founder: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        <motion.div
          ref={ref}
          className="w-full max-w-xl lg:max-w-lg mb-10 lg:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            Fale com nossa fundadora.
          </h2>
          <p className="text-lg text-primary-700 mb-6">
            A Solange é contadora com mais de 20 anos de experiência ajudando empresas com suas rotinas fiscais. Seu objetivo com a Conte é ajudar as pessoas que prestam serviços para empresas como PJs a não se preocuparem mais com obrigações além de seus próprios serviços.
          </p>
          <p className="text-lg text-primary-700 mb-8">
            Tem dúvidas se a Conte pode te ajudar?
          </p>
          
          <a
            href="https://wa.me/5541987016965"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="primary">
              Conversar com Solange
            </Button>
          </a>
        </motion.div>
        
        <motion.div
          className="w-full max-w-md flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="https://i.ibb.co/Kc7xyR8X/Beige-Aesthetic-Feminine-Business-Twitter-Profile-Picture-1.png"
            alt="Solange Vaz, fundadora da Conte"
            className="rounded-[15px] object-contain w-full h-auto max-h-[480px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;