'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full  transition-all duration-300 active:scale-95"
      >
        {theme === 'dark' ? (
          <Sun className="size-5 text-zinc-200" />
        ) : (
          <Moon className="size-5" />
        )}
      </button>
    </div>
  );
}
