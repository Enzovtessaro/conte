import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import ScenarioLinks from '../components/tools/ScenarioLinks';
import { cltSalaryScenarios, CLT_VS_PJ_BASE, quantoSobraScenarios, QUANTO_SOBRA_BASE } from '../data/scenarios';
import { SITE_URL } from '../lib/links';
import { RULES_LABEL } from '../lib/tax/brazil2026';

const TOOLS = [
  { to: '/calculadora', title: 'Calculadora PJ exterior', description: 'Quanto sobra recebendo em dólar ou euro, com câmbio do dia, Simples Nacional e Lucro Presumido.' },
  { to: '/clt-vs-pj', title: 'Calculadora CLT vs PJ', description: 'Quanto o PJ precisa faturar para empatar com o CLT, com 13º, férias e FGTS na conta.' },
  { to: '/calculadora-fator-r', title: 'Calculadora Fator R', description: 'Anexo III ou Anexo V do Simples, o pró-labore mínimo e se ele compensa.' },
  { to: '/calculadora-pro-labore', title: 'Calculadora de pró-labore', description: 'INSS, IR na fonte com a isenção de 2026 e o líquido do pró-labore.' },
];

const ToolsHubPage: React.FC = () => (
  <main>
    <Seo
      title="Calculadoras grátis para PJ: impostos 2026 | Conte"
      description="Calculadoras grátis da Conte para quem trabalha como PJ: quanto sobra recebendo do exterior, CLT vs PJ, Fator R e pró-labore, com as regras de 2026."
      path="/ferramentas"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Calculadoras para PJ',
        itemListElement: TOOLS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.title, url: `${SITE_URL}${t.to}` })),
      }}
    />
    <section className="pt-32 pb-10 md:pt-40 md:pb-14">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <h1 className="max-w-3xl font-display text-[40px] leading-[1.05] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-ink text-balance">
          Calculadoras grátis para quem trabalha como PJ
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-muted text-pretty">
          Faça as contas antes de decidir: quanto sobra recebendo de fora, se vale sair do CLT, qual pró-labore usar. Tudo com as regras e tabelas de {RULES_LABEL}, e com as fontes oficiais em cada página.
        </p>
      </div>
    </section>
    <section className="pb-8">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <ul className="grid gap-4 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.to}>
              <Link to={t.to} className="flex h-full items-start justify-between gap-4 rounded-[24px] border border-paper-line bg-white p-6 transition-shadow hover:shadow-card">
                <span>
                  <span className="block font-display text-xl font-semibold text-ink">{t.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-ink-muted">{t.description}</span>
                </span>
                <ArrowRight size={20} className="mt-1 shrink-0 text-ink-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <ScenarioLinks
      title="Quanto sobra recebendo do exterior"
      links={quantoSobraScenarios.map((q) => ({
        to: `${QUANTO_SOBRA_BASE}/${q.slug}`,
        label: `${q.currency === 'USD' ? 'US$' : '€'} ${q.amount.toLocaleString('pt-BR')} por mês`,
      }))}
    />
    <ScenarioLinks
      title="CLT ou PJ, salário por salário"
      links={cltSalaryScenarios.map((c) => ({ to: `${CLT_VS_PJ_BASE}/${c.slug}`, label: `CLT de R$ ${(c.salario / 1000).toLocaleString('pt-BR')} mil` }))}
    />
  </main>
);

export default ToolsHubPage;
