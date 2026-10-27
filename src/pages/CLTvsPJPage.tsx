import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import MoneyInput from '../components/tools/MoneyInput';
import ToolLayout from '../components/tools/ToolLayout';
import ToolPanel, { Details } from '../components/tools/ToolPanel';
import { SIGNUP_URL } from '../lib/links';
import {
  clt,
  faturamentoParaEmpatar,
  pjSimplesOtimo,
  salarioCLTParaEmpatar,
  INSS_EMPREGADO,
  INSS_TETO,
  IRRF_DESCONTO_SIMPLIFICADO,
  IRRF_TABLE,
  RULES_LABEL,
  SALARIO_MINIMO,
} from '../lib/tax/brazil2026';

const CONTABILIDADE = 359;
const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const brl0 = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const pct = (n: number) => `${(n * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;

const Row: React.FC<{ label: string; value: string; strong?: boolean; muted?: boolean }> = ({ label, value, strong, muted }) => (
  <div className={`flex items-baseline justify-between gap-4 py-2 ${strong ? 'border-t border-paper-line pt-3' : ''}`}>
    <span className={muted ? 'text-sm text-ink-muted' : strong ? 'font-semibold text-ink' : 'text-[15px] text-ink-soft'}>{label}</span>
    <span className={`shrink-0 whitespace-nowrap tabular-nums ${strong ? 'font-display text-xl font-semibold text-ink' : muted ? 'text-sm text-ink-muted' : 'text-[15px] text-ink'}`}>
      {value}
    </span>
  </div>
);

type Modo = 'clt' | 'pj';

const Calculator: React.FC = () => {
  const [modo, setModo] = useState<Modo>('clt');
  const [salario, setSalario] = useState(10000);
  const [vr, setVr] = useState(800);
  const [saude, setSaude] = useState(0);
  const [outros, setOutros] = useState(0);
  const [faturamentoPJ, setFaturamentoPJ] = useState(0);

  const trocarModo = (novo: Modo) => {
    if (novo === modo) return;
    // Keep the main number the person typed in the field that now leads.
    if (novo === 'pj') {
      setFaturamentoPJ(salario || 12000);
      setSalario(0);
    } else {
      setSalario(faturamentoPJ || 10000);
      setFaturamentoPJ(0);
    }
    setModo(novo);
  };

  const beneficios = vr + saude + outros;
  const c = useMemo(() => (salario > 0 ? clt(salario, beneficios) : null), [salario, beneficios]);
  const pj = useMemo(() => (faturamentoPJ > 0 ? pjSimplesOtimo(faturamentoPJ, CONTABILIDADE, false) : null), [faturamentoPJ]);
  const empatePJ = useMemo(() => (c ? faturamentoParaEmpatar(c.equivalenteMensal, CONTABILIDADE) : 0), [c]);
  const empateCLT = useMemo(() => (pj ? salarioCLTParaEmpatar(pj.liquido, beneficios) : 0), [pj, beneficios]);
  // Positive = the PJ side earns more per year.
  const diferencaAnual = c && pj ? pj.liquido * 12 - c.totalAnual : 0;
  const principalPreenchido = modo === 'clt' ? !!c : !!pj;
  const comparando = !!(c && pj);

  return (
    <ToolPanel
      inputs={
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-ink">Hoje eu sou</span>
            <div className="inline-flex rounded-full border border-paper-line bg-paper-deep p-1" role="radiogroup" aria-label="Hoje eu sou">
              {(['clt', 'pj'] as Modo[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={modo === m}
                  onClick={() => trocarModo(m)}
                  className={`h-9 rounded-full px-5 text-sm font-semibold transition-colors ${
                    modo === m ? 'bg-ink text-white shadow-card' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {m === 'clt' ? 'CLT' : 'PJ'}
                </button>
              ))}
            </div>
            <span className="text-sm text-ink-muted">
              {modo === 'clt' ? 'e estou pensando em virar PJ' : 'e recebi (ou quero comparar com) uma proposta CLT'}
            </span>
          </div>
          {modo === 'clt' ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
              <MoneyInput id="salario" label="Seu salário CLT (bruto/mês)" value={salario} onChange={setSalario} />
              <MoneyInput id="vr" label="VR e VA (mês)" value={vr} onChange={setVr} />
              <MoneyInput id="saude" label="Plano de saúde" value={saude} onChange={setSaude} />
              <MoneyInput id="outros" label="Outros benefícios" value={outros} onChange={setOutros} />
              <MoneyInput id="faturamento" label="Proposta PJ (mês), opcional" value={faturamentoPJ} onChange={setFaturamentoPJ} />
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr_1fr_1fr]">
              <MoneyInput id="faturamento" label="Seu faturamento PJ (mês)" value={faturamentoPJ} onChange={setFaturamentoPJ} />
              <MoneyInput id="salario" label="Proposta CLT (salário), opcional" value={salario} onChange={setSalario} />
              <MoneyInput id="vr" label="VR e VA da proposta" value={vr} onChange={setVr} />
              <MoneyInput id="saude" label="Plano de saúde" value={saude} onChange={setSaude} />
              <MoneyInput id="outros" label="Outros benefícios" value={outros} onChange={setOutros} />
            </div>
          )}
        </div>
      }
      highlight={
        !principalPreenchido ? (
          <p className="text-ink-muted">{modo === 'clt' ? 'Informe seu salário CLT para ver o resultado.' : 'Informe seu faturamento PJ para ver o resultado.'}</p>
        ) : comparando ? (
          <>
            <p className="text-sm font-medium text-ink-muted">{modo === 'clt' ? 'A proposta PJ rende' : 'A proposta CLT rende'}</p>
            <p className="mt-1 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink tabular-nums">
              {brl(Math.abs(diferencaAnual))}
            </p>
            <p className="mt-1 text-[15px] text-ink-muted">
              {(modo === 'clt' ? diferencaAnual >= 0 : diferencaAnual <= 0) ? 'a mais' : 'a menos'} por ano.{' '}
              {modo === 'clt'
                ? `Para empatar, o PJ precisa faturar ${brl(empatePJ)}/mês.`
                : `Para empatar com seu PJ, o CLT precisa pagar ${brl(empateCLT)} de salário.`}
            </p>
          </>
        ) : modo === 'clt' ? (
          <>
            <p className="text-sm font-medium text-ink-muted">Para empatar com seu CLT, o PJ precisa faturar</p>
            <p className="mt-1 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink tabular-nums">{brl(empatePJ)}</p>
            <p className="mt-1 text-[15px] text-ink-muted">por mês. Já conta o 13º, as férias e o FGTS que o PJ não recebe.</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-ink-muted">Para empatar com seu PJ, um CLT precisa pagar</p>
            <p className="mt-1 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink tabular-nums">{brl(empateCLT)}</p>
            <p className="mt-1 text-[15px] text-ink-muted">de salário por mês, com os benefícios informados, já contando 13º, férias e FGTS.</p>
          </>
        )
      }
      comparison={
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'clt', label: 'CLT, no ano', total: c?.totalAnual, mensal: c?.liquidoMensal, vazio: modo === 'clt' ? 'Informe seu salário' : 'Informe a proposta CLT' },
            { key: 'pj', label: 'PJ, no ano', total: pj ? pj.liquido * 12 : undefined, mensal: pj?.liquido, vazio: modo === 'pj' ? 'Informe seu faturamento' : 'Informe a proposta PJ' },
          ].map((tile) => {
            const vencedor = comparando && (tile.key === 'pj' ? diferencaAnual > 0 : diferencaAnual < 0);
            return (
              <div key={tile.key} className={`rounded-2xl bg-white p-5 ${vencedor ? 'ring-2 ring-brand' : 'border border-paper-line'}`}>
                <p className="text-sm text-ink-muted">{tile.label}</p>
                <p className="mt-1 font-display text-xl sm:text-2xl font-semibold text-ink tabular-nums">{tile.total ? brl0(tile.total) : '—'}</p>
                <p className="mt-1 text-sm text-ink-muted">{tile.mensal ? `${brl(tile.mensal)} líquido/mês` : tile.vazio}</p>
              </div>
            );
          })}
        </div>
      }
      details={
        principalPreenchido && (
          <Details summary="Ver o cálculo completo">
            <div className={`grid gap-8 ${comparando ? 'md:grid-cols-2' : ''}`}>
              {c && (
              <div>
                <p className="font-semibold text-ink">CLT</p>
                <Row label="Salário bruto" value={brl(c.salario)} />
                <Row label="INSS" value={`− ${brl(c.inss)}`} muted />
                <Row label="Imposto de Renda" value={`− ${brl(c.irrf)}`} muted />
                <Row label="Líquido por mês" value={brl(c.liquidoMensal)} strong />
                <Row label="13º salário líquido" value={brl(c.decimoTerceiroLiquido)} muted />
                <Row label="1/3 de férias líquido" value={brl(c.tercoFeriasLiquido)} muted />
                <Row label="FGTS no ano" value={brl(c.fgtsAnual)} muted />
                <Row label="Benefícios no ano" value={brl(c.beneficiosMensais * 12)} muted />
                <Row label="Total no ano" value={brl(c.totalAnual)} strong />
              </div>
              )}
              {pj && (
                <div>
                  <p className="font-semibold text-ink">PJ</p>
                  <Row label="Faturamento" value={brl(pj.faturamento)} />
                  <Row label={`Simples (Anexo ${pj.anexo}, ${pct(pj.aliquotaEfetiva)})`} value={`− ${brl(pj.impostosEmpresa)}`} muted />
                  <Row label={`INSS do pró-labore (${brl(pj.proLabore.bruto)})`} value={`− ${brl(pj.proLabore.inss)}`} muted />
                  <Row label="IR do pró-labore" value={`− ${brl(pj.proLabore.irrf)}`} muted />
                  {pj.impostoDividendos > 0 && <Row label="IR sobre dividendos" value={`− ${brl(pj.impostoDividendos)}`} muted />}
                  <Row label="Contabilidade" value={`− ${brl(pj.contabilidade)}`} muted />
                  <Row label="Líquido por mês" value={brl(pj.liquido)} strong />
                  <Row label="Total no ano" value={brl(pj.liquido * 12)} strong />
                </div>
              )}
            </div>
          </Details>
        )
      }
      cta={
        modo === 'clt' ? (
          <>
            <p className="text-[15px] text-ink-soft">
              <span className="font-semibold text-ink">Vai virar PJ?</span> A Conte abre sua empresa de graça e define o melhor enquadramento.
            </p>
            <Button href={SIGNUP_URL} className="shrink-0">
              Abrir minha empresa
              <ArrowRight size={16} />
            </Button>
          </>
        ) : (
          <>
            <p className="text-[15px] text-ink-soft">
              <span className="font-semibold text-ink">Vai continuar PJ?</span> Veja se você está pagando mais imposto do que precisa: a Conte revisa sua PJ.
            </p>
            <Button href={SIGNUP_URL} className="shrink-0">
              Mudar para a Conte
              <ArrowRight size={16} />
            </Button>
          </>
        )
      }
    />
  );
};

