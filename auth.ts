import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas")
        }

        const res = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        if (!res.ok) {
          throw new Error("Falha ao autenticar no servidor")
        }

        const responseData = await res.json()
        const user = responseData?.data?.user
        const token = responseData?.data?.token

        if (!user) return null

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          kind: user.kind,
          token,
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === 'update') {
        return {}
      }

      if (user) {
        token.user = user
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
})
