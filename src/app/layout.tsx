import "./globals.css"
import { cn } from "./../lib/utils"
import { ThemeProvider } from "./../components/theme-provider"
import { AuthProvider } from "@/context/authContext"
import { SessionProvider } from "next-auth/react"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={cn("min-h-screen bg-background font-sans antialiased")}>
          <SessionProvider>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <main className="flex min-h-screen items-center justify-center px-4">
                  {children}
                </main>
              </ThemeProvider>
            </AuthProvider>
          </SessionProvider>
        </body>
      </html>
    </main>
  )
}