const EXEMPLOS = [3000, 5000, 8000, 10000, 15000, 20000, 30000];

const tableCell = 'border-b border-paper-line px-4 py-3 text-left';

const CLTvsPJPage: React.FC = () => (
  <ToolLayout
    path="/clt-vs-pj"
    name="Calculadora CLT vs PJ"
    seoTitle="Calculadora CLT vs PJ 2026: compare os dois lados | Conte"
    seoDescription="Compare CLT e PJ com as regras de 2026, nos dois sentidos: quanto o PJ precisa faturar para empatar com o CLT, ou qual salário CLT empata com o seu PJ, com 13º, férias e FGTS."
    h1="Calculadora CLT vs PJ"
    intro="A calculadora CLT vs PJ da Conte compara tudo o que o CLT recebe em um ano (salário líquido, 13º, férias, FGTS e benefícios) com o líquido de uma PJ no Simples Nacional. Funciona nos dois sentidos: se você é CLT, mostra quanto o PJ precisa faturar; se já é PJ, mostra qual salário CLT empata com o que você tem hoje."
    updated={RULES_LABEL}
    calculator={<Calculator />}
    faqs={[
      {
        q: 'Quanto o PJ precisa ganhar para compensar o CLT?',
        a: 'Depende do salário. Perto de R$ 10 mil, o PJ precisa faturar cerca de 5% a mais para empatar, porque o CLT recebe 13º, 1/3 de férias e FGTS. Em salários mais baixos a diferença é maior: com R$ 5 mil, passa de 25%, porque o CLT já é isento de IR e os custos fixos do PJ pesam mais. Benefícios como vale-refeição e plano de saúde aumentam ainda mais a diferença.',
      },
      {
        q: 'Vale a pena sair do PJ para o CLT?',
        a: 'Depende do salário oferecido. Um PJ que fatura R$ 10 mil por mês no Simples Nacional fica com cerca de R$ 8.700 líquidos; para empatar, sem benefícios, um CLT precisaria pagar perto de R$ 9.500 de salário, porque o CLT ganha 13º, férias e FGTS. Escolha \'Hoje eu sou PJ\' na calculadora para ver o seu caso.',
      },
      {
        q: 'Como o PJ paga imposto no Simples Nacional?',
        a: 'Quem presta serviço intelectual costuma cair no Anexo III quando o pró-labore é de pelo menos 28% do faturamento (Fator R). A alíquota começa em 6% e cresce com o faturamento dos últimos 12 meses. Abaixo de 28%, a atividade vai para o Anexo V, que começa em 15,5%.',
      },
      {
        q: 'O que mudou no Imposto de Renda em 2026?',
        a: 'Desde janeiro de 2026, quem recebe até R$ 5.000 por mês não paga IR na fonte, e entre R$ 5.000 e R$ 7.350 o imposto é reduzido (Lei 15.270/2025). A calculadora já aplica essa regra no salário CLT e no pró-labore.',
      },
      {
        q: 'Dividendos da PJ pagam imposto em 2026?',
        a: 'Até R$ 50 mil por mês, por empresa, a distribuição de lucros continua isenta. Acima disso, há retenção de 10% sobre o valor total distribuído no mês. Quem tem renda anual acima de R$ 600 mil também pode ter que pagar o imposto mínimo (IRPFM) na declaração.',
      },
      {
        q: 'A calculadora considera férias do PJ?',
        a: 'O PJ não tem férias remuneradas, 13º nem FGTS. Por isso a comparação usa o total anual do CLT: se você pretende tirar férias como PJ, considere que nesse mês pode não faturar.',
      },
    ]}
    sources={[
      { title: 'Tabelas do Imposto de Renda 2026 (Receita Federal)', url: 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026' },
      { title: 'Lei 15.270/2025: isenção do IR até R$ 5 mil e dividendos', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm' },
      { title: 'Portaria MPS/MF 13/2026: tabela do INSS 2026', url: 'https://www.in.gov.br/en/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603' },
      { title: 'Lei Complementar 123/2006: Simples Nacional', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm' },
    ]}
    related={[
      { to: '/abrir-empresa', title: 'Abrir empresa grátis', description: 'A Conte abre seu CNPJ sem custo.' },
      { to: '/calculadora', title: 'Calculadora PJ exterior', description: 'Para quem recebe de empresas de fora.' },
      { to: '/contabilidade-para-exterior', title: 'Contabilidade para exterior', description: 'Para PJ que presta serviço para fora.' },
      { to: '/contabilidade-mei', title: 'Contabilidade para MEI', description: 'Rotina do MEI por R$99/mês.' },
    ]}
  >
    <section className="bg-paper-deep py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">Quanto o PJ precisa ganhar para empatar com o CLT?</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Simulação com as regras de {RULES_LABEL}, sem benefícios além do salário, PJ no Simples Nacional no melhor cenário e contabilidade de{' '}
          {brl(CONTABILIDADE)}/mês.
        </p>
        <div className="mt-8 overflow-x-auto rounded-[24px] border border-paper-line bg-white">
          <table className="w-full min-w-[560px] border-collapse text-[15px]">
            <thead>
              <tr className="text-sm text-ink-muted">
                <th scope="col" className={tableCell}>Salário CLT</th>
                <th scope="col" className={tableCell}>Líquido CLT/mês</th>
                <th scope="col" className={tableCell}>CLT com 13º, férias e FGTS (média/mês)</th>
                <th scope="col" className={`${tableCell} bg-brand/10 text-ink`}>PJ precisa faturar</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {EXEMPLOS.map((salario) => {
                const c = clt(salario, 0);
                return (
                  <tr key={salario}>
                    <th scope="row" className={`${tableCell} font-semibold text-ink`}>{brl(salario)}</th>
                    <td className={tableCell}>{brl(c.liquidoMensal)}</td>
                    <td className={tableCell}>{brl(c.equivalenteMensal)}</td>
                    <td className={`${tableCell} bg-brand/10 font-semibold text-ink`}>{brl(faturamentoParaEmpatar(c.equivalenteMensal, CONTABILIDADE))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">Como calculamos</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">No CLT</h3>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-ink-muted">
              <li>INSS pela tabela progressiva de 2026, com teto de {brl(INSS_TETO)}.</li>
              <li>IR na fonte pela tabela de 2026, com a isenção até R$ 5.000 e a redução até R$ 7.350.</li>
              <li>13º salário líquido e 1/3 de férias líquido. No mês de férias o salário vira férias, então o ganho extra é só o terço.</li>
              <li>FGTS de 8% sobre salários, 13º e 1/3 de férias.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">No PJ</h3>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-ink-muted">
              <li>Simples Nacional no cenário mais vantajoso: pró-labore de 28% (Anexo III) ou de um salário mínimo, {brl(SALARIO_MINIMO)} (Anexo V).</li>
              <li>INSS de 11% sobre o pró-labore e IR na fonte com as regras de 2026.</li>
              <li>Lucro distribuído isento até R$ 50 mil por mês; acima disso, 10% de IR.</li>
              <li>Contabilidade da Conte: {brl(CONTABILIDADE)}/mês.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-paper-deep py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">Tabelas de INSS e IR de 2026</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[24px] border border-paper-line bg-white">
            <table className="w-full border-collapse text-[15px]">
              <caption className="px-4 pt-4 text-left font-display text-lg font-semibold text-ink">INSS do empregado 2026</caption>
              <thead>
                <tr className="text-sm text-ink-muted">
                  <th scope="col" className={tableCell}>Salário de contribuição</th>
                  <th scope="col" className={tableCell}>Alíquota</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {INSS_EMPREGADO.map((f, i) => (
                  <tr key={f.upTo}>
                    <td className={tableCell}>
                      {i === 0 ? `Até ${brl(f.upTo)}` : `De ${brl(INSS_EMPREGADO[i - 1].upTo + 0.01)} até ${brl(f.upTo)}`}
                    </td>
                    <td className={tableCell}>{pct(f.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-3 text-sm text-ink-muted">Alíquotas progressivas, cada uma sobre a parte do salário dentro da faixa.</p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-paper-line bg-white">
            <table className="w-full border-collapse text-[15px]">
              <caption className="px-4 pt-4 text-left font-display text-lg font-semibold text-ink">IR mensal 2026</caption>
              <thead>
                <tr className="text-sm text-ink-muted">
                  <th scope="col" className={tableCell}>Base de cálculo</th>
                  <th scope="col" className={tableCell}>Alíquota</th>
                  <th scope="col" className={tableCell}>Dedução</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {IRRF_TABLE.map((f, i) => (
                  <tr key={f.upTo}>
                    <td className={tableCell}>
                      {i === 0
                        ? `Até ${brl(f.upTo)}`
                        : f.upTo === Infinity
                          ? `Acima de ${brl(IRRF_TABLE[i - 1].upTo)}`
                          : `Até ${brl(f.upTo)}`}
                    </td>
                    <td className={tableCell}>{f.rate ? pct(f.rate) : 'Isento'}</td>
                    <td className={tableCell}>{f.deduction ? brl(f.deduction) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-3 text-sm text-ink-muted">
              Desconto simplificado de {brl(IRRF_DESCONTO_SIMPLIFICADO)}/mês. Rendimentos até R$ 5.000 ficam isentos e até R$ 7.350 têm redução
              (Lei 15.270/2025).
            </p>
          </div>
        </div>
      </div>
    </section>
  </ToolLayout>
);

export default CLTvsPJPage;
