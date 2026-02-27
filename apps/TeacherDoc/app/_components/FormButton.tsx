
import type React from 'react';

interface FormButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

export default function FormButton({ children, loading }: FormButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`
        w-full 
        bg-[#008a5b] 
        hover:bg-[#00734d] 
        disabled:bg-[#008a5b]/60 
        text-white 
        font-bold 
        py-3.5 
        px-4 
        rounded-xl 
        transition-all 
        duration-200 
        disabled:cursor-not-allowed 
        flex 
        items-center 
        justify-center 
        gap-2 
        shadow-md 
        active:scale-[0.99]
      `}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      <span className="tracking-wide">{children}</span>
    </button>
  );
}