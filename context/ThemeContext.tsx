"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 💡 FIX: Helper function now targets document.body
const applyThemeClass = (theme: Theme) => {
  const root = document.body; // Target the body element
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  // 1. Initialize theme from localStorage or system preference on mount
  useEffect(() => {
    let initialTheme: Theme;
    const storedTheme = localStorage.getItem('theme') as Theme;

    if (storedTheme) {
      initialTheme = storedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = 'dark';
    } else {
      initialTheme = 'light';
    }
    
    setTheme(initialTheme);
    
    // 💡 FIX: Apply the class here immediately after state is set
    applyThemeClass(initialTheme); 
  }, []); 

  // 2. Function to toggle and persist the theme
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyThemeClass(newTheme);
      return newTheme;
    });
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  // We only render children once the theme is initialized and applied
  if (!theme) return null; 

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
