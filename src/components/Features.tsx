import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FeatureProps } from '../types';
import Button from './Button';

const Feature: React.FC<FeatureProps> = ({ title, description, icon, details }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-[15px] border border-gray-100 shadow-sm text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-primary-900">{title}</h3>
      <p className="text-primary-700 mb-5">{description}</p>
      <div className="space-y-2">
        {details.map((detail, index) => (
          <p key={index} className="text-primary-600 text-sm">{detail}</p>
        ))}
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const handleOpenNewCompanyForm = () => {
    window.open('https://form.respondi.app/FRVJmfar', '_blank');
  };

  const handleOpenSwitchForm = () => {
    window.open('https://form.respondi.app/mdhxB362', '_blank');
  };

  const features: FeatureProps[] = [
    {
      title: 'Tenha um contador pessoal',
      description: 'Você será acompanhado(a) por um contador(a) que saberá tudo sobre você e sua PJ.',
      icon: <img src="https://i.ibb.co/BVYL37gS/contadora.png" alt="Contador pessoal" className="w-24 h-24" />,
      details: [
        'Nada de ficar pulando de pessoa para pessoa que não conhece você e sua PJ.'
      ]
    },
    {
      title: 'A melhor estratégia fiscal',
      description: 'Montaremos uma estratégia fiscal personalizada para sua PJ pagar apenas o imposto necessário.',
      icon: <img src="https://i.ibb.co/4RP1BhZh/estrategia.png" alt="Estratégia fiscal" className="w-24 h-24" />,
      details: [
        'Nada de impostos surpresa ou de pagar mais do que precisa.'
      ]
    },
    {
      title: 'Suporte humano e ágil',
      description: 'Na Conte você terá um time humano que te ajudará rapidamente.',
      icon: <img src="https://i.ibb.co/xSbcRLtX/suporte.png" alt="Suporte humano" className="w-24 h-24" />,
      details: [
        'Nada de enviar um ticket que demora 5 dias para ser solucionado.'
      ]
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            Deixe a burocracia da sua PJ para nós.
          </h2>
          <p className="text-lg text-primary-600">
            Conte conosco desde a abertura de empresa, até emissão de nota fiscal, e até o pagamento dos impostos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              details={feature.details}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button onClick={handleOpenNewCompanyForm}>Abrir Empresa Grátis</Button>
          <Button variant="secondary" onClick={handleOpenSwitchForm}>Mudar para Conte</Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;