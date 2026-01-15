'use client';

import { useState } from 'react';
import AuthPage from '../_components/AuthPage';
import { Button } from '../_components/ui/CustomUI';

export default function LoginPage() {
  const [role, setRole] = useState<null | 'school' | 'teacher'>(null);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-[#B0DAC8]/30 flex items-center justify-center">
      {!role && (
        <div className="flex gap-4">
          <Button variant="primary" onClick={() => setRole('school')}>
            Сургууль
          </Button>

          <Button onClick={() => setRole('teacher')}>
            Багш
          </Button>
        </div>
      )}
      {role && (
        <AuthPage role={role} onBack={() => setRole(null)} />
      )}
    </div>
  );
}
