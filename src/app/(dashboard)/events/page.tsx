"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { API_URL } from "@/lib/config";
import { fetcher, GetRequest } from "@/lib/fetcher";

const GAME_TYPES = [
  { value: "cricket", label: "Cricludo" },
  { value: "classic", label: "Classic Ludo" },
];
// categories removed — events are always online
const PLAYER_LIMITS = [2, 3, 4];
const TOTAL_OVERS = ["super over", "T5", "T10", "T20", "ODI", "Test"];
const TIMEZONES = ["IST", "GMT", "UTC", "EST", "PST"];

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    // load banners
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

  // CreateEventForm component will handle creating an event

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => setIsDialogOpen(open)}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditingEvent(null)}>Add Event</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
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

      <div className="grid gap-4">
        {loadingEvents ? (
          <div>Loading events…</div>
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
          events.map((ev: any) => (
            <Card key={ev.id || ev._id}>
              <CardContent className="flex items-center gap-4">
                <img
                  src={ev.bannerUrl || ev.imageUrl || "/placeholder.png"}
                  alt={ev.name}
                  className="w-32 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{ev.name || ev.id}</div>
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
                  <div className="text-sm text-muted-foreground">
                    {(ev.players || []).length} players · {ev.gameType}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
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
  // zod schema for validation
  const schema = z.object({
    name: z.string().min(2, "Name is required"),
    date: z.string().min(1, "Date is required"),
    playerLimit: z.number().min(2).max(4),
    players: z.array(z.string()).optional(),
    gameType: z.string(),
    totalOver: z.string().nullable().optional(),
    bannerId: z.string().optional(),
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
      // normalize placeholder values
      if (payload.totalOver === "none") payload.totalOver = null;
      if (payload.bannerId === "none") payload.bannerId = "";
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

  // simple add player input handler — uses DOM input (not controlled here)
  function handleAddPlayerFromInput(inputEl?: HTMLInputElement) {
    const v = inputEl?.value?.trim();
    if (!v) return;
    const cur = watchedPlayers as string[];
    if (cur.includes(v)) return;
    if ((cur.length || 0) >= Number((watch("playerLimit") as any) || 4))
      return alert("Player limit reached");
    setValue("players", [...cur, v]);
    if (inputEl) inputEl.value = "";
  }

  // debounce search for players
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Player limit</label>
          <Select
            onValueChange={(v) => setValue("playerLimit", Number(v))}
            defaultValue={String(4)}
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
            defaultValue={GAME_TYPES[0].value}
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

        <div>
          <label className="block text-sm font-medium mb-1">Total over</label>
          <Select
            onValueChange={(v) => setValue("totalOver", v)}
            defaultValue={"none"}
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
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">
          Search / Add Players
        </label>
        <div className="flex gap-2 relative">
          <Input
            id="player-search-input"
            value={playerSearch}
            onChange={(e) => setPlayerSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddPlayerFromInput(
                  document.getElementById(
                    "player-search-input",
                  ) as HTMLInputElement,
                );
              }
            }}
            placeholder="Search players by name or email, or paste id"
          />
          <Button
            type="button"
            onClick={() =>
              handleAddPlayerFromInput(
                document.getElementById(
                  "player-search-input",
                ) as HTMLInputElement,
              )
            }
            variant="outline"
          >
            Add
          </Button>

          {searchResults.length > 0 && (
            <div className="absolute z-10 top-full left-0 right-0 bg-white border rounded mt-1 max-h-48 overflow-auto">
              {searchLoading ? (
                <div className="p-2">Searching…</div>
              ) : (
                searchResults.map((u) => (
                  <div
                    key={u._id}
                    className="p-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">
                        {u.firstName || u.email}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {u.email}
                      </div>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        onClick={() => {
                          const limit = Number(
                            (watch("playerLimit") as any) || 4,
                          );
                          if ((watchedPlayers || []).length >= limit)
                            return alert(`Player limit reached (${limit})`);
                          if (watchedPlayers.includes(u._id)) return;
                          setValue("players", [...watchedPlayers, u._id]);
                          setPlayerSearch("");
                          setSearchResults([]);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {watchedPlayers.map((p: string) => (
            <div
              key={p}
              className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm"
            >
              <span>{p}</span>
              <button
                type="button"
                onClick={() =>
                  setValue(
                    "players",
                    watchedPlayers.filter((x: string) => x !== p),
                  )
                }
                className="text-xs text-red-600"
              >
                x
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
            defaultValue={"none"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {banners.map((b) => (
                <SelectItem value={b.id}>{b.title || b.id}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time zone</label>
          <Input list="tz-list" {...register("timeZone")} />
          <datalist id="tz-list">
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
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
          {isSubmitting ? "Saving..." : initial ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
