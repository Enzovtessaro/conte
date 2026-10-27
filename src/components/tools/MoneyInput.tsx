import React from 'react';

interface MoneyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  hint?: string;
  decimals?: number;
}

const format = (value: number, decimals: number) =>
  value ? value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : '';

// Digits-only mask: typing "123456" shows "1.234,56", so the field never holds an invalid number.
const MoneyInput: React.FC<MoneyInputProps> = ({ id, label, value, onChange, prefix = 'R$', hint, decimals = 2 }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
      {label}
    </label>
    <div className="flex h-12 items-center rounded-xl border border-paper-line bg-white px-3.5 transition-colors focus-within:border-ink">
      <span className="mr-2 text-sm text-ink-faint">{prefix}</span>
      <input
        id={id}
        inputMode="numeric"
        autoComplete="off"
        className="w-full bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-faint"
        placeholder={format(0, decimals) || '0'}
        value={format(value, decimals)}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, '');
          onChange(digits ? parseInt(digits, 10) / 10 ** decimals : 0);
        }}
      />
    </div>
    {hint && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
  </div>
);

export default MoneyInput;
