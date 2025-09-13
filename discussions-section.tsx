"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Search, Plus, Heart, MessageCircle, Clock, Pin } from "lucide-react"

interface Discussion {
  id: string
  title: string
  content: string
  author: {
    username: string
    avatar: string
  }
  category: string
  replies: number
  likes: number
  isPinned: boolean
  createdAt: string
  lastActivity: string
}

const mockDiscussions: Discussion[] = [
  {
    id: "1",
    title: "What's your favorite anime opening of all time?",
    content:
      "I've been thinking about this lately and I keep coming back to 'Tank!' from Cowboy Bebop. The jazz fusion style is just incredible and sets the perfect tone for the series...",
    author: {
      username: "anime_enthusiast",
      avatar: "/user-avatar-1.png",
    },
    category: "General",
    replies: 89,
    likes: 234,
    isPinned: true,
    createdAt: "2024-01-15",
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    title: "Frieren Episode 28 Discussion - SPOILERS",
    content:
      "Just watched the latest episode and I'm absolutely blown away by the character development. The way they handled Himmel's flashback was perfect...",
    author: {
      username: "fantasy_lover",
      avatar: "/user-avatar-2.png",
    },
    category: "Episode Discussion",
    replies: 156,
    likes: 445,
    isPinned: false,
    createdAt: "2024-01-14",
    lastActivity: "30 minutes ago",
  },
  {
    id: "3",
    title: "Underrated anime that deserve more recognition",
    content:
      "I want to share some hidden gems that I think more people should watch. Starting with 'Mushishi' - it's a masterpiece of atmospheric storytelling...",
    author: {
      username: "hidden_gems",
      avatar: "/user-avatar-3.png",
    },
    category: "Recommendations",
    replies: 67,
    likes: 189,
    isPinned: false,
    createdAt: "2024-01-13",
    lastActivity: "1 hour ago",
  },
  {
    id: "4",
    title: "Studio Mappa vs Studio Bones - Animation Quality Discussion",
    content:
      "Both studios have produced some incredible work recently. Let's discuss their different approaches to animation and which style you prefer...",
    author: {
      username: "animation_critic",
      avatar: "/user-avatar-4.png",
    },
    category: "Analysis",
    replies: 234,
    likes: 567,
    isPinned: false,
    createdAt: "2024-01-12",
    lastActivity: "45 minutes ago",
  },
]

export function DiscussionsSection() {
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || discussion.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "popular":
        return b.likes - a.likes
      case "replies":
        return b.replies - a.replies
      default:
        return 0
    }
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "General":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Episode Discussion":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Recommendations":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Analysis":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
        <CardHeader>
          <CardTitle>Community Discussions</CardTitle>
          <CardDescription>Join the conversation with fellow anime fans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
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
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Episode Discussion">Episode Discussion</SelectItem>
                <SelectItem value="Recommendations">Recommendations</SelectItem>
                <SelectItem value="Analysis">Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="replies">Most Replies</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Discussions List */}
      <div className="space-y-4">
        {sortedDiscussions.map((discussion) => (
          <Card
            key={discussion.id}
            className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.username} />
                  <AvatarFallback>{discussion.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {discussion.isPinned && <Pin className="h-4 w-4 text-yellow-500" />}
                      <h3 className="font-semibold text-lg">{discussion.title}</h3>
                      <Badge className={getCategoryColor(discussion.category)}>{discussion.category}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{discussion.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-medium">{discussion.author.username}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {discussion.lastActivity}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Heart className="h-4 w-4 mr-1" />
                        {discussion.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {discussion.replies}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedDiscussions.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No discussions found matching your criteria.</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Start a New Discussion
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
