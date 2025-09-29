import { useQuery } from '@tanstack/react-query';
import { getCuisineTypes } from '@/api/cuisineType';

export function useCuisineType() {
  return useQuery({
    queryKey: ['cuisineType'],
    queryFn: () => getCuisineTypes(),
  });
}
