'use client';

import type { ReactNode } from 'react';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@intern-3b/shadcn';

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
  actions?: ReactNode;
}

export function AppHeader({ title, onBack, actions }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-card border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {onBack && (
            <Button
              onClick={onBack}
              className="shrink-0 p-2 -ml-2 hover:bg-accent rounded-lg transition-colors active:bg-accent/80"
              aria-label="Буцах"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </Button>
          )}
          <h1 className="text-base font-semibold text-foreground truncate">
            {title}
          </h1>
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </header>
  );
}
