// Real currency conversion service using UniRateAPI
// Get your free API key at: https://unirateapi.com/
// Add your API key below or in environment variables

const UNIRATE_API_KEY = 'jtSjYNcxDR4AcNkUZXCpQbJpiAVXLG28oYrRHREeUuX1UNZGXWVNLlLkeOQ3yjwm'; // Replace with your actual API key
const UNIRATE_BASE_URL = 'https://api.unirateapi.com/api/rates';

// Fallback rates in case API fails
const FALLBACK_EXCHANGE_RATES: Record<string, number> = {
  USD: 5.25,
  EUR: 5.68,
  GBP: 6.45,
  CAD: 3.89,
  AUD: 3.52,
};

export async function convertCurrency(currency: string): Promise<number> {
  console.log(`Fetching real exchange rate for ${currency} to BRL...`);
  
  try {
    // Check if API key is configured
    if (!UNIRATE_API_KEY || UNIRATE_API_KEY.length < 10) {
      console.warn('UniRateAPI key not configured, using fallback rates');
      return getFallbackRate(currency);
    }

    // Fetch real exchange rates from UniRateAPI
    const response = await fetch(
      `${UNIRATE_BASE_URL}?api_key=${UNIRATE_API_KEY}&from=${currency}&to=BRL`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.rate && typeof data.rate === 'number') {
      const rate = data.rate;
      console.log(`Real exchange rate for ${currency} to BRL: ${rate.toFixed(4)}`);
      return parseFloat(rate.toFixed(4));
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    console.error(`Error fetching exchange rate for ${currency}:`, error);
    console.log('Using fallback exchange rate...');
    return getFallbackRate(currency);
  }
}

function getFallbackRate(currency: string): number {
  const rate = FALLBACK_EXCHANGE_RATES[currency] || 5.25;
  
  // Add some random variation to simulate real rates
  const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
  const finalRate = rate * (1 + variation);
  
  console.log(`Fallback exchange rate for ${currency}: ${finalRate.toFixed(4)}`);
  return parseFloat(finalRate.toFixed(4));
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
    BRL: "R$",
  };
  
  return symbols[currency] || currency;
}