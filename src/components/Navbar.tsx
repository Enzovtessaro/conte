import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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