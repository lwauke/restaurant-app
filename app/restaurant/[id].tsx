// app/restaurant/[id].tsx
import { View, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "@/api/restaurant";
import { Text } from "@/components/ui/text";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { useSubmitRating } from "@/hooks/useSubmitRating";
import { useRestaurant } from "@/hooks/useRestaurant";

export default function RestaurantScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
    enabled: !!id,
  });

  const submitRatingMutation = useSubmitRating(id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading restaurant...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error loading restaurant.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 gap-4">
      <Text className="text-xl font-bold">{restaurant?.name}</Text>
      <Text className="text-gray-600">{restaurant?.description}</Text>

      <Text className="mt-4 text-lg font-semibold">Ratings</Text>
      <FlatList
        data={restaurant?.ratings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-2 border-b border-gray-200">
            <Rating max={5} initial={item.stars}/>
            <Text>{item.comment}</Text>
          </View>
        )}
      />

      <Button
        onPress={() => router.navigate(`/rating/${restaurant?.id}`) }
      >
        <Text>Leave 5-star Rating</Text>
      </Button>
    </View>
  );
}
