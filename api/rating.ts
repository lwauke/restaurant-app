import { SubmitRatingDTO } from "@/dtos/submitRating.dto";
import { httpClient } from "./axios";

export async function submitRating({
  restaurantId,
  stars,
  comment
}: SubmitRatingDTO) {
    const { data } = await httpClient.post("/ratings", {
      stars,
      comment,
      restaurantId,
      date: new Date().toISOString()
    });
    return data;
}
