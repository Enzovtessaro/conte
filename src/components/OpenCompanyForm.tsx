import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputMask from 'react-input-mask';
import Button from './Button';
import { debounce } from 'lodash';

interface FormData {
  fullName: string;
  state: string;
  city: string;
  cpf: string;
  phone: string;
  area: string;
}

interface IBGEState {
  id: number;
  sigla: string;
  nome: string;
}

interface IBGECity {
  id: number;
  nome: string;
}

interface FormProps {
  onClose: () => void;
}

const OpenCompanyForm: React.FC<FormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    state: '',
    city: '',
    cpf: '',
    phone: '',
    area: '',
  });
  const [showErrors, setShowErrors] = useState({
    fullName: false,
    state: false,
    city: false,
    cpf: false,
    phone: false,
    area: false,
  });
  const [states, setStates] = useState<IBGEState[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowErrors(prev => ({ ...prev, [field]: false }));
    if (field === 'state') {
      setFormData(prev => ({ ...prev, city: '' }));
      setCities([]);
      fetchCities(value);
    }
  };

  const debouncedShowError = useCallback(
    debounce((field: keyof typeof showErrors) => {
      setShowErrors(prev => ({ ...prev, [field]: true }));
    }, 1000),
    []
  );

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateFormData(field, value);
    debouncedShowError(field);
  };

  useEffect(() => {
    const fetchStates = async () => {
      setIsLoadingStates(true);
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        if (!response.ok) throw new Error('Failed to fetch states');
        const data: IBGEState[] = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setIsLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  const fetchCities = async (stateUF: string) => {
    if (!stateUF) return;
    setIsLoadingCities(true);
    setCities([]);
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUF}/municipios?orderBy=nome`);
      if (!response.ok) throw new Error('Failed to fetch cities');
      const data: IBGECity[] = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const isValidCPF = (cpf: string) => {
    const numbers = cpf.replace(/[^\d]/g, '');
    return numbers.length === 11;
  };

  const isValidPhone = (phone: string) => {
    const numbers = phone.replace(/[^\d]/g, '');
    return numbers.length === 11;
  };

  const isValidName = (name: string) => {
    return name.trim().split(' ').length >= 2 && name.length >= 5;
  };

  const isValidState = (state: string) => state.trim() !== '';
  const isValidCity = (city: string) => city.trim() !== '';

  const canContinue = () => {
    switch (step) {
      case 1:
        return isValidName(formData.fullName);
      case 2:
        return isValidState(formData.state) && isValidCity(formData.city);
      case 3:
        return isValidCPF(formData.cpf);
      case 4:
        return isValidPhone(formData.phone);
      case 5:
        return formData.area.trim().length >= 3;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 5 || !canContinue()) {
      if (step === 5 && !canContinue()) {
        setShowErrors(prev => ({ ...prev, area: true }));
      } else if (step < 5 && canContinue()) {
        setStep(step + 1);
      }
      return;
    }

    try {
      const payload = {
        'form-name': 'openCompany',
        fullName: formData.fullName.trim(),
        state: formData.state,
        city: formData.city,
        cpf: formData.cpf.replace(/[^\d]/g, ''),
        phone: formData.phone.replace(/[^\d]/g, ''),
        area: formData.area.trim()
      };

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(payload).toString()
        });

        if (response.ok) {
          setStep(6);
          return;
        }
      } catch (netErr) {
        console.warn('Default form submission failed, trying alternative endpoint:', netErr);
      }

      const response = await fetch("/.netlify/functions/submission-created", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStep(6);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Houve um erro ao enviar o formulário. Por favor, tente novamente ou entre em contato conosco.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <label className="block text-2xl font-medium text-gray-900 mb-8">
              Qual seu nome completo?
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors"
              placeholder="Digite seu nome completo"
              required
            />
            {showErrors.fullName && formData.fullName && !isValidName(formData.fullName) && (
              <p className="text-sm text-red-500 mt-2">
                Por favor, digite seu nome completo
              </p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <label className="block text-2xl font-medium text-gray-900 mb-2">
              Onde você mora?
            </label>
            <div className="space-y-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={`w-full p-4 text-lg border-b-2 ${showErrors.state && !isValidState(formData.state) ? 'border-red-500' : 'border-gray-300'} focus:border-black outline-none transition-colors bg-white`}
                required
                disabled={isLoadingStates}
              >
                <option value="" disabled>{isLoadingStates ? 'Carregando...' : 'Selecione o estado'}</option>
                {states.map((s) => (
                  <option key={s.id} value={s.sigla}>{s.nome}</option>
                ))}
              </select>
              {showErrors.state && !isValidState(formData.state) && (
                <p className="text-sm text-red-500 mt-1">Por favor, selecione um estado.</p>
              )}
            </div>
            <div className="space-y-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full p-4 text-lg border-b-2 ${showErrors.city && !isValidCity(formData.city) ? 'border-red-500' : 'border-gray-300'} focus:border-black outline-none transition-colors bg-white`}
                required
                disabled={!formData.state || isLoadingCities || cities.length === 0}
              >
                <option value="" disabled>
                  {!formData.state ? 'Selecione um estado primeiro' : isLoadingCities ? 'Carregando cidades...' : cities.length === 0 ? 'Nenhuma cidade encontrada' : 'Selecione a cidade'}
                </option>
                {cities.map((c) => (
                  <option key={c.id} value={c.nome}>{c.nome}</option>
                ))}
              </select>
              {showErrors.city && !isValidCity(formData.city) && (
                <p className="text-sm text-red-500 mt-1">Por favor, selecione uma cidade.</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-2xl font-medium text-gray-900 mb-8">
              {formData.fullName.split(' ')[0]}, qual seu CPF?
            </label>
            <InputMask
              mask="999.999.999-99"
              name="cpf"
              value={formData.cpf}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors"
              placeholder="000.000.000-00"
              required
            />
            {showErrors.cpf && formData.cpf && !isValidCPF(formData.cpf) && (
              <p className="text-sm text-red-500 mt-2">
                Por favor, digite um CPF válido
              </p>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <label className="block text-2xl font-medium text-gray-900 mb-8">
              {formData.fullName.split(' ')[0]}, qual seu telefone?
            </label>
            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors"
              placeholder="(00) 00000-0000"
              required
            />
            {showErrors.phone && formData.phone && !isValidPhone(formData.phone) && (
              <p className="text-sm text-red-500 mt-2">
                Por favor, digite um telefone válido
              </p>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <label className="block text-2xl font-medium text-gray-900 mb-8">
              Qual será sua área de atuação?
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={(e) => handleInputChange('area', e.target.value)}
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors"
              placeholder="Ex: Desenvolvimento de software"
              required
            />
            {showErrors.area && formData.area && formData.area.trim().length < 3 && (
              <p className="text-sm text-red-500 mt-2">
                Por favor, descreva sua área de atuação
              </p>
            )}
          </div>
        );
      case 6:
        return (
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-medium text-gray-900">
              Obrigado pelo interesse!
            </h3>
            <p className="text-lg text-gray-600">
              Entraremos em contato via WhatsApp em breve para dar continuidade ao processo de abertura da sua empresa.
            </p>
            <Button onClick={onClose}>Fechar</Button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <form
        name="openCompany"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="space-y-12"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (step === 5 && canContinue()) {
              handleSubmit(e as any);
            }
          }
        }}
      >
        <input type="hidden" name="form-name" value="openCompany" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {step < 6 && (
          <div className="flex justify-between items-center mt-12">
            {step > 1 && (
              <Button
                variant="secondary"
                onClick={() => setStep(step - 1)}
                type="button"
              >
                Voltar
              </Button>
            )}
            <Button
              type={step === 5 ? 'submit' : 'button'}
              onClick={() => step < 5 && canContinue() && setStep(step + 1)}
              className={`ml-auto ${!canContinue() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canContinue()}
            >
              {step === 5 ? 'Enviar' : 'Continuar'}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default OpenCompanyForm;