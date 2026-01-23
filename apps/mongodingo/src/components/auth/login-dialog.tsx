'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export function LoginDialog({ open, onOpenChange }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin() {
    setError('');
    if (!email || !password) {
      setError('Имэйл болон нууц үгээ оруулна уу');
      return;
    }

    const res = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Нэвтрэх амжилтгүй');
      return;
    }

    localStorage.setItem('mongodingo_user', JSON.stringify(data.user));
    onOpenChange(false);
    router.push('/learn');
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="backdrop-blur-xl bg-background/80 border border-white/10">
        <DialogHeader>
          <DialogTitle>Нэвтрэх</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Имэйл</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="relative">
            <Label>Нууц үг</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" onClick={handleLogin}>
            Нэвтрэх
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
