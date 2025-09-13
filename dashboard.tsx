"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { LogOut, TrendingUp, Clock, Star, Users, Home, List, MessageSquare, Settings, BarChart3 } from "lucide-react"
import { AnimeList } from "./anime-list"
import { UserProfile } from "./user-profile"
import { CommunityHub } from "@/components/community/community-hub"

export function Dashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Anime Tracker
              </h1>
              {user.isAdmin && (
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  Admin
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.username}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-transparent">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="anime-list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">My List</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Community</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              {user.isAdmin && (
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              )}
            </TabsList>

            <div className="py-8">
              <TabsContent value="overview" className="mt-0">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="anime-list" className="mt-0">
                <AnimeList />
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <CommunityHub />
              </TabsContent>

              <TabsContent value="profile" className="mt-0">
                <UserProfile />
              </TabsContent>

              {user.isAdmin && (
                <TabsContent value="admin" className="mt-0">
                  <AdminTab />
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Watching</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan to Watch</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Growing list</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Club Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Across 3 clubs</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest anime updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded"></div>
              <div className="flex-1">
                <p className="font-medium">Completed "Attack on Titan"</p>
                <p className="text-sm text-muted-foreground">Rated 9/10 • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded"></div>
              <div className="flex-1">
                <p className="font-medium">Started "Demon Slayer S3"</p>
                <p className="text-sm text-muted-foreground">Episode 1/11 • 1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded"></div>
              <div className="flex-1">
                <p className="font-medium">Added "Jujutsu Kaisen" to Plan to Watch</p>
                <p className="text-sm text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader>
            <CardTitle>Trending This Week</CardTitle>
            <CardDescription>Popular anime in the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
                <div>
                  <p className="font-medium">Frieren</p>
                  <p className="text-sm text-muted-foreground">Fantasy • 2023</p>
                </div>
              </div>
              <Badge>9.2</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded"></div>
                <div>
                  <p className="font-medium">Chainsaw Man</p>
                  <p className="text-sm text-muted-foreground">Action • 2022</p>
                </div>
              </div>
              <Badge>8.8</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
                <div>
                  <p className="font-medium">Spy x Family</p>
                  <p className="text-sm text-muted-foreground">Comedy • 2022</p>
                </div>
              </div>
              <Badge>9.0</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CommunityTab() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CommunityHub />
    </div>
  )
}

function AdminTab() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
          <CardDescription>Manage users and content</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Admin features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}
