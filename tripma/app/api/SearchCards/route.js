import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const places = await prisma.place.findMany({ take: 3 });
        const cities = await prisma.cityLocation.findMany({ take: 3 });
        const placesLargeCard = await prisma.place.findFirst();

        const data = {
            places,
            cities,
            placesLargeCard
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching home data:', error);
        return NextResponse.json({ error: 'An error occurred while fetching home data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}