import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GenericObject } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkIfObjectIsEmpty(obj: object) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getTimeDiffrenceFromDate(date: string) {
  const now = new Date();
  const postDate = new Date(date);
  const diff = now.getTime() - postDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
  const diffHours = Math.ceil(diff / (1000 * 3600)) - 1;
  const diffMinutes = Math.ceil(diff / (1000 * 60)) - 1;
  const diffSeconds = Math.ceil(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays}d`;
  } else if (diffHours > 0) {
    return `${diffHours}h`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes}m`;
  } else if (diffSeconds > 0) {
    return `${diffSeconds}s`;
  } else {
    return "now";
  }
}

export const convertUrlParamsIntoURLString = (queryParams: GenericObject) => {
  return Object.keys(queryParams)
    .map((key) => {
      const value = queryParams[key];
      if (typeof value === "boolean") {
        return `${key}=${value}`;
      } else {
        return `${key}=${encodeURIComponent(JSON.stringify(value))}`;
      }
    })
    .join("&");
};
