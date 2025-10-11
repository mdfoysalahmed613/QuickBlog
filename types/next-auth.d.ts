import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    isAdmin: boolean;
    isVerified: boolean;
  }
  interface Session {
    user: User;
  }

}

