"use client"

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react"
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Loader2, Pencil, Plus, RefreshCw, Save, Trash2, UploadCloud, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { cn } from "@/lib/utils"

import {
  Team,
  TeamPlayer,
  reorderTeamPlayers,
  updateTeamPlayer,
  updateTeamDetails,
  UpdateTeamPayload,
  uploadTeamFlag,
  useCreateTeam,
  useTeams,
} from "@/hooks/useTeams"

const GAME_OPTIONS = [
  { label: "Cricket", value: "cricket" },
] as const

type GameValue = (typeof GAME_OPTIONS)[number]["value"]

type PlayerDraft = TeamPlayer & {
  nameDraft: string
  jerseyDraft: string
}

export default function TeamsPage() {
  const [selectedGame, setSelectedGame] = useState<GameValue>(GAME_OPTIONS[0].value)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null)

  const {
    data: teamsData,
    isLoading,
    error,
    mutate: mutateTeams,
    isValidating,
  } = useTeams(selectedGame)
  const { trigger: createTeam, isMutating: isCreatingTeam } = useCreateTeam()

  const teams = useMemo<Team[]>(() => {
    if (!Array.isArray(teamsData)) return []
    return teamsData.map((team) => ({
      ...team,
      players: [...team.players].sort((a, b) => a.position - b.position),
    }))
  }, [teamsData])

  const selectedGameLabel = useMemo(() => {
    const match = GAME_OPTIONS.find((option) => option.value === selectedGame)
    return match ? match.label : selectedGame
  }, [selectedGame])

  const activeTeam = useMemo(() => {
    if (!activeTeamId) return null
    return teams.find((team) => team._id === activeTeamId) ?? null
  }, [teams, activeTeamId])

  const handleCreateTeam = async () => {
    const trimmedName = teamName.trim()
    if (!trimmedName) {
      toast.error("Please provide a team name.")
      return
    }

    try {
      await createTeam({ name: trimmedName, game: selectedGame })
      toast.success("Team created successfully.")
      setTeamName("")
      setIsDialogOpen(false)
      await mutateTeams()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create team."
      toast.error(message)
    }
  }

  const replaceTeamInCache = async (updatedTeam: Team) => {
    await mutateTeams(
      (current) => {
        if (!current) return current
        return current.map((team) => (team._id === updatedTeam._id ? updatedTeam : team))
      },
      false
    )
    return updatedTeam
  }

  const handleUpdateTeamDetails = async (teamId: string, updates: UpdateTeamPayload) => {
    const cleanedUpdates = Object.fromEntries(
      Object.entries(updates ?? {}).filter(([, value]) => value !== undefined)
    )

    if (Object.keys(cleanedUpdates).length === 0) {
      return teams.find((team) => team._id === teamId) ?? null
    }

    const updatedTeam = await updateTeamDetails(teamId, cleanedUpdates as UpdateTeamPayload)
    await replaceTeamInCache(updatedTeam)
    return updatedTeam
  }

  const handleUploadFlag = async (teamId: string, file: File) => {
    const updatedTeam = await uploadTeamFlag(teamId, file)
    await replaceTeamInCache(updatedTeam)
    return updatedTeam
  }

  const handleReorderPlayers = async (teamId: string, players: TeamPlayer[]) => {
    try {
      await reorderTeamPlayers(
        teamId,
        players.map((player) => ({
          _id: player._id,
          position: player.position,
        }))
      )
      await mutateTeams()
      toast.success("Player order updated.")
    } catch (err) {
      throw err
    }
  }

  const handleUpdatePlayer = async (
    teamId: string,
    playerId: string,
    updates: Partial<Omit<TeamPlayer, "_id" | "position">>
  ) => {
    try {
      await updateTeamPlayer(teamId, playerId, updates)
      await mutateTeams()
      toast.success("Player updated.")
    } catch (err) {
      throw err
    }
  }

  const handleRetry = () => {
    mutateTeams()
  }

  const closeTeamManager = () => setActiveTeamId(null)

  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Teams</h1>
            <p className="text-sm text-muted-foreground">
              Select a game, create teams, and manage player lineups.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="game-select"
                className="text-sm font-medium text-muted-foreground"
              >
                Game
              </Label>
              <Select
                value={selectedGame}
                onValueChange={(value) => {
                  setSelectedGame(value as GameValue)
                  setActiveTeamId(null)
                }}
              >
                <SelectTrigger id="game-select" className="min-w-[160px]">
                  <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent>
                  {GAME_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                disabled={isLoading || isValidating}
              >
                <RefreshCw className={cn("h-4 w-4", isValidating ? "animate-spin" : "")} />
                Refresh
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4" />
                    Add Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create a new team</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="team-name">Team name</Label>
                      <Input
                        id="team-name"
                        placeholder="e.g. India"
                        value={teamName}
                        onChange={(event) => setTeamName(event.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={isCreatingTeam}
                    >
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleCreateTeam} disabled={isCreatingTeam}>
                      {isCreatingTeam && <Loader2 className="h-4 w-4 animate-spin" />}
                      Create Team
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle>Unable to load teams</CardTitle>
              <CardDescription>
                {error instanceof Error
                  ? error.message
                  : "An unexpected error occurred while fetching teams."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleRetry} variant="destructive">
                Try again
              </Button>
            </CardContent>
          </Card>
        ) : teams.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No teams yet</CardTitle>
              <CardDescription>
                Create your first {selectedGameLabel.toLowerCase()} team to start managing players and
                positions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Team
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {teams.map((team) => (
              <TeamListCard key={team._id} team={team} onManage={() => setActiveTeamId(team._id)} />
            ))}
          </div>
        )}
      </div>

      <Sheet open={!!activeTeam} onOpenChange={(open) => (!open ? closeTeamManager() : null)}>
        <SheetContent
          side="right"
          className="flex h-full w-full max-w-none flex-col overflow-hidden border-l p-0 sm:max-w-full lg:max-w-5xl"
        >
          {activeTeam && (
            <TeamManager
              key={activeTeam._id}
              team={activeTeam}
              teams={teams}
              onReorder={handleReorderPlayers}
              onUpdatePlayer={handleUpdatePlayer}
              onUpdateTeam={handleUpdateTeamDetails}
              onUploadFlag={handleUploadFlag}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

function TeamListCard({ team, onManage }: { team: Team; onManage: () => void }) {
  const configuredPlayers = team.players.filter(
    (player) => player.name && player.name.trim().length > 0
  ).length

  const gameLabel = team.game.charAt(0).toUpperCase() + team.game.slice(1)

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle>{team.name}</CardTitle>
          <CardDescription>
            {configuredPlayers} of 11 players configured · Positions locked in order
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="uppercase">
            {gameLabel}
          </Badge>
          {team.isParentTeam && <Badge variant="secondary">Parent</Badge>}
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          Last updated lineup remains hidden until you manage this team.
        </div>
        <Button size="sm" onClick={onManage}>
          Manage players
        </Button>
      </CardContent>
    </Card>
  )
}

function TeamManager({
  team,
  teams,
  onReorder,
  onUpdatePlayer,
  onUpdateTeam,
  onUploadFlag,
}: {
  team: Team
  teams: Team[]
  onReorder: (teamId: string, players: TeamPlayer[]) => Promise<void>
  onUpdatePlayer: (
    teamId: string,
    playerId: string,
    updates: Partial<Omit<TeamPlayer, "_id" | "position">>
  ) => Promise<void>
  onUpdateTeam: (teamId: string, updates: UpdateTeamPayload) => Promise<Team | null>
  onUploadFlag: (teamId: string, file: File) => Promise<Team | null>
}) {
  const alternateCandidates = useMemo(
    () => teams.filter((candidate) => candidate._id !== team._id && candidate.game === team.game),
    [teams, team._id, team.game]
  )

  const formatPlayers = (list: (TeamPlayer | PlayerDraft)[]): PlayerDraft[] =>
    list.map((player) => ({
      ...player,
      nameDraft: player.name ?? "",
      jerseyDraft:
        player.jerseyNumber === null || player.jerseyNumber === undefined
          ? ""
          : String(player.jerseyNumber),
    }))

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [teamName, setTeamName] = useState(team.name)
  const [alternateTeamId, setAlternateTeamId] = useState<string>(team.alternateTeam?._id ?? "none")
  const [isParentTeam, setIsParentTeam] = useState<boolean>(Boolean(team.isParentTeam))
  const [players, setPlayers] = useState<PlayerDraft[]>(() => formatPlayers(team.players))
  const [savingPlayerId, setSavingPlayerId] = useState<string | null>(null)
  const [isReordering, setIsReordering] = useState(false)
  const [isSavingDetails, setIsSavingDetails] = useState(false)
  const [isUploadingFlag, setIsUploadingFlag] = useState(false)
  const [isRemovingFlag, setIsRemovingFlag] = useState(false)

  useEffect(() => {
    setPlayers(formatPlayers(team.players))
  }, [team.players])

  useEffect(() => {
    setTeamName(team.name)
    setAlternateTeamId(team.alternateTeam?._id ?? "none")
    setIsParentTeam(Boolean(team.isParentTeam))
  }, [team._id, team.name, team.alternateTeam?._id, team.isParentTeam])

  const trimmedTeamName = teamName.trim()
  const hasNameChanged = trimmedTeamName !== team.name.trim()
  const hasAlternateChanged =
    (alternateTeamId === "none" && !!team.alternateTeam) ||
    (alternateTeamId !== "none" && team.alternateTeam?._id !== alternateTeamId)
  const hasParentChanged = isParentTeam !== Boolean(team.isParentTeam)
  const hasDetailsChanges = hasNameChanged || hasAlternateChanged || hasParentChanged

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleSaveDetails = async () => {
    const payload: UpdateTeamPayload = {}

    if (hasNameChanged) {
      if (!trimmedTeamName) {
        toast.error("Team name cannot be empty.")
        return
      }
      payload.name = trimmedTeamName
    }

    if (hasAlternateChanged) {
      payload.alternateTeamId = alternateTeamId === "none" ? null : alternateTeamId
    }

    if (hasParentChanged) {
      payload.isParentTeam = isParentTeam
    }

    if (Object.keys(payload).length === 0) {
      return
    }

    try {
      setIsSavingDetails(true)
      await onUpdateTeam(team._id, payload)
      toast.success("Team details updated.")
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update team details."
      toast.error(message)
    } finally {
      setIsSavingDetails(false)
    }
  }

  const handleFlagInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file for the flag.")
      event.target.value = ""
      return
    }

    try {
      setIsUploadingFlag(true)
      await onUploadFlag(team._id, file)
      toast.success("Team flag updated.")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to upload team flag."
      toast.error(message)
    } finally {
      setIsUploadingFlag(false)
      event.target.value = ""
    }
  }

  const handleRemoveFlag = async () => {
    try {
      setIsRemovingFlag(true)
      await onUpdateTeam(team._id, { flagKey: null })
      toast.success("Team flag removed.")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to remove team flag."
      toast.error(message)
    } finally {
      setIsRemovingFlag(false)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setPlayers((current) => {
      const oldIndex = current.findIndex((player) => player._id === active.id)
      const newIndex = current.findIndex((player) => player._id === over.id)
      if (oldIndex === -1 || newIndex === -1) return current

      const previous = current.map((player) => ({ ...player }))
      const reordered = arrayMove(current, oldIndex, newIndex).map((player, index) => ({
        ...player,
        position: index + 1,
      }))

      setIsReordering(true)
      onReorder(
        team._id,
        reordered.map((player) => ({
          _id: player._id,
          name: player.name,
          jerseyNumber: player.jerseyNumber,
          position: player.position,
        }))
      )
        .then(() => {
          setPlayers(formatPlayers(reordered))
        })
        .catch((err: unknown) => {
          const message =
            err instanceof Error ? err.message : "Failed to update player order."
          toast.error(message)
          setPlayers(previous)
        })
        .finally(() => {
          setIsReordering(false)
        })

      return reordered
    })
  }

  const handleUpdatePlayerDetails = async (
    playerId: string,
    updates: { name: string; jerseyNumber: number | null }
  ) => {
    if (updates.jerseyNumber !== null && updates.jerseyNumber !== undefined) {
      const hasDuplicate = players.some(
        (player) => player._id !== playerId && player.jerseyNumber === updates.jerseyNumber
      )
      if (hasDuplicate) {
        toast.error("Jersey number must be unique within the team.")
        return false
      }
    }

    const previous = players.map((player) => ({ ...player }))
    setSavingPlayerId(playerId)
    setPlayers((current) =>
      current.map((player) =>
        player._id === playerId
          ? {
              ...player,
              name: updates.name,
              jerseyNumber: updates.jerseyNumber,
              nameDraft: updates.name,
              jerseyDraft:
                updates.jerseyNumber === null || updates.jerseyNumber === undefined
                  ? ""
                  : String(updates.jerseyNumber),
            }
          : player
      )
    )

    let wasSuccessful = false

    try {
      await onUpdatePlayer(team._id, playerId, updates)
      wasSuccessful = true
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update player details."
      toast.error(message)
      setPlayers(previous)
    } finally {
      setSavingPlayerId(null)
    }

    return wasSuccessful
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-6 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">{team.name}</h2>
            <p className="text-sm text-muted-foreground">
              Update team details, manage alternate assignment, and configure player lineup.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid flex-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="team-name-input">Team name</Label>
                <Input
                  id="team-name-input"
                  value={teamName}
                  onChange={(event) => setTeamName(event.target.value)}
                  placeholder="Team name"
                  disabled={isSavingDetails}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Alternate team</Label>
                <Select
                  value={alternateTeamId}
                  onValueChange={(value) => setAlternateTeamId(value)}
                  disabled={isSavingDetails}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select alternate team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No alternate team</SelectItem>
                    {alternateCandidates.map((candidate) => (
                      <SelectItem key={candidate._id} value={candidate._id}>
                        {candidate.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md border px-3 py-4 md:col-span-2">
                <div className="space-y-1">
                  <Label htmlFor="parent-team-toggle">Parent team</Label>
                  <p className="text-xs text-muted-foreground"> Mark this team as the **primary parent variant** for its game. </p>
                    <p className="text-xs text-muted-foreground"> Unselected teams will be considered **alternates**. </p>
                    <p className="text-xs text-muted-foreground"> Teams that are not selected <span className="text-red-500"> **will not be visible** </span> in the team selection list on mobile view.</p>
                </div>
                <Checkbox
                  id="parent-team-toggle"
                  checked={isParentTeam}
                  onCheckedChange={(value) => setIsParentTeam(Boolean(value))}
                  disabled={isSavingDetails}
                  className="size-5 rounded-full"
                />
              </div>
            </div>
            <Button
              onClick={handleSaveDetails}
              disabled={
                !hasDetailsChanges || isSavingDetails || (hasNameChanged && !trimmedTeamName)
              }
            >
              {isSavingDetails ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save details
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-16 w-24 overflow-hidden rounded-md border bg-muted">
                {team.flagUrl ? (
                  <img
                    src={team.flagUrl}
                    alt={`${team.name} flag`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    No flag uploaded
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFlagInputChange}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingFlag || isRemovingFlag}
                >
                  {isUploadingFlag ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <UploadCloud className="mr-2 h-4 w-4" />
                  )}
                  {isUploadingFlag ? "Uploading..." : "Upload flag"}
                </Button>
                {team.flagKey && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleRemoveFlag}
                    disabled={isUploadingFlag || isRemovingFlag}
                  >
                    {isRemovingFlag ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Remove
                  </Button>
                )}
              </div>
            </div>
            {isReordering && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving order...
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="rounded-md border bg-muted/40">
          <div className="grid grid-cols-[auto_48px_1fr_120px_160px] items-center gap-3 border-b px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
            <span />
            <span>Pos</span>
            <span>Name</span>
            <span>Jersey #</span>
            <span className="text-right">Actions</span>
          </div>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={players.map((player) => player._id)}
              strategy={verticalListSortingStrategy}
            >
              {players.map((player) => (
                <SortablePlayerRow
                  key={player._id}
                  player={player}
                  disabled={isReordering || savingPlayerId === player._id}
                  isSaving={savingPlayerId === player._id}
                  onSave={handleUpdatePlayerDetails}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  )
}

function SortablePlayerRow({
  player,
  disabled,
  isSaving,
  onSave,
}: {
  player: PlayerDraft
  disabled: boolean
  isSaving: boolean
  onSave: (playerId: string, updates: { name: string; jerseyNumber: number | null }) => Promise<boolean>
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortableItem(
    player._id
  )

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(player.nameDraft)
  const [jersey, setJersey] = useState(player.jerseyDraft)

  useEffect(() => {
    if (!isEditing) {
      setName(player.nameDraft)
      setJersey(player.jerseyDraft)
    }
  }, [player.nameDraft, player.jerseyDraft, isEditing])

  const baseName = player.name ?? ""
  const baseJersey =
    player.jerseyNumber === null || player.jerseyNumber === undefined
      ? ""
      : String(player.jerseyNumber)

  const hasChanges = name.trim() !== baseName.trim() || jersey !== baseJersey
  const isActionDisabled = disabled || isSaving

  const handleSave = async () => {
    if (!hasChanges || isActionDisabled) {
      return
    }

    const success = await onSave(player._id, {
      name: name.trim(),
      jerseyNumber: jersey === "" ? null : Number(jersey),
    })

    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setName(player.nameDraft)
    setJersey(player.jerseyDraft)
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "grid grid-cols-[auto_48px_1fr_120px_160px] items-center gap-3 border-b px-4 py-3 last:border-b-0",
        isDragging ? "bg-background shadow-md" : "bg-background/60"
      )}
    >
      <button
        className="flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed"
        {...attributes}
        {...listeners}
        disabled={isActionDisabled || isEditing}
        aria-label="Drag player"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="text-sm font-medium">{player.position}</span>
      {isEditing ? (
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Player name"
          disabled={isActionDisabled}
        />
      ) : (
        <span className="text-sm">
          {player.name && player.name.trim().length > 0 ? (
            player.name
          ) : (
            <span className="text-muted-foreground">Unnamed player</span>
          )}
        </span>
      )}
      {isEditing ? (
        <Input
          type="number"
          min={0}
          max={999}
          value={jersey}
          onChange={(event) => {
            const value = event.target.value
            if (value === "" || /^\d{0,3}$/.test(value)) {
              setJersey(value)
            }
          }}
          placeholder="Jersey #"
          disabled={isActionDisabled}
        />
      ) : (
        <span className="text-sm text-muted-foreground">
          {player.jerseyNumber === null || player.jerseyNumber === undefined
            ? "—"
            : player.jerseyNumber}
        </span>
      )}
      <div className="flex items-center justify-end gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isActionDisabled}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges || isActionDisabled}
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            disabled={isActionDisabled}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </div>
    </div>
  )
}

function useSortableItem(id: string) {
  return useSortable({
    id,
    transition: {
      duration: 200,
      easing: "ease",
    },
  })
}

