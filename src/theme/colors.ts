export const palettes = {
  dark: {
    background: '#10172B', surface: '#1A2440', surfaceLight: '#263252', surfaceBorder: '#344261',
    primary: '#FF765E', primaryDark: '#E65F49', primaryLight: '#FF967E', primaryMuted: 'rgba(255,118,94,0.16)',
    secondary: '#FFC45B', secondaryDark: '#E8A938', secondaryLight: '#FFD27D', accent: '#57D2C5', accentMuted: 'rgba(87,210,197,0.16)',
    textPrimary: '#FFF8EE', textSecondary: '#C3CAD9', textMuted: '#98A3B8', textOnPrimary: '#241D2B',
    success: '#70D6A2', warning: '#FFC45B', error: '#FF765E', metroBlue: '#63A8FF', metroGreen: '#70D6A2', metroPurple: '#C28BFF', metroOrange: '#FFAC63',
    placeCard: 'rgba(87,210,197,0.15)', foodCard: 'rgba(255,118,94,0.16)', shoppingCard: 'rgba(255,196,91,0.16)', routeCard: 'rgba(99,168,255,0.16)', plannerCard: 'rgba(112,214,162,0.15)',
  },
  light: {
    background: '#FFF8EE', surface: '#FFFFFF', surfaceLight: '#F5EBDD', surfaceBorder: '#E9DCCB',
    primary: '#D44E3D', primaryDark: '#B83D31', primaryLight: '#EA6856', primaryMuted: '#FCE6DF',
    secondary: '#9A5B00', secondaryDark: '#764500', secondaryLight: '#BD780A', accent: '#087F78', accentMuted: '#DDF3EC',
    textPrimary: '#20243A', textSecondary: '#58596A', textMuted: '#777687', textOnPrimary: '#FFFFFF',
    success: '#287652', warning: '#946000', error: '#B8322E', metroBlue: '#246FC2', metroGreen: '#287652', metroPurple: '#7748A8', metroOrange: '#C35A18',
    placeCard: '#DDF3EC', foodCard: '#FCE6DF', shoppingCard: '#FFF0CB', routeCard: '#E5EDFF', plannerCard: '#E3F0DA',
  },
} as const;

export type ThemeMode = keyof typeof palettes;
export type AppColors = (typeof palettes)[ThemeMode];
