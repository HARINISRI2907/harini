"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  joinDate: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export { AuthContext }

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("anime-tracker-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email === "admin@example.com" && password === "admin") {
      const adminUser: User = {
        id: "1",
        username: "admin",
        email: "admin@example.com",
        avatar: "/anime-admin-avatar.jpg",
        joinDate: new Date().toISOString(),
        isAdmin: true,
      }
      setUser(adminUser)
      localStorage.setItem("anime-tracker-user", JSON.stringify(adminUser))
      return true
    } else if (email === "user@example.com" && password === "user") {
      const regularUser: User = {
        id: "2",
        username: "otaku_fan",
        email: "user@example.com",
        avatar: "/anime-fan-avatar.png",
        joinDate: new Date().toISOString(),
        isAdmin: false,
      }
      setUser(regularUser)
      localStorage.setItem("anime-tracker-user", JSON.stringify(regularUser))
      return true
    }
    return false
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      avatar: "/new-anime-user-avatar.jpg",
      joinDate: new Date().toISOString(),
      isAdmin: false,
    }
    setUser(newUser)
    localStorage.setItem("anime-tracker-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("anime-tracker-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
