import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Link, Stack, useRouter } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { FlatList, ScrollViewBase, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Restaurant } from '../../interfaces/restaurant';
import { getRestaurantById } from '../../api/restaurants';
import { useRoute } from '@react-navigation/native';
import { Rating } from '@/interfaces/rating';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_OPTIONS = {
  light: {
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ThemeToggle />,
  },
};

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    getRestaurantById(id as string)
      .then(setRestaurant)
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
        <View className="flex-1 items-center justify-center gap-8 p-4">
          <Text>loading...</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          ...SCREEN_OPTIONS[colorScheme ?? 'light'],
          headerTitle: restaurant?.name
        }}
      />
      <SafeAreaView>
        <FlatList
          data={restaurant?.ratings || []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          ListHeaderComponent={() => (
            <View className="mb-6 mt-14">
              <Text className="mb-2 text-gray-700 dark:text-gray-300">
                {restaurant?.description}
              </Text>
              <Text className="mb-2 italic text-gray-500 dark:text-gray-400">
                Cuisine: {restaurant?.cuisineType?.description}
              </Text>
              <Text className="mb-4 font-semibold text-gray-900 dark:text-white">
                Rating: {restaurant?.ratingAverage?.toFixed(2)}
              </Text>
              <Button
                onPress={() => router.navigate(`/rating/${id}?restaurantName=${restaurant?.name}`)}
                className="mb-4 w-full justify-center"
              >
                <Text className="text-white dark:text-black text-center">Rate Restaurant</Text>
              </Button>
            </View>
          )}
          renderItem={({ item }: { item: Rating }) => (
            <View className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-3 shadow">
              <Text className="font-semibold text-gray-900 dark:text-white">
                ⭐ {item.stars} — {item.date.split('T')[0]}
              </Text>
              <Text className="text-gray-700 dark:text-gray-300 mt-1">{item.comment}</Text>
            </View>
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
    <Text>

    </Text>
  );
}
