'use client';

import type { ReactNode } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

interface BottomNavProps {
  items: NavItem[];
  activeId: string;
}

export function BottomNav({ items, activeId }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
      <div className="flex items-center h-16">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="flex-1 flex flex-col items-center justify-center h-full gap-1 active:bg-accent/50 transition-colors min-h-12"
              aria-label={item.label}
            >
              <div
                className={isActive ? 'text-primary' : 'text-muted-foreground'}
              >
                {item.icon}
              </div>
              <span
                className={`text-xs ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
