import React from 'react';
import ToolLayout, { ToolFaq } from '../components/tools/ToolLayout';
import { Calculator } from './CalculatorPage';
import { QuantoSobraScenario, quantoSobraScenarios, QUANTO_SOBRA_BASE } from '../data/scenarios';
import { CURRENCIES, REFERENCE_DATE, REFERENCE_RATES } from '../lib/fx';
import {
  PJResult,
  pjPresumido,
  pjSimples,
  pjSimplesOtimo,
  proLaboreFatorR,
  RULES_LABEL,
  SALARIO_MINIMO,
  salarioCLTParaEmpatar,
} from '../lib/tax/brazil2026';

// Same assumptions as the table on /calculadora, so the numbers match across pages.
const CONTABILIDADE = 359;
const TAXA_RECEBIMENTO = 0.001;
const FAIXAS_SIMPLES = [180000, 360000, 720000, 1800000, 3600000, 4800000];

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const brl0 = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const pct = (n: number) => `${(n * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
const impostoTotal = (r: PJResult) => r.faturamento - r.contabilidade - r.liquido;
const tableCell = 'border-b border-paper-line px-4 py-3 text-left';

function simular(s: QuantoSobraScenario) {
  const rate = REFERENCE_RATES[s.currency];
  const bruto = s.amount * rate;
  const faturamento = bruto * (1 - TAXA_RECEBIMENTO);
  const proLaboreIII = proLaboreFatorR(faturamento);
  const anexoIII = pjSimples(faturamento, proLaboreIII, CONTABILIDADE, true);
  const anexoV = pjSimples(faturamento, SALARIO_MINIMO, CONTABILIDADE, true);
  const simples = pjSimplesOtimo(faturamento, CONTABILIDADE, true);
  const presumido = pjPresumido(faturamento, SALARIO_MINIMO, CONTABILIDADE, true);
  const melhor = simples.liquido >= presumido.liquido ? simples : presumido;
  const rbt12 = faturamento * 12;
  const faixa = FAIXAS_SIMPLES.findIndex((f) => rbt12 <= f) + 1;
  return {
    rate,
    bruto,
    faturamento,
    anexoIII,
    anexoV,
    simples,
    presumido,
    melhor,
    rbt12,
    faixa,
    cltEquivalente: salarioCLTParaEmpatar(melhor.liquido, 0),
  };
}

const QuantoSobraPage: React.FC<{ scenario: QuantoSobraScenario }> = ({ scenario }) => {
  const sim = simular(scenario);
  const { melhor, simples, presumido } = sim;
  const symbol = CURRENCIES.find((c) => c.code === scenario.currency)!.symbol;
  const moeda = scenario.currency === 'USD' ? 'dólar' : 'euro';
  const valor = `${symbol} ${scenario.amount.toLocaleString('pt-BR')}`;
  const regimeMelhor = melhor.regime === 'Simples Nacional' ? `Simples Nacional, Anexo ${melhor.anexo}` : 'Lucro Presumido';
  const imposto = impostoTotal(melhor);
  const presumidoGanha = melhor === presumido;
  const diferencaRegimes = Math.abs(simples.liquido - presumido.liquido);

  // Neighbours in the same currency, plus the same amount in the other currency when it exists.
  const mesmaMoeda = quantoSobraScenarios.filter((s) => s.currency === scenario.currency);
  const i = mesmaMoeda.findIndex((s) => s.slug === scenario.slug);
  const vizinhos = [mesmaMoeda[i - 1], mesmaMoeda[i + 1]].filter(Boolean);
  const outraMoeda = quantoSobraScenarios.find((s) => s.currency !== scenario.currency && s.amount === scenario.amount);
  const label = (s: QuantoSobraScenario) => `${CURRENCIES.find((c) => c.code === s.currency)!.symbol} ${s.amount.toLocaleString('pt-BR')} por mês`;

  const respostaRapida =
    `Recebendo ${valor} por mês como PJ (${brl0(sim.bruto)} com o ${moeda} a R$ ${sim.rate.toLocaleString('pt-BR')}), ` +
    `sobram cerca de ${brl0(melhor.liquido)} no seu bolso no ${regimeMelhor}, com as regras de ${RULES_LABEL}. ` +
    `Impostos, INSS e IR somam ${brl0(imposto)} (${pct(imposto / sim.faturamento)} do faturamento).`;

  const faqs: ToolFaq[] = [
    { q: `Quanto sobra de ${valor} por mês como PJ?`, a: respostaRapida },
    {
      q: `Simples Nacional ou Lucro Presumido para quem recebe ${valor}?`,
      a: presumidoGanha
        ? `Com ${valor} por mês, o Lucro Presumido deixa ${brl0(diferencaRegimes)} a mais por mês que o Simples. No Simples, a exportação tira PIS, COFINS e ISS do DAS, mas o faturamento de ${brl0(sim.rbt12)} em 12 meses já está na ${sim.faixa}ª faixa e o pró-labore de 28% paga INSS e IR.`
        : `Com ${valor} por mês, o Simples Nacional deixa ${brl0(diferencaRegimes)} a mais por mês que o Lucro Presumido. Na exportação de serviço, o DAS não tem PIS, COFINS nem ISS, e a alíquota efetiva fica em ${pct(simples.aliquotaEfetiva)}.`,
    },
    {
      q: `Qual salário CLT equivale a ${valor} como PJ?`,
      a: `Para ter o mesmo que sobra como PJ (${brl0(melhor.liquido)} por mês), um CLT precisaria de um salário bruto de cerca de ${brl0(sim.cltEquivalente)}, já contando 13º, 1/3 de férias e FGTS, sem benefícios.`,
    },
    {
      q: `Qual pró-labore usar recebendo ${valor} por mês?`,
      a:
        melhor.anexo === 'III'
          ? `Um pró-labore de ${brl0(sim.anexoIII.proLabore.bruto)}, 28% do faturamento, mantém a PJ no Anexo III (Fator R). Ele paga ${brl0(sim.anexoIII.proLabore.inss)} de INSS${sim.anexoIII.proLabore.irrf > 0 ? ` e ${brl0(sim.anexoIII.proLabore.irrf)} de IR` : ' e fica isento de IR'}, e ainda assim sai mais barato que o Anexo V.`
          : melhor.anexo === 'V'
            ? `Neste valor, compensa ficar no Anexo V com pró-labore de um salário mínimo (${brl0(SALARIO_MINIMO)}): o INSS e o IR de um pró-labore de 28% custariam mais do que a diferença de alíquota.`
            : `No Lucro Presumido não existe Fator R. Usamos um pró-labore de um salário mínimo (${brl0(SALARIO_MINIMO)}), com INSS de 11% do sócio e 20% da empresa.`,
    },
  ];

  const linhas = [
    { nome: 'Simples, Anexo III (pró-labore de 28%)', r: sim.anexoIII },
    { nome: 'Simples, Anexo V (pró-labore de 1 salário mínimo)', r: sim.anexoV },
    { nome: 'Lucro Presumido (pró-labore de 1 salário mínimo)', r: presumido },
  ];

  const observacoes = [
    `Faturamento de ${brl0(sim.rbt12)} em 12 meses: ${sim.faixa}ª faixa do Simples Nacional.`,
    melhor.impostoDividendos > 0
      ? `A distribuição de lucros passa de R$ 50 mil no mês, então há retenção de 10% de IR (${brl0(melhor.impostoDividendos)}). Dividir a distribuição entre meses pode evitar isso; vale ver com a contadora.`
      : `A distribuição de lucros (${brl0(melhor.distribuicao)} por mês) fica abaixo de R$ 50 mil, então não tem retenção de IR em 2026.`,
    melhor.proLabore.irrf > 0
      ? `O pró-labore de ${brl0(melhor.proLabore.bruto)} passa da faixa isenta de R$ 5.000 e paga ${brl0(melhor.proLabore.irrf)} de IR na fonte.`
      : `O pró-labore de ${brl0(melhor.proLabore.bruto)} fica na faixa isenta de IR de 2026 (até R$ 5.000).`,
    scenario.amount * sim.rate * 12 > 4800000 * 0.8
      ? 'O faturamento está perto do limite do Simples (R$ 4,8 milhões por ano); planeje a saída com antecedência.'
      : null,
  ].filter(Boolean) as string[];

  return (
    <ToolLayout
      path={`${QUANTO_SOBRA_BASE}/${scenario.slug}`}
      parent={{ to: '/calculadora', name: 'Calculadora PJ exterior' }}
      name={`${valor} por mês`}
      seoTitle={`${valor} por mês como PJ: quanto sobra em 2026 | Conte`}
      seoDescription={`Quem recebe ${valor} por mês como PJ fica com cerca de ${brl0(melhor.liquido)} no ${regimeMelhor}. Veja o cálculo com câmbio, impostos de 2026 e o regime mais barato.`}
      h1={`Quanto sobra de ${valor} por mês como PJ em 2026`}
      intro={respostaRapida}
      updated={RULES_LABEL}
      calculator={<Calculator initialCurrency={scenario.currency} initialAmount={scenario.amount} />}
      faqs={faqs}
      sources={[
        { title: 'Banco Central: cotações e boletins (PTAX)', url: 'https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes' },
        { title: 'Lei Complementar 123/2006: Simples Nacional e exportação (art. 18)', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm' },
        { title: 'Lei 9.249/1995: Lucro Presumido', url: 'https://www.planalto.gov.br/ccivil_03/leis/l9249.htm' },
        { title: 'Lei 15.270/2025: IR 2026 e dividendos', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm' },
      ]}
      related={[
        ...vizinhos.map((s) => ({ to: `${QUANTO_SOBRA_BASE}/${s.slug}`, title: `Quanto sobra de ${label(s)}`, description: 'Mesmo cálculo, outro valor.' })),
        ...(outraMoeda ? [{ to: `${QUANTO_SOBRA_BASE}/${outraMoeda.slug}`, title: `Quanto sobra de ${label(outraMoeda)}`, description: 'O mesmo valor na outra moeda.' }] : []),
        { to: '/calculadora-fator-r', title: 'Calculadora Fator R', description: 'Anexo III ou V e o pró-labore mínimo.' },
        { to: '/contabilidade-para-exterior', title: 'Contabilidade para exterior', description: 'Para PJ que presta serviço para fora.' },
      ]}
    >
      <section className="bg-paper-deep py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">
            {valor} por mês nos três cenários
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {valor} viram {brl(sim.bruto)} com o {moeda} a R$ {sim.rate.toLocaleString('pt-BR')} (PTAX de compra do Banco Central em {REFERENCE_DATE}).
            Descontada a taxa de recebimento de 0,1%, a PJ fatura {brl(sim.faturamento)}. Contabilidade de {brl(CONTABILIDADE)}/mês nos três cenários.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[24px] border border-paper-line bg-white">
            <table className="w-full min-w-[620px] border-collapse text-[15px]">
              <thead>
                <tr className="text-sm text-ink-muted">
                  <th scope="col" className={tableCell}>Cenário</th>
                  <th scope="col" className={tableCell}>Imposto da empresa</th>
                  <th scope="col" className={tableCell}>INSS e IR do sócio</th>
                  <th scope="col" className={`${tableCell} bg-brand/10 text-ink`}>Sobra por mês</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {linhas.map(({ nome, r }) => {
                  const ehMelhor = r.liquido === melhor.liquido;
                  return (
                    <tr key={nome}>
                      <th scope="row" className={`${tableCell} font-semibold text-ink`}>
                        {nome}
                        {ehMelhor && <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-ink">Melhor</span>}
                      </th>
                      <td className={tableCell}>
                        {brl(r.impostosEmpresa + r.inssPatronal)} ({pct((r.impostosEmpresa + r.inssPatronal) / r.faturamento)})
                      </td>
                      <td className={tableCell}>{brl(r.proLabore.inss + r.proLabore.irrf + r.impostoDividendos)}</td>
                      <td className={`${tableCell} bg-brand/10 font-semibold text-ink`}>{brl(r.liquido)}</td>
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
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">Se o {moeda} mudar</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            O mesmo {valor} com o câmbio 10% abaixo e 10% acima do de {REFERENCE_DATE}, sempre no regime mais barato para cada valor.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[24px] border border-paper-line bg-white">
            <table className="w-full min-w-[560px] border-collapse text-[15px]">
              <thead>
                <tr className="text-sm text-ink-muted">
                  <th scope="col" className={tableCell}>Câmbio</th>
                  <th scope="col" className={tableCell}>Em reais</th>
                  <th scope="col" className={tableCell}>Regime</th>
                  <th scope="col" className={`${tableCell} bg-brand/10 text-ink`}>Sobra por mês</th>
                  <th scope="col" className={tableCell}>Sobra no ano</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {[0.9, 1, 1.1].map((m) => {
                  const taxa = sim.rate * m;
                  const fat = scenario.amount * taxa * (1 - TAXA_RECEBIMENTO);
                  const sN = pjSimplesOtimo(fat, CONTABILIDADE, true);
                  const lP = pjPresumido(fat, SALARIO_MINIMO, CONTABILIDADE, true);
                  const b = sN.liquido >= lP.liquido ? sN : lP;
                  return (
                    <tr key={m}>
                      <th scope="row" className={`${tableCell} font-semibold text-ink`}>
                        R$ {taxa.toLocaleString('pt-BR', { maximumFractionDigits: 4 })}
                        {m !== 1 && <span className="font-normal text-ink-muted"> ({m < 1 ? '−10%' : '+10%'})</span>}
                      </th>
                      <td className={tableCell}>{brl0(scenario.amount * taxa)}</td>
                      <td className={tableCell}>{b.regime === 'Simples Nacional' ? `Simples, Anexo ${b.anexo}` : 'Lucro Presumido'}</td>
                      <td className={`${tableCell} bg-brand/10 font-semibold text-ink`}>{brl0(b.liquido)}</td>
                      <td className={tableCell}>{brl0(b.liquido * 12)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">O que pesa neste valor</h2>
          <ul className="mt-8 space-y-4 text-[17px] leading-relaxed text-ink-muted">
            {observacoes.map((o) => (
              <li key={o} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ToolLayout>
  );
};

export default QuantoSobraPage;
