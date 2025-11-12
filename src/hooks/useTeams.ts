import useSWR from "swr"
import useSWRMutation from "swr/mutation"

import { API_URL } from "@/lib/config"
import { PostRequest, fetcher } from "@/lib/fetcher"

export type TeamPlayer = {
  _id: string
  name: string
  jerseyNumber: number | null
  position: number
}

export type AlternateTeam = {
  _id: string
  name: string
  game: string
}

export type Team = {
  _id: string
  name: string
  game: string
  players: TeamPlayer[]
  alternateTeam: AlternateTeam | null
  flagKey: string | null
  flagUrl: string | null
}

export function useTeams(game: string) {
  const key = `${API_URL}/teams${game ? `?game=${encodeURIComponent(game)}` : ""}`
  return useSWR<Team[]>(key, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
}

export function useCreateTeam() {
  return useSWRMutation(`${API_URL}/teams`, PostRequest)
}

export async function updateTeamPlayer(teamId: string, playerId: string, payload: Partial<Omit<TeamPlayer, "_id" | "position">>) {
  const body = Object.fromEntries(
    Object.entries(payload ?? {}).filter(([, value]) => value !== undefined)
  )

  const response = await fetcher(`${API_URL}/teams/${teamId}/players/${playerId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })

  if (response?.statusCode && response.statusCode >= 400) {
    throw new Error(response?.message ?? "Failed to update player.")
  }

  return response as Team
}

export async function reorderTeamPlayers(teamId: string, players: Pick<TeamPlayer, "_id" | "position">[]) {
  const response = await fetcher(`${API_URL}/teams/${teamId}/players/order`, {
    method: "PUT",
    body: JSON.stringify({
      players: players.map((player) => ({
        playerId: player._id,
        position: player.position,
      })),
    }),
  })

  if (response?.statusCode && response.statusCode >= 400) {
    throw new Error(response?.message ?? "Failed to reorder players.")
  }

  return response as Team
}

export type UpdateTeamPayload = {
  name?: string
  alternateTeamId?: string | null
  flagKey?: string | null
}

export async function updateTeamDetails(teamId: string, payload: UpdateTeamPayload) {
  const body = Object.fromEntries(
    Object.entries(payload ?? {}).filter(([, value]) => value !== undefined)
  )

  const response = await fetcher(`${API_URL}/teams/${teamId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })

  if (response?.statusCode && response.statusCode >= 400) {
    throw new Error(response?.message ?? "Failed to update team.")
  }

  return response as Team
}

export async function uploadTeamFlag(teamId: string, file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetcher(`${API_URL}/teams/${teamId}/flag`, {
    method: "POST",
    body: formData,
  })

  if (response?.statusCode && response.statusCode >= 400) {
    throw new Error(response?.message ?? "Failed to upload team flag.")
  }

  return response as Team
}

