'use client';
import { useTheme } from '@/lib/providers/ThemeProvider';
import { Button } from '@intern-3b/shadcn';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

const ModeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Горим солих"
      className="cursor-pointer"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ModeToggleButton;
