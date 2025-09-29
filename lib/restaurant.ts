import { Rating } from '@/interfaces/rating.interface';
import { sum } from './utils';

export const getRatingAverage = (rates: Rating[]) => {
  const totalStars = rates.map(({ stars }) => stars);
  if (!rates.length) {
    return 0;
  }
  if (rates.length === 1) {
    return rates[0].stars;
  }
  return sum(...totalStars) / rates.length;
};
