// Brazilian tax and labor rules in force in 2026, used by the calculators.
// Every constant cites its source; update this file once a year.

export const RULES_YEAR = 2026;
export const RULES_LABEL = 'outubro de 2026';

// Portaria Interministerial MPS/MF nº 13/2026
export const SALARIO_MINIMO = 1621.0;
export const INSS_TETO = 8475.55;
export const INSS_EMPREGADO = [
  { upTo: 1621.0, rate: 0.075 },
  { upTo: 2902.84, rate: 0.09 },
  { upTo: 4354.27, rate: 0.12 },
  { upTo: 8475.55, rate: 0.14 },
];

// Lei 8.212/91 arts. 21, 22 e 30 §4; Lei 10.666/03 art. 4
export const INSS_PRO_LABORE_RATE = 0.11;
export const INSS_PATRONAL_RATE = 0.2;

// Receita Federal, tabelas 2026
export const IRRF_TABLE = [
  { upTo: 2428.8, rate: 0, deduction: 0 },
  { upTo: 2826.65, rate: 0.075, deduction: 182.16 },
  { upTo: 3751.05, rate: 0.15, deduction: 394.16 },
  { upTo: 4664.68, rate: 0.225, deduction: 675.49 },
  { upTo: Infinity, rate: 0.275, deduction: 908.73 },
];
export const IRRF_DEPENDENTE = 189.59;
export const IRRF_DESCONTO_SIMPLIFICADO = 607.2;

// Lei 15.270/2025 (art. 3-A da Lei 9.250/95): redução mensal do IR
const REDUTOR_ISENCAO_ATE = 5000;
const REDUTOR_FAIXA_ATE = 7350;

// Lei 15.270/2025 (art. 6-A da Lei 9.250/95): dividendos acima de R$ 50 mil/mês
export const DIVIDENDOS_LIMITE_MENSAL = 50000;
export const DIVIDENDOS_ALIQUOTA = 0.1;

// Lei 8.036/90 art. 15
export const FGTS_RATE = 0.08;

// LC 123/2006 (redação da LC 155/2016): Anexos III e V
type Share = { irpj: number; csll: number; cofins: number; pis: number; cpp: number; iss: number };
interface Faixa {
  upTo: number;
  rate: number;
  deduction: number;
  share: Share;
}
const s = (irpj: number, csll: number, cofins: number, pis: number, cpp: number, iss: number): Share => ({
  irpj: irpj / 100,
  csll: csll / 100,
  cofins: cofins / 100,
  pis: pis / 100,
  cpp: cpp / 100,
  iss: iss / 100,
});
const ANEXO_III: Faixa[] = [
  { upTo: 180000, rate: 0.06, deduction: 0, share: s(4, 3.5, 12.82, 2.78, 43.4, 33.5) },
  { upTo: 360000, rate: 0.112, deduction: 9360, share: s(4, 3.5, 14.05, 3.05, 43.4, 32) },
  { upTo: 720000, rate: 0.135, deduction: 17640, share: s(4, 3.5, 13.64, 2.96, 43.4, 32.5) },
  { upTo: 1800000, rate: 0.16, deduction: 35640, share: s(4, 3.5, 13.64, 2.96, 43.4, 32.5) },
  { upTo: 3600000, rate: 0.21, deduction: 125640, share: s(4, 3.5, 12.82, 2.78, 43.4, 33.5) },
  { upTo: 4800000, rate: 0.33, deduction: 648000, share: s(35, 15, 16.03, 3.47, 30.5, 0) },
];
const ANEXO_V: Faixa[] = [
  { upTo: 180000, rate: 0.155, deduction: 0, share: s(25, 15, 14.1, 3.05, 28.85, 14) },
  { upTo: 360000, rate: 0.18, deduction: 4500, share: s(23, 15, 14.1, 3.05, 27.85, 17) },
  { upTo: 720000, rate: 0.195, deduction: 9900, share: s(24, 15, 14.92, 3.23, 23.85, 19) },
  { upTo: 1800000, rate: 0.205, deduction: 17100, share: s(21, 15, 15.74, 3.41, 23.85, 21) },
  { upTo: 3600000, rate: 0.23, deduction: 62100, share: s(23, 12.5, 14.1, 3.05, 23.85, 23.5) },
  { upTo: 4800000, rate: 0.305, deduction: 540000, share: s(35, 15.5, 16.44, 3.56, 29.5, 0) },
];
export const SIMPLES_LIMITE = 4800000;
export const FATOR_R_MINIMO = 0.28;

