import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Image, type ImageStyle, View, FlatList, Pressable, SafeAreaView } from 'react-native';
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
      .catch(console.log);
  }, []);

  if (loading) {
    return (
      <>
        <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
        <SafeAreaView className="flex-1 items-center justify-center p-4">
          <Text>Loading...</Text>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
      <SafeAreaView className="flex-1 bg-white dark:bg-black">
        <View className="items-center py-4">
          <Image
            source={LOGO[colorScheme ?? 'light']}
            style={IMAGE_STYLE}
            resizeMode="contain"
          />
        </View>

        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
          renderItem={({ item }: { item: Restaurant }) => (
            <Link href={`/restaurant/${item.id}`} asChild>
              <Pressable className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-md">
                <Text className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</Text>
                <Text className="text-gray-600 dark:text-gray-300 mt-1">{item.description}</Text>
              </Pressable>
            </Link>
          )}
        />
      </SafeAreaView>
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
      className="rounded-full web:mx-4"
    >
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
