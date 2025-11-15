import useSWRMutation from "swr/mutation"
import useSWR from "swr"
import { GetRequest, PostRequest } from "@/lib/fetcher"
import { API_URL } from "@/lib/config"

export function useAppConfig() {
   return useSWR(
      `${API_URL}/config-apk`,
      async (url: string) => {
         const res = await fetch(url, {
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
            },
         })

         if (!res.ok) {
            throw new Error("Failed to fetch app config")
         }

         return res.json()
      },
      {
         revalidateOnFocus: false,
      }
   )
}

export function useAddEmoji() {
   return useSWRMutation(`${API_URL}/config-apk/emoji`, PostRequest)
}

export function useUpdateEmoji(emojiId: string) {
   return useSWRMutation(
      `${API_URL}/config-apk/emoji/${emojiId}`,
      async (url: string, { arg }: { arg: any }) => {
         const res = await fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(arg),
         })

         if (!res.ok) {
            throw new Error("Failed to update emoji")
         }

         return res.json()
      }
   )
}

export function useDeleteEmoji(emojiId: string) {
   return useSWRMutation(
      `${API_URL}/config-apk/emoji/${emojiId}`,
      async (url: string) => {
         const res = await fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
            },
         })

         if (!res.ok) {
            throw new Error("Failed to delete emoji")
         }

         return res.json()
      }
   )
}

export function useUploadFile() {
   return useSWRMutation(
      `${API_URL}/config-apk/upload`,
      async (
         url: string,
         { arg }: { arg: { file: File; type: "image" | "animation" } }
      ) => {
         const formData = new FormData()
         formData.append("file", arg.file)
         formData.append("type", arg.type)

         const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            body: formData,
         })

         if (!res.ok) {
            const error = await res.json()
            console.error("[Frontend] Upload failed:", error)
            throw new Error(error.message || "Failed to upload file")
         }

         const result = await res.json()
         return result
      }
   )
}

export function useGetFileUrl(key: string) {
   return useSWR(
      key ? `${API_URL}/config-apk/file/${encodeURIComponent(key)}` : null,
      async (url: string) => {
         const res = await fetch(url, {
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
            },
         })

         if (!res.ok) {
            console.error("[Frontend] Failed to get file URL")
            throw new Error("Failed to get file URL")
         }

         const result = await res.json()
         return result
      },
      {
         revalidateOnFocus: false,
      }
   )
}

export function useUpdateAppConfig() {
   return useSWRMutation(
      `${API_URL}/config-apk`,
      async (url: string, { arg }: { arg: any }) => {
         const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(arg),
         })

         if (!res.ok) {
            throw new Error("Failed to update app config")
         }

         return res.json()
      }
   )
}

export function useUpdateEmojiOrder() {
   return useSWRMutation(
      `${API_URL}/config-apk/emoji/order`,
      async (
         url: string,
         { arg }: { arg: { emojiOrders: { id: string; order: number }[] } }
      ) => {
         if (!arg.emojiOrders || !Array.isArray(arg.emojiOrders)) {
            throw new Error("Invalid emojiOrders array")
         }

         const validOrders = arg.emojiOrders
            .filter((item, index) => {
               if (!item) {
                  console.error(`Item at index ${index} is null/undefined`)
                  return false
               }
               if (!item.id) {
                  console.error(`Item at index ${index} missing id:`, item)
                  return false
               }
               const id = String(item.id).trim()
               if (id === "" || id === "order" || id === "undefined" || id === "null") {
                  console.error(`Item at index ${index} has invalid id "${id}":`, item)
                  return false
               }
               return true
            })
            .map((item, index) => {
               const id = String(item.id).trim()
               const order = typeof item.order === "number" ? item.order : index
               return {
                  id: id,
                  order: order,
               }
            })

         if (validOrders.length !== arg.emojiOrders.length) {
            console.error("INVALID ITEMS FILTERED:", {
               valid: validOrders.length,
               total: arg.emojiOrders.length,
               invalid: arg.emojiOrders.filter((item, idx) => {
                  if (!item || !item.id) return true
                  const id = String(item.id).trim()
                  return (
                     id === "" || id === "order" || id === "undefined" || id === "null"
                  )
               }),
            })
            throw new Error(
               `Invalid emoji IDs detected. Only ${validOrders.length} of ${arg.emojiOrders.length} items are valid.`
            )
         }

         const payload = { emojiOrders: validOrders }

         const res = await fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
         })

         if (!res.ok) {
            let errorMessage = "Failed to update emoji order"
            try {
               const error = await res.json()
               console.error("useUpdateEmojiOrder - error response:", error)
               errorMessage = error.message || errorMessage
            } catch (e) {
               console.error("useUpdateEmojiOrder - failed to parse error:", e)
               errorMessage = `HTTP ${res.status}: ${res.statusText}`
            }
            throw new Error(errorMessage)
         }

         return res.json()
      }
   )
}
