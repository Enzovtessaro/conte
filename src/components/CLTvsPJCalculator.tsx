import React, { useState } from 'react';
import { Calculator, FileText, DollarSign, Users, Building, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import Button from './Button';

// Badge component simples
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </div>
);

// Tooltip component
const Tooltip: React.FC<{ 
  children: React.ReactNode; 
  content: string;
}> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    });
    setIsVisible(true);
  };
  
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  
  return (
    <>
      <div 
        className="relative inline-flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible && (
        <div 
          className="fixed px-3 py-2 bg-gray-800 text-white text-xs rounded-lg pointer-events-none whitespace-nowrap z-[9999] transform -translate-x-1/2 -translate-y-full"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </>
  );
};

interface CltCalculation {
  salarioBruto: number;
  descontoInss: number;
  descontoIrrf: number;
  salarioLiquido: number;
  fgtsAnual: number;
  decimoTerceiro: number;
  ferias: number;
  beneficiosVrVa: number;
  beneficiosTotal: number;
  equivalenteAnual: number;
}

interface PjCalculation {
  faturamentoBruto: number;
  impostoSimples: number;
  custoContabilidade: number;
  proLabore: number;
  inssSobreProLabore: number;
  irrfSobreProLabore: number;
  rendaLiquida: number;
  beneficiosVrVa: number;
  equivalenteAnual: number;
}

