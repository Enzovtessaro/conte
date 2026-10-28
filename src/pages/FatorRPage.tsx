import React, { useMemo, useState } from 'react';
import MoneyInput from '../components/tools/MoneyInput';
import ToolLayout from '../components/tools/ToolLayout';
import ToolPanel, { Details } from '../components/tools/ToolPanel';
import ToolCta from '../components/tools/ToolCta';
import { FATOR_R_MINIMO, pjSimples, proLaboreFatorR, RULES_LABEL, SALARIO_MINIMO, simplesNacional } from '../lib/tax/brazil2026';

const CONTABILIDADE = 359;
const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const brl0 = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const pct = (n: number) => `${(n * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;
const tableCell = 'border-b border-paper-line px-4 py-3 text-left';

const proLaboreMinimo = proLaboreFatorR;

const Calculator: React.FC = () => {
  const [faturamento, setFaturamento] = useState(15000);
  const [proLabore, setProLabore] = useState(SALARIO_MINIMO);
  const [exportacao, setExportacao] = useState(false);

  const r = useMemo(() => {
    if (faturamento <= 0) return null;
    const fatorR = proLabore / faturamento;
    const atual = pjSimples(faturamento, Math.max(proLabore, 0), CONTABILIDADE, exportacao);
    const minimo = proLaboreMinimo(faturamento);
    const anexoIII = pjSimples(faturamento, minimo, CONTABILIDADE, exportacao);
    const anexoV = pjSimples(faturamento, SALARIO_MINIMO, CONTABILIDADE, exportacao);
    const melhor = anexoIII.liquido >= anexoV.liquido ? anexoIII : anexoV;
    return { fatorR, atual, minimo, anexoIII, anexoV, melhor };
  }, [faturamento, proLabore, exportacao]);

  return (
    <ToolPanel
      inputs={
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
          <MoneyInput id="faturamento" label="Faturamento médio por mês (últimos 12 meses)" value={faturamento} onChange={setFaturamento} />
          <MoneyInput
            id="prolabore"
            label="Pró-labore por mês"
            value={proLabore}
            onChange={setProLabore}
            hint="Some salários e FGTS se a empresa tiver funcionários."
          />
          <label className="flex cursor-pointer items-center gap-3 text-[15px] text-ink md:col-span-2">
            <input
              type="checkbox"
              checked={exportacao}
              onChange={(e) => setExportacao(e.target.checked)}
              className="h-5 w-5 rounded border-paper-line accent-[#25D366]"
            />
            Recebo de empresas de fora do Brasil (exportação de serviço)
          </label>
        </div>
      }
      highlight={
        r ? (
          <>
            <p className="text-sm font-medium text-ink-muted">Seu Fator R</p>
            <p className="mt-1 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink tabular-nums">{pct(r.fatorR)}</p>
            <p className="mt-1 text-[15px] text-ink-muted">
              {r.fatorR >= FATOR_R_MINIMO
                ? `Acima de 28%: sua PJ fica no Anexo III, com DAS de ${brl(r.atual.impostosEmpresa)} (${pct(r.atual.aliquotaEfetiva)}).`
                : `Abaixo de 28%: sua PJ vai para o Anexo V, com DAS de ${brl(r.atual.impostosEmpresa)} (${pct(r.atual.aliquotaEfetiva)}).`}
            </p>
            <p className="mt-3 text-[15px] text-ink">
              Pró-labore mínimo para o Anexo III: <span className="font-semibold tabular-nums">{brl(r.minimo)}</span>
            </p>
          </>
        ) : (
          <p className="text-ink-muted">Informe o faturamento para ver o seu Fator R.</p>
        )
      }
      comparison={
        r && (
          <div>
            <p className="mb-3 text-sm font-medium text-ink-muted">Qual pró-labore deixa mais dinheiro com você</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'III', title: `Anexo III, pró-labore de ${brl0(r.minimo)}`, res: r.anexoIII },
                { key: 'V', title: `Anexo V, pró-labore de ${brl0(SALARIO_MINIMO)}`, res: r.anexoV },
              ].map((c) => (
                <div key={c.key} className={`rounded-2xl bg-white p-5 ${r.melhor === c.res ? 'ring-2 ring-brand' : 'border border-paper-line'}`}>
                  <p className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
                    {c.title}
                    {r.melhor === c.res && <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-ink">Melhor</span>}
                  </p>
                  <p className="mt-1 font-display text-xl sm:text-2xl font-semibold text-ink tabular-nums">{brl(c.res.liquido)}</p>
                  <p className="mt-1 text-sm text-ink-muted">sobra por mês</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              O pró-labore maior paga 11% de INSS e pode pagar IR, mas derruba o DAS. A diferença entre os dois é de{' '}
              {brl(Math.abs(r.anexoIII.liquido - r.anexoV.liquido))} por mês.
            </p>
          </div>
        )
      }
      details={
        r && (
          <Details summary="Ver o cálculo completo">
            <div className="grid gap-8 md:grid-cols-2">
              {[r.anexoIII, r.anexoV].map((x) => (
                <div key={x.anexo} className="space-y-1 text-sm text-ink-soft">
                  <p className="font-semibold text-ink">Anexo {x.anexo}</p>
                  <div className="flex justify-between"><span>DAS ({pct(x.aliquotaEfetiva)})</span><span className="tabular-nums">− {brl(x.impostosEmpresa)}</span></div>
                  <div className="flex justify-between"><span>INSS do pró-labore (11%)</span><span className="tabular-nums">− {brl(x.proLabore.inss)}</span></div>
                  <div className="flex justify-between"><span>IR do pró-labore</span><span className="tabular-nums">− {brl(x.proLabore.irrf)}</span></div>
                  {x.impostoDividendos > 0 && (
                    <div className="flex justify-between"><span>IR sobre dividendos</span><span className="tabular-nums">− {brl(x.impostoDividendos)}</span></div>
                  )}
                  <div className="flex justify-between"><span>Contabilidade</span><span className="tabular-nums">− {brl(x.contabilidade)}</span></div>
                  <div className="flex justify-between border-t border-paper-line pt-2 font-semibold text-ink"><span>Sobra</span><span className="tabular-nums">{brl(x.liquido)}</span></div>
                </div>
              ))}
            </div>
          </Details>
        )
      }
      cta={
        <ToolCta
          title="Fator R abaixo de 28% sem querer?"
          text="A contadora da Conte ajusta o pró-labore todo mês para a sua PJ ficar no anexo certo."
          whatsappText={`Oi! Usei a calculadora de Fator R da Conte: faturo ${brl0(faturamento)} por mês com pró-labore de ${brl0(proLabore)}. Quero ajuda com o meu Fator R.`}
        />
      }
    />
  );
};

const EXEMPLOS = [6000, 8000, 10000, 15000, 20000, 30000, 50000];

const FatorRPage: React.FC = () => (
  <ToolLayout
    path="/calculadora-fator-r"
    image="/og/fator-r.png"
    name="Calculadora Fator R"
    seoTitle="Calculadora Fator R 2026: Anexo III ou V | Conte"
    seoDescription="Calcule o Fator R da sua PJ, veja se ela fica no Anexo III ou no Anexo V do Simples Nacional e qual pró-labore deixa mais dinheiro com você em 2026."
    h1="Calculadora Fator R: Anexo III ou Anexo V"
    intro="A calculadora de Fator R da Conte mostra em que anexo do Simples Nacional a sua PJ de serviço fica, qual é o pró-labore mínimo para chegar a 28% e se esse pró-labore compensa, já descontando INSS e IR de 2026."
    updated={RULES_LABEL}
    calculator={<Calculator />}
    faqs={[
      {
        q: 'O que é o Fator R?',
        a: 'Fator R é a divisão da folha de salários dos últimos 12 meses (pró-labore, salários e FGTS) pela receita bruta dos mesmos 12 meses. Para serviços como desenvolvimento de software e consultoria, um Fator R de 28% ou mais leva a empresa ao Anexo III do Simples Nacional; abaixo disso, ao Anexo V.',
      },
      {
        q: 'Qual a diferença entre o Anexo III e o Anexo V?',
        a: 'No Anexo III, a alíquota nominal começa em 6% para quem fatura até R$ 180 mil em 12 meses. No Anexo V, começa em 15,5%. Por isso o pró-labore de 28% costuma compensar: ele paga 11% de INSS, mas derruba o DAS em mais de 9 pontos.',
      },
      {
        q: 'Qual pró-labore preciso para ficar no Anexo III?',
        a: 'Pelo menos 28% do faturamento médio mensal, nunca menos que um salário mínimo (R$ 1.621 em 2026). Quem fatura R$ 15 mil por mês precisa de R$ 4.200 de pró-labore. A calculadora mostra o valor para o seu faturamento.',
      },
      {
        q: 'O pró-labore de 28% sempre compensa?',
        a: 'Na maioria dos casos, sim. Em faturamentos altos, o IR do pró-labore cresce e a vantagem diminui; na exportação de serviço, o DAS já é menor e a conta muda. A calculadora compara os dois cenários com o seu valor.',
      },
      {
        q: 'O Fator R é calculado todo mês?',
        a: 'Sim. A cada DAS, o Fator R usa a folha e a receita dos 12 meses anteriores. Um mês de pró-labore baixo pode jogar a empresa no Anexo V por algum tempo, por isso vale manter o pró-labore ajustado ao faturamento.',
      },
    ]}
    sources={[
      { title: 'Lei Complementar 123/2006: Anexos III e V e Fator R (art. 18, §5º-J e §5º-M)', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm' },
      { title: 'Portaria MPS/MF 13/2026: salário mínimo e INSS 2026', url: 'https://www.in.gov.br/en/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603' },
      { title: 'Lei 15.270/2025: IR 2026', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm' },
    ]}
    related={[
      { to: '/calculadora-pro-labore', title: 'Calculadora de pró-labore', description: 'INSS, IR e o líquido do pró-labore.' },
      { to: '/calculadora', title: 'Calculadora PJ exterior', description: 'Para quem recebe de empresas de fora.' },
      { to: '/clt-vs-pj', title: 'Calculadora CLT vs PJ', description: 'Compare salário CLT com proposta PJ.' },
      { to: '/abrir-empresa', title: 'Abrir empresa grátis', description: 'A Conte abre seu CNPJ sem custo.' },
    ]}
  >
    <section className="bg-paper-deep py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">Pró-labore mínimo para o Fator R, por faturamento</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Serviço para clientes no Brasil, faturamento igual nos últimos 12 meses, regras de {RULES_LABEL}.
        </p>
        <div className="mt-8 overflow-x-auto rounded-[24px] border border-paper-line bg-white">
          <table className="w-full min-w-[620px] border-collapse text-[15px]">
            <thead>
              <tr className="text-sm text-ink-muted">
                <th scope="col" className={tableCell}>Faturamento/mês</th>
                <th scope="col" className={tableCell}>Pró-labore mínimo (28%)</th>
                <th scope="col" className={tableCell}>DAS no Anexo III</th>
                <th scope="col" className={tableCell}>DAS no Anexo V</th>
                <th scope="col" className={`${tableCell} bg-brand/10 text-ink`}>Melhor opção</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {EXEMPLOS.map((f) => {
                const iii = simplesNacional(f, f * 12, 'III', false);
                const v = simplesNacional(f, f * 12, 'V', false);
                const a = pjSimples(f, proLaboreMinimo(f), CONTABILIDADE, false);
                const b = pjSimples(f, SALARIO_MINIMO, CONTABILIDADE, false);
                const melhor = a.liquido >= b.liquido ? `Anexo III (+ ${brl0(a.liquido - b.liquido)}/mês)` : `Anexo V (+ ${brl0(b.liquido - a.liquido)}/mês)`;
                return (
                  <tr key={f}>
                    <th scope="row" className={`${tableCell} font-semibold text-ink`}>{brl0(f)}</th>
                    <td className={tableCell}>{brl(proLaboreMinimo(f))}</td>
                    <td className={tableCell}>{brl(iii.das)} ({pct(iii.aliquotaEfetiva)})</td>
                    <td className={tableCell}>{brl(v.das)} ({pct(v.aliquotaEfetiva)})</td>
                    <td className={`${tableCell} bg-brand/10 font-semibold text-ink`}>{melhor}</td>
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

export default FatorRPage;
