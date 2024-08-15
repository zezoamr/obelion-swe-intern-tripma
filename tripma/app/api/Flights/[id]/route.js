import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const flight = await prisma.flight.findUnique({
            where: {
                id: id
            }
        });

        if (!flight) {
            return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
        }

        // Post-process flight to calculate available seats
        const processedFlight = {
            ...flight,
            dividerLocations: JSON.parse(flight.dividerLocations),
            seatsData: JSON.parse(flight.seatsData),
            availableSeats: calculateAvailableSeats(flight.seatsData)
        };

        return NextResponse.json(processedFlight);
    } catch (error) {
        console.error('Error fetching flight:', error);
        return NextResponse.json({ error: 'An error occurred while fetching the flight' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

function calculateAvailableSeats(seatsData) {
    return JSON.parse(seatsData).reduce((total, row) => {
        return total + row.filter(seat => seat.available).length;
    }, 0);
}
