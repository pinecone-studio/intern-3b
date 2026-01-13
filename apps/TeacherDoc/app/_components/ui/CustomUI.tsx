
import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode, variant?: 'outline' | 'secondary' | 'accent' | 'mint', className?: string }> = ({ children, variant = 'outline', className = '' }) => {
  const variants = {
    outline: 'border border-slate-200 text-slate-500 bg-white',
    secondary: 'bg-slate-100 text-slate-600',
    accent: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    mint: 'bg-[#F0F7F4] text-[#4A7261] border border-[#B0DAC8]/40'
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' | 'dark', size?: 'sm' | 'md' | 'lg' }> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variants = {
    primary: 'bg-[#B0DAC8] text-[#2D4F3F] hover:bg-[#99C7B4] shadow-sm active:scale-[0.98] transition-all',
    outline: 'border-2 border-slate-200 bg-white text-slate-700 hover:border-[#B0DAC8] hover:bg-[#F0F7F4] hover:text-[#2D4F3F] shadow-sm active:scale-[0.98] transition-all',
    ghost: 'hover:bg-slate-100 text-slate-600 transition-colors',
    dark: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:scale-[0.98] transition-all'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  return (
    <button className={`inline-flex items-center justify-center rounded-2xl font-bold tracking-tight disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden transition-all duration-300 hover:border-[#B0DAC8] hover:shadow-[0_12px_40px_rgb(176,218,200,0.15)] ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input className={`w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#B0DAC8]/20 focus:border-[#B0DAC8] transition-all ${className}`} {...props} />
);

export const Label: React.FC<{ htmlFor: string, children: React.ReactNode, className?: string }> = ({ htmlFor, children, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ${className}`}>{children}</label>
);
