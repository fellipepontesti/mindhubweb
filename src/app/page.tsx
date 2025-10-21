"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./../components/ui/card"
import { Label } from "./../components/ui/label"
import { Input } from "./../components/ui/input"
import { Button } from "./../components/ui/button"
import { signIn } from "next-auth/react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const setNextPage = (user: any) => {
    if (user.kind === 0) {
      router.replace("/users")
    } else {
      router.replace("/patients")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      e.preventDefault()

      const res = await signIn("credentials", {
        email, password, redirect: false
      })

      const session = await fetch("/api/auth/session").then(r => r.json())
      setNextPage(session.user)
      setIsLoading(false)
    } catch (err: any) {
      setIsLoading(false)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.")
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6">
      <CardHeader className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-2xl font-bold">MH</span>
        </div>
        <CardTitle className="text-xl font-semibold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Entre na sua conta para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email@exemplo.com" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border-white/30 placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/20 border-white/30 placeholder:text-gray-300"
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground">
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
      </CardContent>
    </Card>
  )
}
