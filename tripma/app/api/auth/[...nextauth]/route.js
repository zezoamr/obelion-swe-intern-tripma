import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

const handler = NextAuth({
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
        strategy: 'jwt'  // Changed from 'database' to 'jwt'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log("signIn callback called", { user, account, profile, email, credentials });
            return true;
        },
        async session({ session, token, user }) {  // Added 'token' parameter
            // console.log("Session callback called", { session, token, user });
            
            if (session?.user) {
                session.user.id = token.sub;  // Use token.sub instead of user.id
                session.user.phone = token.phone || session.user.email;  // Use token.phone
            }
        
            // console.log("Updated session", session);
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // console.log("JWT callback called", { token, user, account, profile, isNewUser });
            if (user) {
                token.phone = user.phone;  // Add phone to the token
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
})

export { handler as GET, handler as POST }