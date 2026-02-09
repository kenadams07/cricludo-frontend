"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { DataTable } from "@/components/data-table";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, Save, Settings } from "lucide-react";
import {
  useAppConfig,
  useAddEmoji,
  useUpdateEmoji,
  useDeleteEmoji,
  useUploadFile,
  useGetFileUrl,
  useUpdateAppConfig,
} from "@/hooks/useAppConfig";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  id: z.string(),
  _id: z.string(),
  price: z.number(),
  coinType: z.enum(["coin", "diamond"]),
  emogiPicUrl: z.string().optional(),
  // emogiAnimationUrl: z.string().optional(),
  emogiSpritPicUrl: z.string().optional(),
  order: z.number().optional(),
  createdAt: z.string(),
});

type Emoji = z.infer<typeof schema>;

const columns: ColumnDef<Emoji>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.original.price.toLocaleString()}</div>
      );
    },
  },
  {
    accessorKey: "coinType",
    header: "Coin Type",
    cell: ({ row }) => {
      const type = row.original.coinType;
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            type === "coin"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
          }`}
        >
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "emogiPicUrl",
    header: "Image",
    cell: ({ row }) => {
      const key = row.original.emogiPicUrl;
      if (!key) return <span className="text-gray-400">No image</span>;
      return <ImagePreview key={key} s3Key={key} />;
    },
  },
  {
    accessorKey: "emogiSpritPicUrl",
    header: "Sprit Image",
    cell: ({ row }) => {
      const key = row.original.emogiSpritPicUrl;
      if (!key) return <span className="text-gray-400">No sprit image</span>;
      return <ImagePreview key={key} s3Key={key} />;
    },
  },
  // {
  //   accessorKey: "emogiAnimationUrl",
  //   header: "Animation",
  //   cell: ({ row }) => {
  //     const key = row.original.emogiAnimationUrl;
  //     if (!key) return <span className="text-gray-400">No animation</span>;
  //     return (
  //       <span className="text-sm text-blue-600 dark:text-blue-400">
  //         {key.split("/").pop()}
  //       </span>
  //     );
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <div className="text-sm">{format(date, "yyyy-MM-dd HH:mm")}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const emoji = row.original;
      return <EmojiActions emoji={emoji} />;
    },
  },
];

function EmojiCard({ emoji }: { emoji: Emoji }) {
  const [openDetail, setOpenDetail] = useState(false);
  console.log("emoji======>", emoji);
  const { data: imageUrlData } = useGetFileUrl(emoji.emogiPicUrl || "");

  return (
    <>
      <div
        onClick={() => setOpenDetail(true)}
        className="group relative cursor-pointer bg-card border rounded-lg p-4 hover:shadow-lg transition-shadow"
      >
        <div className="aspect-square mb-3 relative overflow-hidden rounded-md bg-muted">
          {imageUrlData?.url ? (
            <img
              src={imageUrlData.url}
              alt={emoji.id}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-sm">ID: {emoji.id}</div>
          <div className="text-xs text-muted-foreground">
            {emoji.price.toLocaleString()} {emoji.coinType}
          </div>
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              emoji.coinType === "coin"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
          >
            {emoji.coinType}
          </span>
        </div>
      </div>

      <EmojiDetailDialog
        emoji={emoji}
        open={openDetail}
        onOpenChange={setOpenDetail}
      />
    </>
  );
}

function EmojiGrid({ data }: { data: Emoji[] }) {
  const sortedData = useMemo(() => {
    const validData = data.filter((item) => {
      if (!item || !item.id) return false;
      const id = String(item.id).trim();
      return id !== "" && id !== "undefined" && id !== "null";
    });
    return [...validData].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [data]);

  if (sortedData.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No emojis yet. Click "Add Emoji" to create your first one.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {sortedData.map((emoji) => (
        <EmojiCard key={String(emoji._id)} emoji={emoji} />
      ))}
    </div>
  );
}

function EmojiDetailDialog({
  emoji,
  open,
  onOpenChange,
}: {
  emoji: Emoji;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: imageUrlData } = useGetFileUrl(emoji.emogiPicUrl || "");
  // const { data: animationUrlData } = useGetFileUrl(
  //   emoji.emogiAnimationUrl || "",
  // );
  console.log("emoji.emogiSpritPicUrl", emoji.emogiSpritPicUrl);
  const { data: spritImageUrlData } = useGetFileUrl(
    emoji.emogiSpritPicUrl || "",
  );
  const { trigger: deleteTrigger, isMutating: isDeleting } = useDeleteEmoji(
    emoji.id,
  );
  const { mutate } = useAppConfig();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete emoji ${emoji.id}?`)) {
      return;
    }

    try {
      await deleteTrigger();
      toast.success("Emoji deleted successfully");
      mutate();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete emoji");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Emoji Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                ID
              </Label>
              <div className="mt-1 font-semibold">{emoji.id}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Price
              </Label>
              <div className="mt-1 font-semibold">
                {emoji.price.toLocaleString()}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Coin Type
              </Label>
              <div className="mt-1">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    emoji.coinType === "coin"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {emoji.coinType}
                </span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Created At
              </Label>
              <div className="mt-1 text-sm">
                {format(new Date(emoji.createdAt), "yyyy-MM-dd HH:mm")}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Image
              </Label>
              <div className="mt-2">
                {imageUrlData?.url ? (
                  <img
                    src={imageUrlData.url}
                    alt={emoji.id}
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
                Sprit Image
              </Label>
              <div className="mt-2">
                {spritImageUrlData?.url ? (
                  <img
                    src={spritImageUrlData.url}
                    alt={emoji.id}
                    className="w-full max-w-xs h-auto rounded-lg border"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No Sprit image available
                  </div>
                )}
              </div>
            </div>

            {/* <div className="md:pl-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Animation
              </Label>
              <div className="mt-2 flex flex-col items-start md:items-end space-y-2">
                {animationUrlData?.url ? (
                  <>
                    <LottiePreview
                      url={animationUrlData.url}
                      height={300}
                      className="w-full max-w-[300px]"
                    />
                    <div className="text-xs text-muted-foreground text-right w-full">
                      {emoji.emogiAnimationUrl?.split("/").pop() ||
                        "Animation file"}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No animation file
                  </div>
                )}
              </div>
            </div> */}
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t">
            <EditEmojiDialog
              emoji={emoji}
              onClose={() => onOpenChange(false)}
            />
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

function ImagePreview({ s3Key }: { s3Key: string }) {
  const { data } = useGetFileUrl(s3Key);

  if (!data?.url) {
    return <span className="text-gray-400 text-sm">Loading...</span>;
  }

  return (
    <img
      src={data.url}
      alt="Emoji"
      className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

type LottiePreviewProps = {
  url?: string;
  file?: File | null;
  height?: number;
  className?: string;
};

function LottiePreview({
  url,
  file,
  height = 180,
  className,
}: LottiePreviewProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
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

function EmojiActions({ emoji }: { emoji: Emoji }) {
  const { trigger: deleteTrigger, isMutating: isDeleting } = useDeleteEmoji(
    emoji.id,
  );
  const { mutate } = useAppConfig();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete emoji ${emoji.id}?`)) {
      return;
    }

    try {
      await deleteTrigger();
      toast.success("Emoji deleted successfully");
      mutate();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete emoji");
    }
  };

  return (
    <div className="flex gap-2">
      <EditEmojiDialog emoji={emoji} />
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

function EditEmojiDialog({
  emoji,
  onClose,
}: {
  emoji: Emoji;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    price: emoji.price,
    coinType: emoji.coinType,
    emogiPicUrl: emoji.emogiPicUrl || "",
    // emogiAnimationUrl: emoji.emogiAnimationUrl || "",
    emogiSpritPicUrl: emoji.emogiSpritPicUrl || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  // const [animationFile, setAnimationFile] = useState<File | null>(null);
  const [spritImageFile, setSpritImageFile] = useState<File | null>(null);
  const [spritImagePreview, setSpritImagePreview] = useState<string | null>(
    null,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { trigger: updateTrigger, isMutating: isUpdating } = useUpdateEmoji(
    emoji.id,
  );
  const { trigger: uploadTrigger } = useUploadFile();
  const { mutate } = useAppConfig();
  const { data: imageUrlData } = useGetFileUrl(formData.emogiPicUrl || "");
  const { data: spritImageUrlData } = useGetFileUrl(
    formData.emogiSpritPicUrl || "",
  );
  /* const { data: animationUrlData } = useGetFileUrl( !animationFile && formData.emogiAnimationUrl ? formData.emogiAnimationUrl
       : "",
   ); */

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
    if (spritImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSpritImagePreview(reader.result as string);
      };
      reader.readAsDataURL(spritImageFile);
    } else {
      setSpritImagePreview(null);
    }
  }, [imageFile, spritImageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageKey = formData.emogiPicUrl;
      // let animationKey = formData.emogiAnimationUrl;

      let spritImageKey = formData.emogiSpritPicUrl;
      if (imageFile) {
        const imageRes = await uploadTrigger({
          file: imageFile,
          type: "image",
        });
        imageKey = imageRes.key;
      }

      // if (animationFile) {
      //   const animationRes = await uploadTrigger({
      //     file: animationFile,
      //     type: "animation",
      //   });
      //   animationKey = animationRes.key;
      // }
      if (spritImageFile) {
        const spritImageRes = await uploadTrigger({
          file: spritImageFile,
          type: "image",
        });
        spritImageKey = spritImageRes.key;
      }

      await updateTrigger({
        price: formData.price,
        coinType: formData.coinType,
        emogiPicUrl: imageKey,
        // emogiAnimationUrl: animationKey,
        emogiSpritPicUrl: spritImageKey,
      });

      toast.success("Emoji updated successfully");
      setOpen(false);
      setImageFile(null);
      // setAnimationFile(null);
      setImagePreview(null);
      setSpritImageFile(null);
      setSpritImagePreview(null);
      mutate();
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update emoji");
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
          <DialogTitle className="text-xl">Edit Emoji #{emoji.id}</DialogTitle>
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

          <div className="space-y-3">
            <Label htmlFor="image">IImage</Label>
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
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : imageUrlData?.url ? (
              <div className="space-y-2">
                <img
                  src={imageUrlData.url}
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
          <div className="space-y-3">
            <Label htmlFor="image">Sprit Image</Label>
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
                  onClick={() => {
                    // setImageFile(null);
                    setSpritImageFile(null);
                    setSpritImagePreview(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : spritImageUrlData?.url ? (
              <div className="space-y-2">
                <img
                  src={spritImageUrlData.url}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <p className="text-xs text-gray-500">Current Sprit image</p>
              </div>
            ) : null}
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setSpritImageFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* <div className="space-y-3">
            <Label htmlFor="animation">Animation (JSON)</Label>
            <Input
              id="animation"
              type="file"
              accept=".json"
              onChange={(e) => setAnimationFile(e.target.files?.[0] || null)}
            />
            <div className="space-y-2">
              <LottiePreview
                file={animationFile}
                url={!animationFile ? animationUrlData?.url : undefined}
                height={150}
                className="w-full max-w-[200px]"
              />
              {formData.emogiAnimationUrl && !animationFile && (
                <p className="text-xs text-gray-500">
                  Current: {formData.emogiAnimationUrl.split("/").pop()}
                </p>
              )}
            </div>
          </div> */}

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Emoji"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AddEmojiDialog({ onEmojiAdded }: { onEmojiAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    price: 1000,
    coinType: "coin" as "coin" | "diamond",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  // const [animationFile, setAnimationFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [spritImageFile, setSpritImageFile] = useState<File | null>(null);
  const [spritImagePreview, setSpritImagePreview] = useState<string | null>(
    null,
  );

  const { trigger: addTrigger, isMutating: isAdding } = useAddEmoji();
  const { trigger: uploadTrigger } = useUploadFile();
  const { mutate, data } = useAppConfig();

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
    if (spritImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSpritImagePreview(reader.result as string);
      };
      reader.readAsDataURL(spritImageFile);
    } else {
      setSpritImagePreview(null);
    }
  }, [imageFile, spritImageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id.trim()) {
      toast.error("Please enter a unique ID");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image file");
      return;
    }

    if (!spritImageFile) {
      toast.error("Please select a sprit image file");
      return;
    }

    const existingIds = (data?.data?.emogi || []).map((e: Emoji) => e.id);
    if (existingIds.includes(formData.id)) {
      toast.error(
        `ID "${formData.id}" already exists. Please use a unique ID.`,
      );
      return;
    }

    try {
      const imageRes = await uploadTrigger({ file: imageFile, type: "image" });
      const spritImageRes = await uploadTrigger({
        file: spritImageFile,
        type: "image",
      });

      // let animationKey = "";
      // if (animationFile) {
      //   const animationRes = await uploadTrigger({
      //     file: animationFile,
      //     type: "animation",
      //   });
      //   animationKey = animationRes.key;
      // }

      await addTrigger({
        id: formData.id.trim(),
        price: formData.price,
        coinType: formData.coinType,
        emogiPicUrl: imageRes.key,
        // emogiAnimationUrl: animationKey,
        emogiSpritPicUrl: spritImageRes.key,
      });

      toast.success("Emoji added successfully");
      setOpen(false);
      setFormData({ id: "", price: 1000, coinType: "coin" });
      setImageFile(null);
      // setAnimationFile(null);
      setSpritImageFile(null);
      setImagePreview(null);
      setSpritImagePreview(null);
      mutate();
      onEmojiAdded();
    } catch (error: any) {
      toast.error(error.message || "Failed to add emoji");
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
          Add Emoji
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Emoji</DialogTitle>
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
              placeholder="e.g., emoji-1"
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

          <div className="space-y-3">
            <Label htmlFor="new-image">Icon Image *</Label>
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Upload an image to preview it here.
              </p>
            )}
            <Input
              id="new-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
              disabled={isAdding}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="new-image">Sprit Image *</Label>
            {spritImagePreview ? (
              <div>
                <img
                  src={spritImagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Upload an image to preview it here.
              </p>
            )}
            <Input
              id="new-image"
              type="file"
              accept="image/*"
              onChange={(e) => setSpritImageFile(e.target.files?.[0] || null)}
              required
              disabled={isAdding}
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="new-animation">Animation (JSON)</Label>
            <Input
              id="new-animation"
              type="file"
              accept=".json"
              onChange={(e) => setAnimationFile(e.target.files?.[0] || null)}
              disabled={isAdding}
            />
            <LottiePreview
              file={animationFile}
              height={150}
              className="w-full max-w-[200px]"
            />
          </div> */}

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Emoji"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function GeneralSettings({
  config,
  onUpdate,
}: {
  config: any;
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState({
    appName: config?.appName || "",
    version: config?.version || "",
    maintenanceMode: config?.maintenanceMode || false,
    guestAllowed: config?.guestAllowed || false,
    freeUpdate: config?.freeUpdate || false,
    freeCoin: config?.freeCoin || false,
    initialCons: config?.initialCons || 0,
  });

  const { trigger: updateTrigger, isMutating } = useUpdateAppConfig();
  const { mutate } = useAppConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTrigger(formData);
      toast.success("General settings updated successfully");
      mutate();
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Basic app configuration settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appName">App Name</Label>
              <Input
                id="appName"
                value={formData.appName}
                onChange={(e) =>
                  setFormData({ ...formData, appName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="initialCons">Initial Cons</Label>
            <Input
              id="initialCons"
              type="number"
              value={formData.initialCons}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  initialCons: Number(e.target.value),
                })
              }
              min={0}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="maintenanceMode"
                checked={formData.maintenanceMode}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    maintenanceMode: checked as boolean,
                  })
                }
              />
              <Label htmlFor="maintenanceMode" className="cursor-pointer">
                Maintenance Mode
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="guestAllowed"
                checked={formData.guestAllowed}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, guestAllowed: checked as boolean })
                }
              />
              <Label htmlFor="guestAllowed" className="cursor-pointer">
                Guest Allowed
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="freeUpdate"
                checked={formData.freeUpdate}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, freeUpdate: checked as boolean })
                }
              />
              <Label htmlFor="freeUpdate" className="cursor-pointer">
                Free Update
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="freeCoin"
                checked={formData.freeCoin}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, freeCoin: checked as boolean })
                }
              />
              <Label htmlFor="freeCoin" className="cursor-pointer">
                Free Coin
              </Label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isMutating}>
              <Save className="h-4 w-4 mr-2" />
              {isMutating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function BonusSettings({
  config,
  onUpdate,
}: {
  config: any;
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState({
    dailyBonusCons: config?.dailyBonusCons || 0,
    dailyBonusIntervalHours: config?.dailyBonusIntervalHours || 24,
    dailyBonusEnabled: config?.dailyBonusEnabled || false,
    dailyBonusAmount: config?.dailyBonusAmount || 0,
    referralBonusCons: config?.referralBonusCons || 0,
    referralBonusEnabled: config?.referralBonusEnabled || false,
    referralBonusLimitPerUser: config?.referralBonusLimitPerUser || 0,
  });

  const { trigger: updateTrigger, isMutating } = useUpdateAppConfig();
  const { mutate } = useAppConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTrigger(formData);
      toast.success("Bonus settings updated successfully");
      mutate();
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bonus Settings</CardTitle>
        <CardDescription>
          Configure daily and referral bonus settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Daily Bonus</h3>
            <div className="space-y-4 pl-4 border-l-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="dailyBonusEnabled"
                  checked={formData.dailyBonusEnabled}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      dailyBonusEnabled: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="dailyBonusEnabled" className="cursor-pointer">
                  Enable Daily Bonus
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dailyBonusCons">Daily Bonus Cons</Label>
                  <Input
                    id="dailyBonusCons"
                    type="number"
                    value={formData.dailyBonusCons}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dailyBonusCons: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="dailyBonusAmount">Daily Bonus Amount</Label>
                  <Input
                    id="dailyBonusAmount"
                    type="number"
                    value={formData.dailyBonusAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dailyBonusAmount: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="dailyBonusIntervalHours">
                  Interval Hours (Default: 24)
                </Label>
                <Input
                  id="dailyBonusIntervalHours"
                  type="number"
                  value={formData.dailyBonusIntervalHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dailyBonusIntervalHours: Number(e.target.value),
                    })
                  }
                  min={1}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Referral Bonus</h3>
            <div className="space-y-4 pl-4 border-l-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="referralBonusEnabled"
                  checked={formData.referralBonusEnabled}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      referralBonusEnabled: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="referralBonusEnabled"
                  className="cursor-pointer"
                >
                  Enable Referral Bonus
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="referralBonusCons">Referral Bonus Cons</Label>
                  <Input
                    id="referralBonusCons"
                    type="number"
                    value={formData.referralBonusCons}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referralBonusCons: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="referralBonusLimitPerUser">
                    Limit Per User
                  </Label>
                  <Input
                    id="referralBonusLimitPerUser"
                    type="number"
                    value={formData.referralBonusLimitPerUser}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referralBonusLimitPerUser: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isMutating}>
              <Save className="h-4 w-4 mr-2" />
              {isMutating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function StoreConfig({
  config,
  onUpdate,
}: {
  config: any;
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState({
    appleStoreConfig: {
      isEnabled: config?.appleStoreConfig?.isEnabled || false,
      appId: config?.appleStoreConfig?.appId || "",
      appUrl: config?.appleStoreConfig?.appUrl || "",
    },
    googlePlayConfig: {
      isEnabled: config?.googlePlayConfig?.isEnabled || false,
      appId: config?.googlePlayConfig?.appId || "",
      appUrl: config?.googlePlayConfig?.appUrl || "",
    },
  });

  const { trigger: updateTrigger, isMutating } = useUpdateAppConfig();
  const { mutate } = useAppConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTrigger(formData);
      toast.success("Store settings updated successfully");
      mutate();
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Apple Store Config</CardTitle>
          <CardDescription>Configure Apple App Store settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="appleEnabled"
                checked={formData.appleStoreConfig.isEnabled}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    appleStoreConfig: {
                      ...formData.appleStoreConfig,
                      isEnabled: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="appleEnabled" className="cursor-pointer">
                Enable Apple Store
              </Label>
            </div>
            <div>
              <Label htmlFor="appleAppId">App ID</Label>
              <Input
                id="appleAppId"
                value={formData.appleStoreConfig.appId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    appleStoreConfig: {
                      ...formData.appleStoreConfig,
                      appId: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="appleAppUrl">App URL</Label>
              <Input
                id="appleAppUrl"
                value={formData.appleStoreConfig.appUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    appleStoreConfig: {
                      ...formData.appleStoreConfig,
                      appUrl: e.target.value,
                    },
                  })
                }
              />
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Google Play Config</CardTitle>
          <CardDescription>
            Configure Google Play Store settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="googleEnabled"
                checked={formData.googlePlayConfig.isEnabled}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    googlePlayConfig: {
                      ...formData.googlePlayConfig,
                      isEnabled: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="googleEnabled" className="cursor-pointer">
                Enable Google Play
              </Label>
            </div>
            <div>
              <Label htmlFor="googleAppId">App ID</Label>
              <Input
                id="googleAppId"
                value={formData.googlePlayConfig.appId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    googlePlayConfig: {
                      ...formData.googlePlayConfig,
                      appId: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="googleAppUrl">App URL</Label>
              <Input
                id="googleAppUrl"
                value={formData.googlePlayConfig.appUrl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    googlePlayConfig: {
                      ...formData.googlePlayConfig,
                      appUrl: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isMutating}>
          <Save className="h-4 w-4 mr-2" />
          {isMutating ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}

export default function AppConfigPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const getUserType = useAuthStore((s) => s.getUserType);
  const setTitle = useAuthStore((t) => t.setTitle);
  const { data, isLoading, mutate } = useAppConfig();

  const userType = getUserType();
  const config = data?.data || {};

  useEffect(() => {
    setTitle("App Configuration");
    if (userType && !["admin"].includes(userType)) {
      router.replace("/");
    }
  }, [userType, router, setTitle]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-3xl font-bold">App Configuration</h1>
      </div>

      <Tabs defaultValue="general" className="w-full ">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/90 rounded-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="bonus">Bonus Settings</TabsTrigger>
          <TabsTrigger value="store">Store Config</TabsTrigger>
          <TabsTrigger value="emojis">Emojis</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <GeneralSettings config={config} onUpdate={() => mutate()} />
        </TabsContent>

        <TabsContent value="bonus" className="space-y-4 mt-6">
          <BonusSettings config={config} onUpdate={() => mutate()} />
        </TabsContent>

        <TabsContent value="store" className="space-y-4 mt-6">
          <StoreConfig config={config} onUpdate={() => mutate()} />
        </TabsContent>

        <TabsContent value="emojis" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Emoji Management</CardTitle>
                <CardDescription>
                  Manage emoji configurations. Click to view details.
                </CardDescription>
              </div>
              <AddEmojiDialog onEmojiAdded={() => mutate()} />
            </CardHeader>
            <CardContent>
              <EmojiGrid data={config?.emogi || []} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
