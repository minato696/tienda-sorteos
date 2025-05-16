'use client';

import { useState } from 'react';
import { useTheme } from './ThemeContext';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-theme-primary hover:bg-opacity-90 text-theme-text-inverted transition-all"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-sm font-medium">Tema</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentTheme === theme.name
                    ? 'bg-theme-bg-alt text-theme-primary font-medium'
                    : 'text-theme-text-primary hover:bg-gray-100'
                }`}
                role="menuitem"
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ 
                      background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})` 
                    }}
                  />
                  <span>{theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}