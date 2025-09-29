import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Restaurant } from '../interfaces/restaurant.interface';
import { CuisineType } from '@/interfaces/cuisineType.interface';
import { CuisineTypeTags } from '@/components/cuisineTypesTags';
import { SearchBar } from '@/components/searchBar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useCuisineTypes } from '@/hooks/useCuisineTypes';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const [selectedCuisinesIds, setSelectedCuisinesIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // Fetch restaurants with React Query
  const { data: restaurants = [], isLoading: restaurantsLoading } = useRestaurants({
    name: search,
    cuisineTypeIds: selectedCuisinesIds,
  });

  // Fetch cuisine types with React Query
  const { data: cuisines = [], isLoading: cuisinesLoading } = useCuisineTypes();

  const isLoading = restaurantsLoading || cuisinesLoading;

  if (isLoading) {
    return (
      <SafeAreaView className="items-center justify-center p-4">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handlePress = (cuisineType: CuisineType) => {
    setSelectedCuisinesIds(cuisineTypeIds => {
      const isSelected = cuisineTypeIds.includes(cuisineType.id);
      return isSelected
        ? cuisineTypeIds.filter(id => id !== cuisineType.id)
        : [...cuisineTypeIds, cuisineType.id];
    });
  };

  const handleSearch = () => {
    // React Query will automatically refetch when dependencies change
    // No manual fetch needed
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black justify-start" edges={['top', 'left', 'right']}>
      <View style={{ marginTop: insets.top + 26 }}>
        <CuisineTypeTags
          onPress={handlePress}
          selectedCuisinesIds={selectedCuisinesIds}
          cuisines={cuisines}
        />
      </View>
      <SearchBar
        placeholder="Restaurant"
        onChangeText={setSearch}
        onSubmit={handleSearch}
      />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        renderItem={({ item }: { item: Restaurant }) => (
          <Link href={`/restaurant/${item.id}`} asChild>
            <Pressable className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-md">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</Text>
              <Text className="text-gray-600 dark:text-gray-300 mt-1">{item.description}</Text>
              <Text className="italic text-gray-600 dark:text-gray-300 mt-1">{item?.cuisineType?.description}</Text>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}