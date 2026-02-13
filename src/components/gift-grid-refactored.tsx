"use client";

import { useMemo } from "react";
import { Gift } from "@/types/gift";
import { filterValidGifts, sortGiftsByOrder } from "@/lib/gift-utils";
import { GiftCard } from "./gift-card";

interface GiftGridProps {
  data: Gift[];
}

/**
 * Gift Grid Component
 * Displays gifts in a responsive grid with sorting and filtering
 */
export function GiftGrid({ data }: GiftGridProps) {
  const sortedData = useMemo(() => {
    const validData = filterValidGifts(data);
    return sortGiftsByOrder(validData);
  }, [data]);

  if (sortedData.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No gifts yet. Click "Add Gift" to create your first one.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {sortedData.map((gift) => (
        <GiftCard key={String(gift._id)} gift={gift} />
      ))}
    </div>
  );
}
