'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type Tab = 'login' | 'signup';

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('login');
  const [loading, setLoading] = useState(false);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [majorId, setMajorId] = useState('web-development');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Нэвтрэх үед алдаа гарлаа');
        setLoading(false);
        return;
      }
      localStorage.setItem('token', data.token);
      setOpen(false);
    } catch (e) {
      setError('Серверийн алдаа');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Нууц үг таарахгүй байна');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          majorId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Бүртгүүлэх үед алдаа гарлаа');
        setLoading(false);
        return;
      }
      // Auto login after signup
      await handleLogin();
    } catch (e) {
      setError('Серверийн алдаа');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') handleLogin();
    else handleSignup();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Нэвтрэх / Бүртгүүлэх</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {tab === 'login' ? 'Нэвтрэх' : 'Бүртгүүлэх'}
          </DialogTitle>
          <DialogDescription>
            {tab === 'login'
              ? 'Имэйл болон нууц үг оруулна уу'
              : 'Шинэ данс үүсгэнэ үү'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mt-4 mb-2">
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

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div>
            <Label>Имэйл</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Нууц үг</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOffIcon size={16} />
                ) : (
                  <EyeIcon size={16} />
                )}
              </button>
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <Label>Нууц үг баталгаажуулах</Label>
              <div className="relative">
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  {showConfirm ? (
                    <EyeOffIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {tab === 'login' ? 'Нэвтрэх' : 'Бүртгүүлэх'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
