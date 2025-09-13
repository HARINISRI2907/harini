"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Plus, Minus, Calendar, Clock, Users, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AnimeDetailModalProps {
  anime: {
    id: string
    title: string
    status: string
    progress: number
    totalEpisodes: number
    rating?: number
    genre: string
    year: number
    image: string
    description?: string
    studio?: string
    score?: number
    popularity?: number
    aired?: string
    duration?: string
  }
  isOpen: boolean
  onClose: () => void
  onUpdate: (animeId: string, updates: any) => void
}

export function AnimeDetailModal({ anime, isOpen, onClose, onUpdate }: AnimeDetailModalProps) {
  const [currentStatus, setCurrentStatus] = useState(anime.status)
  const [currentProgress, setCurrentProgress] = useState(anime.progress)
  const [currentRating, setCurrentRating] = useState(anime.rating || 0)
  const [review, setReview] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    onUpdate(anime.id, {
      status: currentStatus,
      progress: currentProgress,
      rating: currentRating,
      review,
    })
    toast({
      title: "Anime updated",
      description: `${anime.title} has been updated successfully.`,
    })
    setIsEditing(false)
  }

  const incrementProgress = () => {
    if (currentProgress < anime.totalEpisodes) {
      setCurrentProgress(currentProgress + 1)
      if (currentProgress + 1 === anime.totalEpisodes && currentStatus === "watching") {
        setCurrentStatus("completed")
      }
    }
  }

  const decrementProgress = () => {
    if (currentProgress > 0) {
      setCurrentProgress(currentProgress - 1)
      if (currentStatus === "completed" && currentProgress - 1 < anime.totalEpisodes) {
        setCurrentStatus("watching")
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "watching":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "dropped":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "plan-to-watch":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 cursor-pointer transition-colors ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
            }`}
            onClick={interactive ? () => setCurrentRating(star) : undefined}
          />
        ))}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{anime.title}</DialogTitle>
          <DialogDescription>
            {anime.genre} • {anime.year} • {anime.studio || "Studio Unknown"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Anime Poster */}
          <div className="space-y-4">
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
              <img src={anime.image || "/placeholder.svg"} alt={anime.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge className={getStatusColor(currentStatus)}>
                  {currentStatus.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Score</span>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="font-bold">{anime.score || "N/A"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Popularity</span>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>#{anime.popularity || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details and Controls */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Synopsis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {anime.description ||
                  "An epic tale of adventure, friendship, and personal growth. Follow the journey of unforgettable characters as they face challenges that will test their resolve and change their lives forever."}
              </p>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Aired</div>
                  <div className="text-sm font-medium">{anime.aired || `${anime.year}`}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                  <div className="text-sm font-medium">{anime.duration || "24 min per ep"}</div>
                </div>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="space-y-4">
              <h3 className="font-semibold">Progress Tracking</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Episodes Watched</Label>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={decrementProgress} disabled={currentProgress === 0}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="min-w-[60px] text-center">
                      {currentProgress} / {anime.totalEpisodes}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={incrementProgress}
                      disabled={currentProgress === anime.totalEpisodes}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Progress value={(currentProgress / anime.totalEpisodes) * 100} className="h-2" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={currentStatus} onValueChange={setCurrentStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="watching">Watching</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="dropped">Dropped</SelectItem>
                        <SelectItem value="plan-to-watch">Plan to Watch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="episodes">Episodes</Label>
                    <Input
                      id="episodes"
                      type="number"
                      min="0"
                      max={anime.totalEpisodes}
                      value={currentProgress}
                      onChange={(e) => setCurrentProgress(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <Label>Your Rating</Label>
              <div className="flex items-center gap-3">
                {renderStars(currentRating, true)}
                <span className="text-sm font-medium">{currentRating}/10</span>
              </div>
            </div>

            {/* Review */}
            <div className="space-y-3">
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                placeholder="Share your thoughts about this anime..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1">
                Save Changes
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
