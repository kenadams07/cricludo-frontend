import {
  countGamesSettledToday,
  generateChartData,
  generateStats,
  mergeGameData,
} from "./helper";

export function prepareDashboardData(data: {
  analysisData: any[];
  users: any[];
  userwallets: any[];
  settledgames: any[];
}) {
  const { analysisData, users, userwallets, settledgames } = data;

  if (!users?.length) {
    return {
      totalUsers: 0,
      activeUsers: 0,
      activeUserPercent: "0.00",
      totalRoomsCreated: settledgames?.length || 0,
      chartData: { daily: [], monthly: [], yearly: [] },
      totalCoin: 0,
      todayRoomSettled: 0,
      totalDiamond: 0,
      totalLives: 0,
      roomsByDate: {},
      userTableData: [],
    };
  }

  const walletMap = new Map(userwallets.map((w) => [w.userId, w]));
  const analysisMap = new Map(analysisData.map((a) => [a.userId, a]));

  let totalCoin = 0,
    totalDiamond = 0,
    totalLives = 0,
    activeUsers = 0;

  for (const wallet of userwallets) {
    totalCoin += wallet.coin || 0;
    totalDiamond += wallet.diamond || 0;
    totalLives += wallet.lives || 0;
  }

  const totalUsers = users.length;
  for (const user of users) {
    if (user.status === "1" || user.isActive === true) activeUsers++;
  }
  const activeUserPercent = ((activeUsers / totalUsers) * 100).toFixed(2);

  const roomsByDate: Record<string, number> = {};
  for (const game of settledgames) {
    const date = new Date(game.createdAt || game.settledAt || Date.now())
      .toISOString()
      .slice(0, 10);
    roomsByDate[date] = (roomsByDate[date] || 0) + 1;
  }

  const totalRoomsCreated = settledgames?.length || 0;
  const todayRoomSettled = countGamesSettledToday(settledgames);

  const usersChartData = generateStats(settledgames, users, analysisData);
  const chartData = {
    daily: generateChartData(users, settledgames, "daily"),
    monthly: generateChartData(users, settledgames, "monthly"),
    yearly: generateChartData(users, settledgames, "yearly"),
  };

  const userTableData = users.map((user) => {
    const analysis = analysisMap.get(user._id) || {};
    const wallet = walletMap.get(user._id) || {};
    const chart = usersChartData[user._id] || {};
    const formattedDate = new Date().toISOString().split("T")[0];

    const todayTotalTimeSpent =
      chart?.daily?.[formattedDate]?.durationText || "";

    const mergedMatches = mergeGameData(
      chart.matches || [],
      analysis.gameSessions || [],
    );

    return {
      profilePic:
        user.profile_pic || analysis.profilePic || user.google_pic || "",
      username: user.username,
      email: user.email,
      active: user.status === "1" || user.isActive === true,
      totalRoomsCreated: chart.roomsCreated || 0,
      totalGamesJoined:
        chart.totalGamesPlayed || user.gamesJoined || analysis.gamesJoined || 0,
      wins: chart.totalWins || user.wins || analysis.wins || 0,
      losses: chart.totalLosses || user.losses || analysis.losses || 0,
      coinsDistributed: analysis.coinsDistributed || 0,
      coin: wallet.coin || 0,
      diamond: wallet.diamond || 0,
      live: wallet.lives || 0,
      totalTimeSpent: analysis.totalTimeSpent || 0,
      todayTimeSpent: todayTotalTimeSpent,
      loginHistory: analysis.loginHistory || [],
      gameSessions: analysis.gameSessions || [],
      activityStats: analysis.activityStats || [],
      id: user._id,
      isVIP: !!user.vip_user,
      isGuest: !!user.is_guest,
      isAgent: !!user.is_agent,
      userType: user?.is_agent ? "Agent" : user?.is_guest ? "Guest" : "",
      followerCount: user.followersCount || 0,
      followingCount: user.followingCount || 0,
      rating: user.rating || 0,
      lastLogin: user.last_login || "N/A",
      userChartData: {
        daily: chart.daily || {},
        monthly: chart.monthly || {},
        yearly: chart.yearly || {},
      },
      userMatches: mergedMatches,
    };
  });

  return {
    totalUsers,
    activeUsers,
    activeUserPercent,
    totalRoomsCreated,
    chartData,
    todayRoomSettled,
    totalCoin,
    totalDiamond,
    totalLives,
    roomsByDate,
    userTableData,
  };
}