export const CLTvsPJCalculator: React.FC = () => {
  const [salarioBruto, setSalarioBruto] = useState<string>('');
  const [valeRefeicao, setValeRefeicao] = useState<string>('0,00');
  const [valeAlimentacao, setValeAlimentacao] = useState<string>('0,00');
  const [planoSaude, setPlanoSaude] = useState<string>('0,00');
  const [outrosBeneficios, setOutrosBeneficios] = useState<string>('0,00');
  const [cltResult, setCltResult] = useState<CltCalculation | null>(null);
  const [pjResult, setPjResult] = useState<PjCalculation | null>(null);

  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    const amount = parseInt(numbers) / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).replace('R$', '').trim();
  };

  const formatSalaryThousands = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers === '') return '';
    
    const amount = parseInt(numbers) / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).replace('R$', '').trim();
  };

  const parseCurrency = (value: string): number => {
    const numbers = value.replace(/\D/g, '');
    return parseInt(numbers) / 100;
  };

  const parseSalaryThousands = (value: string): number => {
    const numbers = value.replace(/\D/g, '');
    if (numbers === '') return 0;
    
    return parseInt(numbers) / 100;
  };

  const calcularInss = (salario: number): number => {
    let inss = 0;
    if (salario <= 1518.00) {
      inss = salario * 0.075;
    } else if (salario <= 2793.88) {
      inss = salario * 0.09 - 22.77;
    } else if (salario <= 4190.83) {
      inss = salario * 0.12 - 106.59;
    } else if (salario <= 8157.41) {
      inss = salario * 0.14 - 190.40;
    } else {
      inss = 1142.04; // Teto INSS 2025
    }
    return Math.max(inss, 0);
  };

  const calcularIrrf = (baseCalculo: number): number => {
    let irrf = 0;
    if (baseCalculo <= 2259.20) {
      irrf = 0;
    } else if (baseCalculo <= 2826.65) {
      irrf = baseCalculo * 0.075 - 169.44;
    } else if (baseCalculo <= 3751.05) {
      irrf = baseCalculo * 0.15 - 381.44;
    } else if (baseCalculo <= 4664.68) {
      irrf = baseCalculo * 0.225 - 662.77;
    } else {
      irrf = baseCalculo * 0.275 - 896.00;
    }
    return Math.max(irrf, 0);
  };

  const calcular13oSalario = (salarioBruto: number): number => {
    // 13º salário líquido conforme legislação brasileira
    // Cálculo correto: INSS e IRRF sobre o valor total, depois desconto na 2ª parcela
    const decimoTerceiro = salarioBruto;
    const inssDecimo = calcularInss(decimoTerceiro);
    const irrfDecimo = calcularIrrf(decimoTerceiro - inssDecimo);
    
    // 1ª parcela (até novembro): 50% do salário sem descontos
    const primeiraParcela = salarioBruto / 2;
    
    // 2ª parcela (dezembro): 50% do salário menos todos os impostos calculados sobre o total
    const segundaParcela = (salarioBruto / 2) - inssDecimo - irrfDecimo;
    
    return primeiraParcela + segundaParcela;
  };

  const calcularFeriasLiquidas = (salarioBruto: number): number => {
    // Férias = salário + 1/3 constitucional
    const feriasTotal = salarioBruto + (salarioBruto / 3);
    const inssFerias = calcularInss(feriasTotal);
    const irrfFerias = calcularIrrf(feriasTotal - inssFerias);
    return feriasTotal - inssFerias - irrfFerias;
  };

  const calcularClt = (salarioBruto: number, beneficiosVrVa: number): CltCalculation => {
    const descontoInss = calcularInss(salarioBruto);
    const baseIrrf = salarioBruto - descontoInss;
    const descontoIrrf = calcularIrrf(baseIrrf);
    // Salário líquido = apenas salário bruto - descontos (SEM benefícios)
    const salarioLiquido = salarioBruto - descontoInss - descontoIrrf;
    
    const fgtsAnual = salarioBruto * 0.08 * 12;
    const decimoTerceiro = calcular13oSalario(salarioBruto);
    const ferias = calcularFeriasLiquidas(salarioBruto);
    
    // Benefícios trabalhistas mensais
    const fgtsMensal = fgtsAnual / 12;
    const decimoTerceiroMensal = decimoTerceiro / 12;
    const feriasMensal = ferias / 12;
    
    // Benefícios totais = trabalhistas + VR/VA
    const beneficiosTotal = fgtsMensal + decimoTerceiroMensal + feriasMensal + beneficiosVrVa;
    
    // Equivalente anual = líquido + benefícios totais
    const equivalenteAnual = (salarioLiquido + beneficiosTotal) * 12;
    
    return {
      salarioBruto,
      descontoInss,
      descontoIrrf,
      salarioLiquido,
      fgtsAnual,
      decimoTerceiro,
      ferias,
      beneficiosVrVa,
      beneficiosTotal,
      equivalenteAnual
    };
  };

  const calcularPj = (faturamentoBruto: number, custoContabilidade: number, beneficiosVrVa: number): PjCalculation => {
    // Simples Nacional Anexo III (6% inicial para serviços)
    const impostoSimples = faturamentoBruto * 0.06;
    
    // Fator R: 28% do faturamento bruto como pró-labore
    const proLabore = faturamentoBruto * 0.28;
    
    // INSS sobre pró-labore (progressivo)
    const inssSobreProLabore = calcularInss(proLabore);
    
    // IRRF sobre pró-labore (progressivo)
    const irrfSobreProLabore = calcularIrrf(proLabore - inssSobreProLabore);
    
    // Renda líquida = Faturamento - Impostos - Contabilidade - INSS - IRRF (SEM benefícios)
    const rendaLiquida = faturamentoBruto - impostoSimples - custoContabilidade - inssSobreProLabore - irrfSobreProLabore;
    
    // Equivalente anual = líquido + benefícios
    const equivalenteAnual = (rendaLiquida + beneficiosVrVa) * 12;
    
    return {
      faturamentoBruto,
      impostoSimples,
      custoContabilidade,
      proLabore,
      inssSobreProLabore,
      irrfSobreProLabore,
      rendaLiquida,
      beneficiosVrVa,
      equivalenteAnual
    };
  };

  const handleInputChange = (setter: (value: string) => void) => (value: string) => {
    const formatted = formatCurrency(value);
    setter(formatted);
  };

  const handleSalaryChange = (value: string) => {
    if (value === '') {
      setSalarioBruto('');
      return;
    }
    
    const formatted = formatSalaryThousands(value);
    setSalarioBruto(formatted);
  };

  const handleCalculate = () => {
    const salario = parseSalaryThousands(salarioBruto);
    const vrDiario = parseCurrency(valeRefeicao);
    const va = parseCurrency(valeAlimentacao);
    const saude = parseCurrency(planoSaude);
    const outros = parseCurrency(outrosBeneficios);
    const contabilidade = 249; // Valor fixo para contabilidade

    if (salario > 0) {
      const diasUteis = 22;
      const vrMensal = vrDiario * diasUteis;
      const beneficiosVrVa = vrMensal + va + saude + outros;
      
      // CORREÇÃO: Comparação justa - mesmo valor bruto para ambos
      const faturamentoPjComparativo = salario;

      const cltCalc = calcularClt(salario, beneficiosVrVa);
      const pjCalc = calcularPj(faturamentoPjComparativo, contabilidade, beneficiosVrVa);
      setCltResult(cltCalc);
      setPjResult(pjCalc);
    }
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Formulário de Input */}
      <Card className="bg-white shadow-sm border border-gray-100 rounded-[20px] overflow-hidden">
        <CardHeader className="bg-primary-900 text-white">
          <CardTitle className="text-2xl text-center font-bold">
            Calculadora CLT vs PJ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form className="space-y-6">
            <div className="space-y-6">
              {/* Salário Bruto */}
              <div className="space-y-2">
                <Label htmlFor="salarioBruto">Salário Bruto (Mensal)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                    R$
                  </span>
                  <Input 
                    id="salarioBruto" 
                    type="text" 
                    value={salarioBruto} 
                    onChange={e => handleSalaryChange(e.target.value)} 
                    placeholder="6.000,00" 
                    className="pl-8 border-gray-200 focus-visible:ring-primary-900" 
                  />
                </div>
              </div>

              {/* Vale Refeição */}
              <div className="space-y-2">
                <Label htmlFor="valeRefeicao">Vale-Refeição (Diário)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                    R$
                  </span>
                  <Input 
                    id="valeRefeicao" 
                    type="text" 
                    value={valeRefeicao} 
                    onChange={e => handleInputChange(setValeRefeicao)(e.target.value)} 
                    placeholder="25,00" 
                    className="pl-8 border-gray-200 focus-visible:ring-primary-900" 
                  />
                </div>
                <p className="text-xs text-primary-600">
                  Consideramos 22 dias úteis no mês
                </p>
              </div>

              {/* Vale Alimentação */}
              <div className="space-y-2">
                <Label htmlFor="valeAlimentacao">Vale-Alimentação (Mensal)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                    R$
                  </span>
                  <Input 
                    id="valeAlimentacao" 
                    type="text" 
                    value={valeAlimentacao} 
                    onChange={e => handleInputChange(setValeAlimentacao)(e.target.value)} 
                    placeholder="350,00" 
                    className="pl-8 border-gray-200 focus-visible:ring-primary-900" 
                  />
                </div>
              </div>

              {/* Plano de Saúde */}
              <div className="space-y-2">
                <Label htmlFor="planoSaude">Plano de Saúde pago pela empresa</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                    R$
                  </span>
                  <Input 
                    id="planoSaude" 
                    type="text" 
                    value={planoSaude} 
                    onChange={e => handleInputChange(setPlanoSaude)(e.target.value)} 
                    placeholder="200,00" 
                    className="pl-8 border-gray-200 focus-visible:ring-primary-900" 
                  />
                </div>
              </div>

              {/* Outros Benefícios */}
              <div className="space-y-2">
                <Label htmlFor="outrosBeneficios">Outros Benefícios (mensal)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                    R$
                  </span>
                  <Input 
                    id="outrosBeneficios" 
                    type="text" 
                    value={outrosBeneficios} 
                    onChange={e => handleInputChange(setOutrosBeneficios)(e.target.value)} 
                    placeholder="100,00" 
                    className="pl-8 border-gray-200 focus-visible:ring-primary-900" 
                  />
                </div>
                <p className="text-xs text-primary-600">
                  Seguro de vida, auxílio creche, etc.
                </p>
              </div>

            </div>

            <Button 
              onClick={handleCalculate} 
              type="button"
              className="w-full"
              disabled={!salarioBruto}
            >
              {!salarioBruto ? "Informe o salário para calcular" : "Calcular Comparativo"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Resultados */}
      {cltResult && pjResult && (
        <div className="space-y-8">
          {/* Comparação CLT vs PJ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card CLT */}
            <Card className="bg-gray-50 shadow-lg border border-gray-200 rounded-[15px] overflow-hidden">
              <CardHeader className="bg-primary-900 text-white py-3">
                <CardTitle className="text-lg font-bold text-center flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  CLT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Valor Bruto */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-700 font-medium">Valor Bruto</span>
                    <span className="text-lg font-bold text-gray-900">
                      R$ {cltResult.salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {/* Descontos */}
                  <div className="flex justify-between items-center py-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-medium">Descontos</span>
                      <Tooltip content={`INSS: R$ ${cltResult.descontoInss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, IRRF: R$ ${cltResult.descontoIrrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}>
                        <Info className="w-4 h-4 text-gray-500 cursor-help" />
                      </Tooltip>
                    </div>
                    <span className="text-lg font-bold text-red-600">
                      R$ {(cltResult.descontoInss + cltResult.descontoIrrf).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {/* Renda Líquida Mensal - Destaque */}
                  <div className="text-center p-3 bg-primary-50 rounded-lg">
                    <div className="text-sm text-primary-700 font-medium mb-1">Renda Líquida Mensal</div>
                    <div className="text-2xl font-bold text-primary-800">
                      R$ {cltResult.salarioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  {/* Benefícios */}
                  <div className="space-y-2 pt-2">
                    <div className="text-sm font-medium text-gray-700 border-b border-gray-200">Benefícios</div>
                    
                    {/* VR/VA e Outros */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        VR/VA e Outros
                      <Tooltip content={`VR: R$ ${(parseCurrency(valeRefeicao) * 22).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, VA: R$ ${parseCurrency(valeAlimentacao).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, Plano: R$ ${parseCurrency(planoSaude).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, Outros: R$ ${parseCurrency(outrosBeneficios).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}>
                          <Info className="w-4 h-4 text-gray-500 cursor-help" />
                        </Tooltip>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">
                          R$ {cltResult.beneficiosVrVa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>

                      </div>
                    </div>
                    
                    {/* Benefícios Trabalhistas */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        Trabalhistas
                      <Tooltip content={`FGTS: R$ ${(cltResult.fgtsAnual / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, 13º: R$ ${(cltResult.decimoTerceiro / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, Férias: R$ ${(cltResult.ferias / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}>
                          <Info className="w-4 h-4 text-gray-500 cursor-help" />
                        </Tooltip>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">
                          R$ {(cltResult.beneficiosTotal - cltResult.beneficiosVrVa).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      
                      </div>
                    </div>
                  </div>
                  
                  {/* Total Equivalente */}
                  <div className="mt-4 pt-3 text-center">
                    <div className="text-xs text-gray-600 mb-1">
                      Total Equivalente Anual
                    </div>
                    <div className="text-lg font-bold text-primary-700">
                      R$ {cltResult.equivalenteAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card PJ */}
            <Card className="bg-gray-50 shadow-lg border border-gray-200 rounded-[15px] overflow-hidden">
              <CardHeader className="bg-primary-900 text-white py-3">
                <CardTitle className="text-lg font-bold text-center flex items-center justify-center gap-2">
                  <Building className="w-5 h-5" />
                  PJ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Valor Bruto */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-700 font-medium">Valor Bruto</span>
                    <span className="text-lg font-bold text-gray-900">
                      R$ {pjResult.faturamentoBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {/* Descontos */}
                  <div className="flex justify-between items-center py-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-medium">Descontos</span>
                      <Tooltip content={`Simples: R$ ${pjResult.impostoSimples.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, Contabilidade: R$ ${pjResult.custoContabilidade.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, INSS: R$ ${pjResult.inssSobreProLabore.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, IRRF: R$ ${pjResult.irrfSobreProLabore.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}>
                        <Info className="w-4 h-4 text-gray-500 cursor-help" />
                      </Tooltip>
                    </div>
                    <span className="text-lg font-bold text-red-600">
                      R$ {(pjResult.impostoSimples + pjResult.custoContabilidade + pjResult.inssSobreProLabore + pjResult.irrfSobreProLabore).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {/* Renda Líquida Mensal - Destaque */}
                  <div className="text-center p-3 bg-primary-50 rounded-lg">
                    <div className="text-sm text-primary-700 font-medium mb-1">Renda Líquida Mensal</div>
                    <div className="text-2xl font-bold text-primary-800">
                      R$ {pjResult.rendaLiquida.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  {/* Benefícios */}
                  <div className="space-y-2 pt-2">
                    <div className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-1">Benefícios</div>
                    
                    {/* VR/VA e Outros */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        VR/VA e Outros
                      <Tooltip content={`VR: R$ ${(parseCurrency(valeRefeicao) * 22).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, VA: R$ ${parseCurrency(valeAlimentacao).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, Plano: R$ ${parseCurrency(planoSaude).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, Outros: R$ ${parseCurrency(outrosBeneficios).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}>
                          <Info className="w-4 h-4 text-gray-500 cursor-help" />
                        </Tooltip>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">
                          R$ {pjResult.beneficiosVrVa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>

                      </div>
                    </div>
                    
                    {/* Espaçamento para alinhamento com CLT */}
                    <div className="flex justify-between items-center opacity-50">
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        Trabalhistas
                        <Tooltip content="PJ não possui benefícios trabalhistas (FGTS, 13º, férias)">
                          <Info className="w-4 h-4 text-gray-400 cursor-help" />
                        </Tooltip>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-400">
                          R$ 0,00
                        </span>

                      </div>
                    </div>
                  </div>
                  
                  {/* Total Equivalente */}
                  <div className="mt-4 pt-3 text-center">
                    <div className="text-xs text-gray-600 mb-1">
                      Total Equivalente Anual
                    </div>
                    <div className="text-lg font-bold text-primary-700">
                      R$ {pjResult.equivalenteAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Banner promocional */}
          <PJPromotionalBanner />
        </div>
      )}
    </div>
  );

  
};

const PJPromotionalBanner = () => {
  return (
    <div className="w-full mb-8">
      <div className="bg-primary-900 rounded-[15px] px-6 py-6 shadow-lg relative overflow-hidden">
        {/* Background decoration com cores da Conte */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-700 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary-600 opacity-20 rounded-full translate-y-10 -translate-x-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
          {/* Lado Esquerdo - 2/3 do espaço */}
          <div className="flex-1 md:w-2/3">
            {/* Título Principal */}
            <h2 className="text-white text-xl md:text-2xl font-bold mb-2 text-left">
             Precisa de uma contabilidade de confiança?
            </h2>
            
            {/* Subtítulo */}
            <p className="text-primary-100 text-sm mb-4 text-left">
              Contabilidade especializada e atendimento humanizado 
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
                  <strong>Abertura gratuita</strong> da empresa
                </p>
              </div>
              
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
            </div>
          </div>
          
          {/* Lado Direito - 1/3 do espaço */}
          <div className="flex flex-col items-center justify-center md:w-1/3 gap-4 h-full min-h-[120px]">
            {/* Preço em cima */}
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <span className="text-white text-2xl md:text-3xl font-bold">
                  R$249
                </span>
                <span className="text-primary-200 text-sm">/mês</span>
              </div>
            </div>
            
            {/* CTA embaixo */}
            <a
              href="https://wa.me/5511940000000?text=Ol%C3%A1!%20Vi%20na%20calculadora%20CLT%20vs%20PJ%20que%20seria%20mais%20vantajoso%20para%20mim%20abrir%20uma%20PJ.%20Gostaria%20de%20saber%20mais%20sobre%20a%20abertura%20de%20empresa%20com%20a%20Conte."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button 
                variant="white"
                className="w-full"
              >
                Fale com a Conte
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};