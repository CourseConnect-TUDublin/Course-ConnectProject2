import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const normalizedEmail = credentials.email.toLowerCase();
          const trimmedPassword = credentials.password.trim();
          const user = await User.findOne({ email: normalizedEmail }).select("+password");
          if (!user) throw new Error("Invalid email or password");
          const isMatch = await bcrypt.compare(trimmedPassword, user.password);
          if (!isMatch) throw new Error("Invalid email or password");
          return { id: user._id.toString(), email: user.email, role: "student", name: user.name };
        } catch (error) {
          throw new Error("Login failed");
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: true, // Enable debug logging
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.name = token.name;
      return session;
    }
  },
  pages: {
    signIn: "/login" // Ensure your login page is at this route.
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
