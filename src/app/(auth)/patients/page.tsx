"use client"

import { useEffect, useState } from "react"

type Usuario = {
  id: number
  nome: string
  email: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await fetch("http://localhost:8000/patients")
        const data = await res.json()
        setPatients(data)
      } catch (error) {
        console.error("Erro ao carregar usuários:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  if (loading) return <p>Carregando usuários...</p>

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      <ul className="space-y-2">
        {patients.map((user) => (
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
