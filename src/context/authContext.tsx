"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useSession } from "next-auth/react"

type CurrentUser = {
  id: number
  name: string
  email: string
  kind: number
  status: number
  token: string
}

type AuthContextType = {
  user: CurrentUser | null
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [user, setUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as unknown as CurrentUser)
    }
  }, [session])

  async function refreshToken() {
    if (!user?.token) return

    try {
      const res = await fetch("http://localhost:8000/refresh-token", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        }
      })

      if (!res.ok) throw new Error("Falha ao atualizar token")

      const data = await res.json()

      // Exemplo de resposta esperada do back:
      // { success: true, data: { token: "novoToken", user: {...} } }

      setUser(data.data.user)
    } catch (err) {
      console.error("Erro ao renovar token:", err)
      // aqui você poderia deslogar o usuário se o refresh falhar
    }
  }

  return (
    <AuthContext.Provider value={{ user, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>")
  return ctx
}
