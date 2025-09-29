export interface Rating {
  id: string;
  stars: number;
  restaurantId: number;
  date: string;
  comment?: string;
}
