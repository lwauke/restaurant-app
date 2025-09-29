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

export default function Screen() {
  const insets = useSafeAreaInsets();
  const [selectedCuisinesIds, setSelectedCuisinesIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: restaurants = [], isLoading: restaurantsLoading } = useRestaurantsQuery({
    name: searchQuery,
    cuisineTypeIds: selectedCuisinesIds,
  });

  const { data: cuisines = [], isLoading: cuisinesLoading } = useCuisineType();

  const isLoading = restaurantsLoading || cuisinesLoading;

  const handlePress = (cuisineType: CuisineType) => {
    setSelectedCuisinesIds(cuisineTypeIds => {
      const isSelected = cuisineTypeIds.includes(cuisineType.id);
      return isSelected
        ? cuisineTypeIds.filter(id => id !== cuisineType.id)
        : [...cuisineTypeIds, cuisineType.id];
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="items-center justify-center p-4">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

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
        onSubmit={() => setSearchQuery(search)}
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