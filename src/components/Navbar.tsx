import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './Button';
import Logo from './Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onOpenCompanyForm: () => void;
  onSwitchForm: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCompanyForm, onSwitchForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const navHeight = 80;
        const sectionTop = section.offsetTop - navHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
        setIsOpen(false);
      }
    }, 100);
  };

  const handleSectionNav = (sectionId: string) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 300);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={() => scrollToSection('hero')}>
          <Logo />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleSectionNav('features')}
            className="text-primary-800 hover:text-primary-600 transition-colors"
          >
            Serviços
          </button>
          <button 
            onClick={() => handleSectionNav('benefits')}
            className="text-primary-800 hover:text-primary-600 transition-colors"
          >
            Benefícios
          </button>
          <button 
            onClick={() => handleSectionNav('about')}
            className="text-primary-800 hover:text-primary-600 transition-colors"
          >
            Sobre
          </button>
          <Link to="/blog" className="text-primary-800 hover:text-primary-600 transition-colors">Blog</Link>
          
          {/* Dropdown Ferramentas */}
          <div className="relative" ref={toolsRef}>
            <button 
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="flex items-center gap-1 text-primary-800 hover:text-primary-600 transition-colors"
            >
              Ferramentas
              <ChevronDown size={16} className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isToolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                <Link 
                  to="/calculadora" 
                  className="block px-4 py-2 text-sm text-primary-800 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  onClick={() => setIsToolsOpen(false)}
                >
                  Calculadora Trabalho pro Exterior
                </Link>
                <Link 
                  to="/clt-vs-pj" 
                  className="block px-4 py-2 text-sm text-primary-800 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  onClick={() => setIsToolsOpen(false)}
                >
                  Calculadora CLT vs PJ
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={onSwitchForm}>Mudar para Conte</Button>
            <Button onClick={onOpenCompanyForm}>Abrir Empresa Grátis</Button>
          </div>
        </div>

        <button 
          className="md:hidden text-primary-900" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => handleSectionNav('features')}
              className="text-primary-800 hover:text-primary-600 transition-colors py-2 text-left"
            >
              Serviços
            </button>
            <button 
              onClick={() => handleSectionNav('benefits')}
              className="text-primary-800 hover:text-primary-600 transition-colors py-2 text-left"
            >
              Benefícios
            </button>
            <button 
              onClick={() => handleSectionNav('about')}
              className="text-primary-800 hover:text-primary-600 transition-colors py-2 text-left"
            >
              Sobre
            </button>
            <Link to="/blog" className="text-primary-800 hover:text-primary-600 transition-colors py-2 text-left" onClick={() => setIsOpen(false)}>Blog</Link>
            
            {/* Ferramentas no mobile */}
            <div className="py-2">
              <p className="text-primary-800 font-medium text-sm mb-2">Ferramentas</p>
              <Link 
                to="/calculadora" 
                className="text-primary-700 hover:text-primary-600 transition-colors py-1 text-left text-sm pl-4 block" 
                onClick={() => setIsOpen(false)}
              >
                Calculadora Trabalho pro Exterior
              </Link>
              <Link 
                to="/clt-vs-pj" 
                className="text-primary-700 hover:text-primary-600 transition-colors py-1 text-left text-sm pl-4 block" 
                onClick={() => setIsOpen(false)}
              >
                Calculadora CLT vs PJ
              </Link>
            </div>
            
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="secondary" onClick={onSwitchForm}>Mudar para Conte</Button>
              <Button onClick={onOpenCompanyForm}>Abrir Empresa Grátis</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;