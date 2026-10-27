import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  className = '',
  onClick,
  type = 'button',
  disabled,
}) => {
  const baseClasses =
    'group inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

  const sizeClasses = {
    md: 'h-11 px-5 text-[15px]',
    lg: 'h-14 px-7 text-base',
  };

  const variantClasses = {
    primary: 'bg-ink text-white hover:bg-ink-soft shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_20px_-8px_rgba(14,15,12,0.5)] hover:-translate-y-px',
    secondary: 'bg-white text-ink border border-paper-line hover:border-ink/30 hover:bg-white',
    white: 'bg-white text-ink hover:bg-paper',
    accent: 'bg-brand text-ink hover:bg-brand-deep hover:-translate-y-px',
    ghost: 'text-ink hover:bg-ink/5',
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
