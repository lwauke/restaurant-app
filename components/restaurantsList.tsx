import { Restaurant } from "@/interfaces/restaurant.interface";
import { Link } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { Text } from "./ui/text";

interface RestaurantsListProps {
  restaurants: Restaurant[];
  loading: boolean;
  error: Error | null;
}

export function RestaurantsList({ restaurants, loading, error }: RestaurantsListProps) {
  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Could not fetch restaurants</Text>;
  }

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      renderItem={({ item }: { item: Restaurant }) => (
        <Link href={`/restaurant/${item.id}`} asChild>
          <Pressable className="mb-4 rounded-xl bg-gray-100 p-4 shadow-md dark:bg-gray-800">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</Text>
            <View className="text-gray-600 dark:text-gray-300">
              <Text className="mt-1">{item.description}</Text>
              <Text className="mt-1 italic">{item?.cuisineType?.description}</Text>
            </View>
          </Pressable>
        </Link>
      )}
    />
  );
}
