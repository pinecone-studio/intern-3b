'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';

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
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
              >
                Нэвтрэх
              </Button>
            </Link>
            <Link href="/login?tab=register">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-5 rounded-xl font-medium transition-all shadow-md shadow-slate-200">
                Бүртгүүлэх
              </Button>
            </Link>
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
            <Link href="/login" className="w-full">
              <Button
                variant="outline"
                className="w-full border-slate-200 rounded-xl"
              >
                Нэвтрэх
              </Button>
            </Link>
            <Link href="/login?tab=register" className="w-full">
              <Button className="w-full bg-indigo-600 text-white rounded-xl">
                Бүртгүүлэх
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
