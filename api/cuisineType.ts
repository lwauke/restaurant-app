import { httpClient } from "./axios";

export async function getCuisineTypes() {
  const { data } = await httpClient.get("/cuisineTypes");
  return data;
}
