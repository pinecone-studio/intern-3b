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

export function SignupDialog({ open, onOpenChange }: any) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignup() {
    setError('');

    if (!username || !email || password.length < 6) {
      setError('Бүх талбарыг зөв бөглөнө үү (нууц үг 6+ тэмдэг)');
      return;
    }

    if (password !== password2) {
      setError('Нууц үг таарахгүй байна');
      return;
    }

    const res = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Бүртгэл амжилтгүй');
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
          <DialogTitle>Бүртгүүлэх</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Нэр</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
          </div>

          <div className="relative">
            <Label>Нууц үг давтах</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
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

          <Button className="w-full" onClick={handleSignup}>
            Эхлэх
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
