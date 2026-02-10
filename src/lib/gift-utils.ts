/**
 * Gift utility functions and constants
 */
import { Gift } from "@/types/gift";

/**
 * Get badge styling classes based on coin type
 */
export const getCoinTypeStyles = (coinType: "coin" | "diamond") => {
  return coinType === "coin"
    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
};

/**
 * Validate gift ID for invalid patterns
 */
export const isValidGiftId = (id: string): boolean => {
  const invalidIds = new Set(["", "order", "undefined", "null"]);
  const trimmedId = String(id).trim();
  return !invalidIds.has(trimmedId);
};

/**
 * Format gift data for display
 */
export const formatGiftPrice = (price: number): string => {
  return price.toLocaleString();
};

/**
 * Validate file uploads
 */
export const validateImageFile = (file: File | null): string | null => {
  if (!file) return "Please select a file";

  const validImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  if (!validImageTypes.includes(file.type)) {
    return "Please select a valid image file (PNG, JPG, GIF)";
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return "Image size must be less than 5MB";
  }

  return null;
};

/**
 * Check if gift ID already exists in list
 */
export const giftIdExists = (newId: string, existingIds: string[]): boolean => {
  return existingIds.includes(newId.trim());
};

/**
 * Sort gifts by order
 */
export const sortGiftsByOrder = (gifts: Gift[]): Gift[] => {
  return [...gifts].sort((a, b) => (a.order || 0) - (b.order || 0));
};

/**
 * Filter valid gifts (with non-null IDs)
 */
export const filterValidGifts = (gifts: Gift[]): Gift[] => {
  return gifts.filter((item) => {
    if (!item || !item.id) return false;
    const id = String(item.id).trim();
    return isValidGiftId(id);
  });
};
