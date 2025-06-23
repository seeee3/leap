
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 backdrop-blur-xl border 
                 dark:bg-slate-800/50 dark:border-slate-700/50 dark:hover:bg-slate-700/60 dark:text-slate-300 dark:hover:text-white
                 bg-white/80 border-gray-200 hover:bg-white/90 text-gray-600 hover:text-gray-900 
                 hover:scale-110 hover:shadow-lg group"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
