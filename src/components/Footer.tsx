import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Conte.</h3>
            <p className="text-primary-300 mb-4">
              Contabilidade com atendimento humanizado para diminuir suas dores de cabeça.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/seja.conte" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Abertura de Empresa</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Contabilidade</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Gestão Fiscal</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Consultoria</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Conte</h4>
            <ul className="space-y-2">
              <li><a href="https://blog.sejaconte.com.br" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://wa.me/5541987016965" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-primary-300">oi@conte.com.br</li>
              <li className="text-primary-300">+55 (41) 98701-6965</li>
              <li className="text-primary-300">Curitiba, PR</li>
              <li className="text-primary-300">37.526.805/0001-83</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-400 text-sm">
            &copy; {new Date().getFullYear()} Conte. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;