// Lei 9.249/95 arts. 3, 15 e 20; Lei 7.689/88; Lei 9.715/98; Lei 9.718/98
const PRESUMIDO_PRESUNCAO = 0.32;
const IRPJ_RATE = 0.15;
const IRPJ_ADICIONAL_RATE = 0.1;
const IRPJ_ADICIONAL_LIMITE_MENSAL = 20000;
const CSLL_RATE = 0.09;
const PIS_CUMULATIVO = 0.0065;
const COFINS_CUMULATIVO = 0.03;

const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function inssEmpregado(salario: number): number {
  let total = 0;
  let floor = 0;
  for (const faixa of INSS_EMPREGADO) {
    if (salario <= floor) break;
    total += (Math.min(salario, faixa.upTo) - floor) * faixa.rate;
    floor = faixa.upTo;
  }
  return round(total);
}

export function inssProLabore(proLabore: number): number {
  return round(Math.min(proLabore, INSS_TETO) * INSS_PRO_LABORE_RATE);
}

/**
 * IR retido na fonte sobre um rendimento mensal tributável (salário ou pró-labore),
 * já com a redução da Lei 15.270/2025. Usa o desconto simplificado quando for melhor.
 */
export function irrfMensal(rendimento: number, inss: number, dependentes = 0): number {
  if (rendimento <= 0) return 0;
  const deducoesLegais = inss + dependentes * IRRF_DEPENDENTE;
  const base = Math.max(0, rendimento - Math.max(deducoesLegais, IRRF_DESCONTO_SIMPLIFICADO));
  const faixa = IRRF_TABLE.find((f) => base <= f.upTo)!;
  const imposto = Math.max(0, base * faixa.rate - faixa.deduction);

  let reducao = 0;
  if (rendimento <= REDUTOR_ISENCAO_ATE) reducao = Math.min(312.89, imposto);
  else if (rendimento <= REDUTOR_FAIXA_ATE) reducao = Math.max(0, 978.62 - 0.133145 * rendimento);

  return round(Math.max(0, imposto - Math.min(reducao, imposto)));
}

export function dividendosRetencao(distribuicaoMensal: number): number {
  return distribuicaoMensal > DIVIDENDOS_LIMITE_MENSAL ? round(distribuicaoMensal * DIVIDENDOS_ALIQUOTA) : 0;
}

export type Anexo = 'III' | 'V';

export interface SimplesResult {
  anexo: Anexo;
  aliquotaEfetiva: number;
  das: number;
}

/** DAS mensal de serviços. Em exportação, saem COFINS, PIS e ISS (LC 123, art. 18 §4º-A IV e §14). */
export function simplesNacional(receitaMes: number, rbt12: number, anexo: Anexo, exportacao: boolean): SimplesResult {
  const table = anexo === 'III' ? ANEXO_III : ANEXO_V;
  const rbt = Math.max(rbt12, receitaMes);
  const faixa = table.find((f) => rbt <= f.upTo) ?? table[table.length - 1];
  let aliquota = (rbt * faixa.rate - faixa.deduction) / rbt;

  if (exportacao) {
    const isIIIFaixa5 = anexo === 'III' && faixa === ANEXO_III[4];
    if (isIIIFaixa5 && aliquota > 0.1492537) {
      // ISS limitado a 5%: o restante é redistribuído entre os demais tributos.
      const resto = aliquota - 0.05;
      aliquota -= 0.05 + resto * 0.1928 + resto * 0.0418;
    } else {
      aliquota *= 1 - faixa.share.cofins - faixa.share.pis - faixa.share.iss;
    }
  }

  return { anexo, aliquotaEfetiva: aliquota, das: round(receitaMes * aliquota) };
}

