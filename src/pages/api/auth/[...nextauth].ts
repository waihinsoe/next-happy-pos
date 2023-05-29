import { config } from "@/config/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
