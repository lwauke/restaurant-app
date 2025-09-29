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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export {
  ErrorBoundary,
} from 'expo-router';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

const queryClient = new QueryClient();

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="rounded-full web:mx-4"
    >
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

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack.Screen name="index" options={options} />
          <Stack.Screen name="restaurant" options={ options }/>
          <Stack.Screen name="rating" options={options}/>
        </Stack>
        <PortalHost />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
