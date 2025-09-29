import { getRatingAverage } from "@/lib/restaurant";
import { Rating } from "../interfaces/rating.interface";
import { Restaurant } from "../interfaces/restaurant.interface";
import { httpClient } from "./axios";
import qs from 'qs';
import { GetRestaurantDTO } from "@/dtos/getRestaurants.dto";

export const getRestaurants = async ({name, cuisineTypeId}: GetRestaurantDTO) => {
  const { data } = await httpClient.get<Restaurant[]>(
    "/restaurants?_expand=cuisineType",
    {
      params: {
        name_like: name,
        cuisineTypeId 
      },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets'})
    }
  );
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
