import { useQuery } from '@tanstack/react-query';
import { getRestaurantById, getRestaurants } from '@/api/restaurant';
import { GetRestaurantDTO } from '@/dtos/getRestaurants.dto';

export function useRestaurantByIdQuery(id: string) {
  return useQuery({
    queryKey: ['restaurantById', id],
    queryFn: () => getRestaurantById(id!),
    enabled: !!id,
  });
}

export function useRestaurantsQuery ({ name, cuisineTypeIds }: GetRestaurantDTO) {
 return useQuery({
    queryKey: ['restaurants', cuisineTypeIds, name],
    queryFn: () => getRestaurants({ name, cuisineTypeIds }),
  });
}
