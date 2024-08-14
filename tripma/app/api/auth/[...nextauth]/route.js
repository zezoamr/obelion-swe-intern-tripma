import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: 'Email or Phone', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.identifier || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credentials.identifier },
                            { phone: credentials.identifier }
                        ]
                    }
                });
                if (!user || !user.password) {
                    return null;
                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    return null;
                }
                return {
                    id: user.id,
                    email: user.email,
                    phone: user.phone,
                    name: user.name,
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async session({ session, token, user }) {
            if (session?.user) {
                session.user.id = token.sub;
                session.user.phone = token.phone || session.user.email;
            }
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.phone = user.phone;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };