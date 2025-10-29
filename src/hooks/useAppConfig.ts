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
            throw new Error(error.message || "Failed to upload file")
         }

         return res.json()
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
            throw new Error("Failed to get file URL")
         }

         return res.json()
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