export interface ProLaboreResult {
  bruto: number;
  inss: number;
  irrf: number;
  liquido: number;
}

export function proLaboreLiquido(bruto: number): ProLaboreResult {
  const inss = inssProLabore(bruto);
  const irrf = irrfMensal(bruto, inss);
  return { bruto, inss, irrf, liquido: round(bruto - inss - irrf) };
}

export interface PJResult {
  regime: 'Simples Nacional' | 'Lucro Presumido';
  anexo?: Anexo;
  faturamento: number;
  impostosEmpresa: number;
  aliquotaEfetiva: number;
  proLabore: ProLaboreResult;
  inssPatronal: number;
  contabilidade: number;
  distribuicao: number;
  impostoDividendos: number;
  liquido: number;
  detalhes: { label: string; value: number }[];
}

function fechamento(
  base: Omit<PJResult, 'distribuicao' | 'impostoDividendos' | 'liquido'>,
): PJResult {
  const distribuicao = Math.max(
    0,
    base.faturamento - base.impostosEmpresa - base.inssPatronal - base.contabilidade - base.proLabore.bruto,
  );
  const impostoDividendos = dividendosRetencao(distribuicao);
  const liquido = round(base.proLabore.liquido + distribuicao - impostoDividendos);
  return { ...base, distribuicao: round(distribuicao), impostoDividendos, liquido };
}

/** Simples Nacional com o pró-labore escolhido; o anexo sai do Fator R. */
export function pjSimples(faturamento: number, proLaboreBruto: number, contabilidade: number, exportacao: boolean): PJResult {
  const rbt12 = faturamento * 12;
  const fatorR = faturamento > 0 ? proLaboreBruto / faturamento : 0;
  const anexo: Anexo = fatorR >= FATOR_R_MINIMO ? 'III' : 'V';
  const simples = simplesNacional(faturamento, rbt12, anexo, exportacao);
  const proLabore = proLaboreLiquido(proLaboreBruto);
  return fechamento({
    regime: 'Simples Nacional',
    anexo,
    faturamento,
    impostosEmpresa: simples.das,
    aliquotaEfetiva: simples.aliquotaEfetiva,
    proLabore,
    inssPatronal: 0,
    contabilidade,
    detalhes: [{ label: `DAS (Anexo ${anexo})`, value: simples.das }],
  });
}

/** Menor pró-labore que leva ao Anexo III (Fator R de 28%), nunca abaixo do salário mínimo. */
export function proLaboreFatorR(faturamento: number): number {
  // toFixed first: 6000 * 0.28 * 100 is 168000.00000000003 in floating point, which ceil would round up a cent.
  return Math.max(SALARIO_MINIMO, Math.ceil(Number((faturamento * FATOR_R_MINIMO * 100).toFixed(6))) / 100);
}

/** Melhor cenário no Simples: pró-labore de 28% (Anexo III) ou de um salário mínimo (Anexo V). */
export function pjSimplesOtimo(faturamento: number, contabilidade: number, exportacao: boolean): PJResult {
  const proLaboreIII = proLaboreFatorR(faturamento);
  const anexoIII = pjSimples(faturamento, proLaboreIII, contabilidade, exportacao);
  const anexoV = pjSimples(faturamento, SALARIO_MINIMO, contabilidade, exportacao);
  return anexoIII.liquido >= anexoV.liquido ? anexoIII : anexoV;
}

