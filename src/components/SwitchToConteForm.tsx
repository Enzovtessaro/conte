import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputMask from 'react-input-mask';
import Button from './Button';
import { debounce } from 'lodash';

interface FormData {
  fullName: string;
  cnpj: string;
  cpf: string;
  phone: string;
}

interface FormProps {
  onClose: () => void;
}

const SwitchToConteForm: React.FC<FormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    cnpj: '',
    cpf: '',
    phone: '',
  });
  const [showErrors, setShowErrors] = useState({
    fullName: false,
    cnpj: false,
    cpf: false,
    phone: false,
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowErrors(prev => ({ ...prev, [field]: false }));
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

  const isValidCNPJ = (cnpj: string) =>
    cnpj.replace(/[^\d]/g, '').length === 14;
  const isValidCPF = (cpf: string) =>
    cpf.replace(/[^\d]/g, '').length === 11;
  const isValidPhone = (phone: string) =>
    phone.replace(/[^\d]/g, '').length === 11;
  const isValidName = (name: string) =>
    name.trim().split(' ').length >= 2 && name.length >= 5;

  const canContinue = () => {
    switch (step) {
      case 1:
        return isValidName(formData.fullName);
      case 2:
        return isValidCNPJ(formData.cnpj);
      case 3:
        return isValidCPF(formData.cpf);
      case 4:
        return isValidPhone(formData.phone);
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If not on the final step or data is invalid, don't submit
    if (step < 4 || !canContinue()) {
      if (step < 4) {
        setStep(step + 1);
      }
      return;
    }

    // Create payload object
    const payload = {
      'form-name': 'switchToConte',
      fullName: formData.fullName.trim(),
      cnpj: formData.cnpj.replace(/[^\d]/g, ''),
      cpf: formData.cpf.replace(/[^\d]/g, ''),
      phone: formData.phone.replace(/[^\d]/g, '')
    };

    try {
      // First try the default Netlify form submission
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(payload).toString(),
        });

        if (response.ok) {
          setStep(5);
          return;
        }
      } catch (netErr) {
        console.warn('Default form submission failed, trying alternative endpoint:', netErr);
      }

      // If the default submission fails, try the Netlify forms endpoint directly
      const response = await fetch('/.netlify/functions/submission-created', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStep(5);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      // Show an error message to the user
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
              onChange={e => handleInputChange('fullName', e.target.value)}
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors"
              placeholder="Digite seu nome completo"
              required
            />
            {showErrors.fullName &&
              !isValidName(formData.fullName) && (
                <p className="text-sm text-red-500 mt-2">
                  Por favor, digite seu nome completo
                </p>
              )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-2xl font-medium text-gray-900 mb-8">
              {formData.fullName.split(' ')[0]}, qual o CNPJ da sua empresa?
            </label>
            <InputMask
              mask="99.999.999/9999-99"
              name="cnpj"
              value={formData.cnpj}
              onChange={e => handleInputChange('cnpj', e.target.value)}
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors"
              placeholder="00.000.000/0000-00"
              required
            />
            {showErrors.cnpj && !isValidCNPJ(formData.cnpj) && (
              <p className="text-sm text-red-500 mt-2">
                Por favor, digite um CNPJ válido
              </p>
            )}
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
              onChange={e => handleInputChange('cpf', e.target.value)}
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors"
              placeholder="000.000.000-00"
              required
            />
            {showErrors.cpf && !isValidCPF(formData.cpf) && (
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
              {formData.fullName.split(' ')[0]}, qual seu telefone de contato?
            </label>
            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              className="w-full p-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors"
              placeholder="(00) 00000-0000"
              required
            />
            {showErrors.phone && !isValidPhone(formData.phone) && (
              <p className="text-sm text-red-500 mt-2">
                Por favor, digite um telefone válido
              </p>
            )}
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-medium text-gray-900">
              Obrigado pelo interesse!
            </h3>
            <p className="text-lg text-gray-600">
              Entraremos em contato via WhatsApp em breve para dar continuidade ao
              processo de mudança para a Conte.
            </p>
            <Button onClick={onClose}>Fechar</Button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <form
        name="switchToConte"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        action="/"
        className="space-y-12"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            // Only allow Enter submission on step 4 when all data is valid
            if (step === 4 && canContinue()) {
              handleSubmit(e as any);
            }
          }
        }}
      >
        <input type="hidden" name="form-name" value="switchToConte" />

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

        {step < 5 && (
          <div className="flex justify-between items-center mt-12">
            {step > 1 && (
              <Button
                variant="secondary"
                type="button"
                onClick={() => setStep(step - 1)}
              >
                Voltar
              </Button>
            )}
            <Button
              type={step === 4 ? 'submit' : 'button'}
              onClick={() => step < 4 && canContinue() && setStep(step + 1)}
              className={`ml-auto ${!canContinue() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canContinue()}
            >
              {step === 4 ? 'Enviar' : 'Continuar'}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SwitchToConteForm;
