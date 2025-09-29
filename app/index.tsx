import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Image, type ImageStyle, View, FlatList, Pressable } from 'react-native';
import { getRestaurants } from '../api/restaurants';
import { Restaurant } from '../interfaces/restaurant';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

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

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    getRestaurants()
      .then(setRestaurants)
      .then(() => setLoading(false))
      .catch(console.log)
  }, []);

  if (loading) {
    return (
      <>
        <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
        <View className="flex-1 items-center justify-center gap-8 p-4">
          <Text>Loading</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />
        <View style={{ flex: 1, padding: 16 }}>
          <FlatList
            data={restaurants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: { item: Restaurant }) => (
              <View className="items-center">
                <Link href={`/restaurant/${item.id}`} asChild>
                  <Pressable>
                    <Text className="text-lg font-bold">{item.name}</Text>
                  </Pressable>
                </Link>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

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
