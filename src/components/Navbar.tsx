import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';
import { BLOG_URL, SIGNUP_URL } from '../lib/links';

const sections = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'planos', label: 'Planos' },
  { id: 'duvidas', label: 'Dúvidas' },
];

const tools = [
  { to: '/calculadora', label: 'Calculadora trabalho pro exterior' },
  { to: '/clt-vs-pj', label: 'Calculadora CLT vs PJ' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const goToSection = (sectionId: string) => {
    setIsOpen(false);
    const scroll = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname === '/') {
      scroll();
    } else {
      navigate('/');
      setTimeout(scroll, 300);
    }
  };

  const linkClass = 'text-[15px] text-ink-muted hover:text-ink transition-colors';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-paper-line bg-white pl-4 pr-2 py-1.5 transition-shadow duration-300 ${
          isScrolled || isOpen ? 'shadow-card' : ''
        }`}
      >
        <Link to="/" aria-label="Conte — início" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {sections.map((s) => (
            <button key={s.id} onClick={() => goToSection(s.id)} className={linkClass}>
              {s.label}
            </button>
          ))}
          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className={`${linkClass} flex items-center gap-1`}
              aria-expanded={isToolsOpen}
            >
              Ferramentas
              <ChevronDown size={15} className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isToolsOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-2xl border border-paper-line bg-white p-2 shadow-float">
                {tools.map((t) => (
                  <Link
                    key={t.to}
                    to={t.to}
                    className="block rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-paper transition-colors"
                    onClick={() => setIsToolsOpen(false)}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Blog
          </a>
        </div>

        <div className="hidden lg:block">
          <Button href={SIGNUP_URL}>
            Começar agora
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        <button
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-ink/5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden mx-auto mt-2 max-w-6xl rounded-3xl border border-paper-line bg-white p-3 shadow-float">
          <div className="flex flex-col">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                className="rounded-xl px-3 py-3 text-left text-ink hover:bg-paper"
              >
                {s.label}
              </button>
            ))}
            {tools.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="rounded-xl px-3 py-3 text-ink hover:bg-paper"
                onClick={() => setIsOpen(false)}
              >
                {t.label}
              </Link>
            ))}
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-3 py-3 text-ink hover:bg-paper"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </a>
            <Button href={SIGNUP_URL} size="lg" className="mt-2 w-full">
              Começar agora
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
