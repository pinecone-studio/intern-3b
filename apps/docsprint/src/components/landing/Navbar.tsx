'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const links = [
  { href: '#features', label: 'Боломжууд' },
  { href: '#pricing', label: 'Үнэ' },
  { href: '#about', label: 'Бидний тухай' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005bb7] shadow-sm transition-transform group-hover:scale-105">
              <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#111827]">
              DocSprint
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:scale-[1.02] transition">
                  Нэвтрэх / Бүртгүүлэх
                </Button>
              </DialogTrigger>

              <DialogContent
                className="
      sm:max-w-[420px]
      rounded-3xl
      border border-white/10
      bg-[#0B0B14]/90
      backdrop-blur-2xl
      shadow-2xl shadow-indigo-500/20
    "
              >
                <DialogHeader className="text-center">
                  <DialogTitle className="text-2xl font-extrabold tracking-tight text-white">
                    Welcome back ✨
                  </DialogTitle>
                  <p className="text-sm text-white/60">
                    Access your account or create a new one
                  </p>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full mt-6">
                  <TabsList
                    className="
          grid grid-cols-2 rounded-xl
          bg-white/5
          p-1
        "
                  >
                    <TabsTrigger
                      value="login"
                      className="
            rounded-lg
            data-[state=active]:bg-gradient-to-r
            data-[state=active]:from-indigo-500
            data-[state=active]:to-purple-600
            data-[state=active]:text-white
            text-white/60
          "
                    >
                      Нэвтрэх
                    </TabsTrigger>

                    <TabsTrigger
                      value="register"
                      className="
            rounded-lg
            data-[state=active]:bg-gradient-to-r
            data-[state=active]:from-indigo-500
            data-[state=active]:to-purple-600
            data-[state=active]:text-white
            text-white/60
          "
                    >
                      Бүртгүүлэх
                    </TabsTrigger>
                  </TabsList>

                  {/* LOGIN */}
                  <TabsContent value="login" className="space-y-4 mt-6">
                    <div className="space-y-1">
                      <Label className="text-white/70">Email</Label>
                      <Input
                        className="
              bg-white/5 border-white/10 text-white
              focus:border-indigo-500 focus:ring-indigo-500/20
              rounded-xl
            "
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-white/70">Нууц үг</Label>
                      <Input
                        type="password"
                        className="
              bg-white/5 border-white/10 text-white
              focus:border-indigo-500 focus:ring-indigo-500/20
              rounded-xl
            "
                        placeholder="••••••••"
                      />
                    </div>

                    <Button
                      className="
            w-full rounded-xl
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white
            shadow-lg shadow-indigo-500/30
            hover:scale-[1.02]
            transition
          "
                    >
                      Нэвтрэх
                    </Button>
                  </TabsContent>

                  {/* REGISTER */}
                  <TabsContent value="register" className="space-y-4 mt-6">
                    <div className="space-y-1">
                      <Label className="text-white/70">Email</Label>
                      <Input className="bg-white/5 border-white/10 text-white rounded-xl" />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-white/70">Нууц үг</Label>
                      <Input
                        type="password"
                        className="bg-white/5 border-white/10 text-white rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-white/70">Нууц үг давтах</Label>
                      <Input
                        type="password"
                        className="bg-white/5 border-white/10 text-white rounded-xl"
                      />
                    </div>

                    <Button
                      className="
            w-full rounded-xl
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white
            shadow-lg shadow-purple-500/30
            hover:scale-[1.02]
            transition
          "
                    >
                      Бүртгүүлэх
                    </Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>

          <button
            className="md:hidden p-2 text-slate-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white p-4 space-y-4 animate-in slide-in-from-top-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-base font-medium text-slate-600 px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                  Нэвтрэх / Бүртгүүлэх
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[420px] rounded-2xl backdrop-blur-xl">
                <DialogHeader className="text-center">
                  <DialogTitle className="text-2xl font-bold">
                    Тавтай морил 👋
                  </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full mt-4">
                  <TabsList className="grid grid-cols-2 rounded-xl">
                    <TabsTrigger value="login">Нэвтрэх</TabsTrigger>
                    <TabsTrigger value="register">Бүртгүүлэх</TabsTrigger>
                  </TabsList>

                  {/* LOGIN */}
                  <TabsContent value="login" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input placeholder="you@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label>Нууц үг</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>

                    <Button className="w-full rounded-xl bg-indigo-600 text-white">
                      Нэвтрэх
                    </Button>
                  </TabsContent>

                  {/* REGISTER */}
                  <TabsContent value="register" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input placeholder="you@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label>Нууц үг</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>

                    <div className="space-y-2">
                      <Label>Нууц үг давтах</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>

                    <Button className="w-full rounded-xl bg-indigo-600 text-white">
                      Бүртгүүлэх
                    </Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </header>
  );
}
