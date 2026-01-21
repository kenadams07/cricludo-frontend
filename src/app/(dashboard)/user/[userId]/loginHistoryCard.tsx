"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";

type LoginHistoryCardProps = {
  logins: string[];
};

export function LoginHistoryCard({ logins }: LoginHistoryCardProps) {
  const sortedLogins = [...logins].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="shrink-0">
        <CardTitle className="flex items-center gap-2">
          <CalendarDaysIcon className="w-5 h-5 text-muted-foreground" />
          Login History
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-y-auto space-y-4 pr-2">
        {sortedLogins.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No login records found.
          </p>
        ) : (
          sortedLogins.map((timestamp, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <ClockIcon className="w-4 h-4 text-muted-foreground" />
              <span>
                {index} : {timestamp}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
