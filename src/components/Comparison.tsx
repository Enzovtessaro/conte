import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';
import Button from './Button';

interface ComparisonItemProps {
  text: string;
  isPositive: boolean;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({ text, isPositive }) => {
  const Icon = isPositive ? Check : X;
  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className={`p-1 rounded-full ${isPositive ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
        <Icon size={16} />
      </div>
      <span className={isPositive ? 'text-primary-900' : 'text-primary-600'}>{text}</span>
    </div>
  );
};

const Comparison: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const conteFeatures = [
    'Abre sua empresa gratuitamente',
    'Emite suas notas',
    'Envia seus impostos por WhatsApp',
    'Atendimento humano',
    'Resolve suas dúvidas com rapidez'
  ];

  const otherFeatures = [
    '(As vezes) abre sua empresa gratuitamente',
    'Não emite suas notas por você',
    'Não te envia o imposto diretamente',
    'Atendimento por robôs e lista de espera',
    'Demora dias para resolver suas dúvidas'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            Conte vs outras
          </h2>
          <p className="text-lg text-primary-600">
            A Conte não é uma contabilidade online que vai deixar você sozinho para cuidar das rotinas contábeis da sua empresa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            className="bg-gray-50 p-8 rounded-[15px]"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-primary-900 mb-6">Conte</h3>
            {conteFeatures.map((feature, index) => (
              <ComparisonItem key={index} text={feature} isPositive={true} />
            ))}
            <div className="mt-8">
              <p className="text-xl font-bold text-primary-900 mb-4">A partir de R$99/mês</p>
              <Button>Abrir Empresa Grátis</Button>
            </div>
          </motion.div>

          <motion.div
            className="p-8 rounded-[15px] border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-500 mb-6">Outras</h3>
            {otherFeatures.map((feature, index) => (
              <ComparisonItem key={index} text={feature} isPositive={false} />
            ))}
            <div className="mt-8">
              <p className="text-xl font-bold text-gray-500 mb-4">Custa sua paciência</p>
              <Button variant="secondary">Mude para Conte</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;