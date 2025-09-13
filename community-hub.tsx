"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, TrendingUp, Plus, Heart, MessageCircle, Share2 } from "lucide-react"
import { ClubsSection } from "./clubs-section"
import { DiscussionsSection } from "./discussions-section"
import { ReviewsSection } from "./reviews-section"

export function CommunityHub() {
  const [activeTab, setActiveTab] = useState("discussions")

  const trendingTopics = [
    { id: 1, title: "Best Anime of 2024", replies: 234, likes: 567 },
    { id: 2, title: "Frieren Episode Discussion", replies: 89, likes: 234 },
    { id: 3, title: "Underrated Anime Recommendations", replies: 156, likes: 345 },
    { id: 4, title: "Manga vs Anime Adaptations", replies: 78, likes: 189 },
  ]

  const featuredClubs = [
    {
      id: 1,
      name: "Studio Ghibli Fans",
      members: 1234,
      description: "Discussing the magical worlds of Studio Ghibli",
      image: "/ghibli-club-avatar.png",
    },
    {
      id: 2,
      name: "Shonen Action Club",
      members: 2567,
      description: "For fans of action-packed shonen anime",
      image: "/shonen-club-avatar.png",
    },
    {
      id: 3,
      name: "Slice of Life Society",
      members: 890,
      description: "Appreciating the beauty of everyday anime",
      image: "/slice-of-life-club-avatar.png",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Community Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+89 new today</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,678</div>
            <p className="text-xs text-muted-foreground">+234 this week</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clubs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">12 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="discussions" className="mt-0">
            <DiscussionsSection />
          </TabsContent>

          <TabsContent value="clubs" className="mt-0">
            <ClubsSection />
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <ReviewsSection />
          </TabsContent>
        </div>
      </Tabs>

      {/* Sidebar Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Trending Topics */}
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
              <CardDescription>Popular discussions in the community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingTopics.map((topic) => (
                <div key={topic.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <h4 className="font-medium">{topic.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {topic.replies} replies
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {topic.likes} likes
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Featured Clubs */}
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
            <CardHeader>
              <CardTitle>Featured Clubs</CardTitle>
              <CardDescription>Popular communities to join</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {featuredClubs.map((club) => (
                <div key={club.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={club.image || "/placeholder.svg"} alt={club.name} />
                    <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{club.name}</h4>
                    <p className="text-xs text-muted-foreground">{club.members} members</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Create Club
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
