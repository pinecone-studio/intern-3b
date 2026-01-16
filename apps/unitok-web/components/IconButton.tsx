import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`p-2 hover:bg-accent rounded-lg transition-colors active:bg-accent/80 ${className}`}
        aria-label={label}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
