"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  IconTrendingUp,
  IconCrown,
  IconCoins,
  IconDiamond,
  IconHeart,
  IconCalendarTime,
  IconRating12Plus,
  IconTimeline,
  IconShield,
  IconUser,
} from "@tabler/icons-react";

import { format, formatDistanceToNow } from "date-fns";
import { capitalize, formatPlaytime } from "@/lib/utils";

interface UserProfileProps {
  user: {
    username: string;
    email: string;
    profilePic: string;
    active: boolean;
    isVIP: boolean;
    isGuest?: boolean;
    isAgent?: boolean;
    rating: number;
    wins: number;
    losses: number;
    totalGamesJoined: number;
    totalRoomsCreated: number;
    totalTimeSpent: number;
    coinDistributed: number;
    followerCount?: number;
    followingCount?: number;
    lastLogin: string;
    coin: number;
    diamond: number;
    live: number;
  };
}

export function UserProfileCard({ user }: UserProfileProps) {
  console.log("UserProfileCard user:", user);
  const winRate =
    user?.totalGamesJoined > 0 && typeof user?.wins === "number"
      ? ((user.wins / user.totalGamesJoined) * 100).toFixed(1)
      : "0.0";

  const formattedLastLogin =
    user?.lastLogin && !isNaN(new Date(user.lastLogin).getTime())
      ? format(new Date(user.lastLogin), "dd MMM yyyy, HH:mm")
      : "";


  const totalSeconds = Number(user?.totalTimeSpent ?? 0);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-4 @container/card">
      {/* Profile Card */}
      <Card className="shadow-md transition hover:shadow-lg">
  <CardHeader className="items-center space-y-4">
    <div className="relative w-24 h-24 mx-auto">
      <Avatar
        className={`w-24 h-24 ring-2 ring-offset-2 ${
          user?.isVIP ? "ring-yellow-400" : "ring-primary"
        }`}
      >
        <AvatarImage src={user?.profilePic} alt={user?.username} />
        <AvatarFallback className="bg-accent text-black ring-2 ring-offset-2 flex items-center justify-center text-3xl font-medium">
          {capitalize(user?.username.charAt(0) || "")}
        </AvatarFallback>
      </Avatar>

      {user?.isVIP && (
        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black px-2 py-0.5 rounded-full flex items-center justify-center ring-2 ring-white">
          <IconCrown size={14} className="mr-1" />
          <span className="text-xs font-semibold">VIP</span>
        </div>
      )}

      {user?.isGuest && (
        <div className="absolute -bottom-1 -right-1 bg-blue-300 text-black px-2 py-0.5 rounded-full flex items-center justify-center ring-2 ring-white">
          <IconUser size={14} className="mr-1" />
          <span className="text-xs font-semibold">Guest</span>
        </div>
      )}

      {user?.isAgent && (
        <div className="absolute -bottom-1 -right-1 bg-green-400 text-black px-2 py-0.5 rounded-full flex items-center justify-center ring-2 ring-white">
          <IconShield size={14} className="mr-1" />
          <span className="text-xs font-semibold">Agent</span>
        </div>
      )}
    </div>

    <CardTitle className="text-xl font-bold text-center tracking-tight mb-0">
      {user?.username}
    </CardTitle>

    <CardDescription className="text-sm text-center text-muted-foreground mt-0">
      <a href={`mailto:${user?.email}`} className="hover:underline">
        {user?.email}
      </a>
    <div className="flex items-center justify-center space-x-6 mt-1">
      <div className="flex flex-row items-center gap-2">
        <span className="text-lg font-semibold text-foreground">
          {user?.followerCount ?? 0}
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Followers
        </span>
      </div>
      <div className="h-6 w-px bg-border" />
      <div className="flex flex-row items-center gap-2">
        <span className="text-lg font-semibold text-foreground">
          {user?.followingCount ?? 0}
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Following
        </span>
      </div>
    </div>
    </CardDescription>

  </CardHeader>
</Card>

      {/* Game Stats */}
      <Card className="shadow-md transition hover:shadow-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Game Stats</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <IconTrendingUp size={16} />
            {winRate}%
          </Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <Stat label="Games Joined" value={user?.totalGamesJoined || 0} />
          <Stat label="Wins" value={user?.wins || 0} />
          <Stat label="Losses" value={user?.losses || 0} />
          <Stat label="Rooms Created" value={user?.totalRoomsCreated || 0} />
        </CardContent>
      </Card>

      {/* Wallet Info */}
      <Card className="shadow-md transition hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <WalletItem
            icon={<IconCoins size={16} />}
            label="Coins"
            value={user?.coin || 0}
          />
          <WalletItem
            icon={<IconDiamond size={16} />}
            label="Diamonds"
            value={user?.diamond || 0}
          />
          <WalletItem
            icon={<IconHeart size={16} />}
            label="Lives"
            value={user?.live || 0}
          />
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="shadow-md transition hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Account Infos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {/* Active Status or Last Login */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <IconCalendarTime size={16} />
              {user?.active ? "Status" : "Last Login"}
            </span>

            {user?.active ? (
              <span className="flex items-center gap-2 text-green-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Active
              </span>
            ) : (
              <span className="font-semibold text-base">
                {formattedLastLogin}
              </span>
            )}
          </div>
          {/* Rating */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <IconRating12Plus size={16} />
              Performance Rating
            </span>
            <span className="font-semibold text-base">
              {user?.rating.toFixed(1)}%
            </span>
          </div>

          {/* time Spent */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <IconTimeline size={16} />
              Time Spent (HH:MM:SS)
            </span>
            <span className="font-semibold text-base">
              {formatPlaytime(totalSeconds/1000)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="text-base font-semibold">{value}</span>
    </div>
  );
}

function WalletItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">
        {icon} {label}
      </span>
      <span className="font-semibold text-base">{value}</span>
    </div>
  );
}
