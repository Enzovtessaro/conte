import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from './Button';

interface CTAProps {
  onOpenCompanyForm: () => void;
  onSwitchForm: () => void;
}

const CTA: React.FC<CTAProps> = ({ onOpenCompanyForm, onSwitchForm }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto text-center bg-gray-50 p-12 rounded-[15px] border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 leading-tight">
            Bora deixar a burocracia para quem sabe?
          </h2>
          <p className="text-xl text-primary-600 mb-10 leading-relaxed">
            Seja Conte e não fique lidando com a contabilidade da sua empresa sozinho(a).
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={onOpenCompanyForm}
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Abrir Empresa Grátis
            </Button>
            <Button 
              variant="secondary"
              onClick={onSwitchForm}
              className="hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all"
            >
              Mudar para Conte
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;