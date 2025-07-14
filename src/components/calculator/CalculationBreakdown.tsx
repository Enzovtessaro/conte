import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Tooltip } from "../ui/Tooltip";
import { Button } from "../ui/Button";
import { CalculationResults, CalculatorData } from "../../utils/taxCalculations";
import { formatCurrency, formatPercentage } from "../../utils/formatters";
import { getCurrencySymbol } from "../../utils/currencyUtils";
import { Info } from "lucide-react";

interface CalculationBreakdownProps {
  results: CalculationResults;
  data: CalculatorData;
}

export const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({ results, data }) => {
  const currencySymbol = getCurrencySymbol(data.currency);
  const hasProLabore = data.proLabore > 0;
  const showSimplesNacional = hasProLabore;
  const showLucroPresumido = !hasProLabore;
  const currentDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="space-y-6">
      {/* Conversion & Receipt Process */}
      <Card className="bg-white border border-gray-100 rounded-[15px] shadow-sm">
        <CardHeader className="bg-primary-900 text-white rounded-t-[15px]">
          <CardTitle className="text-lg">Conversão & Recebimento</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Step 1: Original Amount */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-primary-600">Valor Original</p>
                <p className="text-lg font-bold text-primary-900">
                  {currencySymbol} {data.foreignAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-green-600">✓</div>
            </div>

            <div className="border-l-2 border-gray-200 pl-4 ml-2">
              {/* Step 2: Exchange Rate */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-primary-600 flex items-center gap-1">
                    Taxa de Câmbio
                    <Tooltip 
                      content={`Taxa atual do ${data.currency}/BRL obtida via UniRateAPI em tempo real. Data: ${currentDate}`}
                      position="right"
                    >
                      <Info size={12} className="text-gray-400 cursor-help" />
                    </Tooltip>
                  </p>
                  <p className="text-lg font-bold text-primary-900">
                    {data.exchangeRate.toFixed(4)}
                  </p>
                </div>
                <div className="text-blue-600">×</div>
              </div>

              {/* Step 3: Gross Amount */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-primary-600">Valor Bruto (BRL)</p>
                  <p className="text-lg font-bold text-primary-900">
                    {formatCurrency(results.grossBRL)}
                  </p>
                </div>
                <div className="text-green-600">✓</div>
              </div>

              {/* Step 4: TechFX Fee */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-primary-600 flex items-center gap-1">
                    Taxa <a href="https://app.techfx.com.br/referral/23aif8gvrom5" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">TechFX</a> (0,5%)
                    <Tooltip 
                      content="TechFX oferece a menor taxa do mercado para recebimento internacional! Apenas 0,5% vs 2-4% dos bancos tradicionais."
                      position="right"
                    >
                      <Info size={12} className="text-gray-400 cursor-help" />
                    </Tooltip>
                  </p>
                  <p className="text-lg font-bold text-red-600">
                    -{formatCurrency(results.platformFee)}
                  </p>
                  <p className="text-xs text-green-600">🏆 Melhor taxa do mercado!</p>
                  <p className="text-xs text-blue-600">
                    Diminua essa taxa para 0.1% com esse <a href="https://app.techfx.com.br/referral/23aif8gvrom5" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">link</a>
                  </p>
                </div>
                <div className="text-red-600">-</div>
              </div>

              {/* Final: Net Amount */}
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-primary-600 font-medium">Recebido pela PJ</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(results.receivedByPJ)}
                    </p>
                  </div>
                  <div className="text-green-600 text-xl">✓</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Calculation */}
      <div>
        {showSimplesNacional && (
          <Card className="bg-white border border-gray-100 rounded-[15px] shadow-sm">
            <CardHeader className="bg-primary-900 text-white rounded-t-[15px]">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Simples Nacional</CardTitle>
                  <p className="text-sm text-gray-200">
                    {results.simplesNacional.anexo} - {formatPercentage(results.simplesNacional.aliquota)}
                  </p>
                </div>
                <Tooltip content="Regime ideal para PJs que retiram pró-labore regularmente" position="left">
                  <Info size={16} className="text-gray-300 cursor-help" />
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Tax Breakdown */}
                <div>
                  <h4 className="font-semibold text-primary-900 mb-4">Cálculo de Impostos</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-primary-600 flex items-center gap-1">
                          Fator R
                          <Tooltip 
                            content={`Fator R é a proporção entre pró-labore e receita anual. Acima de 28% usa Anexo III (6%), abaixo usa Anexo V (tabela progressiva).`}
                            position="top"
                          >
                            <Info size={12} className="text-gray-400 cursor-help" />
                          </Tooltip>
                        </p>
                        <p className="text-lg font-bold text-primary-900">
                          {results.simplesNacional.fatorR.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-primary-600 flex items-center gap-1">
                          Impostos PJ
                          <Tooltip 
                            content={`Impostos da Pessoa Jurídica: inclui IRPJ, CSLL, PIS, COFINS, CPP, ISS conforme ${results.simplesNacional.anexo} do Simples Nacional.`}
                            position="top"
                          >
                            <Info size={12} className="text-gray-400 cursor-help" />
                          </Tooltip>
                        </p>
                        <p className="text-lg font-bold text-red-600">
                          -{formatCurrency(results.simplesNacional.pjTax)}
                        </p>
                      </div>
                    </div>

                    {results.simplesNacional.pfTax > 0 && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-primary-600 flex items-center gap-1">
                            Impostos PF
                            <Tooltip 
                              content={`Impostos da Pessoa Física sobre pró-labore: INSS (11% até o teto) + IRPF (tabela progressiva). Só aplicado se marcado "Contribuir com INSS".`}
                              position="top"
                            >
                              <Info size={12} className="text-gray-400 cursor-help" />
                            </Tooltip>
                          </p>
                          <p className="text-lg font-bold text-red-600">
                            -{formatCurrency(results.simplesNacional.pfTax)}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-primary-600 font-medium">Valor Final Líquido</p>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(results.simplesNacional.netAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Info */}
                <div>
                  <h4 className="font-semibold text-primary-900 mb-4">Resumo do Regime</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-primary-700">
                        <strong>Pró-labore:</strong> {formatCurrency(data.proLabore)}/mês
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-primary-700">
                        <strong>INSS:</strong> {data.contributeINSS ? 'Contribuindo' : 'Não contribuindo'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-sm text-primary-700">
                        <strong>Anexo:</strong> {results.simplesNacional.anexo}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <p className="text-sm text-primary-700">
                        <strong>Alíquota:</strong> {formatPercentage(results.simplesNacional.aliquota)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {showLucroPresumido && (
          <Card className="bg-white border border-gray-100 rounded-[15px] shadow-sm">
            <CardHeader className="bg-primary-900 text-white rounded-t-[15px]">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Lucro Presumido</CardTitle>
                  <p className="text-sm text-gray-200">
                    Distribuição de lucros isenta
                  </p>
                </div>
                <Tooltip content="Regime ideal para PJs que distribuem lucros sem pró-labore" position="left">
                  <Info size={16} className="text-gray-300 cursor-help" />
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Tax Breakdown */}
                <div>
                  <h4 className="font-semibold text-primary-900 mb-4">Cálculo de Impostos</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-primary-600 flex items-center gap-1">
                          IRPJ
                          <Tooltip 
                            content="Imposto de Renda Pessoa Jurídica: 15% sobre lucro presumido (32% da receita) + 10% adicional sobre valor que exceder R$ 20.000/mês."
                            position="top"
                          >
                            <Info size={12} className="text-gray-400 cursor-help" />
                          </Tooltip>
                        </p>
                        <p className="text-lg font-bold text-red-600">
                          -{formatCurrency(results.lucroPresumido.irpj)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-primary-600 flex items-center gap-1">
                          CSLL
                          <Tooltip 
                            content="Contribuição Social sobre Lucro Líquido: 9% sobre lucro presumido (32% da receita bruta)."
                            position="top"
                          >
                            <Info size={12} className="text-gray-400 cursor-help" />
                          </Tooltip>
                        </p>
                        <p className="text-lg font-bold text-red-600">
                          -{formatCurrency(results.lucroPresumido.csll)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-primary-600 flex items-center gap-1">
                          ISS ({data.issRate}%)
                          <Tooltip 
                            content="Imposto sobre Serviços: taxa municipal sobre prestação de serviços. Varia de 2% a 5% conforme município."
                            position="top"
                          >
                            <Info size={12} className="text-gray-400 cursor-help" />
                          </Tooltip>
                        </p>
                        <p className="text-lg font-bold text-red-600">
                          -{formatCurrency(results.lucroPresumido.iss)}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-primary-600 font-medium">Valor Final Líquido</p>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(results.lucroPresumido.netAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Info */}
                <div>
                  <h4 className="font-semibold text-primary-900 mb-4">Resumo do Regime</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-primary-700">
                        <strong>PIS/COFINS:</strong> 0% (exportação)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-primary-700">
                        <strong>Lucro Presumido:</strong> 32% da receita
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-sm text-primary-700">
                        <strong>Distribuição:</strong> Isenta de IR
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <p className="text-sm text-primary-700">
                        <strong>ISS Municipal:</strong> {data.issRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Banner Conte - Versão Compacta */}
      <div className="w-full">
        <div className="bg-primary-900 rounded-[15px] px-6 py-6 shadow-lg relative overflow-hidden">
          {/* Background decoration com cores da Conte */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-700 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary-600 opacity-20 rounded-full translate-y-10 -translate-x-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
            {/* Lado Esquerdo - 2/3 do espaço */}
            <div className="flex-1 md:w-2/3">
              {/* Título Principal */}
              <h2 className="text-white text-xl md:text-2xl font-bold mb-2 text-left">
                Pague menos impostos com a <span className="text-primary-300">Conte</span>
              </h2>
              
              {/* Subtítulo */}
              <p className="text-primary-100 text-sm mb-4 text-left">
                Contabilidade especializada para PJs que faturam no exterior
              </p>
              
              {/* Lista de Benefícios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-900"/>
                    </svg>
                  </div>
                  <p className="text-white text-xs">
                    <strong>Otimização tributária</strong> especializada
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-900"/>
                    </svg>
                  </div>
                  <p className="text-white text-xs">
                    <strong>Atendimento humanizado</strong> e consultoria
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-900"/>
                    </svg>
                  </div>
                  <p className="text-white text-xs">
                    <strong>Gestão completa</strong> de obrigações fiscais
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-900"/>
                    </svg>
                  </div>
                  <p className="text-white text-xs">
                    <strong>Planejamento tributário</strong> máxima economia
                  </p>
                </div>
              </div>
            </div>
            
            {/* Lado Direito - 1/3 do espaço */}
            <div className="flex flex-col items-center justify-center md:w-1/3 gap-4 h-full min-h-[120px]">
              {/* Preço em cima */}
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-white text-2xl md:text-3xl font-bold">
                    {((results.receivedByPJ > 15000) || (data.proLabore === 0)) ? "R$359" : "R$249"}
                  </span>
                  <span className="text-primary-200 text-sm">/mês</span>
                </div>
              </div>
              
              {/* CTA embaixo */}
              <a
                href="https://wa.me/5511940000000?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20a%20Conte%20para%20PJ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button 
                  className="bg-white text-primary-900 hover:bg-gray-100 font-bold px-6 py-2 rounded-[15px] shadow-md transition-all duration-200 w-full"
                >
                  Fale com a Conte
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <Card className="bg-amber-50 border-amber-200 rounded-[15px]">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm text-amber-800">
                <strong>Simulação:</strong> Esta calculadora fornece estimativas baseadas em dados atuais. 
                Para orientação precisa, consulte um contador especializado.
              </p>
              <p className="text-xs text-amber-700">
                Câmbio obtido via <strong>UniRateAPI</strong> em tempo real • 
                Taxa TechFX aplicada: 0,5% • 
                Data de referência: {currentDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};