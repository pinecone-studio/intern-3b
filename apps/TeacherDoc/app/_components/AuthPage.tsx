'use client';

import { useState } from 'react';
import SignInForm from './SignInForm';
import { SignUpForm } from './SignUpForm';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {isSignUp ? 'Бүртгүүлэх' : 'Нэвтрэх'}
          </h1>
          <p className="text-slate-600">
            {isSignUp
              ? 'Шинэ хэрэглэгчийн данс үүсгэх'
              : 'Өөрийн данс руу нэвтрэх'}
          </p>
        </div>

        {isSignUp ? <SignUpForm /> : <SignInForm />}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            {isSignUp ? (
              <>
                Танд данс байна уу?{' '}
                <span className="font-semibold text-blue-600">Нэвтрэх</span>
              </>
            ) : (
              <>
                Шинэ хэрэглэгч үү?{' '}
                <span className="font-semibold text-blue-600">Бүртгүүлэх</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
