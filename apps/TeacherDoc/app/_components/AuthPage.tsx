'use client';

import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import SignInForm from "./SignInForm";
import SignInSchoolForm from "./SignInSchoolForm";
import { SignUpSchoolForm } from "./SignUpSchoolForm";


const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

type AuthPageProps = {
  role: 'school' | 'teacher';
  onBack: () => void;
};

export default function AuthPage({ role, onBack }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc] p-4">
      {/* Header section with Logo and Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-[#008a5b] p-3 rounded-xl mb-4 shadow-sm">
          <BookIcon />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Хичээлийн Материал</h1>
        <p className="text-gray-500 text-sm">Багш нарын платформ</p>
      </div>

      <div className="w-full max-w-[540px]">
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Бүртгүүлэх' : 'Нэвтрэх'}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {isSignUp
                ? 'Шинэ хэрэглэгчийн данс үүсгэх'
                : 'Сургуулийн код, утасны дугаар болон нууц үгээ оруулна уу'}
            </p>
          </div>

          {/* Logic remains the same */}
          {role === "school" ? (
            isSignUp ? <SignUpSchoolForm /> : <SignInSchoolForm />
          ) : (
            isSignUp ? <SignUpForm /> : <SignInForm />
          )}

          {/* Switch Sign In/Up */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {isSignUp ? (
                <>Танд данс байна уу? <span className="font-semibold text-[#008a5b]">Нэвтрэх</span></>
              ) : (
                <>Шинэ хэрэглэгч үү? <span className="font-semibold text-[#008a5b]">Бүртгүүлэх</span></>
              )}
            </button>
          </div>

          {/* Test Info Box - Зураг дээрх мэдээлэл */}
          {!isSignUp && (
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 text-[12px] text-gray-500 leading-relaxed">
              <p className="font-medium mb-1">Туршилтын нэвтрэх мэдээлэл:</p>
              <p>Manager: SCH23 / 99001234 / pass123</p>
              <p>Teacher: SCH23 / 99005678 / pass123</p>
            </div>
          )}
        </div>

        <button 
          onClick={onBack} 
          className="mt-6 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Буцах
        </button>
      </div>
    </div>
  );
}