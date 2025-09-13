"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Star, Search, Plus, Edit, Trash2 } from "lucide-react"
import { AnimeDetailModal } from "@/components/anime/anime-detail-modal"
import { AddAnimeModal } from "@/components/anime/add-anime-modal"

interface AnimeItem {
  id: string
  title: string
  status: "watching" | "completed" | "on-hold" | "dropped" | "plan-to-watch"
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

const initialAnimeList: AnimeItem[] = [
  {
    id: "1",
    title: "Attack on Titan",
    status: "completed",
    progress: 87,
    totalEpisodes: 87,
    rating: 9,
    genre: "Action",
    year: 2013,
    image: "/anime-poster.png",
    description:
      "Humanity fights for survival against giant humanoid Titans that have brought civilization to the brink of extinction.",
    studio: "Mappa",
    score: 9.0,
    popularity: 1,
    aired: "Apr 2013 - Nov 2023",
    duration: "24 min per ep",
  },
  {
    id: "2",
    title: "Demon Slayer",
    status: "watching",
    progress: 8,
    totalEpisodes: 11,
    genre: "Action",
    year: 2019,
    image: "/demon-slayer-anime-poster.png",
    description:
      "A young boy becomes a demon slayer to avenge his family and cure his sister who has been turned into a demon.",
    studio: "Ufotable",
    score: 8.7,
    popularity: 3,
    aired: "Apr 2019 - Present",
    duration: "24 min per ep",
  },
  {
    id: "3",
    title: "Jujutsu Kaisen",
    status: "plan-to-watch",
    progress: 0,
    totalEpisodes: 24,
    genre: "Action",
    year: 2020,
    image: "/jujutsu-kaisen-poster.png",
    description:
      "A high school student joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse named Ryomen Sukuna.",
    studio: "Mappa",
    score: 8.5,
    popularity: 2,
    aired: "Oct 2020 - Mar 2021",
    duration: "24 min per ep",
  },
  {
    id: "4",
    title: "Your Name",
    status: "completed",
    progress: 1,
    totalEpisodes: 1,
    rating: 10,
    genre: "Romance",
    year: 2016,
    image: "/your-name-anime-movie-poster.png",
    description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
    studio: "CoMix Wave Films",
    score: 8.4,
    popularity: 4,
    aired: "Aug 2016",
    duration: "106 min",
  },
  {
    id: "5",
    title: "One Piece",
    status: "on-hold",
    progress: 450,
    totalEpisodes: 1000,
    rating: 8,
    genre: "Adventure",
    year: 1999,
    image: "/anime-poster.png",
    description:
      "Monkey D. Luffy explores the Grand Line with his diverse crew of pirates, searching for the ultimate treasure known as 'One Piece'.",
    studio: "Toei Animation",
    score: 9.1,
    popularity: 5,
    aired: "Oct 1999 - Present",
    duration: "24 min per ep",
  },
]

export function AnimeList() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>(initialAnimeList)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("title")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredAnime = animeList.filter((anime) => {
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || anime.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const sortedAnime = [...filteredAnime].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "year":
        return b.year - a.year
      case "progress":
        return b.progress / b.totalEpisodes - a.progress / a.totalEpisodes
      default:
        return 0
    }
  })

  const handleAnimeClick = (anime: AnimeItem) => {
    setSelectedAnime(anime)
    setIsDetailModalOpen(true)
  }

  const handleAnimeUpdate = (animeId: string, updates: any) => {
    setAnimeList((prev) => prev.map((anime) => (anime.id === animeId ? { ...anime, ...updates } : anime)))
  }

  const handleAddAnime = (newAnime: any) => {
    const anime: AnimeItem = {
      ...newAnime,
      id: Date.now().toString(),
    }
    setAnimeList((prev) => [...prev, anime])
  }

  const handleRemoveAnime = (animeId: string) => {
    setAnimeList((prev) => prev.filter((anime) => anime.id !== animeId))
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "watching":
        return "Watching"
      case "completed":
        return "Completed"
      case "on-hold":
        return "On Hold"
      case "dropped":
        return "Dropped"
      case "plan-to-watch":
        return "Plan to Watch"
      default:
        return status
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Search and Filters */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
        <CardHeader>
          <CardTitle>My Anime List</CardTitle>
          <CardDescription>Manage your anime collection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search anime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="watching">Watching</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="dropped">Dropped</SelectItem>
                <SelectItem value="plan-to-watch">Plan to Watch</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Anime
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Anime Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedAnime.map((anime) => (
          <Card
            key={anime.id}
            className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAnimeClick(anime)}
          >
            <div className="aspect-[3/4] relative">
              <img src={anime.image || "/placeholder.svg"} alt={anime.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor(anime.status)}>{getStatusLabel(anime.status)}</Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">{anime.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {anime.genre} • {anime.year}
                  </span>
                  {anime.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{anime.rating}/10</span>
                    </div>
                  )}
                </div>

                {anime.status !== "plan-to-watch" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>
                        {anime.progress}/{anime.totalEpisodes}
                      </span>
                    </div>
                    <Progress value={(anime.progress / anime.totalEpisodes) * 100} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAnimeClick(anime)
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveAnime(anime.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedAnime.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No anime found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false)
            setSelectedAnime(null)
          }}
          onUpdate={handleAnimeUpdate}
        />
      )}

      <AddAnimeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddAnime} />
    </div>
  )
}
