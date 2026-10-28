// Programmatic pages: one page per common amount, each with its own numbers and conclusions.
// Keep the lists short. A new amount earns a page only if people search for it.
import type { CurrencyCode } from '../lib/fx';

export interface QuantoSobraScenario {
  slug: string;
  currency: Extract<CurrencyCode, 'USD' | 'EUR'>;
  amount: number;
}

const CURRENCY_WORD = { USD: 'dolares', EUR: 'euros' } as const;
const USD_AMOUNTS = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000, 12000, 15000, 20000];
const EUR_AMOUNTS = [2000, 3000, 5000, 8000, 10000];

export const quantoSobraScenarios: QuantoSobraScenario[] = [
  ...USD_AMOUNTS.map((amount) => ({ currency: 'USD' as const, amount })),
  ...EUR_AMOUNTS.map((amount) => ({ currency: 'EUR' as const, amount })),
].map((s) => ({ ...s, slug: `${s.amount}-${CURRENCY_WORD[s.currency]}-por-mes` }));

export const QUANTO_SOBRA_BASE = '/quanto-sobra';

export interface CLTSalaryScenario {
  slug: string;
  salario: number;
}

const CLT_SALARIES = [4000, 5000, 6000, 7000, 8000, 10000, 12000, 15000, 18000, 20000, 25000, 30000];

export const cltSalaryScenarios: CLTSalaryScenario[] = CLT_SALARIES.map((salario) => ({
  salario,
  slug: `salario-de-${salario / 1000}-mil`,
}));

// Not /clt-vs-pj/...: a folder next to clt-vs-pj.html could make Netlify redirect /clt-vs-pj to /clt-vs-pj/.
export const CLT_VS_PJ_BASE = '/clt-ou-pj';
