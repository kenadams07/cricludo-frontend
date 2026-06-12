import { z } from "zod";

// Gift schema and type definitions
export const giftSchema = z.object({
  id: z.string(),
  _id: z.string(),
  price: z.number(),
  coinType: z.enum(["coin", "diamond"]),
  emogiPicUrl: z.string().optional(),
  emogiSpritPicUrl: z.string().optional(),
  order: z.number().optional(),
  createdAt: z.string(),
});

export type Gift = z.infer<typeof giftSchema>;

// Form data type for gift creation/editing
export interface GiftFormData {
  price: number;
  coinType: "coin" | "diamond";
  emogiPicUrl: string;
  emogiSpritPicUrl: string;
}

// File upload types
export interface FileUploadState {
  file: File | null;
  preview: string | null;
}

export interface GiftActionState {
  isLoading: boolean;
  error: string | null;
}
