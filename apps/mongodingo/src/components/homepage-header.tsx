'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HomepageHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
          <Link
            href="#features"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Боломжууд
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Нэвтрэх
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Эхлэх
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
