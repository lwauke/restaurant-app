import { useState } from "react";
import { View } from "react-native";
import { CuisineType } from "@/interfaces/cuisineType.interface";
import { CuisineTypeTags } from "@/components/cuisineTypesTags";
import { SearchBar } from "@/components/searchBar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRestaurantsQuery } from "@/hooks/useRestaurant";
import { useCuisineType } from "@/hooks/useCuisineType";
import { RestaurantsList } from "@/components/restaurantsList";

export default function Screen() {
  const insets = useSafeAreaInsets();
  const [selectedCuisinesIds, setSelectedCuisinesIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: restaurants = [],
    isLoading: restaurantsLoading,
    error: restaurantsError,
  } = useRestaurantsQuery({
    name: searchQuery,
    cuisineTypeIds: selectedCuisinesIds,
  });
  const {
    data: cuisines = [],
    isLoading: cuisinesLoading,
    error: cuisinesError,
  } = useCuisineType();

  const handlePress = (cuisineType: CuisineType) => {
    setSelectedCuisinesIds((cuisineTypeIds) => {
      const isSelected = cuisineTypeIds.includes(cuisineType.id);
      return isSelected
        ? cuisineTypeIds.filter((id) => id !== cuisineType.id)
        : [...cuisineTypeIds, cuisineType.id];
    });
  };

  return (
    <SafeAreaView
      className="flex-1 justify-start bg-white dark:bg-black"
      edges={["top", "left", "right"]}>
      {/* todo fix this height */}
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
      <RestaurantsList
        restaurants={restaurants}
        loading={restaurantsLoading}
        error={restaurantsError}
      />
    </SafeAreaView>
  );
}
