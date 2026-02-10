"use client";

import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Gift } from "@/types/gift";
import { useDeleteEmoji, useAppConfig } from "@/hooks/useAppConfig";
import { Button } from "@/components/ui/button";
import { EditGiftDialog } from "./edit-gift-dialog";

interface GiftActionsProps {
  gift: Gift;
}

/**
 * Gift Actions Component
 * Provides edit and delete actions for a gift
 */
export function GiftActions({ gift }: GiftActionsProps) {
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
    } catch (error: any) {
      toast.error(error.message || "Failed to delete gift");
    }
  };

  return (
    <div className="flex gap-2">
      <EditGiftDialog gift={gift} />
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
