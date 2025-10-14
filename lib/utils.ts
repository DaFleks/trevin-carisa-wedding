import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithLoading(handleIsLoading: () => void, input: string, init?: RequestInit | undefined) {
  handleIsLoading();
  const response = await fetch(input, init);
  const data = await response.json();
  handleIsLoading();
  return data;
}
