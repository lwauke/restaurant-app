import { CuisineType } from "./cuisineType.interface";
import { Rating } from "./rating.interface";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisineType?: CuisineType;
  ratings?: Rating[];
  ratingAverage?: number;
}
