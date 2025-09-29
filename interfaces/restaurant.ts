import { CuisineType } from "./cuisineType";
import { Rating } from "./rating";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisineType?: CuisineType;
  ratings?: Rating[];
  ratingAverage?: number;
}