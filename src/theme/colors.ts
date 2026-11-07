export const palettes = {
  dark: {
    background: '#0F0F1A', surface: '#1A1A2E', surfaceLight: '#252540', surfaceBorder: '#2D2D4A',
    primary: '#FF6B6B', primaryDark: '#E85555', primaryLight: '#FF8E8E', primaryMuted: 'rgba(255,107,107,0.15)',
    secondary: '#4ECDC4', secondaryDark: '#3DB8B0', secondaryLight: '#6EDDD6', accent: '#FFD93D', accentMuted: 'rgba(255,217,61,0.15)',
    textPrimary: '#FFFFFF', textSecondary: '#B0B0CC', textMuted: '#9292AE', textOnPrimary: '#FFFFFF',
    success: '#6BCB77', warning: '#FFD93D', error: '#FF6B6B', metroBlue: '#2196F3', metroGreen: '#4CAF50', metroPurple: '#9C27B0', metroOrange: '#FF9800',
    placeCard: 'rgba(78,205,196,0.12)', foodCard: 'rgba(255,107,107,0.12)', shoppingCard: 'rgba(255,217,61,0.12)', routeCard: 'rgba(33,150,243,0.12)', plannerCard: 'rgba(107,203,119,0.12)',
  },
  light: {
    background: '#F7F8F4', surface: '#FFFFFF', surfaceLight: '#EAF0E9', surfaceBorder: '#E1E8E2',
    primary: '#176B52', primaryDark: '#125740', primaryLight: '#2B846B', primaryMuted: '#E7F2ED',
    secondary: '#276C65', secondaryDark: '#205B55', secondaryLight: '#438E86', accent: '#80551D', accentMuted: '#FFF3D7',
    textPrimary: '#17231F', textSecondary: '#52635B', textMuted: '#6C7972', textOnPrimary: '#FFFFFF',
    success: '#246A40', warning: '#80551D', error: '#A33838', metroBlue: '#1976D2', metroGreen: '#388E3C', metroPurple: '#7B1FA2', metroOrange: '#EF6C00',
    placeCard: '#E5F2ED', foodCard: '#F8E8E5', shoppingCard: '#FBF1D5', routeCard: '#E5EDF9', plannerCard: '#E5F0E4',
  },
} as const;

export type ThemeMode = keyof typeof palettes;
export type AppColors = (typeof palettes)[ThemeMode];
