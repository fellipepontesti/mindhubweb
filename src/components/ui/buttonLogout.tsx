'use client'

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <Button
      className="w-full bg-primary text-primary-foreground"
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}
