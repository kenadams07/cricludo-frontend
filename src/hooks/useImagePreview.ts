import { useEffect, useState } from "react";

export interface ImagePreviewState {
  preview: string | null;
  file: File | null;
}

/**
 * Custom hook for handling image file reading and preview generation
 * @param file - The image file to preview
 * @returns Object containing preview data URL and file state
 */
export function useImagePreview(file: File | null) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return { preview, file };
}

/**
 * Custom hook for handling multiple image uploads
 * Manages state for both main image and sprite image
 */
export function useMultipleImagePreview() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [spritImageFile, setSpritImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [spritImagePreview, setSpritImagePreview] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  useEffect(() => {
    if (spritImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSpritImagePreview(reader.result as string);
      };
      reader.readAsDataURL(spritImageFile);
    } else {
      setSpritImagePreview(null);
    }
  }, [spritImageFile]);

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const clearSpriteImage = () => {
    setSpritImageFile(null);
    setSpritImagePreview(null);
  };

  const clearAll = () => {
    clearImage();
    clearSpriteImage();
  };

  return {
    imageFile,
    setImageFile,
    imagePreview,
    spritImageFile,
    setSpritImageFile,
    spritImagePreview,
    clearImage,
    clearSpriteImage,
    clearAll,
  };
}
