import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();


type UserWithId = {
  id: number;
} & {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email here.",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password here.",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const correctPassword = await compare(
          credentials.password,
          user.password
        );
        if (!correctPassword) {
          return null;
        }
        return {
          id: user.id + "",
          email: user.email,
          username: user.username,
          // randomKey: 'random key'
        };
      },
    }),
  ],
  
  callbacks: {
    session: async ({ session, token, user }) => {
      // console.log('S-Session:',session, "S-TOKEN",token)
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id:  token.id,
      //     username: token.username as string,
      //     // randomKey:token.randomKey
      //   }
      // };
      if(session?.user){
        (session.user as UserWithId).id = parseInt(token.uid as string)
      }
      return session
    },
    jwt: ({ token, user }) => {
      // console.log('JWT-T:',token, "JWT-U",user)
      if(user){
        const u = user as unknown as any
        token.uid = user.id 
        token.username = u.username
        token.email = u.email

        return token
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt'
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
