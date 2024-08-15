import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const hotels = await prisma.hotel.findMany({ take: 2 });
        const experiences = await prisma.experience.findMany({ take: 2 });

        const data = {
            hotels,
            experiences,
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching home data:', error);
        return NextResponse.json({ error: 'An error occurred while fetching home data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}