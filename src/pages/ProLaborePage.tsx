import React, { useMemo, useState } from 'react';
import MoneyInput from '../components/tools/MoneyInput';
import ToolLayout from '../components/tools/ToolLayout';
import ToolPanel from '../components/tools/ToolPanel';
import ToolCta from '../components/tools/ToolCta';
import { FATOR_R_MINIMO, INSS_PRO_LABORE_RATE, proLaboreFatorR, INSS_TETO, proLaboreLiquido, RULES_LABEL, SALARIO_MINIMO } from '../lib/tax/brazil2026';

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const brl0 = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const pct = (n: number) => `${(n * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;
const tableCell = 'border-b border-paper-line px-4 py-3 text-left';

const Calculator: React.FC = () => {
  const [bruto, setBruto] = useState(4200);
  const [faturamento, setFaturamento] = useState(0);
  const r = useMemo(() => (bruto > 0 ? proLaboreLiquido(bruto) : null), [bruto]);
  const fatorR = faturamento > 0 ? bruto / faturamento : null;

  return (
    <ToolPanel
      inputs={
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
          <MoneyInput id="bruto" label="Pró-labore bruto por mês" value={bruto} onChange={setBruto} />
          <MoneyInput
            id="faturamento"
            label="Faturamento da PJ por mês (opcional)"
            value={faturamento}
            onChange={setFaturamento}
            hint="Para ver o Fator R desse pró-labore."
          />
        </div>
      }
      highlight={
        r ? (
          <>
            <p className="text-sm font-medium text-ink-muted">Pró-labore líquido</p>
            <p className="mt-1 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-ink tabular-nums">{brl(r.liquido)}</p>
            <p className="mt-1 text-[15px] text-ink-muted">por mês, de {brl(r.bruto)} brutos.</p>
            {fatorR !== null && (
              <p className="mt-3 text-[15px] text-ink">
                Fator R: <span className="font-semibold tabular-nums">{pct(fatorR)}</span>{' '}
                {fatorR >= FATOR_R_MINIMO ? '(Anexo III)' : `(Anexo V; para o III, ${brl(proLaboreFatorR(faturamento))})`}
              </p>
            )}
          </>
        ) : (
          <p className="text-ink-muted">Informe o pró-labore para ver o líquido.</p>
        )
      }
      comparison={
        r && (
          <div className="space-y-1 text-[15px] text-ink-soft">
            <div className="flex justify-between py-1"><span>Pró-labore bruto</span><span className="tabular-nums">{brl(r.bruto)}</span></div>
            <div className="flex justify-between py-1">
              <span>INSS (11%{r.bruto > INSS_TETO ? ', limitado ao teto' : ''})</span>
              <span className="tabular-nums">− {brl(r.inss)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>IR na fonte{r.irrf === 0 ? ' (isento)' : ''}</span>
              <span className="tabular-nums">− {brl(r.irrf)}</span>
            </div>
            <div className="flex justify-between border-t border-paper-line pt-2 font-semibold text-ink">
              <span>Líquido</span>
              <span className="tabular-nums">{brl(r.liquido)}</span>
            </div>
            <p className="pt-2 text-sm text-ink-muted">
              No Simples Nacional (Anexos III e V), a empresa não paga os 20% de INSS patronal sobre o pró-labore: ele já está dentro do DAS.
            </p>
          </div>
        )
      }
      cta={
        <ToolCta
          title="Não sabe qual pró-labore usar?"
          text="A contadora da Conte define o valor que deixa mais dinheiro com você e cuida do INSS todo mês."
          whatsappText={`Oi! Simulei um pró-labore de ${brl0(bruto)} na calculadora da Conte e quero saber qual valor é melhor para a minha PJ.`}
        />
      }
    />
  );
};

const EXEMPLOS = [SALARIO_MINIMO, 2500, 3500, 4200, 5000, 6000, 7350, 8475.55, 10000];

const ProLaborePage: React.FC = () => (
  <ToolLayout
    path="/calculadora-pro-labore"
    image="/og/pro-labore.png"
    name="Calculadora de pró-labore"
    seoTitle="Calculadora de pró-labore 2026: INSS, IR e líquido | Conte"
    seoDescription="Calcule o pró-labore líquido em 2026: INSS de 11% e IR na fonte com a nova isenção até R$ 5 mil. Veja também o Fator R do seu pró-labore no Simples Nacional."
    h1="Calculadora de pró-labore 2026"
    intro="A calculadora de pró-labore da Conte mostra quanto sobra do pró-labore do sócio depois do INSS de 11% e do IR na fonte, já com a isenção de 2026 até R$ 5.000 e a redução até R$ 7.350 da Lei 15.270/2025."
    updated={RULES_LABEL}
    calculator={<Calculator />}
    faqs={[
      {
        q: 'Quanto de INSS paga o pró-labore?',
        a: `O sócio paga 11% sobre o pró-labore, limitado ao teto do INSS (${brl(INSS_TETO)} em 2026, ou seja, no máximo ${brl(INSS_TETO * INSS_PRO_LABORE_RATE)} por mês). No Simples Nacional, nos Anexos III e V, a parte da empresa já está dentro do DAS; no Lucro Presumido, a empresa paga mais 20%.`,
      },
      {
        q: 'Pró-labore paga Imposto de Renda em 2026?',
        a: 'Paga IR na fonte pela tabela progressiva, mas desde janeiro de 2026 quem recebe até R$ 5.000 por mês fica isento, e entre R$ 5.000 e R$ 7.350 o imposto é reduzido (Lei 15.270/2025).',
      },
      {
        q: 'Qual o valor mínimo de pró-labore?',
        a: `Não pode ser menor que um salário mínimo (${brl(SALARIO_MINIMO)} em 2026) quando o sócio trabalha na empresa. Para PJ de serviço no Simples, o valor que importa é o do Fator R: 28% do faturamento para ficar no Anexo III.`,
      },
      {
        q: 'Pró-labore ou distribuição de lucros?',
        a: 'O pró-labore paga INSS e pode pagar IR; a distribuição de lucros é isenta até R$ 50 mil por mês por empresa em 2026. Por isso o pró-labore costuma ficar no mínimo que a regra exige (salário mínimo ou 28% do faturamento) e o resto sai como lucro.',
      },
    ]}
    sources={[
      { title: 'Portaria MPS/MF 13/2026: tabela do INSS 2026', url: 'https://www.in.gov.br/en/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603' },
      { title: 'Tabelas do Imposto de Renda 2026 (Receita Federal)', url: 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026' },
      { title: 'Lei 15.270/2025: isenção do IR até R$ 5 mil e dividendos', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm' },
      { title: 'Lei 8.212/1991: contribuição do contribuinte individual', url: 'https://www.planalto.gov.br/ccivil_03/leis/l8212cons.htm' },
    ]}
    related={[
      { to: '/calculadora-fator-r', title: 'Calculadora Fator R', description: 'Anexo III ou V e o pró-labore mínimo.' },
      { to: '/clt-vs-pj', title: 'Calculadora CLT vs PJ', description: 'Compare salário CLT com proposta PJ.' },
      { to: '/calculadora', title: 'Calculadora PJ exterior', description: 'Para quem recebe de empresas de fora.' },
      { to: '/trocar-de-contador', title: 'Trocar de contador', description: 'A gente cuida da troca para você.' },
    ]}
  >
    <section className="bg-paper-deep py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink">Tabela de pró-labore líquido em 2026</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">INSS de 11% do sócio e IR na fonte com o desconto simplificado, sem dependentes.</p>
        <div className="mt-8 overflow-x-auto rounded-[24px] border border-paper-line bg-white">
          <table className="w-full min-w-[520px] border-collapse text-[15px]">
            <thead>
              <tr className="text-sm text-ink-muted">
                <th scope="col" className={tableCell}>Pró-labore bruto</th>
                <th scope="col" className={tableCell}>INSS</th>
                <th scope="col" className={tableCell}>IR na fonte</th>
                <th scope="col" className={`${tableCell} bg-brand/10 text-ink`}>Líquido</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {EXEMPLOS.map((b) => {
                const r = proLaboreLiquido(b);
                return (
                  <tr key={b}>
                    <th scope="row" className={`${tableCell} font-semibold text-ink`}>{brl(b)}</th>
                    <td className={tableCell}>{brl(r.inss)}</td>
                    <td className={tableCell}>{brl(r.irrf)}</td>
                    <td className={`${tableCell} bg-brand/10 font-semibold text-ink`}>{brl(r.liquido)}</td>
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

export default ProLaborePage;
