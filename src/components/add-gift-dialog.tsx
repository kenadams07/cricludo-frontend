"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Gift } from "@/types/gift";
import { useAddEmoji, useUploadFile, useAppConfig } from "@/hooks/useAppConfig";
import { useMultipleImagePreview } from "@/hooks/useImagePreview";
import { giftIdExists } from "@/lib/gift-utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddGiftDialogProps {
  onGiftAdded?: () => void;
}

/**
 * Add Gift Dialog Component
 * Modal dialog for creating a new gift with images
 */
export function AddGiftDialog({ onGiftAdded }: AddGiftDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    price: 1000,
    coinType: "coin" as "coin" | "diamond",
  });

  const {
    imageFile,
    setImageFile,
    imagePreview,
    spritImageFile,
    setSpritImageFile,
    spritImagePreview,
    clearAll,
  } = useMultipleImagePreview();

  const { trigger: addTrigger, isMutating: isAdding } = useAddEmoji();
  const { trigger: uploadTrigger } = useUploadFile();
  const { mutate, data } = useAppConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.id.trim()) {
      toast.error("Please enter a unique ID");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image file");
      return;
    }

    if (!spritImageFile) {
      toast.error("Please select a sprite image file");
      return;
    }

    // Check for existing IDs
    const existingIds = (data?.data?.emogi || []).map((e: Gift) => e.id);
    if (giftIdExists(formData.id, existingIds)) {
      toast.error(
        `ID "${formData.id}" already exists. Please use a unique ID.`,
      );
      return;
    }

    try {
      // Upload images
      const imageRes = await uploadTrigger({ file: imageFile, type: "image" });
      const spritImageRes = await uploadTrigger({
        file: spritImageFile,
        type: "image",
      });

      // Create gift
      await addTrigger({
        id: formData.id.trim(),
        price: formData.price,
        coinType: formData.coinType,
        emogiPicUrl: imageRes.key,
        emogiSpritPicUrl: spritImageRes.key,
      });

      toast.success("Gift added successfully");
      setOpen(false);

      // Reset form
      setFormData({ id: "", price: 1000, coinType: "coin" });
      clearAll();

      mutate();
      onGiftAdded?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to add gift");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-black"
        >
          <PlusCircle className="h-4 w-4" />
          Add Gift
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Gift</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="new-id">ID * (Must be unique)</Label>
            <Input
              id="new-id"
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              required
              placeholder="e.g., gift-1"
              disabled={isAdding}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-price">Price *</Label>
              <Input
                id="new-price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
                min={0}
                disabled={isAdding}
              />
            </div>
            <div>
              <Label htmlFor="new-coinType">Coin Type *</Label>
              <Select
                value={formData.coinType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    coinType: value as "coin" | "diamond",
                  })
                }
                disabled={isAdding}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coin">Coin</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Image */}
          <div className="space-y-3">
            <Label htmlFor="new-image">Image *</Label>
            {imagePreview ? (
              <div className="space-y-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setImageFile(null)}
                >
                  Remove
                </Button>
              </div>
            ) : null}
            <Input
              id="new-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
              disabled={isAdding}
            />
          </div>

          {/* Sprite Image */}
          <div className="space-y-3">
            <Label htmlFor="new-spriteImage">Sprite Image *</Label>
            {spritImagePreview ? (
              <div className="space-y-2">
                <img
                  src={spritImagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSpritImageFile(null)}
                >
                  Remove
                </Button>
              </div>
            ) : null}
            <Input
              id="new-spriteImage"
              type="file"
              accept="image/*"
              onChange={(e) => setSpritImageFile(e.target.files?.[0] || null)}
              required
              disabled={isAdding}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Gift"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
