import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=1";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEBOUNCE_DELAY = 300;

// NOTE Accepts array of elements for the function to debounce
export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
