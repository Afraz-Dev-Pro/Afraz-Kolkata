import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { palettes, type AppColors, type ThemeMode } from './colors';

type ThemeContextValue = { mode: ThemeMode; colors: AppColors; toggleMode: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_KEY = '@afraz-kolkata/theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  useEffect(() => { void AsyncStorage.getItem(THEME_KEY).then((saved) => { if (saved === 'dark' || saved === 'light') setMode(saved); }).catch(() => undefined); }, []);
  const toggleMode = useCallback(() => setMode((current) => {
    const next = current === 'dark' ? 'light' : 'dark';
    void AsyncStorage.setItem(THEME_KEY, next).catch(() => undefined);
    return next;
  }), []);
  const value = useMemo(() => ({ mode, colors: palettes[mode], toggleMode }), [mode, toggleMode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useAppTheme must be used within ThemeProvider');
  return value;
}
