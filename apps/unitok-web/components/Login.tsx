'use client';

import { useState } from 'react';
import { Button, Input } from '@intern-3b/shadcn';
import { Signup } from './SignUp';

export function Login({ onLogin }: { onLogin: () => void }) {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (showSignup) {
    return <Signup onBack={() => setShowSignup(false)} onSignup={onLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center mb-8 text-foreground">
            Нэвтрэх
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
            <Button
              onClick={onLogin}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Нэвтрэх
            </Button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSignup(true)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Бүртгэл үүсгэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
