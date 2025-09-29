// hooks/useSubmitRating.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitRating } from "@/api/rating";
import { SubmitRatingDTO } from "@/dtos/submitRating.dto";
import { Rating } from "@/interfaces/rating.interface";

export function useSubmitRating(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitRatingDTO) => submitRating(data),
    onMutate: async (newRating) => {
      await queryClient.cancelQueries({ queryKey: ["restaurant", restaurantId] });

      const previousRestaurant = queryClient.getQueryData<any>(["restaurant", restaurantId]);

      if (previousRestaurant) {
        queryClient.setQueryData(["restaurant", restaurantId], {
          ...previousRestaurant,
          ratings: [
            {
              id: `temp-${Date.now()}`, // temp id
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
        queryClient.setQueryData(["restaurant", restaurantId], context.previousRestaurant);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant", restaurantId] });
    },
  });
}
