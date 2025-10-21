"use client"

import { getUsers } from "@/services/users/usersRequests"
import { useEffect, useState } from "react"

type Usuario = {
  id: number
  nome: string
  email: string
}

export default function UsersList() {
  const [users, setUsers] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        const result = await getUsers()
        setUsers(result.data.users)
      } catch (error) {
        console.error("Erro ao carregar usuários:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, []) // ← executa apenas uma vez na montagem

  if (loading) return <p>Carregando usuários...</p>

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="border rounded-lg p-3 shadow-sm hover:bg-gray-100 transition"
          >
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
