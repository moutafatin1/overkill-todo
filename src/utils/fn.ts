import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const fn = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};
