import React from 'react';
import ToolLayout, { ToolFaq } from '../components/tools/ToolLayout';
import { Calculator } from './CLTvsPJPage';
import { CLTSalaryScenario, cltSalaryScenarios, CLT_VS_PJ_BASE } from '../data/scenarios';
import { clt, faturamentoParaEmpatar, pjSimplesOtimo, RULES_LABEL } from '../lib/tax/brazil2026';

// Same assumptions as /clt-vs-pj: PJ in the Simples Nacional, best scenario, serving Brazilian clients.
const CONTABILIDADE = 359;
const BENEFICIOS_EXEMPLO = 1000;
const PROPOSTAS = [1, 1.2, 1.4, 1.6];

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const brl0 = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const pct = (n: number) => `${(n * 100).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%`;
const tableCell = 'border-b border-paper-line px-4 py-3 text-left';

const CLTSalaryPage: React.FC<{ scenario: CLTSalaryScenario }> = ({ scenario }) => {
  const { salario } = scenario;
  const mil = `R$ ${(salario / 1000).toLocaleString('pt-BR')} mil`;
  const c = clt(salario, 0);
  const cB = clt(salario, BENEFICIOS_EXEMPLO);
  const empate = faturamentoParaEmpatar(c.equivalenteMensal, CONTABILIDADE);
  const empateB = faturamentoParaEmpatar(cB.equivalenteMensal, CONTABILIDADE);
  const acrescimo = empate / salario - 1;
  const pjNoMesmoValor = pjSimplesOtimo(salario, CONTABILIDADE, false);

  const i = cltSalaryScenarios.findIndex((s) => s.slug === scenario.slug);
  const vizinhos = [cltSalaryScenarios[i - 1], cltSalaryScenarios[i + 1]].filter(Boolean);

  const respostaRapida =
    `Um salário CLT de ${brl0(salario)} vale, com 13º, 1/3 de férias e FGTS, ${brl0(c.equivalenteMensal)} líquidos por mês em média. ` +
    `Para empatar como PJ no Simples Nacional, a proposta precisa ser de pelo menos ${brl0(empate)} por mês (${pct(acrescimo)} acima do salário), ` +
    `ou ${brl0(empateB)} se o CLT tiver ${brl0(BENEFICIOS_EXEMPLO)} de benefícios. Regras de ${RULES_LABEL}.`;

  const faqs: ToolFaq[] = [
    { q: `Quanto pedir como PJ para sair de um CLT de ${mil}?`, a: respostaRapida },
    {
      q: `Quanto sobra de um salário CLT de ${mil}?`,
      a: `O líquido mensal é ${brl0(c.liquidoMensal)}: saem ${brl0(c.inss)} de INSS e ${c.irrf > 0 ? `${brl0(c.irrf)} de IR na fonte` : 'nada de IR, porque o salário fica na faixa isenta de 2026'}. No ano, somando 13º, 1/3 de férias e FGTS, o total é ${brl0(c.totalAnual)}.`,
    },
    {
      q: `E se a proposta PJ for de ${mil}, o mesmo valor do salário?`,
      a: `Como PJ faturando ${brl0(salario)}, sobram ${brl0(pjNoMesmoValor.liquido)} por mês, ou ${brl0(pjNoMesmoValor.liquido * 12)} no ano. O CLT de ${mil} rende ${brl0(c.totalAnual)} no ano. ${
        pjNoMesmoValor.liquido * 12 >= c.totalAnual
          ? 'Mesmo assim o PJ fica à frente, mas sem férias remuneradas: se parar um mês, fatura menos.'
          : `O CLT fica ${brl0(c.totalAnual - pjNoMesmoValor.liquido * 12)} à frente no ano.`
      }`,
    },
  ];

  return (
    <ToolLayout
      path={`${CLT_VS_PJ_BASE}/${scenario.slug}`}
      parent={{ to: '/clt-vs-pj', name: 'Calculadora CLT vs PJ' }}
      name={`Salário de ${mil}`}
      seoTitle={`CLT de ${mil} ou PJ: quanto pedir em 2026 | Conte`}
      seoDescription={`Um CLT de ${brl0(salario)} equivale a uma proposta PJ de ${brl0(empate)} por mês no Simples Nacional, com 13º, férias e FGTS na conta. Veja o cálculo de 2026.`}
      h1={`CLT de ${mil} ou PJ: quanto pedir em 2026`}
      intro={respostaRapida}
      updated={RULES_LABEL}
      calculator={<Calculator initialSalario={salario} initialVr={0} />}
      faqs={faqs}
      sources={[
        { title: 'Tabelas do Imposto de Renda 2026 (Receita Federal)', url: 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026' },
        { title: 'Lei 15.270/2025: isenção do IR até R$ 5 mil e dividendos', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm' },
        { title: 'Portaria MPS/MF 13/2026: tabela do INSS 2026', url: 'https://www.in.gov.br/en/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603' },
        { title: 'Lei 8.036/1990: FGTS', url: 'https://www.planalto.gov.br/ccivil_03/leis/l8036consol.htm' },
        { title: 'Lei Complementar 123/2006: Simples Nacional', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm' },
      ]}
      related={[
        ...vizinhos.map((s) => ({
          to: `${CLT_VS_PJ_BASE}/${s.slug}`,
          title: `CLT de R$ ${(s.salario / 1000).toLocaleString('pt-BR')} mil ou PJ`,
          description: 'Mesmo cálculo, outro salário.',
        })),
        { to: '/abrir-empresa', title: 'Abrir empresa grátis', description: 'A Conte abre seu CNPJ sem custo.' },
        { to: '/calculadora-fator-r', title: 'Calculadora Fator R', description: 'Anexo III ou V e o pró-labore mínimo.' },
      ]}
    >
      <section className="bg-paper-deep py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">O que o CLT de {mil} paga no ano</h2>
          <div className="mt-8 max-w-xl overflow-hidden rounded-[24px] border border-paper-line bg-white">
            <table className="w-full border-collapse text-[15px]">
              <tbody className="tabular-nums">
                {[
                  ['Salário bruto', brl(salario)],
                  ['INSS', `− ${brl(c.inss)}`],
                  ['IR na fonte', `− ${brl(c.irrf)}`],
                  ['Líquido por mês', brl(c.liquidoMensal)],
                  ['13º líquido', brl(c.decimoTerceiroLiquido)],
                  ['1/3 de férias líquido', brl(c.tercoFeriasLiquido)],
                  ['FGTS no ano', brl(c.fgtsAnual)],
                  ['Total no ano', brl(c.totalAnual)],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row" className={`${tableCell} font-normal text-ink-soft`}>{k}</th>
                    <td className={`${tableCell} text-right text-ink`}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">Propostas PJ comparadas com o CLT de {mil}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            PJ no Simples Nacional, no melhor cenário de pró-labore, prestando serviço para empresa brasileira, com contabilidade de {brl(CONTABILIDADE)}/mês.
            O CLT sem benefícios.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[24px] border border-paper-line bg-white">
            <table className="w-full min-w-[560px] border-collapse text-[15px]">
              <thead>
                <tr className="text-sm text-ink-muted">
                  <th scope="col" className={tableCell}>Proposta PJ</th>
                  <th scope="col" className={tableCell}>Sobra por mês</th>
                  <th scope="col" className={tableCell}>Sobra no ano</th>
                  <th scope="col" className={`${tableCell} bg-brand/10 text-ink`}>Diferença para o CLT no ano</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {PROPOSTAS.map((m) => {
                  const fat = Math.round(salario * m);
                  const pj = pjSimplesOtimo(fat, CONTABILIDADE, false);
                  const diff = pj.liquido * 12 - c.totalAnual;
                  return (
                    <tr key={m}>
                      <th scope="row" className={`${tableCell} font-semibold text-ink`}>
                        {brl0(fat)} {m > 1 && <span className="font-normal text-ink-muted">(+{pct(m - 1)})</span>}
                      </th>
                      <td className={tableCell}>{brl(pj.liquido)}</td>
                      <td className={tableCell}>{brl0(pj.liquido * 12)}</td>
                      <td className={`${tableCell} bg-brand/10 font-semibold ${diff >= 0 ? 'text-ink' : 'text-ink-muted'}`}>
                        {diff >= 0 ? `PJ + ${brl0(diff)}` : `CLT + ${brl0(-diff)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
            O PJ não tem férias remuneradas, 13º, FGTS nem seguro-desemprego. Se você pretende parar um mês por ano, conte com 11 meses de faturamento.
            Desenvolvimento de software não pode ser MEI: a PJ precisa ser ME no Simples Nacional.
          </p>
        </div>
      </section>
      <section className="bg-paper-deep py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">CLT de {mil} com benefícios</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Vale-refeição, plano de saúde e outros benefícios entram na conta do CLT. Quanto mais benefícios, maior a proposta PJ precisa ser.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[24px] border border-paper-line bg-white">
            <table className="w-full min-w-[520px] border-collapse text-[15px]">
              <thead>
                <tr className="text-sm text-ink-muted">
                  <th scope="col" className={tableCell}>Benefícios por mês</th>
                  <th scope="col" className={tableCell}>CLT no ano</th>
                  <th scope="col" className={`${tableCell} bg-brand/10 text-ink`}>PJ precisa faturar</th>
                  <th scope="col" className={tableCell}>Acima do salário</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {[0, 500, 1000, 2000].map((b) => {
                  const cc = clt(salario, b);
                  const e = faturamentoParaEmpatar(cc.equivalenteMensal, CONTABILIDADE);
                  return (
                    <tr key={b}>
                      <th scope="row" className={`${tableCell} font-semibold text-ink`}>{b ? brl0(b) : 'Nenhum'}</th>
                      <td className={tableCell}>{brl0(cc.totalAnual)}</td>
                      <td className={`${tableCell} bg-brand/10 font-semibold text-ink`}>{brl0(e)}</td>
                      <td className={tableCell}>{pct(e / salario - 1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
};

export default CLTSalaryPage;
