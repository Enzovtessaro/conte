import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface HeroProps {
  onOpenCompanyForm: () => void;
  onSwitchForm: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenCompanyForm, onSwitchForm }) => {
  return (
    <section id="hero" className="pt-56 pb-16 md:pt-[12rem] md:pb-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <motion.div 
            className="max-w-3xl mx-auto mb-1 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-8">
              Foque no seu serviço que nós cuidamos da sua PJ
            </h1>
            <p className="text-lg md:text-xl text-primary-600 mb-10 max-w-xl mx-auto leading-relaxed">
              Contabilidade com atendimento humanizado para diminuir suas dores de cabeça e te ajudar a pagar menos imposto.
            </p>
          </motion.div>
          
          <motion.div 
            className="w-full max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{
              padding: '56.25% 0 0 0',
              position: 'relative',
              border: '5px solid #000',
              borderRadius: 15,
              overflow: 'hidden',
              background: '#000',
            }}>
              <iframe
                src="https://go.screenpal.com/player/cT1eccn6sTn?width=100%&height=100%&ff=1&title=0&controls=0&a=1"
                width="100%"
                height="100%"
                style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}}
                scrolling="no"
                allowFullScreen={true}
                title="Bem-vindo à Conte"
              />
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Button onClick={onOpenCompanyForm}>
                Abrir Empresa Grátis
              </Button>
              <Button variant="secondary" onClick={onSwitchForm}>
                Mudar para Conte
              </Button>
            </div>

            <ul className="space-y-2 text-primary-600 text-center">
              <li>✓ Abertura de empresa gratuita</li>
              <li>✓ Emissão de notas fiscais</li>
              <li>✓ Gestão tributária completa</li>
              <li>✓ Atendimento humanizado</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;