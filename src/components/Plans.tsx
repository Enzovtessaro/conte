import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import Button from './Button';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanProps {
  title: string;
  description: string;
  price: string;
  features: PlanFeature[];
  isPopular?: boolean;
  onOpenCompanyForm: () => void;
}

const Plan: React.FC<PlanProps> = ({ title, description, price, features, isPopular, onOpenCompanyForm }) => (
  <div className={`p-8 rounded-[20px] ${isPopular ? 'bg-primary-900 text-white' : 'bg-gray-50'}`}>
    {isPopular && (
      <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-white text-primary-900 mb-4">
        Mais Popular
      </span>
    )}
    <h3 className={`text-2xl font-bold ${isPopular ? 'text-white' : 'text-primary-900'} mb-2`}>
      {title}
    </h3>
    <p className={`text-sm mb-4 ${isPopular ? 'text-gray-200' : 'text-gray-500'}`}>
      {description}
    </p>
    <div className="mb-6">
      <span className={`text-3xl font-bold ${isPopular ? 'text-white' : 'text-primary-900'}`}>
        {price}
      </span>
      <span className={`${isPopular ? 'text-gray-200' : 'text-gray-500'}`}>/mês</span>
    </div>
    <div className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className={`p-1 rounded-full ${isPopular ? 'bg-white text-primary-900' : 'bg-black text-white'}`}>
            <Check size={16} />
          </div>
          <span className={`${isPopular ? 'text-gray-200' : 'text-gray-600'}`}>
            {feature.text}
          </span>
        </div>
      ))}
    </div>
    <Button 
      onClick={onOpenCompanyForm}
      variant={isPopular ? 'white' : 'primary'}
      className="w-full"
    >
      Começar Agora
    </Button>
  </div>
);

interface PlansProps {
  onOpenCompanyForm: () => void;
}

const Plans: React.FC<PlansProps> = ({ onOpenCompanyForm }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      title: 'Iniciante',
      price: 'R$99',
      description: 'Para MEIs',
      features: [
        { text: 'Abertura de empresa', included: true },
        { text: 'Uma nota fiscal por mês', included: true },
        { text: 'Emissão de guia de imposto', included: true },
        { text: 'Declaração anual', included: true },
        { text: 'Atendimento humanizado', included: true },
      ],
    },
    {
      title: 'Profissional',
      price: 'R$249',
      description: 'PJs no Simples Nacional que prestam serviços no Brasil ou faturam até 15 mil por mês',
      features: [
        { text: 'Tudo do plano inicial', included: true },
        { text: 'Planejamento e consultoria tributária', included: true },
        { text: 'Pró-labore do sócio', included: true },
        { text: 'Declarações acessórias mensais', included: true },
        { text: 'Contabilidade completa', included: true },
      ],
      isPopular: true,
    },
    {
      title: 'Especialista',
      price: 'R$359',
      description: 'PJs fora do Simples Nacional ou que prestam serviços pro exterior ou faturam mais de 15 mil por mês',
      features: [
        { text: 'Tudo do plano profissional', included: true },
        { text: 'Assessor dedicado', included: true },
        { text: 'Atendimento prioritário', included: true },
        { text: 'Certificado digital gratuito', included: true },
        { text: 'Notas fiscais ilimitadas', included: true },
      ],
    },
  ];

  return (
    <section className="py-20 bg-white" id="plans">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg text-primary-600">
            Temos o plano perfeito para cada fase da sua carreira
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Plan
                title={plan.title}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
                onOpenCompanyForm={onOpenCompanyForm}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans; 