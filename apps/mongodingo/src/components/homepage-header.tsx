'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function HomepageHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [majorId, setMajorId] = useState('');

  const [user, setUser] = useState<{ email: string } | null>(null);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Нэвтрэхэд алдаа гарлаа');
        return;
      }
      setUser({ email });
      setDialogOpen(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Нэвтрэхэд алдаа гарлаа');
    }
  };

  const handleRegister = async () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Бүх талбарыг бөглөнө үү');
      return;
    }
    if (password !== confirmPassword) {
      setError('Нууц үг таарахгүй байна');
      return;
    }
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, majorId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Бүртгүүлэхэд алдаа гарлаа');
        return;
      }
      setUser({ email });
      setDialogOpen(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setMajorId('');
    } catch (err) {
      setError('Бүртгүүлэхэд алдаа гарлаа');
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mongodingo
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/majors"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Мэргэжлүүд
          </Link>
          <Link
            href="/learn"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Хичээл
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Профайл
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isRegister ? 'Бүртгүүлэх' : 'Нэвтрэх'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {isRegister ? 'Бүртгүүлэх' : 'Нэвтрэх'}
                    </DialogTitle>
                    <DialogDescription>
                      {isRegister
                        ? 'Шинэ хэрэглэгч үүсгэнэ үү'
                        : 'И-мэйл болон нууц үгээр нэвтэрнэ үү'}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4 mt-2">
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
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {isRegister && (
                      <div>
                        <Label>Нууц үг давтан</Label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="text-destructive text-sm mt-2">{error}</div>
                  )}

                  <DialogFooter className="mt-4">
                    <Button
                      variant="default"
                      onClick={isRegister ? handleRegister : handleLogin}
                    >
                      {isRegister ? 'Бүртгүүлэх' : 'Нэвтрэх'}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setIsRegister(!isRegister)}
                    >
                      {isRegister
                        ? 'Бүртгэлтэй юу? Нэвтрэх'
                        : 'Шинэ хэрэглэгч үү? Бүртгүүлэх'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setDialogOpen(true)}
              >
                Эхлэх
              </Button>
            </>
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
