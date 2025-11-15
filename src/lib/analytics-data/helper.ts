import { format } from "date-fns";
import { ChartDataPoint, Game, StatsByUser, Timeframe, User, UserStats } from "./type";

export function getFormattedDate(dateStr: string, timeframe: Timeframe): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  switch (timeframe) {
    case "daily":
      return format(date, "yyyy-MM-dd");
    case "monthly":
      return format(date, "yyyy-MM");
    case "yearly":
      return format(date, "yyyy");
    default:
      return "";
  }
}

export function generateChartData(
  users: User[],
  gameRooms: Game[],
  timeframe: Timeframe
): ChartDataPoint[] {
  const dataMap = new Map<string, ChartDataPoint>();

  for (const user of users) {
    const key = getFormattedDate(user.createdAt, timeframe);
    const entry = dataMap.get(key);
    if (entry) entry.userCount++;
    else dataMap.set(key, { date: key, userCount: 1, gameRoomCount: 0 });
  }

  for (const room of gameRooms) {
    const key = getFormattedDate(room.settledAt, timeframe);
    const entry = dataMap.get(key);
    if (entry) entry.gameRoomCount++;
    else dataMap.set(key, { date: key, userCount: 0, gameRoomCount: 1 });
  }

  return [...dataMap.values()].sort((a, b) => a.date.localeCompare(b.date));
}

export function initUserStats(): UserStats {
  return {
    daily: Object.create(null),
    monthly: Object.create(null),
    yearly: Object.create(null),
    totalGamesPlayed: 0,
    totalWins: 0,
    totalLosses: 0,
    roomsCreated: 0,
    matches: [],
  };
}

export function generateStats(games: Game[], users: User[]): StatsByUser {
  const stats: StatsByUser = Object.create(null);
  const userMap = new Map(users.map((u) => [u._id, u]));

  for (const game of games) {
    if (!game?.settledAt) continue;

    const settledDate = new Date(game.settledAt);
    const dayKey = settledDate.toISOString().slice(0, 10);
    const monthKey = `${settledDate.getFullYear()}-${String(
      settledDate.getMonth() + 1
    ).padStart(2, "0")}`;
    const yearKey = String(settledDate.getFullYear());
    const timeKeys = { daily: dayKey, monthly: monthKey, yearly: yearKey };

    const creatorId = game.roomCreatedBy;
    if (creatorId) {
      const creatorStats = stats[creatorId] || (stats[creatorId] = initUserStats());
      creatorStats.roomsCreated++;
    }


    const resultMap = Object.create(null);
    for (const r of game.result || []) {
      resultMap[r.userId] = r;
    }

    const playerUsernames = game.players.map((p) => {
      const u = userMap.get(p.userId);
      return u ? u.username : p.userId;
    });


    for (const player of game.players) {
      const userId = player.userId;
      if (!userId) continue;

      const userStats = stats[userId] || (stats[userId] = initUserStats());

      userStats.totalGamesPlayed++;

      const result = resultMap[userId];
      const didWin = result?.rank === 1;
      if (didWin) userStats.totalWins++;
      else userStats.totalLosses++;

      for (const period of ["daily", "monthly", "yearly"] as const) {
        const key = timeKeys[period];
        const periodStats = userStats[period];
        const current =
          periodStats[key] ||
          (periodStats[key] = { gamesPlayed: 0, wins: 0, losses: 0 });
        current.gamesPlayed++;
        if (didWin) current.wins++;
        else current.losses++;
      }

    
      const opponents = playerUsernames.filter((id) => id !== (userMap.get(userId)?.username || userId));

      userStats.matches.push({
        id: game._id,
        date: settledDate.toISOString(),
        result: didWin ? "win" : "loss",
        opponents,
        roomId: game.roomId,
        gameType: game.gameType,
        category: game.category,
        winnerPrize: game.players?.[0]?.winnerPrize ?? 0,
        totalOver: resultMap[
          Object.keys(resultMap).find((id) => resultMap[id].rank === 1)!
        ]?.totalOver ?? 0,
        entryValue: player.entryValue,
        coinType: player.coinType,
      });
    }
  }

  return stats;
}

export function mergeGameData(gameResults: any[], gameSessions: any[]): any[] {
  if (!gameResults?.length) return [];
  if (!gameSessions?.length) return gameResults;

  const sessionMap: Record<string, any> = Object.create(null);
  for (const s of gameSessions) {
    sessionMap[s.gameId] = s;
  }

  return gameResults.map((result) => ({
    ...result,
    ...(sessionMap[result.roomId] || {}),
  }));
}

export function countGamesSettledToday(games: Game[]): number {
  if (!games?.length) return 0;

  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();

  let count = 0;
  for (const game of games) {
    const date = new Date(game.settledAt);
    if (
      date.getFullYear() === y &&
      date.getMonth() === m &&
      date.getDate() === d
    ) {
      count++;
    }
  }
  return count;
}