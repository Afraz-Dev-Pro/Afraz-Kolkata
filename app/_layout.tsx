import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from '../src/providers/FavoritesProvider';
import { ThemeProvider, useAppTheme } from '../src/theme/ThemeProvider';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } });

export default function RootLayout() {
  return <QueryClientProvider client={queryClient}><ThemeProvider><FavoritesProvider><RootNavigator /></FavoritesProvider></ThemeProvider></QueryClientProvider>;
}

function RootNavigator() {
  const { mode, colors } = useAppTheme();
  return <>
    <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="places/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="search" options={{ presentation: 'card' }} />
    </Stack>
  </>;
}
