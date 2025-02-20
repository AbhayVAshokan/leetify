import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Global overrides
Date.prototype.withoutTime = function() {
  const date = new Date(this);
  date.setHours(0, 0, 0, 0);
  return date;
};
