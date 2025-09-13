"use client"

import { AuthProvider } from "@/components/auth/auth-provider"
import { LoginForm } from "@/components/auth/login-form"
import { Dashboard } from "@/components/dashboard/dashboard"
import { useAuth } from "@/hooks/use-auth"

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return user ? <Dashboard /> : <LoginForm />
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
