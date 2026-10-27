// Câmbio comercial (compra) via AwesomeAPI: gratuita, sem chave e com CORS liberado.
export const CURRENCIES = [
  { code: 'USD', symbol: 'US$', label: 'Dólar americano' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'Libra esterlina' },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]['code'];

// Cotação de referência para o primeiro render e para os exemplos da página.
export const REFERENCE_RATES: Record<CurrencyCode, number> = { USD: 5.34, EUR: 5.94, GBP: 7.11 };
export const REFERENCE_DATE = '27/10/2026';

export async function fetchRates(): Promise<Record<CurrencyCode, number> | null> {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL');
    if (!res.ok) return null;
    const data = await res.json();
    const rates = {
      USD: parseFloat(data.USDBRL?.bid),
      EUR: parseFloat(data.EURBRL?.bid),
      GBP: parseFloat(data.GBPBRL?.bid),
    };
    return Object.values(rates).every((r) => r > 0) ? rates : null;
  } catch {
    return null;
  }
}
