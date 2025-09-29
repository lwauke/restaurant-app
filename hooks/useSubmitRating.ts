import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitRating } from '@/api/rating';
import { SubmitRatingDTO } from '@/dtos/submitRating.dto';
import { Rating } from '@/interfaces/rating.interface';

export function useSubmitRating(restaurantId: string) {
  const queryClient = useQueryClient();
  const restaurantQueryKey = 'restaurantById';

  return useMutation({
    mutationFn: (data: SubmitRatingDTO) => submitRating(data),
    onMutate: async (newRating) => {
      await queryClient.cancelQueries({ queryKey: [restaurantQueryKey, restaurantId] });

      const previousRestaurant = queryClient.getQueryData<any>([restaurantQueryKey, restaurantId]);

      if (previousRestaurant) {
        queryClient.setQueryData([restaurantQueryKey, restaurantId], {
          ...previousRestaurant,
          ratings: [
            {
              id: `temp-${Date.now()}`,
              stars: newRating.stars,
              comment: newRating.comment,
              date: new Date().toISOString(),
            } as Rating,
            ...previousRestaurant.ratings,
          ],
        });
      }

      return { previousRestaurant };
    },
    onError: (_err, _newRating, context) => {
      if (context?.previousRestaurant) {
        queryClient.setQueryData([restaurantQueryKey, restaurantId], context.previousRestaurant);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [restaurantQueryKey, restaurantId],
      });
    },
  });
}
