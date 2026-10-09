import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { BLOG_URL, EMAIL, INSTAGRAM_URL, SIGNUP_URL, WHATSAPP_URL } from '../lib/links';

const linkClass = 'text-ink-muted hover:text-ink transition-colors';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-paper-line bg-paper">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs leading-relaxed text-ink-muted">
              Contabilidade com atendimento humanizado para diminuir suas dores de cabeça.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Conte"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper-line text-ink-muted hover:border-ink/30 hover:text-ink transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Conte</h4>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li><a href="/#servicos" className={linkClass}>Serviços</a></li>
              <li><a href="/#planos" className={linkClass}>Planos</a></li>
              <li><a href={SIGNUP_URL} className={linkClass}>Cadastro</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Conteúdo</h4>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li><a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>Blog</a></li>
              <li><Link to="/calculadora" className={linkClass}>Calculadora exterior</Link></li>
              <li><Link to="/clt-vs-pj" className={linkClass}>Calculadora CLT vs PJ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Contato</h4>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-muted">
              <li><a href={`mailto:${EMAIL}`} className={linkClass}>{EMAIL}</a></li>
              <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>+55 (41) 98701-6965</a></li>
              <li>
                <address className="not-italic">
                  Rua Matheus Leme, 5354
                  <br />
                  São Lourenço, Curitiba - PR
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper-line pt-8 text-sm text-ink-faint md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Conte. Todos os direitos reservados.</p>
          <p>CNPJ 37.526.805/0001-83</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
