import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import MoneyInput from '../components/tools/MoneyInput';
import ToolLayout from '../components/tools/ToolLayout';
import ToolPanel, { Details } from '../components/tools/ToolPanel';
import { SIGNUP_URL } from '../lib/links';
import { BCB_SOURCE_URL, CURRENCIES, CurrencyCode, fetchRates, REFERENCE_DATE, REFERENCE_RATES } from '../lib/fx';
import { PJResult, pjPresumido, pjSimples, pjSimplesOtimo, RULES_LABEL, SALARIO_MINIMO } from '../lib/tax/brazil2026';

const CONTABILIDADE = 359;
const TECHFX_URL = 'https://www.techfx.com.br/conte-contabilidade/';
const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const pct = (n: number) => `${(n * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;

// Everything that goes to the government: company taxes, payroll INSS, IR on pró-labore and on dividends.
const impostoTotal = (r: PJResult) => r.faturamento - r.contabilidade - r.liquido;

const Row: React.FC<{ label: string; value: string; strong?: boolean }> = ({ label, value, strong }) => (
  <div className={`flex items-baseline justify-between gap-4 py-2 ${strong ? 'border-t border-paper-line pt-3' : ''}`}>
    <span className={strong ? 'font-semibold text-ink' : 'text-sm text-ink-muted'}>{label}</span>
    <span className={`shrink-0 whitespace-nowrap tabular-nums ${strong ? 'font-display text-xl font-semibold text-ink' : 'text-sm text-ink-muted'}`}>{value}</span>
  </div>
);

const RegimeBreakdown: React.FC<{ title: string; result: PJResult }> = ({ title, result: r }) => (
  <div>
    <p className="font-semibold text-ink">{title}</p>
    {r.detalhes.map((d) => (
      <Row key={d.label} label={d.label} value={`− ${brl(d.value)}`} />
    ))}
    {r.inssPatronal > 0 && <Row label="INSS patronal (20% do pró-labore)" value={`− ${brl(r.inssPatronal)}`} />}
    <Row label={`INSS do pró-labore (${brl(r.proLabore.bruto)})`} value={`− ${brl(r.proLabore.inss)}`} />
    <Row label="IR do pró-labore" value={`− ${brl(r.proLabore.irrf)}`} />
    {r.impostoDividendos > 0 && <Row label="IR sobre dividendos (acima de R$ 50 mil)" value={`− ${brl(r.impostoDividendos)}`} />}
    <Row label="Contabilidade" value={`− ${brl(r.contabilidade)}`} />
    <Row label="Sobra por mês" value={brl(r.liquido)} strong />
  </div>
);

const Calculator: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState(5000);
  const [rates, setRates] = useState(REFERENCE_RATES);
  const [rateDate, setRateDate] = useState(REFERENCE_DATE);
  const [rateOverride, setRateOverride] = useState(0);
  const [feePct, setFeePct] = useState(0.5);
  const [proLabore, setProLabore] = useState(0);

  useEffect(() => {
    fetchRates().then((r) => {
      if (r) {
        setRates(r.rates);
        setRateDate(r.date);
      }
    });
  }, []);

  const rate = rateOverride || rates[currency];
  const bruto = amount * rate;
  const taxa = bruto * (feePct / 100);
  const faturamento = bruto - taxa;

  const { simples, presumido } = useMemo(() => {
    if (faturamento <= 0) return { simples: null, presumido: null };
    const simplesResult = proLabore > 0 ? pjSimples(faturamento, proLabore, CONTABILIDADE, true) : pjSimplesOtimo(faturamento, CONTABILIDADE, true);
    const presumidoResult = pjPresumido(faturamento, proLabore || SALARIO_MINIMO, CONTABILIDADE, true);
    return { simples: simplesResult, presumido: presumidoResult };
  }, [faturamento, proLabore]);

  const symbol = CURRENCIES.find((c) => c.code === currency)!.symbol;
  const best = simples && presumido ? (simples.liquido >= presumido.liquido ? 'simples' : 'presumido') : null;
  const melhor = best === 'simples' ? simples : presumido;

  const regimes = simples && presumido
    ? [
        { key: 'simples', title: `Simples Nacional${simples.anexo ? ` (Anexo ${simples.anexo})` : ''}`, result: simples },
        { key: 'presumido', title: 'Lucro Presumido', result: presumido },
      ]
    : [];

  return (
    <ToolPanel
      inputs={
        <div className="space-y-5">
          <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-[auto_1.2fr_1fr_0.8fr_1fr]">
            <div>
              <span className="mb-1.5 block text-sm font-medium text-ink">Moeda</span>
              <div className="flex gap-2" role="radiogroup" aria-label="Moeda">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    role="radio"
                    aria-checked={currency === c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setRateOverride(0);
                    }}
                    className={`h-12 flex-1 rounded-xl border px-3 text-sm font-medium transition-colors lg:w-16 lg:flex-none ${
                      currency === c.code ? 'border-ink bg-ink text-white' : 'border-paper-line bg-white text-ink hover:border-ink/30'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>
            <MoneyInput id="amount" label="Quanto você recebe por mês" prefix={symbol} value={amount} onChange={setAmount} />
            <MoneyInput
              id="rate"
              label="Câmbio (R$)"
              value={rate}
              onChange={setRateOverride}
              decimals={4}
              hint={
                <>
                  {rateOverride ? 'Valor ajustado por você. ' : `PTAX de compra de ${rateDate}, `}
                  <a href={BCB_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/20 underline-offset-2 hover:decoration-ink">
                    Banco Central
                  </a>
                </>
              }
            />
            <MoneyInput id="fee" label="Taxa de recebimento" prefix="%" value={feePct} onChange={setFeePct} hint="Quanto o banco ou a plataforma cobra." />
            <MoneyInput
              id="prolabore"
              label="Pró-labore (opcional)"
              value={proLabore}
              onChange={setProLabore}
              hint="Vazio: usamos o mais vantajoso."
            />
          </div>

          <a
            href={TECHFX_URL}
            target="_blank"
            rel="noopener sponsored"
            className="group flex flex-col gap-4 rounded-2xl border border-[#C5AFE7] bg-gradient-to-r from-white via-[#F9F5FF] to-[#E4D7F7] p-4 transition-shadow hover:shadow-card sm:flex-row sm:items-center sm:justify-between sm:px-5"
          >
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <img src="/logos/techfx.svg" alt="TechFX" width={96} height={17} className="h-[17px] w-auto shrink-0" />
              <p className="text-sm leading-snug text-[#380E7A]">
                <span className="font-semibold">Clientes Conte pagam só 0,1% de taxa nos 2 primeiros recebimentos.</span>{' '}
                <span className="text-[#6639AD]">TechFX: sem spread escondido e com isenção de IOF.</span>
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#380E7A] px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-[#461199]">
              Garantir benefício
              <ArrowRight size={15} />
            </span>
          </a>
        </div>
      }
      highlight={
        melhor ? (
          <>
            <p className="text-sm font-medium text-ink-muted">Sobra no seu bolso</p>
            <p className="mt-1 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink tabular-nums">{brl(melhor.liquido)}</p>
            <p className="mt-1 text-[15px] text-ink-muted">
              por mês, de {symbol} {amount.toLocaleString('pt-BR')} recebidos ({brl(bruto)}).
            </p>
            {(() => {
              const parts = [
                { label: 'No seu bolso', value: melhor.liquido, className: 'bg-brand' },
                { label: 'Impostos', value: impostoTotal(melhor), className: 'bg-ink' },
                { label: 'Taxa e contabilidade', value: taxa + melhor.contabilidade, className: 'bg-ink/25' },
              ];
              return (
                <div className="mt-6">
                  <div className="flex h-3 overflow-hidden rounded-full" aria-hidden>
                    {parts.map((p) => (
                      <div key={p.label} className={`${p.className} transition-all duration-500`} style={{ width: `${(p.value / bruto) * 100}%` }} />
                    ))}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
                    {parts.map((p) => (
                      <li key={p.label} className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${p.className}`} />
                        {p.label}: <span className="tabular-nums text-ink">{pct(p.value / bruto)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </>
        ) : (
          <p className="text-ink-muted">Informe quanto você recebe por mês para ver o resultado.</p>
        )
      }
      comparison={
        <div>
          <p className="mb-3 text-sm font-medium text-ink-muted">Qual regime deixa mais dinheiro com você</p>
          <div className="grid grid-cols-2 gap-3">
            {regimes.map((r) => (
              <div key={r.key} className={`rounded-2xl bg-white p-5 ${best === r.key ? 'ring-2 ring-brand' : 'border border-paper-line'}`}>
                <p className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
                  {r.key === 'simples' ? 'Simples Nacional' : 'Lucro Presumido'}
                  {best === r.key && <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-ink">Melhor</span>}
                </p>
                <p className="mt-1 font-display text-xl sm:text-2xl font-semibold text-ink tabular-nums">{brl(r.result.liquido)}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  impostos: {brl(impostoTotal(r.result))} ({pct(impostoTotal(r.result) / r.result.faturamento)})
                </p>
              </div>
            ))}
          </div>
          {simples && presumido && (
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {best === 'presumido'
                ? `No Simples o imposto da empresa é menor (${pct(simples.aliquotaEfetiva)}), mas ${
                    simples.anexo === 'III'
                      ? `exige pró-labore de 28% (${brl(simples.proLabore.bruto)}), que paga INSS e IR`
                      : 'cai no Anexo V, com alíquota maior'
                  }. Somando tudo, o Lucro Presumido sai mais barato.`
                : `No Simples, a exportação tira PIS, COFINS e ISS do imposto. Somando tudo, ele sai mais barato que o Lucro Presumido.`}
            </p>
          )}
        </div>
      }
      details={
        melhor && (
          <Details summary="Ver o cálculo completo">
            <div className="mb-6 max-w-md space-y-1 text-sm text-ink-soft">
              <div className="flex justify-between">
                <span>Valor em reais</span>
                <span className="whitespace-nowrap tabular-nums">{brl(bruto)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de recebimento ({pct(feePct / 100)})</span>
                <span className="whitespace-nowrap tabular-nums">− {brl(taxa)}</span>
              </div>
              <div className="flex justify-between font-semibold text-ink">
                <span>Faturamento da PJ</span>
                <span className="whitespace-nowrap tabular-nums">{brl(faturamento)}</span>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {regimes.map((r) => (
                <RegimeBreakdown key={r.key} title={r.title} result={r.result} />
              ))}
            </div>
          </Details>
        )
      }
      cta={
        <>
          <p className="text-[15px] text-ink-soft">
            <span className="font-semibold text-ink">Quer pagar só o imposto necessário?</span> A contadora da Conte escolhe o melhor regime para a sua PJ.
          </p>
          <Button href={SIGNUP_URL} className="shrink-0">
            Começar agora
            <ArrowRight size={16} />
          </Button>
        </>
      }
    />
  );
};

const EXEMPLOS_USD = [2000, 4000, 6000, 8000, 10000, 15000];
const tableCell = 'border-b border-paper-line px-4 py-3 text-left';

const CalculatorPage: React.FC = () => (
  <ToolLayout
    path="/calculadora"
    name="Calculadora PJ exterior"
    seoTitle="Calculadora PJ exterior 2026: quanto sobra recebendo em dólar | Conte"
    seoDescription="Simule quanto sobra no bolso de quem trabalha como PJ para empresas de fora: câmbio de hoje, taxa de recebimento e impostos de 2026 no Simples Nacional e no Lucro Presumido."
    h1="Calculadora PJ exterior: quanto sobra recebendo de fora"
    intro="A calculadora PJ exterior da Conte mostra quanto sobra no seu bolso quando você presta serviço como PJ para uma empresa de fora do Brasil: converte com o câmbio de hoje, desconta a taxa de recebimento e compara os impostos de 2026 no Simples Nacional e no Lucro Presumido."
    updated={RULES_LABEL}
    calculator={<Calculator />}
    faqs={[
      {
        q: 'Quanto imposto paga o PJ que recebe do exterior?',
        a: 'No Simples Nacional, exportação de serviço não paga PIS, COFINS nem ISS dentro do DAS. No Anexo III, isso derruba a alíquota inicial de 6% para cerca de 3%. Somando INSS e IR do pró-labore e a contabilidade, quem fatura até uns R$ 30 mil por mês costuma ficar com 85% a 90% do valor recebido.',
      },
      {
        q: 'Simples Nacional ou Lucro Presumido para quem exporta serviço?',
        a: 'Até cerca de R$ 25 a 30 mil por mês, o Simples Nacional costuma sair mais barato, porque a exportação tira PIS, COFINS e ISS do DAS. Acima disso, o Lucro Presumido tende a compensar. A calculadora compara os dois com o seu valor.',
      },
      {
        q: 'O que é o Fator R?',
        a: 'É a relação entre o pró-labore (folha de pagamento) e o faturamento dos últimos 12 meses. Se for de pelo menos 28%, a atividade de serviço fica no Anexo III do Simples, mais barato. Abaixo disso, vai para o Anexo V.',
      },
      {
        q: 'Qual câmbio a calculadora usa?',
        a: 'A PTAX de compra mais recente, publicada pelo Banco Central. É a referência oficial para quem recebe em moeda estrangeira. Você pode ajustar o câmbio e a taxa de recebimento para refletir o que o seu banco ou plataforma cobra.',
      },
      {
        q: 'Dividendos pagam imposto em 2026?',
        a: 'Até R$ 50 mil por mês, por empresa, não. Acima disso, há retenção de 10% sobre o valor total distribuído no mês (Lei 15.270/2025). A calculadora já considera essa regra.',
      },
    ]}
    sources={[
      { title: 'Banco Central: cotações e boletins (PTAX)', url: 'https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes' },
      { title: 'Lei Complementar 123/2006: Simples Nacional e exportação (art. 18)', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm' },
      { title: 'LC 116/2003: ISS não incide sobre exportação de serviços', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp116.htm' },
      { title: 'MP 2.158-35: PIS e COFINS isentos na exportação de serviços', url: 'https://www.planalto.gov.br/ccivil_03/mpv/2158-35.htm' },
      { title: 'Lei 9.249/1995: Lucro Presumido', url: 'https://www.planalto.gov.br/ccivil_03/leis/l9249.htm' },
      { title: 'Lei 15.270/2025: IR 2026 e dividendos', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm' },
    ]}
    related={[
      { to: '/contabilidade-para-exterior', title: 'Contabilidade para exterior', description: 'Para PJ que presta serviço para fora.' },
      { to: '/clt-vs-pj', title: 'Calculadora CLT vs PJ', description: 'Compare salário CLT com proposta PJ.' },
      { to: '/abrir-empresa', title: 'Abrir empresa grátis', description: 'A Conte abre seu CNPJ sem custo.' },
      { to: '/trocar-de-contador', title: 'Trocar de contador', description: 'A gente cuida da troca para você.' },
    ]}
  >
    <section className="bg-paper-deep py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">
          Quanto sobra para quem recebe em dólar como PJ?
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Simulação com dólar a R$ {REFERENCE_RATES.USD.toLocaleString('pt-BR')} (PTAX de compra do Banco Central em {REFERENCE_DATE}), taxa de recebimento de 0,5%, regras de {RULES_LABEL} e
          contabilidade de {brl(CONTABILIDADE)}/mês.
        </p>
        <div className="mt-8 overflow-x-auto rounded-[24px] border border-paper-line bg-white">
          <table className="w-full min-w-[600px] border-collapse text-[15px]">
            <thead>
              <tr className="text-sm text-ink-muted">
                <th scope="col" className={tableCell}>Recebe por mês</th>
                <th scope="col" className={tableCell}>Em reais</th>
                <th scope="col" className={tableCell}>Simples Nacional</th>
                <th scope="col" className={tableCell}>Lucro Presumido</th>
                <th scope="col" className={`${tableCell} bg-brand/10 text-ink`}>Sobra no bolso</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {EXEMPLOS_USD.map((usd) => {
                const bruto = usd * REFERENCE_RATES.USD;
                const fat = bruto * 0.995;
                const s = pjSimplesOtimo(fat, CONTABILIDADE, true);
                const p = pjPresumido(fat, SALARIO_MINIMO, CONTABILIDADE, true);
                const best = Math.max(s.liquido, p.liquido);
                return (
                  <tr key={usd}>
                    <th scope="row" className={`${tableCell} font-semibold text-ink`}>US$ {usd.toLocaleString('pt-BR')}</th>
                    <td className={tableCell}>{brl(bruto)}</td>
                    <td className={tableCell}>{brl(s.liquido)}</td>
                    <td className={tableCell}>{brl(p.liquido)}</td>
                    <td className={`${tableCell} bg-brand/10 font-semibold text-ink`}>
                      {brl(best)} <span className="font-normal text-ink-muted">({pct(best / bruto)})</span>
                    </td>
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
            <h3 className="font-display text-xl font-semibold text-ink">Simples Nacional</h3>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-ink-muted">
              <li>Alíquota efetiva pelos Anexos III ou V, conforme o Fator R e o faturamento dos últimos 12 meses.</li>
              <li>Na exportação de serviço, tiramos PIS, COFINS e ISS do DAS, como manda a LC 123 (art. 18).</li>
              <li>Pró-labore com INSS de 11% e IR na fonte com a isenção de 2026 até R$ 5.000.</li>
              <li>Escolhemos o pró-labore que deixa mais dinheiro no seu bolso: 28% do faturamento ou um salário mínimo.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">Lucro Presumido</h3>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-ink-muted">
              <li>IRPJ de 15% e CSLL de 9% sobre 32% do faturamento, com adicional de 10% de IRPJ acima de R$ 20 mil de lucro presumido por mês.</li>
              <li>Exportação de serviço sem PIS, COFINS e ISS.</li>
              <li>Pró-labore de um salário mínimo, com INSS patronal de 20% e INSS de 11% do sócio.</li>
              <li>Lucro distribuído isento até R$ 50 mil por mês; acima disso, 10% de IR.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </ToolLayout>
);

export default CalculatorPage;
