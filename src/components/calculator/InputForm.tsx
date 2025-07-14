import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import Button from "../Button";
import { CalculatorData } from "../../utils/taxCalculations";

interface InputFormProps {
  onCalculate: (data: CalculatorData) => void;
  loading: boolean;
  error?: string | null;
}

export const InputForm: React.FC<InputFormProps> = ({ onCalculate, loading, error }) => {
  const [formData, setFormData] = useState<CalculatorData>({
    foreignAmount: 0,
    currency: "USD",
    exchangeRate: 0,
    proLabore: 0,
    issRate: 2,
    contributeINSS: false,
  });

  const currencies = [
    { value: "USD", label: "USD - Dólar Americano" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - Libra Esterlina" },
    { value: "CAD", label: "CAD - Dólar Canadense" },
    { value: "AUD", label: "AUD - Dólar Australiano" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.foreignAmount <= 0) {
      return;
    }
    onCalculate(formData);
  };

  const handleInputChange = (field: keyof CalculatorData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[15px] p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Currency and Foreign Amount - Single Column */}
        <div className="space-y-4">
          {/* Moeda */}
          <div className="space-y-2">
            <Label htmlFor="currency">Moeda</Label>
            <select
              id="currency"
              className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2"
              value={formData.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          {/* Valor em Moeda Estrangeira */}
          <div className="space-y-2">
            <Label htmlFor="foreignAmount">Valor Mensal em Moeda Estrangeira</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                {currencies.find(c => c.value === formData.currency)?.value === 'USD' ? '$' : 
                 currencies.find(c => c.value === formData.currency)?.value === 'EUR' ? '€' : 
                 currencies.find(c => c.value === formData.currency)?.value === 'GBP' ? '£' : 
                 currencies.find(c => c.value === formData.currency)?.value === 'CAD' ? 'C$' : 
                 currencies.find(c => c.value === formData.currency)?.value === 'AUD' ? 'A$' : '$'}
              </span>
              <Input
                id="foreignAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="6250"
                className="pl-8 border-gray-200 focus-visible:ring-primary-900"
                value={formData.foreignAmount || ""}
                onChange={(e) => handleInputChange("foreignAmount", parseFloat(e.target.value) || 0)}
                required
              />
            </div>
          </div>
        </div>

        {/* Taxa ISS */}
        <div className="space-y-2">
          <Label htmlFor="issRate">Taxa ISS (%)</Label>
          <Input
            id="issRate"
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="2"
            className="border-gray-200 focus-visible:ring-primary-900"
            value={formData.issRate || ""}
            onChange={(e) => handleInputChange("issRate", parseFloat(e.target.value) || 2)}
          />
          <p className="text-xs text-primary-600">
            Varia entre 2% e 5% dependendo do município
          </p>
        </div>
      </div>

      {/* Pró-Labore com INSS */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="proLabore">Pró-Labore Mensal (R$)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
              R$
            </span>
            <Input
              id="proLabore"
              type="number"
              step="0.01"
              min="0"
              placeholder="5000"
              className="pl-8 border-gray-200 focus-visible:ring-primary-900"
              value={formData.proLabore || ""}
              onChange={(e) => handleInputChange("proLabore", parseFloat(e.target.value) || 0)}
            />
          </div>
          <p className="text-xs text-primary-600">
            Usado apenas para calcular o Fator R no Simples Nacional
          </p>
        </div>

        {/* Checkbox INSS */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              id="contributeINSS"
              type="checkbox"
              className="rounded border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              checked={formData.contributeINSS}
              disabled={!formData.proLabore || formData.proLabore <= 0}
              onChange={(e) => handleInputChange("contributeINSS", e.target.checked)}
              title={!formData.proLabore || formData.proLabore <= 0 ? "É necessário informar o pró-labore para contribuir com o INSS" : ""}
            />
          </div>
          <Label 
            htmlFor="contributeINSS" 
            className={`text-sm ${!formData.proLabore || formData.proLabore <= 0 ? 'text-gray-400' : 'text-primary-900'}`}
          >
            Contribuir com INSS sobre o pró-labore (Simples Nacional)
          </Label>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={loading || formData.foreignAmount <= 0}
      >
        {loading ? "Calculando..." : "Calcular Impostos"}
      </Button>
    </form>
  );
};