'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultTheme, getThemeByName, allThemes } from './themes';
// Tipo para el contexto del tema
type ThemeContextType = {
  currentTheme: string;
  setTheme: (themeName: string) => void;
  themes: typeof allThemes;
};

// Crear el contexto
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme.name,
  setTheme: () => {},
  themes: allThemes,
});

// Hook personalizado para usar el tema
export const useTheme = () => useContext(ThemeContext);

// Proveedor del tema
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Estado para el tema actual
  const [currentTheme, setCurrentTheme] = useState(defaultTheme.name);

  // Función para cambiar el tema
  const setTheme = (themeName: string) => {
    if (allThemes.some(theme => theme.name === themeName)) {
      setCurrentTheme(themeName);
      localStorage.setItem('theme', themeName);
      
      // Aplicar colores del tema al documento
      applyThemeColors(themeName);
    }
  };

  // Aplicar colores del tema a las variables CSS
  const applyThemeColors = (themeName: string) => {
    const theme = getThemeByName(themeName);
    const root = document.documentElement;
    
    // Colores principales
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-highlight', theme.colors.highlight);
    
    // Colores de fondo
    root.style.setProperty('--color-bg-main', theme.colors.background.main);
    root.style.setProperty('--color-bg-alt', theme.colors.background.alt);
    
    // Colores de texto
    root.style.setProperty('--color-text-primary', theme.colors.text.primary);
    root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--color-text-inverted', theme.colors.text.inverted);
    
    // Colores de UI
    root.style.setProperty('--color-ui-card', theme.colors.ui.card);
    root.style.setProperty('--color-ui-border', theme.colors.ui.border);
    root.style.setProperty('--color-ui-hover', theme.colors.ui.hover);
    
    // Colores de estado
    root.style.setProperty('--color-status-success', theme.colors.status.success);
    root.style.setProperty('--color-status-warning', theme.colors.status.warning);
    root.style.setProperty('--color-status-error', theme.colors.status.error);
    root.style.setProperty('--color-status-info', theme.colors.status.info);
  };

  // Cargar tema guardado al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && allThemes.some(theme => theme.name === savedTheme)) {
      setCurrentTheme(savedTheme);
      applyThemeColors(savedTheme);
    } else {
      // Aplicar tema predeterminado
      applyThemeColors(defaultTheme.name);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: allThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}