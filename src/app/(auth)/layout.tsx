import './../globals.css'
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { ChangeTheme } from "@/components/ui/change-theme"
import React from 'react'
import { redirect } from 'next/navigation'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { auth } from '../../../auth'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/ui/buttonLogout'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await checkUserLogged()
  
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-md">
              <h1 className="text-xl font-bold tracking-tight">Meu Projeto</h1>
              <div className="flex items-center space-x-4">
                <ChangeTheme />
                <LogoutButton/>
              </div>
            </nav>

            <main className="flex items-center justify-center min-h-screen px-4 pt-20">
              <main className="flex min-h-screen w-full items-center justify-center px-4 pt-24">
                {children}
              </main>
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

async function checkUserLogged () {
  const session = await auth()

  console.log(session?.user, 'checklogged')

  if (!session) {
    return redirect('/')
  }
}