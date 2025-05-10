import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  onClick,
  type = 'button'
}) => {
  const baseClasses = 'font-medium py-3 px-6 rounded-[15px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-black hover:bg-gray-800 text-white focus:ring-gray-500',
    secondary: 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 focus:ring-gray-200',
    white: 'bg-white text-primary-900 hover:bg-gray-100',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;