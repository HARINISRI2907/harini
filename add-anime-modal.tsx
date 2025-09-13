"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddAnimeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (anime: any) => void
}

const mockSearchResults = [
  {
    id: "search-1",
    title: "Frieren: Beyond Journey's End",
    genre: "Fantasy",
    year: 2023,
    totalEpisodes: 28,
    score: 9.2,
    image: "/frieren-anime-poster.png",
    description: "An elf mage embarks on a journey to understand humans and mortality.",
  },
  {
    id: "search-2",
    title: "Chainsaw Man",
    genre: "Action",
    year: 2022,
    totalEpisodes: 12,
    score: 8.8,
    image: "/chainsaw-man-poster.png",
    description: "A young man becomes a devil hunter to pay off his father's debt.",
  },
  {
    id: "search-3",
    title: "Spy x Family",
    genre: "Comedy",
    year: 2022,
    totalEpisodes: 25,
    score: 9.0,
    image: "/spy-family-poster.png",
    description: "A spy must create a fake family to complete his mission.",
  },
]

export function AddAnimeModal({ isOpen, onClose, onAdd }: AddAnimeModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("plan-to-watch")
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const filtered = mockSearchResults.filter((anime) => anime.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(filtered)
      setIsSearching(false)
    }, 1000)
  }

  const handleAddAnime = (anime: any) => {
    const newAnime = {
      ...anime,
      status: selectedStatus,
      progress: selectedStatus === "completed" ? anime.totalEpisodes : 0,
      rating: undefined,
    }

    onAdd(newAnime)
    toast({
      title: "Anime added",
      description: `${anime.title} has been added to your list.`,
    })
    onClose()
    setSearchTerm("")
    setSearchResults([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Anime to Your List</DialogTitle>
          <DialogDescription>Search for anime and add them to your collection</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for anime..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            <div>
              <Label htmlFor="default-status">Default Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Search Results</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchResults.map((anime) => (
                  <Card key={anime.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-20 flex-shrink-0">
                          <img
                            src={anime.image || "/placeholder.svg"}
                            alt={anime.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{anime.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary">{anime.genre}</Badge>
                                <span className="text-sm text-muted-foreground">{anime.year}</span>
                                <span className="text-sm text-muted-foreground">{anime.totalEpisodes} eps</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{anime.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                {anime.score}
                              </Badge>
                              <Button size="sm" onClick={() => handleAddAnime(anime)}>
                                <Plus className="h-3 w-3 mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {searchTerm && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No anime found matching "{searchTerm}"</p>
              <p className="text-sm mt-1">Try searching for "Frieren", "Chainsaw Man", or "Spy x Family"</p>
            </div>
          )}

          {!searchTerm && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Search for anime to add to your list</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
