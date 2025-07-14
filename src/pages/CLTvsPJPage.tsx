import React from 'react';
import { CLTvsPJCalculator } from '../components/CLTvsPJCalculator';

const CLTvsPJPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            Calculadora CLT vs PJ
          </h1>
          
          <p className="text-lg text-primary-600 max-w-4xl mx-auto leading-relaxed">
            Compare sua situação atual CLT com a possibilidade de ser PJ. Descubra qual regime 
            oferece mais vantagens financeiras considerando benefícios, impostos e custos.
          </p>
        </div>

        {/* Calculator */}
        <CLTvsPJCalculator />

        {/* How it works section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="text-3xl font-bold text-primary-900 mb-8 text-center">
            Como Nossa Calculadora Funciona?
          </h3>
          <div className="prose prose-lg max-w-none text-primary-600">
            <p className="mb-6">
              Nossa ferramenta foi desenvolvida para desmistificar a comparação entre CLT e PJ. 
              Com ela, você simula sua situação atual como CLT e descobre se vale a pena 
              migrar para Pessoa Jurídica, considerando todos os benefícios e custos envolvidos.
            </p>
            <p className="mb-8">
              É simples assim: você informa seus dados CLT (salário, benefícios), e a calculadora 
              faz todo o trabalho pesado, apresentando uma comparação clara entre permanecer CLT 
              ou migrar para PJ no regime Simples Nacional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-[15px] border border-gray-100">
              <h4 className="text-xl font-semibold text-primary-900 mb-4">
                Regime CLT
              </h4>
              <ul className="text-primary-700 space-y-2">
                <li>• Salário fixo com carteira assinada</li>
                <li>• 13º salário e férias remuneradas</li>
                <li>• FGTS depositado pelo empregador</li>
                <li>• Benefícios (VR, VA, plano de saúde)</li>
                <li>• Estabilidade e direitos trabalhistas</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-[15px] border border-gray-100">
              <h4 className="text-xl font-semibold text-primary-900 mb-4">
                Regime PJ
              </h4>
              <ul className="text-primary-700 space-y-2">
                <li>• Simples Nacional (6% - Anexo III)</li>
                <li>• Maior flexibilidade de horários</li>
                <li>• Possibilidade de múltiplos clientes</li>
                <li>• Distribuição de lucros isenta</li>
                <li>• Dedução de despesas empresariais</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-[15px] p-6">
            <h4 className="text-lg font-semibold text-primary-900 mb-3">
              ⚠️ Importante
            </h4>
            <p className="text-primary-700">
              Esta calculadora é uma simulação e fornece estimativas com base nos dados informados. 
              A decisão entre CLT e PJ envolve diversos fatores além do financeiro, como estabilidade, 
              benefícios sociais e preferências pessoais. Para uma orientação precisa e personalizada, 
              consulte um contador especializado!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLTvsPJPage;
