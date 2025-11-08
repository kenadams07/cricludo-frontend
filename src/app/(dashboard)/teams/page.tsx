"use client"

import { useEffect, useMemo, useState } from "react"
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
import { GripVertical, Loader2, Plus, RefreshCw, Save } from "lucide-react"
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
              onReorder={handleReorderPlayers}
              onUpdatePlayer={handleUpdatePlayer}
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
        <Badge variant="outline" className="uppercase">
          {gameLabel}
        </Badge>
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
  onReorder,
  onUpdatePlayer,
}: {
  team: Team
  onReorder: (teamId: string, players: TeamPlayer[]) => Promise<void>
  onUpdatePlayer: (
    teamId: string,
    playerId: string,
    updates: Partial<Omit<TeamPlayer, "_id" | "position">>
  ) => Promise<void>
}) {
  const formatPlayers = (list: (TeamPlayer | PlayerDraft)[]): PlayerDraft[] =>
    list.map((player) => ({
      ...player,
      nameDraft: player.name ?? "",
      jerseyDraft:
        player.jerseyNumber === null || player.jerseyNumber === undefined
          ? ""
          : String(player.jerseyNumber),
    }))

  const [players, setPlayers] = useState<PlayerDraft[]>(() => formatPlayers(team.players))
  const [savingPlayerId, setSavingPlayerId] = useState<string | null>(null)
  const [isReordering, setIsReordering] = useState(false)

  useEffect(() => {
    setPlayers(formatPlayers(team.players))
  }, [team.players])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

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

  const handleUpdatePlayer = async (
    playerId: string,
    updates: { name: string; jerseyNumber: number | null }
  ) => {
    if (updates.jerseyNumber !== null && updates.jerseyNumber !== undefined) {
      const hasDuplicate = players.some(
        (player) => player._id !== playerId && player.jerseyNumber === updates.jerseyNumber
      )
      if (hasDuplicate) {
        toast.error("Jersey number must be unique within the team.")
        return
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

    try {
      await onUpdatePlayer(team._id, playerId, updates)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update player details."
      toast.error(message)
      setPlayers(previous)
    } finally {
      setSavingPlayerId(null)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-2 border-b px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{team.name}</h2>
            <p className="text-sm text-muted-foreground">
              Drag to reorder players. Positions update automatically.
            </p>
          </div>
          {isReordering && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving order...
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="rounded-md border bg-muted/40">
          <div className="grid grid-cols-[auto_48px_1fr_120px_auto] items-center gap-3 border-b px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">
            <span />
            <span>Pos</span>
            <span>Name</span>
            <span>Jersey #</span>
            <span />
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
                  onSave={handleUpdatePlayer}
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
  onSave: (playerId: string, updates: { name: string; jerseyNumber: number | null }) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortableItem(
    player._id
  )

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const [name, setName] = useState(player.nameDraft)
  const [jersey, setJersey] = useState(player.jerseyDraft)

  useEffect(() => {
    setName(player.nameDraft)
    setJersey(player.jerseyDraft)
  }, [player.nameDraft, player.jerseyDraft])

  const baseName = player.name ?? ""
  const baseJersey =
    player.jerseyNumber === null || player.jerseyNumber === undefined
      ? ""
      : String(player.jerseyNumber)

  const hasChanges = name.trim() !== baseName.trim() || jersey !== baseJersey

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "grid grid-cols-[auto_48px_1fr_120px_auto] items-center gap-3 border-b px-4 py-3 last:border-b-0",
        isDragging ? "bg-background shadow-md" : "bg-background/60"
      )}
    >
      <button
        className="flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed"
        {...attributes}
        {...listeners}
        disabled={disabled}
        aria-label="Drag player"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="text-sm font-medium">{player.position}</span>
      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Player name"
        disabled={disabled}
      />
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
        disabled={disabled}
      />
      <Button
        size="sm"
        onClick={() =>
          onSave(player._id, {
            name: name.trim(),
            jerseyNumber: jersey === "" ? null : Number(jersey),
          })
        }
        disabled={!hasChanges || disabled || isSaving}
      >
        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save
      </Button>
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

