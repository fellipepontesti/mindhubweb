"use client"

import { useAuth } from "@/context/authContext"
import { redirect } from "next/navigation"

export async function getUsers (): Promise<any> {
  const { user, refreshToken } = useAuth()

  try {
    const res = await fetch("http://localhost:8000/users", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json"
      }
    })

    if (!res.ok) {
      return redirect('/')
    }

    return res.json()
  } catch (error) {
    return error
  }
}