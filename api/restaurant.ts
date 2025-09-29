import { getRatingAverage } from "@/lib/restaurant";
import { Restaurant } from "../interfaces/restaurant.interface";
import { httpClient } from "./axios";
import { GetRestaurantDTO } from "@/dtos/getRestaurants.dto";


export async function getRestaurants({ name, cuisineTypeIds }: GetRestaurantDTO) {
  const params: Record<string, string | string[]> = {
    _expand: 'cuisineType',
  };
  if (name) params.name_like = name;
  if (cuisineTypeIds?.length) params[`cuisineTypeId`] = cuisineTypeIds
  const { data } = await httpClient.get('/restaurants', { params });
  return data;
}

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const { data } = await httpClient
    .get<Restaurant>(`/restaurants/${id}?_embed=ratings&_expand=cuisineType`);
  return {
    ...data,
    ratingAverage: getRatingAverage(data.ratings ?? [])
  };
}
