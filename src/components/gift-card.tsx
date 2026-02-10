"use client";

import { useState } from "react";
import { Gift } from "@/types/gift";
import { useGetFileUrl } from "@/hooks/useAppConfig";
import { getCoinTypeStyles } from "@/lib/gift-utils";
import { ImageDisplay } from "./gift-image-preview";
import { GiftDetailDialog } from "./gift-detail-dialog";
// import { GiftDetailDialog } from "./gift-detail-dialog";

interface GiftCardProps {
  gift: Gift;
}

/**
 * Gift Card Component
 * Displays gift in a card format with hover actions
 */
export function GiftCard({ gift }: GiftCardProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const { data: imageUrlData } = useGetFileUrl(gift.emogiPicUrl || "");

  return (
    <>
      <div
        onClick={() => setOpenDetail(true)}
        className="group relative cursor-pointer bg-card border rounded-lg p-4 hover:shadow-lg transition-shadow"
      >
        <div className="aspect-square mb-3 relative overflow-hidden rounded-md bg-muted">
          <ImageDisplay imageUrl={imageUrlData?.url} alt={gift.id} />
        </div>

        <div className="space-y-1">
          <div className="font-semibold text-sm">ID: {gift.id}</div>
          <div className="text-xs text-muted-foreground">
            {gift.price.toLocaleString()} {gift.coinType}
          </div>
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${getCoinTypeStyles(
              gift.coinType,
            )}`}
          >
            {gift.coinType}
          </span>
        </div>
      </div>

      <GiftDetailDialog
        gift={gift}
        open={openDetail}
        onOpenChange={setOpenDetail}
      />
    </>
  );
}
