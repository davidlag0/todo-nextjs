import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (isAllowedToSignIn !== null) {
        return true;
      }

      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        const author = await prisma.user.findUnique({
          where: { email: token.email },
        });

        token.authorID = author.id;
      }

      return token;
    },
  },
});
