"use client";

import { useGetFileUrl } from "@/hooks/useAppConfig";

interface ImagePreviewProps {
  s3Key: string;
  alt?: string;
  className?: string;
}

/**
 * Image Preview Component
 * Fetches and displays image from S3 key
 */
export function ImagePreview({
  s3Key,
  alt = "Gift",
  className = "w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700",
}: ImagePreviewProps) {
  const { data } = useGetFileUrl(s3Key);

  if (!data?.url) {
    return <span className="text-gray-400 text-sm">Loading...</span>;
  }

  return (
    <img
      src={data.url}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

interface ImageDisplayProps {
  imageUrl?: string;
  alt?: string;
}

/**
 * Image Display Component
 * Display image with fallback for missing images
 */
export function ImageDisplay({ imageUrl, alt = "Gift" }: ImageDisplayProps) {
  if (!imageUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        No Image
      </div>
    );
  }

  return (
    <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
  );
}
