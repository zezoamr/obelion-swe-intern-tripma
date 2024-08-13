import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export async function POST(req) {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
        return new Response(JSON.stringify({ error: 'Missing identifier or password' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Check if the identifier is an email or phone number
        const isEmail = identifier.includes('@');
        const identifierType = isEmail ? 'email' : 'phone';

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { phone: identifier }
                ]
            },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User already exists' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                [identifierType]: identifier,
                password: hashedPassword,
            },
        });

        return new Response(JSON.stringify({ message: 'User created successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ error: 'An error occurred while creating the user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}