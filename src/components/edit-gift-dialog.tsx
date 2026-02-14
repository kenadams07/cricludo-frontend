"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Gift, GiftFormData } from "@/types/gift";
import { useUpdateEmoji } from "@/hooks/useAppConfig";
import { mutate as globalMutate } from "swr";
import { API_URL } from "@/lib/config";
import { useMultipleImagePreview } from "@/hooks/useImagePreview";
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

interface EditGiftDialogProps {
  gift: Gift;
  onClose?: () => void;
}

/**
 * Edit Gift Dialog Component
 * Modal dialog for editing gift details including images
 */
export function EditGiftDialog({ gift, onClose }: EditGiftDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<GiftFormData>({
    price: gift.price,
    coinType: gift.coinType,
    emogiPicUrl: gift.emogiPicUrl || "",
    emogiSpritPicUrl: gift.emogiSpritPicUrl || "",
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

  const { trigger: updateTrigger, isMutating: isUpdating } = useUpdateEmoji(
    gift.id,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("price", String(formData.price));
      fd.append("coinType", formData.coinType);
      if (imageFile) fd.append("emogiPicUrl", imageFile);
      if (spritImageFile) fd.append("emogiSpritPicUrl", spritImageFile);

      if (!imageFile && formData.emogiPicUrl)
        fd.append("emogiPicUrl", formData.emogiPicUrl);
      if (!spritImageFile && formData.emogiSpritPicUrl)
        fd.append("emogiSpritPicUrl", formData.emogiSpritPicUrl);

      await updateTrigger(fd);

      toast.success("Gift updated successfully");
      setOpen(false);
      clearAll();
      globalMutate(`${API_URL}/gifts`);
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update gift");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="text-black h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Gift #{gift.id}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
                min={0}
              />
            </div>
            <div>
              <Label htmlFor="coinType">Coin Type *</Label>
              <Select
                value={formData.coinType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    coinType: value as "coin" | "diamond",
                  })
                }
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
            <Label htmlFor="image">Image</Label>
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
            ) : formData?.emogiSpritPicUrl ? (
              <div className="space-y-2">
                <img
                  src={formData?.emogiSpritPicUrl}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <p className="text-xs text-gray-500">Current image</p>
              </div>
            ) : null}
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* Sprite Image */}
          <div className="space-y-3">
            <Label htmlFor="spriteImage">Sprite Image</Label>
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
            ) : formData?.emogiSpritPicUrl ? (
              <div className="space-y-2">
                <img
                  src={formData.emogiSpritPicUrl}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <p className="text-xs text-gray-500">Current sprite image</p>
              </div>
            ) : null}
            <Input
              id="spriteImage"
              type="file"
              accept="image/*"
              onChange={(e) => setSpritImageFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Gift"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
