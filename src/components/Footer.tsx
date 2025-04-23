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
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Linkedin size={20} />
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
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white transition-colors">Carreira</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-primary-300">hello@conte.com.br</li>
              <li className="text-primary-300">+55 (11) 9999-9999</li>
              <li className="text-primary-300">São Paulo, SP</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-400 text-sm">
            &copy; {new Date().getFullYear()} Conte. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-400 hover:text-white text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-primary-400 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;