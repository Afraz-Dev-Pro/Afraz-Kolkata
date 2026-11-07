import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type FavoritesContextValue = { favorites: string[]; isFavorite: (id: string) => boolean; toggleFavorite: (id: string) => void; ready: boolean };
const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const FAVORITES_KEY = '@afraz-kolkata/favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { void AsyncStorage.getItem(FAVORITES_KEY).then((stored) => {
    if (stored) { const parsed: unknown = JSON.parse(stored); if (Array.isArray(parsed) && parsed.every((id): id is string => typeof id === 'string')) setFavorites(parsed); }
  }).catch(() => undefined).finally(() => setReady(true)); }, []);
  useEffect(() => { if (ready) void AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => undefined); }, [favorites, ready]);
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const toggleFavorite = useCallback((id: string) => setFavorites((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]), []);
  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite, ready }), [favorites, isFavorite, toggleFavorite, ready]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error('useFavorites must be used within FavoritesProvider');
  return value;
}
