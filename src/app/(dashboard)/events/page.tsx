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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/config";
import { fetcher, GetRequest } from "@/lib/fetcher";

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
                    {(ev.players || []).length} / {ev.playerLimit || 4}
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

function CreateEventForm({
  banners,
  initial,
  onCreated,
  onCancel,
}: {
  banners: any[];
  initial?: any;
  onCreated?: () => void;
  onCancel?: () => void;
}) {
  // Update schema to match new player object structure
  const schema = z.object({
    name: z.string().min(2, "Name is required"),
    date: z.string().min(1, "Date is required"),
    playerLimit: z.number().min(2).max(4),
    players: z
      .array(
        z.object({
          id: z.string(),
          username: z.string(),
          email: z.string(),
        }),
      )
      .optional(),
    gameType: z.string(),
    totalOver: z.string().nullable().optional(),
    bannerId: z.string().optional(),
    status: z.string().optional(),
    timeZone: z.string().optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name || "",
      date: initial?.date
        ? new Date(initial.date).toISOString().slice(0, 16)
        : "",
      playerLimit: initial?.playerLimit || 4,
      players: initial?.players || [],
      gameType: initial?.gameType || GAME_TYPES[0].value,
      totalOver: initial?.totalOver || null,
      bannerId: initial?.bannerId || "",
      status: initial?.status || "upcoming",
      timeZone: initial?.timeZone || TIMEZONES[0],
    },
  });

  useEffect(() => {
    if (initial) {
      reset({
        name: initial.name || "",
        date: initial.date
          ? new Date(initial.date).toISOString().slice(0, 16)
          : "",
        playerLimit: initial.playerLimit || 4,
        players: initial.players || [],
        gameType: initial.gameType || GAME_TYPES[0].value,
        totalOver: initial.totalOver || null,
        bannerId: initial.bannerId || "",
        status: initial.status || "upcoming",
        timeZone: initial.timeZone || TIMEZONES[0],
      });
    }
  }, [initial, reset]);

  const formatLocalDateTime = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours(),
    )}:${pad(d.getMinutes())}`;
  };

  const minDateTime = useMemo(() => formatLocalDateTime(new Date()), []);

  const watchedPlayers = watch("players") || [];
  const [playerSearch, setPlayerSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  async function onSubmit(values: FormValues) {
    try {
      const payload = {
        ...values,
        date: values.date ? new Date(values.date).toISOString() : null,
      } as any;

      if (payload.totalOver === "none") payload.totalOver = null;
      if (payload.bannerId === "none") payload.bannerId = "";
      if (payload.status === "") payload.status = "upcoming";

      if (initial && initial.id) {
        await fetcher(`${API_URL}/events/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await fetcher(`${API_URL}/events`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      onCreated?.();
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to save event");
    }
  }

  // Debounce search for players
  useEffect(() => {
    const q = playerSearch.trim();
    if (!q) {
      setSearchResults([]);
      return;
    }
    let cancelled = false;
    setSearchLoading(true);
    const t = setTimeout(async () => {
      try {
        const res: any = await GetRequest(
          `${API_URL}/events/search-users?q=${encodeURIComponent(q)}`,
        );
        if (!cancelled) setSearchResults(res?.data ?? []);
      } catch (err) {
        console.error("user search", err);
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [playerSearch]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event name</label>
          <Input {...register("name")} />
          {errors.name && (
            <div className="text-sm text-red-600 mt-1">
              {errors.name.message}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date & time</label>
          <Input
            type="datetime-local"
            {...register("date")}
            min={minDateTime}
          />
          {errors.date && (
            <div className="text-sm text-red-600 mt-1">
              {errors.date.message}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Player limit</label>
          <Select
            onValueChange={(v) => setValue("playerLimit", Number(v))}
            defaultValue={String(watch("playerLimit") || 4)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PLAYER_LIMITS.map((p) => (
                <SelectItem key={p} value={String(p)}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Game type</label>
          <Select
            onValueChange={(v) => setValue("gameType", v)}
            defaultValue={watch("gameType") || GAME_TYPES[0].value}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GAME_TYPES.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {watch("gameType") === "cricket" && (
          <div>
            <label className="block text-sm font-medium mb-1">Total over</label>
            <Select
              onValueChange={(v) => setValue("totalOver", v)}
              defaultValue={watch("totalOver") || "none"}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {TOTAL_OVERS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            onValueChange={(v) => setValue("status", v)}
            defaultValue={watch("status") || "upcoming"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Search & Add Players
        </label>
        <div className="flex gap-2 relative">
          <Input
            id="player-search-input"
            value={playerSearch}
            onChange={(e) => setPlayerSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            placeholder="Search players by name or email..."
          />
          {searchResults.length > 0 && (
            <div className="absolute z-10 top-full left-0 right-0 bg-white border rounded mt-1 max-h-64 overflow-auto shadow-lg">
              {searchLoading ? (
                <div className="p-3 text-center text-sm">Searching…</div>
              ) : (
                searchResults.map((u) => (
                  <div
                    key={u._id}
                    className="p-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b"
                  >
                    <div>
                      <div className="font-medium">
                        {u.firstName || u.username || u.email}
                      </div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </div>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => {
                        const limit = Number(watch("playerLimit") || 4);
                        if ((watchedPlayers || []).length >= limit) {
                          alert(`Player limit reached (${limit})`);
                          return;
                        }
                        if (
                          watchedPlayers.some(
                            (p: any) => p.id === u._id || p.id === u.id,
                          )
                        ) {
                          alert("Player already added");
                          return;
                        }
                        setValue("players", [
                          ...watchedPlayers,
                          {
                            id: u._id || u.id,
                            username: u.username || u.firstName || u.email,
                            email: u.email,
                          },
                        ]);
                        setPlayerSearch("");
                        setSearchResults([]);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {watchedPlayers.map((p: any) => (
            <div
              key={p.id}
              className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm"
            >
              <div>
                <div className="font-medium text-blue-900">
                  {p.username || p.email}
                </div>
                <div className="text-xs text-blue-700">{p.email}</div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "players",
                    watchedPlayers.filter((x: any) => x.id !== p.id),
                  )
                }
                className="text-blue-600 hover:text-blue-900 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Select banner
          </label>
          <Select
            onValueChange={(v) => setValue("bannerId", v)}
            defaultValue={watch("bannerId") || "none"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {banners.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.title || b.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time zone</label>
          <Select
            onValueChange={(v) => setValue("timeZone", v)}
            defaultValue={watch("timeZone") || TIMEZONES[0]}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            reset();
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initial
              ? "Update Event"
              : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
