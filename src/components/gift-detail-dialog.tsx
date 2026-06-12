"use client";

import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Gift } from "@/types/gift";
import {
  useDeleteEmoji,
  useGetFileUrl,
  useAppConfig,
} from "@/hooks/useAppConfig";
import { getCoinTypeStyles, formatGiftPrice } from "@/lib/gift-utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { EditGiftDialog } from "./edit-gift-dialog";

interface GiftDetailDialogProps {
  gift: Gift;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Gift Detail Dialog Component
 * Displays comprehensive gift information in a modal
 */
export function GiftDetailDialog({
  gift,
  open,
  onOpenChange,
}: GiftDetailDialogProps) {
  const { data: imageUrlData } = useGetFileUrl(gift.emogiPicUrl || "");
  const { data: spritImageUrlData } = useGetFileUrl(
    gift.emogiSpritPicUrl || "",
  );
  const { trigger: deleteTrigger, isMutating: isDeleting } = useDeleteEmoji(
    gift.id,
  );
  const { mutate } = useAppConfig();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete gift ${gift.id}?`)) {
      return;
    }

    try {
      await deleteTrigger();
      toast.success("Gift deleted successfully");
      mutate();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete gift");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Gift Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                ID
              </Label>
              <div className="mt-1 font-semibold">{gift.id}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Price
              </Label>
              <div className="mt-1 font-semibold">
                {formatGiftPrice(gift.price)}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Coin Type
              </Label>
              <div className="mt-1">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getCoinTypeStyles(
                    gift.coinType,
                  )}`}
                >
                  {gift.coinType}
                </span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Created At
              </Label>
              <div className="mt-1 text-sm">
                {format(new Date(gift.createdAt), "yyyy-MM-dd HH:mm")}
              </div>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Image
              </Label>
              <div className="mt-2">
                {imageUrlData?.url ? (
                  <img
                    src={imageUrlData.url}
                    alt={gift.id}
                    className="w-full max-w-xs h-auto rounded-lg border"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Sprite Image
              </Label>
              <div className="mt-2">
                {spritImageUrlData?.url ? (
                  <img
                    src={spritImageUrlData.url}
                    alt={gift.id}
                    className="w-full max-w-xs h-auto rounded-lg border"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No sprite image available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <EditGiftDialog gift={gift} onClose={() => onOpenChange(false)} />
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
