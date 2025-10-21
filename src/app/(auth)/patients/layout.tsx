import { ReactNode } from "react"

export default function UsuariosLayout({ children }: { children: ReactNode }) {
  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-600">Gestão de Usuários</h1>
        <p className="text-gray-600">Aqui você pode visualizar e gerenciar os usuários.</p>
      </header>

      <div className="max-w-3xl mx-auto">{children}</div>
    </section>
  )
}
