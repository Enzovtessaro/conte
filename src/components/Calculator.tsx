import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { InputForm } from "./calculator/InputForm";
import { CalculationBreakdown } from "./calculator/CalculationBreakdown.tsx";
import { calculateTaxes, CalculatorData, CalculationResults } from "../utils/taxCalculations";
import { convertCurrency } from "../utils/currencyUtils";

export const Calculator = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    foreignAmount: 0,
    currency: "USD",
    exchangeRate: 0,
    proLabore: 0,
    issRate: 2,
    contributeINSS: false,
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (data: CalculatorData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Sempre buscar a taxa de câmbio automaticamente
      const rate = await convertCurrency(data.currency);
      const finalData = { ...data, exchangeRate: rate };

      const calculationResults = calculateTaxes(finalData);
      setCalculatorData(finalData);
      setResults(calculationResults);
    } catch (error) {
      console.error("Erro no cálculo:", error);
      setError("Verifique os dados informados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-white shadow-sm border border-gray-100 rounded-[20px] overflow-hidden">
          <CardHeader className="bg-primary-900 text-white">
            <CardTitle className="text-2xl text-center font-bold">
              Calculadora de Impostos PJ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <InputForm onCalculate={handleCalculate} loading={loading} error={error} />
          </CardContent>
        </Card>

        {results && (
          <CalculationBreakdown results={results} data={calculatorData} />
        )}
      </div>
    </div>
  );
};