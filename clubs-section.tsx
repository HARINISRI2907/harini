"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Plus, Crown, MessageSquare } from "lucide-react"

interface Club {
  id: string
  name: string
  description: string
  memberCount: number
  category: string
  isPrivate: boolean
  owner: {
    username: string
    avatar: string
  }
  image: string
  createdAt: string
  lastActivity: string
  isJoined: boolean
}

const mockClubs: Club[] = [
  {
    id: "1",
    name: "Studio Ghibli Enthusiasts",
    description:
      "A community dedicated to discussing the magical worlds created by Studio Ghibli. From Spirited Away to Princess Mononoke, we explore the artistry and storytelling that makes these films timeless.",
    memberCount: 1234,
    category: "Studio",
    isPrivate: false,
    owner: {
      username: "ghibli_master",
      avatar: "/user-avatar-1.png",
    },
    image: "/ghibli-club-avatar.png",
    createdAt: "2023-06-15",
    lastActivity: "2 hours ago",
    isJoined: true,
  },
  {
    id: "2",
    name: "Shonen Action Heroes",
    description:
      "For fans of action-packed shonen anime! Discuss your favorite battles, power systems, and character development in series like Dragon Ball, Naruto, One Piece, and more.",
    memberCount: 2567,
    category: "Genre",
    isPrivate: false,
    owner: {
      username: "action_fan",
      avatar: "/user-avatar-2.png",
    },
    image: "/shonen-club-avatar.png",
    createdAt: "2023-05-20",
    lastActivity: "1 hour ago",
    isJoined: false,
  },
  {
    id: "3",
    name: "Slice of Life Society",
    description:
      "Appreciating the beauty of everyday moments in anime. Join us for discussions about heartwarming stories, character relationships, and the subtle art of slice-of-life storytelling.",
    memberCount: 890,
    category: "Genre",
    isPrivate: false,
    owner: {
      username: "peaceful_viewer",
      avatar: "/user-avatar-3.png",
    },
    image: "/slice-of-life-club-avatar.png",
    createdAt: "2023-07-10",
    lastActivity: "3 hours ago",
    isJoined: true,
  },
  {
    id: "4",
    name: "Mecha Pilots United",
    description:
      "Giant robots, epic battles, and complex storylines. Discuss Gundam, Evangelion, Code Geass, and other mecha series that have shaped the genre.",
    memberCount: 1456,
    category: "Genre",
    isPrivate: true,
    owner: {
      username: "mecha_pilot",
      avatar: "/user-avatar-4.png",
    },
    image: "/mecha-club-avatar.png",
    createdAt: "2023-04-05",
    lastActivity: "30 minutes ago",
    isJoined: false,
  },
]

export function ClubsSection() {
  const [clubs, setClubs] = useState<Club[]>(mockClubs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterJoined, setFilterJoined] = useState("all")

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || club.category === filterCategory
    const matchesJoined =
      filterJoined === "all" ||
      (filterJoined === "joined" && club.isJoined) ||
      (filterJoined === "not-joined" && !club.isJoined)
    return matchesSearch && matchesCategory && matchesJoined
  })

  const handleJoinClub = (clubId: string) => {
    setClubs((prev) =>
      prev.map((club) =>
        club.id === clubId
          ? {
              ...club,
              isJoined: !club.isJoined,
              memberCount: club.isJoined ? club.memberCount - 1 : club.memberCount + 1,
            }
          : club,
      ),
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Studio":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Genre":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Series":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
        <CardHeader>
          <CardTitle>Anime Clubs</CardTitle>
          <CardDescription>Join communities of like-minded anime fans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Genre">Genre</SelectItem>
                <SelectItem value="Series">Series</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterJoined} onValueChange={setFilterJoined}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Membership" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clubs</SelectItem>
                <SelectItem value="joined">Joined</SelectItem>
                <SelectItem value="not-joined">Not Joined</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Club
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <Card
            key={club.id}
            className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20 hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16 flex-shrink-0">
                  <AvatarImage src={club.image || "/placeholder.svg"} alt={club.name} />
                  <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{club.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(club.category)}>{club.category}</Badge>
                        {club.isPrivate && <Badge variant="outline">Private</Badge>}
                        {club.isJoined && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Joined
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{club.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {club.memberCount} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        {club.owner.username}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant={club.isJoined ? "outline" : "default"}
                      size="sm"
                      className="flex-1"
                      onClick={() => handleJoinClub(club.id)}
                    >
                      {club.isJoined ? "Leave" : "Join"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClubs.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No clubs found matching your criteria.</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create a New Club
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
