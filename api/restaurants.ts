import { getRatingAverage } from "@/lib/restaurant";
import { Rating } from "../interfaces/rating";
import { Restaurant } from "../interfaces/restaurant";
import { httpClient } from "./axios";

export const getRestaurants = async () => {
  const { data } = await httpClient
    .get<Restaurant[]>("/restaurants?_embed=cuisineType");
  return data;
}

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const { data } = await httpClient
    .get<Restaurant>(`/restaurants/${id}?_embed=ratings&_embed=cuisineType`);
  return {
    ...data,
    ratingAverage: getRatingAverage(data.ratings ?? [])
  };
}
