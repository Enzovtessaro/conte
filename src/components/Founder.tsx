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
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            ref={ref}
            className="w-full lg:w-1/2 mb-10 lg:mb-0"
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
            
            <Button variant="primary" className="inline-block">
              Conversar com Solange
            </Button>
          </motion.div>
          
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-4 rounded-[15px] shadow-lg border border-gray-100 relative mx-auto max-w-md">
              <img
                src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg"
                alt="Solange, fundadora da Conte"
                className="w-full rounded-[15px]"
              />
              
              <div className="absolute -bottom-10 -right-10 bg-white p-4 rounded-[15px] shadow-lg border border-gray-100 hidden md:block">
                <img
                  src="https://images.pexels.com/photos/6393013/pexels-photo-6393013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Dashboard da plataforma Conte"
                  className="w-32 h-24 object-cover rounded-[15px]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;