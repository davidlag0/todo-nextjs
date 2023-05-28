import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, _account, _profile, _email, _credentials }) {
      const isAllowedToSignIn = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      return isAllowedToSignIn !== null;
    },
  },
};

export default NextAuth(authOptions);
