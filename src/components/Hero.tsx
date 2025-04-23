import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Modal from './Modal';
import OpenCompanyForm from './OpenCompanyForm';
import SwitchToConteForm from './SwitchToConteForm';

const Hero: React.FC = () => {
  const [isOpenCompanyFormOpen, setIsOpenCompanyFormOpen] = useState(false);
  const [isSwitchFormOpen, setIsSwitchFormOpen] = useState(false);

  return (
    <section id="hero" className="pt-28 pb-16 md:pt-32 md:pb-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="w-full lg:w-1/2 mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-8">
              Foque no seu serviço que nós cuidamos da sua PJ
            </h1>
            <p className="text-lg md:text-xl text-primary-600 mb-10 max-w-xl leading-relaxed">
              Contabilidade com atendimento humanizado para diminuir suas dores de cabeça e te ajudar a pagar menos imposto.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button onClick={() => setIsOpenCompanyFormOpen(true)}>
                Abrir Empresa Grátis
              </Button>
              <Button variant="secondary" onClick={() => setIsSwitchFormOpen(true)}>
                Mudar para Conte
              </Button>
            </div>

            <ul className="mt-8 space-y-2 text-primary-600">
              <li>✓ Abertura de empresa gratuita</li>
              <li>✓ Emissão de notas fiscais</li>
              <li>✓ Gestão tributária completa</li>
              <li>✓ Atendimento humanizado</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-5/12 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-full overflow-hidden max-w-[550px] mx-auto">
              <img 
                src="https://i.ibb.co/qLkDMdc6/Prestadordeservico.png"
                alt="Profissional focado em seu trabalho, representando a liberdade de não se preocupar com a contabilidade" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Modal isOpen={isOpenCompanyFormOpen} onClose={() => setIsOpenCompanyFormOpen(false)}>
        <OpenCompanyForm onClose={() => setIsOpenCompanyFormOpen(false)} />
      </Modal>

      <Modal isOpen={isSwitchFormOpen} onClose={() => setIsSwitchFormOpen(false)}>
        <SwitchToConteForm onClose={() => setIsSwitchFormOpen(false)} />
      </Modal>
    </section>
  );
};

export default Hero;