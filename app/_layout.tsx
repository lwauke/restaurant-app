import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import '@/global.css';
import { THEME } from '@/lib/theme';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { useEffect } from 'react';

export { ErrorBoundary } from 'expo-router';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}

const SCREEN_OPTIONS = {
  light: {
    title: 'Restaurants',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    title: 'Restaurants',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ThemeToggle />,
  },
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const options = SCREEN_OPTIONS[colorScheme ?? 'light'];

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
    return () => subscription.remove()
  }, [])

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack.Screen name="index" options={options} />
          <Stack.Screen name="restaurant/[id]" options={{ title: 'Details' }} />
          <Stack.Screen name="rating/[id]" options={{ title: 'Rating' }}/>
        </Stack>
        <PortalHost />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
