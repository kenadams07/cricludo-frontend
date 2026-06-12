"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatDistanceToNow, isPast, format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/config";
import { fetcher, GetRequest } from "@/lib/fetcher";
import CreateEventForm from "./createEventForm";

const GAME_TYPES = [
  { value: "cricket", label: "Cricludo" },
  { value: "classic", label: "Classic Ludo" },
];
const PLAYER_LIMITS = [2, 3, 4];
const TOTAL_OVERS = ["super over", "T5", "T10", "T20", "ODI", "Test"];
const TIMEZONES = ["IST", "GMT", "UTC", "EST", "PST"];
const STATUSES = ["upcoming", "active", "completed", "cancelled"] as const;

const StatusConfig: Record<
  string,
  { color: string; bgColor: string; textColor: string }
> = {
  upcoming: {
    color: "bg-blue-100",
    bgColor: "bg-blue-50",
    textColor: "text-blue-900",
  },
  active: {
    color: "bg-green-100",
    bgColor: "bg-green-50",
    textColor: "text-green-900",
  },
  completed: {
    color: "bg-gray-100",
    bgColor: "bg-gray-50",
    textColor: "text-gray-900",
  },
  cancelled: {
    color: "bg-red-100",
    bgColor: "bg-red-50",
    textColor: "text-red-900",
  },
};

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res: any = await GetRequest(`${API_URL}/banners`);
        if (mounted) setBanners(res?.data ?? []);
      } catch (err) {
        console.error("Failed to load banners", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function loadEvents() {
    setLoadingEvents(true);
    try {
      const res: any = await GetRequest(`${API_URL}/events`);
      setEvents(res?.data ?? []);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoadingEvents(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  // Separate active and expired/completed events
  const { activeEvents, expiredEvents } = useMemo(() => {
    const now = new Date();
    return {
      activeEvents: events.filter(
        (ev) =>
          !["completed", "cancelled"].includes(ev.status) &&
          (!ev.date || new Date(ev.date) > now),
      ),
      expiredEvents: events.filter(
        (ev) =>
          ["completed", "cancelled"].includes(ev.status) ||
          (ev.date && new Date(ev.date) <= now),
      ),
    };
  }, [events]);

  const renderEventCard = (ev: any) => {
    const eventDate = ev.date ? new Date(ev.date) : null;
    const status = ev.status || "upcoming";
    const config = StatusConfig[status] || StatusConfig.upcoming;

    return (
      <Card key={ev.id || ev._id} className={`${config.bgColor} border-0`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <img
              src={ev.bannerUrl || ev.imageUrl || "/placeholder.png"}
              alt={ev.name}
              className="w-32 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{ev.name}</h3>
                    <Badge className={`${config.color} ${config.textColor}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </div>
                  {eventDate && (
                    <p className="text-xs text-gray-600">
                      {format(eventDate, "MMM dd, yyyy • hh:mm a")} (
                      {ev.timeZone || "UTC"})
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingEvent(ev);
                      setIsDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm("Delete this event?")) return;
                      await fetcher(`${API_URL}/events/${ev.id}`, {
                        method: "DELETE",
                      });
                      loadEvents();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Game Type:</span>
                  <span>{ev.gameType?.toUpperCase() || "N/A"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Players:</span>
                  <span>
                    {(ev.players || []).length} / {ev.playerLimit || 2}
                  </span>
                </div>
                {ev.gameType === "cricket" && ev.totalOver && (
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Total Over:</span>
                    <span>{ev.totalOver}</span>
                  </div>
                )}
              </div>

              {(ev.players || []).length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-300">
                  <p className="text-xs font-medium mb-2">Players:</p>
                  <div className="flex flex-wrap gap-2">
                    {ev.players.map((p: any) => (
                      <div
                        key={p._id || p.id}
                        className="bg-white px-2 py-1 rounded text-xs"
                      >
                        <div className="font-medium">
                          {p.firstName || p.username || "Unknown"}
                        </div>
                        <div className="text-gray-600">{p.email}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => setIsDialogOpen(open)}
        >
          <DialogTrigger asChild>
            <Button size="lg" onClick={() => setEditingEvent(null)}>
              + Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>
            <CreateEventForm
              banners={banners}
              initial={editingEvent || undefined}
              onCreated={() => {
                setIsDialogOpen(false);
                setEditingEvent(null);
                loadEvents();
              }}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingEvent(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loadingEvents ? (
        <div className="text-center py-8">Loading events…</div>
      ) : events.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No events yet</CardTitle>
            <CardDescription>
              Create the first event using the button above.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          {/* Active Events Section */}
          {activeEvents.length > 0 && (
            <div className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Active Events ({activeEvents.length})
                </h2>
              </div>
              <div className="space-y-3">
                {activeEvents.map(renderEventCard)}
              </div>
            </div>
          )}

          {/* Expired/Completed Events Section */}
          {expiredEvents.length > 0 && (
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  Past Events ({expiredEvents.length})
                </h2>
              </div>
              <div className="space-y-3 opacity-80">
                {expiredEvents.map(renderEventCard)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
