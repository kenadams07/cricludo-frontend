import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input"; // adjust import path as needed
import { Button } from "@/components/ui/button"; // adjust import path as needed
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // adjust import path as needed

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

// These constants should be defined elsewhere in your project
// const GAME_TYPES = [...];
// const TOTAL_OVERS = [...];
// const STATUSES = [...];
// const PLAYER_LIMITS = [...];
// const TIMEZONES = [...];
// const API_URL = "...";
// const fetcher = ...;
// const GetRequest = ...;

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
      playerLimit: initial?.playerLimit || 2,
      players: initial?.players || [],
      gameType: initial?.gameType || GAME_TYPES[0].value,
      totalOver: initial?.totalOver || null,
      bannerId: initial?.bannerId || "",
      status: initial?.status || "upcoming",
      timeZone: initial?.timeZone || TIMEZONES[0],
    },
  });

  // Custom banner state – stores the base64 data of the uploaded image
  const [customBannerPreview, setCustomBannerPreview] = useState<string | null>(
    null,
  );
  const [customBannerError, setCustomBannerError] = useState<string | null>(
    null,
  );
  const [isCustomBannerLoading, setIsCustomBannerLoading] = useState(false);

  const selectedBannerId = watch("bannerId");

  // Reset custom banner when leaving "custom" selection
  useEffect(() => {
    if (selectedBannerId !== "custom") {
      setCustomBannerPreview(null);
      setCustomBannerError(null);
      setIsCustomBannerLoading(false);
    }
  }, [selectedBannerId]);

  // Handle file selection – convert to base64 and store preview
  const handleCustomBannerFileSelect = (file: File) => {
    setIsCustomBannerLoading(true);
    setCustomBannerError(null);

    // Validate file type and size (optional)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setCustomBannerError("Only JPEG, PNG, GIF, or WEBP images are allowed.");
      setIsCustomBannerLoading(false);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setCustomBannerError("Image size must be less than 5MB.");
      setIsCustomBannerLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomBannerPreview(reader.result as string);
      setIsCustomBannerLoading(false);
    };
    reader.onerror = () => {
      setCustomBannerError("Failed to read file.");
      setIsCustomBannerLoading(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (initial) {
      reset({
        name: initial.name || "",
        date: initial.date
          ? new Date(initial.date).toISOString().slice(0, 16)
          : "",
        playerLimit: initial.playerLimit || 2,
        players: initial.players || [],
        gameType: initial.gameType || GAME_TYPES[0].value,
        totalOver: initial.totalOver || null,
        bannerId: initial.bannerId || "",
        status: initial.status || "upcoming",
        timeZone: initial.timeZone || TIMEZONES[0],
      });
      // If editing, we don't preload a custom banner (could be added later)
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
    // Prevent submission if custom banner is still being processed
    if (selectedBannerId === "custom" && isCustomBannerLoading) {
      alert("Please wait for the banner image to finish loading.");
      return;
    }

    try {
      const payload: any = {
        ...values,
        date: values.date ? new Date(values.date).toISOString() : null,
      };

      if (payload.totalOver === "none") payload.totalOver = null;
      if (payload.bannerId === "none") payload.bannerId = "";
      if (payload.bannerId === "custom") {
        // If custom banner is selected, send the base64 data instead of bannerId
        if (customBannerPreview) {
          payload.customBanner = customBannerPreview; // base64 string
          payload.bannerId = "custom"; // Clear bannerId to indicate custom banner usage
        }
      }
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
      // Clear custom banner state after successful submit
      setCustomBannerPreview(null);
      setCustomBannerError(null);
      setIsCustomBannerLoading(false);
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
      {/* Event name and date fields (unchanged) */}
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

      {/* Player limit, game type, total overs, status (unchanged) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Player limit</label>
          <Select
            onValueChange={(v) => setValue("playerLimit", Number(v))}
            defaultValue={String(watch("playerLimit") || 2)}
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

      {/* Player search and list (unchanged) */}
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
                        const limit = Number(watch("playerLimit") || 2);
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

      {/* Banner selection and custom upload */}
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
              <SelectItem value="custom">+ Custom (upload image)</SelectItem>
            </SelectContent>
          </Select>

          {/* Custom banner upload UI */}
          {selectedBannerId === "custom" && (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  disabled={isCustomBannerLoading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleCustomBannerFileSelect(file);
                    }
                  }}
                />
                {isCustomBannerLoading && (
                  <div className="text-sm text-blue-600">Loading image...</div>
                )}
              </div>
              {customBannerError && (
                <div className="text-sm text-red-600">{customBannerError}</div>
              )}
              {customBannerPreview && !isCustomBannerLoading && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img
                    src={customBannerPreview}
                    alt="Custom banner preview"
                    className="max-h-32 rounded border object-contain"
                  />
                </div>
              )}
            </div>
          )}
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

      {/* Form buttons (unchanged) */}
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

export default CreateEventForm;
