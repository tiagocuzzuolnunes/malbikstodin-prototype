import { clsx, type ClassValue } from 'clsx'

/** Merge class names for UI components. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
