import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, image }) => {
  return (
    <div className="bg-white p-6 rounded-[15px] border border-gray-100 shadow-sm text-center">
      <div className="flex justify-center mb-6">
        <img
          src={image}
          alt={author}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
      <p className="text-primary-700 mb-4 text-lg">"{quote}"</p>
      <p className="font-semibold text-primary-900">{author}</p>
      <p className="text-primary-600">{role}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials: TestimonialProps[] = [
    {
      quote: "A Solange é muito prestativa e o time da Conte facilita muito minhas obrigações fiscais. Confio totalmente neles",
      author: "Ricardo Poncio",
      role: "Especialista SAP @ Eletrolux",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      quote: "Saí de uma contabilidade online para Conte e agora sou muito melhor atendido, tenho um ótimo acompanhamento e ainda pago menos imposto",
      author: "Enzo Tessaro",
      role: "PM @ Toggl",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    },
    {
      quote: "If you have been doing this by yourself, you don't know what you're missing. Garett will impress you.",
      author: "Roger",
      role: "New York, NY",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
    }
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
            Nossos parceiros amam a Conte!
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Testimonial {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;