/** Lucro Presumido para serviços. Em exportação, sem PIS, COFINS e ISS. */
export function pjPresumido(
  faturamento: number,
  proLaboreBruto: number,
  contabilidade: number,
  exportacao: boolean,
  issRate = 0.05,
): PJResult {
  const lucroPresumido = faturamento * PRESUMIDO_PRESUNCAO;
  const irpj = lucroPresumido * IRPJ_RATE + Math.max(0, lucroPresumido - IRPJ_ADICIONAL_LIMITE_MENSAL) * IRPJ_ADICIONAL_RATE;
  const csll = lucroPresumido * CSLL_RATE;
  const pis = exportacao ? 0 : faturamento * PIS_CUMULATIVO;
  const cofins = exportacao ? 0 : faturamento * COFINS_CUMULATIVO;
  const iss = exportacao ? 0 : faturamento * issRate;
  const impostosEmpresa = round(irpj + csll + pis + cofins + iss);
  const proLabore = proLaboreLiquido(proLaboreBruto);
  const detalhes = [
    { label: 'IRPJ', value: round(irpj) },
    { label: 'CSLL', value: round(csll) },
  ];
  if (!exportacao) {
    detalhes.push({ label: 'PIS', value: round(pis) }, { label: 'COFINS', value: round(cofins) }, { label: 'ISS', value: round(iss) });
  }
  return fechamento({
    regime: 'Lucro Presumido',
    faturamento,
    impostosEmpresa,
    aliquotaEfetiva: faturamento > 0 ? impostosEmpresa / faturamento : 0,
    proLabore,
    inssPatronal: round(proLaboreBruto * INSS_PATRONAL_RATE),
    contabilidade,
    detalhes,
  });
}

export interface CLTResult {
  salario: number;
  inss: number;
  irrf: number;
  liquidoMensal: number;
  decimoTerceiroLiquido: number;
  tercoFeriasLiquido: number;
  fgtsAnual: number;
  beneficiosMensais: number;
  totalAnual: number;
  equivalenteMensal: number;
}

function liquidoSalario(bruto: number, dependentes: number) {
  const inss = inssEmpregado(bruto);
  const irrf = irrfMensal(bruto, inss, dependentes);
  return { inss, irrf, liquido: round(bruto - inss - irrf) };
}

/**
 * Tudo o que o CLT recebe em um ano: 12 salários líquidos, 13º líquido, o 1/3 de férias líquido
 * (no mês de férias o salário é substituído pelas férias, então o extra é só o terço), FGTS e benefícios.
 */
export function clt(salario: number, beneficiosMensais: number, dependentes = 0): CLTResult {
  const mensal = liquidoSalario(salario, dependentes);
  const decimo = liquidoSalario(salario, dependentes).liquido;
  const feriasComTerco = liquidoSalario(salario * (4 / 3), dependentes).liquido;
  const tercoFeriasLiquido = round(feriasComTerco - mensal.liquido);
  const fgtsAnual = round(FGTS_RATE * (salario * 13 + salario / 3));
  const totalAnual = round(mensal.liquido * 12 + decimo + tercoFeriasLiquido + fgtsAnual + beneficiosMensais * 12);
  return {
    salario,
    inss: mensal.inss,
    irrf: mensal.irrf,
    liquidoMensal: mensal.liquido,
    decimoTerceiroLiquido: decimo,
    tercoFeriasLiquido,
    fgtsAnual,
    beneficiosMensais,
    totalAnual,
    equivalenteMensal: round(totalAnual / 12),
  };
}

/** Faturamento PJ mensal (Simples, melhor cenário) que empata com um valor líquido mensal desejado. */
export function faturamentoParaEmpatar(liquidoMensalAlvo: number, contabilidade: number, exportacao = false): number {
  let low = 0;
  let high = Math.max(liquidoMensalAlvo * 3, 10000);
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    if (pjSimplesOtimo(mid, contabilidade, exportacao).liquido < liquidoMensalAlvo) low = mid;
    else high = mid;
  }
  return Math.ceil(high);
}

/** Salário CLT bruto que, com os benefícios informados, empata com um líquido mensal de PJ. */
export function salarioCLTParaEmpatar(liquidoMensalPJ: number, beneficiosMensais: number, dependentes = 0): number {
  let low = 0;
  let high = Math.max(liquidoMensalPJ * 2, 10000);
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    if (clt(mid, beneficiosMensais, dependentes).equivalenteMensal < liquidoMensalPJ) low = mid;
    else high = mid;
  }
  return Math.ceil(high);
}
