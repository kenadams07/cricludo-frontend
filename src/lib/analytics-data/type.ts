export type User = {
   _id: string
   username: string
   email?: string
   google_pic?: string
   profile_pic?: string
   google_id?: string
   device_code: string
   guest_login?: string
   email_verify: string
   vip_user: boolean
   is_guest: boolean
   nodeRefId: string | null
   ip_address: {
      system_ip: string | null
      browser_ip: string
   }
   rating: number
   gamesJoined: number
   gamesPlayed: number
   wins: number
   losses: number
   status: string
   createdAt: string
   updatedAt: string
   last_login: string
   wallet_id: string
   token: string
   __v?: number
}

export interface Player {
   userId: string
   userName: string
   winnerPrize: number
   totalOver: number
   entryValue: number
   socketId: string
   exitAttempt: number
   isTimerStart: boolean
   coinType: string
   profileImage: string
   _id: string
}

export interface Result {
   userId: string
   username: string
   rank: number
   _id: string
   winPrize: number
   winStatement: string
   run: number
   wicket: number
   over: number
   totalOver: number
}

export interface Game {
   _id: string
   roomCreatedBy: string
   roomId: string
   gameType: string
   category: string
   players: Player[]
   result: Result[]
   settledAt: string
   __v: number
}

export type TimeStats = {
   gamesPlayed: number
   wins: number
   losses: number
}

export type TimeBreakdown = {
   [timeKey: string]: TimeStats
}

export type UserStats = {
   daily: TimeBreakdown
   monthly: TimeBreakdown
   yearly: TimeBreakdown
   totalGamesPlayed: number
   totalWins: number
   totalLosses: number
   roomsCreated: number
   matches: MatchDetail[]
}

export type StatsByUser = {
   [userId: string]: UserStats
}

export type MatchDetail = {
   id: string
   date: string
   result: "win" | "loss" | "unknown"
   opponents: string[]
   roomId: string
   gameType: string
   category: string
   winnerPrize?: number
   totalOver?: number
   entryValue?: number
   coinType?: string
}

export type Timeframe = "daily" | "monthly" | "yearly"

export type ChartDataPoint = {
   date: string
   userCount: number
   gameRoomCount: number
}
