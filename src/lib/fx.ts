// Câmbio oficial: PTAX do Banco Central (API Olinda), cotação de compra, que é a que vale para quem recebe em moeda estrangeira.
export const CURRENCIES = [
  { code: 'USD', symbol: 'US$', label: 'Dólar americano' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'Libra esterlina' },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]['code'];

export const BCB_SOURCE_URL = 'https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes';

// Referência para o primeiro render e para os exemplos da página (PTAX de compra, fechamento).
export const REFERENCE_RATES: Record<CurrencyCode, number> = { USD: 5.334, EUR: 5.94, GBP: 7.11 };
export const REFERENCE_DATE = '27/10/2026';

const pad = (n: number) => String(n).padStart(2, '0');
const bcbDate = (d: Date) => `${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${d.getFullYear()}`;

async function ptax(currency: CurrencyCode): Promise<{ rate: number; date: string } | null> {
  const end = new Date();
  const start = new Date(end.getTime() - 10 * 24 * 60 * 60 * 1000);
  const url =
    'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/' +
    'CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)' +
    `?@moeda='${currency}'&@dataInicial='${bcbDate(start)}'&@dataFinalCotacao='${bcbDate(end)}'` +
    '&$format=json&$orderby=dataHoraCotacao%20desc&$top=1';
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const latest = (await res.json()).value?.[0];
    if (!latest?.cotacaoCompra) return null;
    const [y, m, d] = String(latest.dataHoraCotacao).slice(0, 10).split('-');
    return { rate: latest.cotacaoCompra, date: `${d}/${m}/${y}` };
  } catch {
    return null;
  }
}

export async function fetchRates(): Promise<{ rates: Record<CurrencyCode, number>; date: string } | null> {
  const results = await Promise.all(CURRENCIES.map((c) => ptax(c.code)));
  if (results.some((r) => !r)) return null;
  const rates = Object.fromEntries(CURRENCIES.map((c, i) => [c.code, results[i]!.rate])) as Record<CurrencyCode, number>;
  return { rates, date: results[0]!.date };
}
