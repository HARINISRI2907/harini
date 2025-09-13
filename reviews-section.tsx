"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Plus, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react"

interface Review {
  id: string
  animeTitle: string
  animeImage: string
  rating: number
  title: string
  content: string
  author: {
    username: string
    avatar: string
  }
  likes: number
  dislikes: number
  comments: number
  createdAt: string
  isHelpful: boolean
  spoilerFree: boolean
}

const mockReviews: Review[] = [
  {
    id: "1",
    animeTitle: "Attack on Titan",
    animeImage: "/anime-poster.png",
    rating: 9,
    title: "A Masterpiece of Storytelling and Animation",
    content:
      "Attack on Titan is without a doubt one of the greatest anime series ever created. The way it builds its world, develops its characters, and delivers plot twists is absolutely phenomenal. From the very first episode, you're thrown into a world of mystery and terror that keeps you on the edge of your seat. The animation quality, especially in the later seasons, is breathtaking. Every fight scene is choreographed to perfection, and the emotional moments hit like a truck. Eren's character development throughout the series is complex and controversial, but that's what makes it so compelling. The series tackles themes of freedom, war, and the cycle of hatred in ways that are both thought-provoking and emotionally devastating. If you haven't watched this series yet, you're missing out on a true work of art.",
    author: {
      username: "titan_slayer",
      avatar: "/user-avatar-1.png",
    },
    likes: 234,
    dislikes: 12,
    comments: 45,
    createdAt: "2024-01-10",
    isHelpful: true,
    spoilerFree: true,
  },
  {
    id: "2",
    animeTitle: "Your Name",
    animeImage: "/your-name-anime-movie-poster.png",
    rating: 10,
    title: "Emotional Perfection in Every Frame",
    content:
      "Makoto Shinkai has outdone himself with this beautiful masterpiece. Your Name is not just an anime movie; it's an emotional journey that will stay with you long after the credits roll. The animation is absolutely stunning - every frame looks like a work of art. The way light and shadow are used throughout the film is mesmerizing. The story of Taki and Mitsuha is both heartwarming and heartbreaking, with perfect pacing that keeps you invested from start to finish. The soundtrack by RADWIMPS complements the visuals perfectly, creating moments that are pure magic. This movie made me laugh, cry, and feel hopeful all at the same time. It's a perfect blend of romance, supernatural elements, and coming-of-age themes. A must-watch for anyone who appreciates beautiful storytelling.",
    author: {
      username: "shinkai_fan",
      avatar: "/user-avatar-2.png",
    },
    likes: 189,
    dislikes: 3,
    comments: 67,
    createdAt: "2024-01-08",
    isHelpful: true,
    spoilerFree: true,
  },
  {
    id: "3",
    animeTitle: "Demon Slayer",
    animeImage: "/demon-slayer-anime-poster.png",
    rating: 8,
    title: "Stunning Animation with Heart",
    content:
      "Demon Slayer excels in two main areas: absolutely gorgeous animation and genuine emotional moments. Ufotable has created some of the most beautiful fight scenes in anime history. The way they animate Tanjiro's water breathing techniques is pure eye candy. But beyond the flashy visuals, the series has a lot of heart. Tanjiro's determination to save his sister and his compassion even for demons makes him a compelling protagonist. The supporting cast, especially Zenitsu and Inosuke, provide great comic relief while also having their own character arcs. While the story can be predictable at times, the execution is so well done that you don't mind. The emotional beats hit hard, and the family themes resonate throughout. It's a solid shonen that knows how to balance action, comedy, and drama effectively.",
    author: {
      username: "demon_hunter",
      avatar: "/user-avatar-3.png",
    },
    likes: 156,
    dislikes: 23,
    comments: 34,
    createdAt: "2024-01-05",
    isHelpful: true,
    spoilerFree: true,
  },
]

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.animeTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating =
      filterRating === "all" ||
      (filterRating === "high" && review.rating >= 8) ||
      (filterRating === "medium" && review.rating >= 6 && review.rating < 8) ||
      (filterRating === "low" && review.rating < 6)
    return matchesSearch && matchesRating
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "helpful":
        return b.likes - a.likes
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const handleLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, likes: review.likes + 1 } : review)),
    )
  }

  const handleDislike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, dislikes: review.dislikes + 1 } : review)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
        <CardHeader>
          <CardTitle>Community Reviews</CardTitle>
          <CardDescription>Read and share detailed anime reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="high">High (8-10)</SelectItem>
                <SelectItem value="medium">Medium (6-7)</SelectItem>
                <SelectItem value="low">Low (1-5)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Card key={review.id} className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Anime Poster */}
                <div className="w-16 h-20 flex-shrink-0">
                  <img
                    src={review.animeImage || "/placeholder.svg"}
                    alt={review.animeTitle}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{review.title}</h3>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium">{review.animeTitle}</span>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="text-sm font-medium">{review.rating}/10</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {review.spoilerFree && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Spoiler Free
                          </Badge>
                        )}
                        {review.isHelpful && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Helpful
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-4">{review.content}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={review.author.avatar || "/placeholder.svg"} alt={review.author.username} />
                        <AvatarFallback className="text-xs">
                          {review.author.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{review.author.username}</span>
                      <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-green-600"
                        onClick={() => handleLike(review.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {review.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-red-600"
                        onClick={() => handleDislike(review.id)}
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        {review.dislikes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {review.comments}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedReviews.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardContent className="text-center py-12">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No reviews found matching your criteria.</p>
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Write the First Review
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
