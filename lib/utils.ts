import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sum = (...numbers: number[]): number =>
  numbers.reduce((acc, n) => acc + n, 0);
