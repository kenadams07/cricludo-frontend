import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { PostRequest } from "@/lib/fetcher";
import { API_URL } from "@/lib/config";

// Type definitions for API responses
interface AppConfigData {
  emogi?: any[];
  [key: string]: any;
}

interface AppConfigResponse {
  data: AppConfigData;
}

interface FileUrlResponse {
  url: string;
  [key: string]: any;
}

interface GiftData {
  id: string;
  _id: string;
  price: number;
  coinType: "coin" | "diamond";
  emogiPicUrl?: string;
  emogiSpritPicUrl?: string;
  order?: number;
  createdAt: string;
  [key: string]: any;
}

interface GiftsResponse {
  data?: GiftData[];
  [key: string]: any;
}

interface FileUploadResponse {
  url?: string;
  key: string;
  [key: string]: any;
}

// Helper function to make authenticated fetch requests
const fetchWithAuth = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorMessage =
      options?.method === "DELETE"
        ? "Failed to delete gift"
        : `Failed to fetch from ${url}`;
    throw new Error(errorMessage);
  }

  return res.json();
};

// Helper function to validate and map gift orders
const validateAndMapGiftOrders = (items: any[]) => {
  const INVALID_IDS = new Set(["", "order", "undefined", "null"]);

  return items
    .filter((item, index) => {
      if (!item) return false;
      if (!item.id) return false;
      const id = String(item.id).trim();
      return !INVALID_IDS.has(id);
    })
    .map((item, index) => ({
      id: String(item.id).trim(),
      order: typeof item.order === "number" ? item.order : index,
    }));
};

export function useAppConfig() {
  return useSWR<AppConfigResponse>(
    `${API_URL}/config-apk`,
    (url: string) => fetchWithAuth<AppConfigResponse>(url),
    {
      revalidateOnFocus: false,
    },
  );
}

export function useAddGift() {
  return useSWRMutation<GiftData, unknown, string, any>(
    `${API_URL}/gifts`,
    PostRequest,
  );
}

export function useUpdateGift(giftId: string) {
  return useSWRMutation<GiftData, unknown, string, any>(
    `${API_URL}/gifts/${giftId}`,
    async (url: string, { arg }: { arg: any }) => {
      return fetchWithAuth<GiftData>(url, {
        method: "PUT",
        body: JSON.stringify(arg),
      });
    },
  );
}

export function useDeleteGift(giftId: string) {
  return useSWRMutation<GiftData, unknown, string, never>(
    `${API_URL}/gifts/${giftId}`,
    async (url: string) => {
      return fetchWithAuth<GiftData>(url, {
        method: "DELETE",
      });
    },
  );
}

// Backward compatibility aliases
export function useAddEmoji() {
  return useAddGift();
}

export function useUpdateEmoji(emojiId: string) {
  return useUpdateGift(emojiId);
}

export function useDeleteEmoji(emojiId: string) {
  return useDeleteGift(emojiId);
}

export function useUploadFile() {
  return useSWRMutation<
    FileUploadResponse,
    unknown,
    string,
    { file: File; type: "image" | "animation" }
  >(
    `${API_URL}/config-apk/upload`,
    async (
      url: string,
      { arg }: { arg: { file: File; type: "image" | "animation" } },
    ) => {
      const formData = new FormData();
      formData.append("file", arg.file);
      formData.append("type", arg.type);

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        try {
          const error = await res.json();
          throw new Error(error.message || "Failed to upload file");
        } catch (e) {
          throw new Error("Failed to upload file");
        }
      }

      return res.json();
    },
  );
}

export function useGetFileUrl(key: string) {
  return useSWR<FileUrlResponse>(
    key ? `${API_URL}/config-apk/file/${encodeURIComponent(key)}` : null,
    (url: string) => fetchWithAuth<FileUrlResponse>(url),
    {
      revalidateOnFocus: false,
    },
  );
}

export function useUpdateAppConfig() {
  return useSWRMutation<AppConfigResponse, unknown, string, any>(
    `${API_URL}/config-apk`,
    async (url: string, { arg }: { arg: any }) => {
      return fetchWithAuth<AppConfigResponse>(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
  );
}

export function useGetAllGifts() {
  return useSWR<GiftsResponse>(
    `${API_URL}/gifts`,
    (url: string) => fetchWithAuth<GiftsResponse>(url),
    {
      revalidateOnFocus: false,
    },
  );
}

export function useUpdateGiftsOrder() {
  return useSWRMutation<
    any,
    unknown,
    string,
    { emojiOrders: { id: string; order: number }[] }
  >(
    `${API_URL}/gifts/order/update`,
    async (
      url: string,
      { arg }: { arg: { emojiOrders: { id: string; order: number }[] } },
    ) => {
      if (!arg.emojiOrders || !Array.isArray(arg.emojiOrders)) {
        throw new Error("Invalid emojiOrders array");
      }

      const validOrders = validateAndMapGiftOrders(arg.emojiOrders);

      if (validOrders.length !== arg.emojiOrders.length) {
        throw new Error(
          `Invalid gift IDs detected. Only ${validOrders.length} of ${arg.emojiOrders.length} items are valid.`,
        );
      }

      const payload = { emojiOrders: validOrders };

      return fetchWithAuth<any>(url, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
  );
}

// Backward compatibility alias
export function useUpdateEmojiOrder() {
  return useUpdateGiftsOrder();
}
