import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Title-cases each word, but leaves words that are already all-uppercase
// (acronyms like "QA", "BMW", "SUV") untouched instead of lowercasing them.
export function toTitleCase(str) {
  if (typeof str !== "string") return str;
  return str.replace(/\w\S*/g, (word) => {
    if (word === word.toUpperCase() && word.length > 1) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}
