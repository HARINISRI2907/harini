"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Camera, Save, Calendar, Mail } from "lucide-react"

export function UserProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: "Anime enthusiast who loves exploring different genres and discovering hidden gems.",
    favoriteGenres: ["Action", "Fantasy", "Romance"],
    location: "Tokyo, Japan",
  })

  const handleSave = () => {
    // In a real app, this would update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
    setIsEditing(false)
  }

  const stats = [
    { label: "Total Anime", value: "133", color: "text-blue-600" },
    { label: "Episodes Watched", value: "2,847", color: "text-green-600" },
    { label: "Days Watched", value: "47.2", color: "text-purple-600" },
    { label: "Mean Score", value: "8.2", color: "text-orange-600" },
  ]

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Profile Header */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="text-2xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
                <h2 className="text-2xl font-bold">{user.username}</h2>
                {user.isAdmin && (
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    Admin
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground justify-center sm:justify-start">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Bio</Label>
                    <p className="text-sm text-muted-foreground mt-1">{formData.bio}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm text-muted-foreground mt-1">{formData.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Favorite Genres</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.favoriteGenres.map((genre) => (
                        <Badge key={genre} variant="secondary">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-white/20">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Your latest anime reviews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Attack on Titan</h4>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">9/10</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  "An incredible journey from start to finish. The character development and plot twists kept me on the
                  edge of my seat."
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Your Name</h4>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">10/10</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  "A masterpiece of animation and storytelling. Makoto Shinkai outdid himself with this beautiful film."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
