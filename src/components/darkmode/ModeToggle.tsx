'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`
    p-1 rounded-full transition-all duration-300 active:scale-95
    bg-zinc-200 text-zinc-800 
    hover:bg-zinc-300 
    dark:bg-zinc-800 dark:text-zinc-100 
    dark:hover:bg-zinc-700
  `}
    >
      {theme === 'dark' ? (
        <Sun strokeWidth='1.7' className="size-5 text-zinc-100" />
      ) : (
        <Moon strokeWidth='1.7' className="size-5 text-zinc-800" />
      )}
    </button>
  );
}
