'use client';

import { useState } from 'react';
import { Button, Input } from '@intern-3b/shadcn';
import { ChevronLeft } from 'lucide-react';

export function Signup({
  onBack,
  onSignup,
}: {
  onBack: () => void;
  onSignup: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <header className="flex items-center h-14 px-4 border-b border-border">
        <button onClick={onBack}>
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center mb-8 text-foreground">
            Бүртгүүлэх
          </h1>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="И-мэйл"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-card border-border text-foreground"
            />
            <Input
              type="password"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-card border-border text-foreground"
            />
            <Input
              type="password"
              placeholder="Нууц үг давтах"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 bg-card border-border text-foreground"
            />
            <Button
              onClick={onSignup}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Бүртгүүлэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
