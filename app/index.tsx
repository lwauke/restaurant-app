import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Restaurant } from '../interfaces/restaurant.interface';
import { CuisineType } from '@/interfaces/cuisineType.interface';
import { CuisineTypeTags } from '@/components/cuisineTypesTags';
import { SearchBar } from '@/components/searchBar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRestaurantsQuery } from '@/hooks/useRestaurant';
import { useCuisineType } from '@/hooks/useCuisineType';
import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from 'react-native'
import { focusManager } from '@tanstack/react-query'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export default function Screen() {
  const insets = useSafeAreaInsets();
  const [selectedCuisinesIds, setSelectedCuisinesIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: restaurants = [], isLoading: restaurantsLoading } = useRestaurantsQuery({
    name: searchQuery,
    cuisineTypeIds: selectedCuisinesIds,
  });
  const { data: cuisines = [], isLoading: cuisinesLoading, error: cuisinesError } = useCuisineType();

  const handlePress = (cuisineType: CuisineType) => {
    setSelectedCuisinesIds((cuisineTypeIds) => {
      const isSelected = cuisineTypeIds.includes(cuisineType.id);
      return isSelected
        ? cuisineTypeIds.filter((id) => id !== cuisineType.id)
        : [...cuisineTypeIds, cuisineType.id];
    });
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaView
      className="flex-1 justify-start bg-white dark:bg-black"
      edges={['top', 'left', 'right']}>
      <View style={{ marginTop: insets.top + 26 }}>
        <CuisineTypeTags
          onPress={handlePress}
          selectedCuisinesIds={selectedCuisinesIds}
          cuisines={cuisines}
          error={cuisinesError}
          loading={cuisinesLoading}
        />
      </View>
      <SearchBar
        placeholder="Restaurant"
        onChangeText={setSearch}
        onSubmit={() => setSearchQuery(search)}
      />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        renderItem={({ item }: { item: Restaurant }) => (
          <Link href={`/restaurant/${item.id}`} asChild>
            <Pressable className="mb-4 rounded-xl bg-gray-100 p-4 shadow-md dark:bg-gray-800">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</Text>
              <Text className="mt-1 text-gray-600 dark:text-gray-300">{item.description}</Text>
              <Text className="mt-1 italic text-gray-600 dark:text-gray-300">
                {item?.cuisineType?.description}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
