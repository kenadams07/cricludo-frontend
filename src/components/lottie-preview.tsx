"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { cn } from "@/lib/utils";

type LottiePreviewProps = {
  url?: string;
  file?: File | null;
  height?: number;
  className?: string;
};

type LoadingStatus = "idle" | "loading" | "ready" | "error";

/**
 * Lottie Animation Preview Component
 * Loads and displays Lottie animation from JSON file or URL
 */
export function LottiePreview({
  url,
  file,
  height = 180,
  className,
}: LottiePreviewProps) {
  const [status, setStatus] = useState<LoadingStatus>(
    file || url ? "loading" : "idle",
  );
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAnimation = async () => {
      if (!file && !url) {
        setStatus("idle");
        setAnimationData(null);
        return;
      }

      setStatus("loading");

      try {
        let jsonString = "";

        if (file) {
          jsonString = await file.text();
        } else if (url) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch animation: ${response.status}`);
          }
          jsonString = await response.text();
        }

        const parsed = JSON.parse(jsonString);

        if (!isMounted) return;

        setAnimationData(parsed);
        setStatus("ready");
      } catch (error) {
        console.error("Failed to load animation preview", error);
        if (!isMounted) return;
        setAnimationData(null);
        setStatus("error");
      }
    };

    loadAnimation();

    return () => {
      isMounted = false;
    };
  }, [file, url]);

  if (!file && !url) {
    return (
      <div className="text-sm text-muted-foreground">
        No animation available
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="text-sm text-muted-foreground">
        Loading animation preview...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-sm text-red-500">
        Unable to load animation preview. Please ensure the JSON file is valid.
      </div>
    );
  }

  if (status !== "ready" || !animationData) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md border border-dashed border-muted-foreground/30 bg-muted/30 p-6",
        className,
      )}
      style={{ height }}
    >
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
