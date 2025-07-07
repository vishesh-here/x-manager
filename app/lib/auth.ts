
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import TwitterProvider from 'next-auth/providers/twitter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Twitter OAuth Provider (placeholder credentials)
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || 'your_twitter_client_id_here',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || 'your_twitter_client_secret_here',
      version: '2.0',
      authorization: {
        url: 'https://twitter.com/i/oauth2/authorize',
        params: {
          scope: 'users.read tweet.read tweet.write offline.access',
        },
      },
    }),
    
    // Credentials Provider for demo account
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
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

        // For demo purposes, we'll use a simple password check
        // In production, this should be properly hashed
        if (credentials.email === 'john@doe.com' && credentials.password === 'johndoe123') {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            twitterUsername: user.twitterUsername,
            twitterId: user.twitterId,
          };
        }

        return null;
      },
    }),
  ],
  
  session: {
    strategy: 'jwt',
  },
  
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // Store Twitter credentials and user info
        if (account.provider === 'twitter') {
          token.twitterId = account.providerAccountId;
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          
          // Update user with Twitter info
          await prisma.user.update({
            where: { id: user.id },
            data: {
              twitterId: account.providerAccountId,
              twitterUsername: account.username as string,
            },
          });
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.twitterId = token.twitterId as string;
        session.user.twitterUsername = token.twitterUsername as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};
