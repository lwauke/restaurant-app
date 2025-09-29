import { View, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Rating } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';
import { useRestaurantByIdQuery } from '@/hooks/useRestaurant';

export default function RestaurantScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: restaurant, isLoading, error } = useRestaurantByIdQuery(id);

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
    <View className="flex-1 gap-4 p-4">
      <Text className="text-xl font-bold">{restaurant?.name}</Text>
      <Text>{restaurant?.description}</Text>
      <Button onPress={() => router.navigate(`/rating/${restaurant?.id}`)}>
        <Text>Leave Rating</Text>
      </Button>
      <Text className="mt-4 text-lg font-semibold">Ratings</Text>
      <FlatList
        data={restaurant?.ratings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="border-b border-gray-200 p-2">
            <Rating max={5} initial={item.stars} />
            <Text>{item.comment}</Text>
          </View>
        )}
      />
    </View>
  );
}
