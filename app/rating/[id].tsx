import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Rating } from '@/components/ui/rating';
import { Textarea } from '@/components/ui/textarea';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { useSubmitRating } from '@/hooks/useSubmitRating';

export default function RatingScreen() {
  const { id, restaurantName } = useLocalSearchParams<{ id: string; restaurantName: string }>();
  const [ratingStars, setRatingStars] = useState(5);
  const [comment, setComment] = useState('');
  const router = useRouter();

  const { mutate, isPending } = useSubmitRating(id!);

  const handleSubmit = () => {
    mutate(
      {
        restaurantId: id!,
        stars: ratingStars,
        comment,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <Text className="text-lg font-medium text-gray-900 dark:text-white">
        How many stars does {restaurantName} deserve?
      </Text>

      <Rating max={5} initial={ratingStars} onChange={setRatingStars} />

      <Textarea placeholder="Leave a comment" onChangeText={setComment} value={comment} />

      <Button onPress={handleSubmit} disabled={isPending} className="w-full justify-center">
        <Text className="text-center text-white dark:text-black">
          {isPending ? 'Submitting...' : 'Submit'}
        </Text>
      </Button>
    </View>
  );
}
