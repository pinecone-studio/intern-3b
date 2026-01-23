'use client';
import * as React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useUser } from '@/lib/user-store';

export function LoginSignupDialog() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    /* set user info here if needed */
  } = useUser();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Имэйл болон нууц үгээ оруулна уу');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Нэвтрэхэд алдаа гарлаа');
      } else {
        console.log('Logged in', data);
        setOpen(false);
        resetForm();
      }
    } catch (err) {
      setError('Серверийн алдаа');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Бүх талбарыг бөглөнө үү');
      return;
    }
    if (password !== confirmPassword) {
      setError('Нууц үг таарахгүй байна');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, majorId: null }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Бүртгүүлэхэд алдаа гарлаа');
      } else {
        console.log('Signed up', data);
        setTab('login'); // switch to login after signup
        resetForm();
      }
    } catch (err) {
      setError('Серверийн алдаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Нэвтрэх / Бүртгүүлэх</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {tab === 'login' ? 'Нэвтрэх' : 'Бүртгүүлэх'}
          </DialogTitle>
          <DialogDescription>
            {tab === 'login'
              ? 'Имэйл болон нууц үгээр нэвтрэнэ үү'
              : 'Шинээр бүртгүүлэх'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-2 mb-4">
          <Button
            size="sm"
            variant={tab === 'login' ? 'default' : 'outline'}
            onClick={() => setTab('login')}
          >
            Нэвтрэх
          </Button>
          <Button
            size="sm"
            variant={tab === 'signup' ? 'default' : 'outline'}
            onClick={() => setTab('signup')}
          >
            Бүртгүүлэх
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label>Нууц үг</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <Label>Нууц үг давтах</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {error && <div className="text-destructive text-sm">{error}</div>}
        </div>

        <DialogFooter>
          {tab === 'login' ? (
            <Button onClick={handleLogin} disabled={loading}>
              {loading ? 'Ачааллаж байна...' : 'Нэвтрэх'}
            </Button>
          ) : (
            <Button onClick={handleSignup} disabled={loading}>
              {loading ? 'Ачааллаж байна...' : 'Бүртгүүлэх'}
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="ghost">Хаах</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
