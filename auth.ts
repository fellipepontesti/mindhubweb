import NextAuth, { User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
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
        const res = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        if (!res.ok) return null

        const responseData = await res.json()

        const user = responseData?.data?.user
        const token = responseData?.data?.token

        if (!user) return null

        return { ...user, token }
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: '/'
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as AdapterUser & User // faz o usuário aparecer em useSession()
    
      return session
    },
  },
})
