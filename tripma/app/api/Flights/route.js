import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

function calculateAvailableSeats(seatsData) {
    return JSON.parse(seatsData).reduce((total, row) => {
        return total + row.filter(seat => seat.available).length;
    }, 0);
}

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const adults = parseInt(searchParams.get('adults') || '0');
    const minors = parseInt(searchParams.get('minors') || '0');

    //const oneWay = (!endDate || isNaN(Date.parse(endDate))) && (startDate && !isNaN(Date.parse(startDate)));

    
    try {
        
        let whereClause = {};

        if (from) {
            whereClause.from = from;
        }
        if (to) {
            whereClause.to = to;
        }

        let outboundFlights = [];
        let returnFlights = [];

        if (startDate && !isNaN(Date.parse(startDate))) {
            const parsedStartDate = new Date(startDate);
            const isoStartDate = parsedStartDate.toISOString().split('T')[0]; // Get the date part
            whereClause.startDate = {
                equals: new Date(`${isoStartDate}T00:00:00.000Z`)
            };
        }

        outboundFlights = await prisma.flight.findMany({
            where: whereClause
        });
        

        // If endDate is provided, fetch return flights
        if (endDate && !isNaN(Date.parse(endDate))) {
            const parsedEndDate = new Date(endDate);
            const isoEndDate = parsedEndDate.toISOString().split('T')[0]; // Get the date part
            let newwhereClause = {}; // Flip the 'from' and 'to' for return flight
            if (from) {
                newwhereClause.to = from;
            }
            if (to) {
                newwhereClause.from = to;
            }
            
            const returnWhereClause = {
                ...newwhereClause,
                startDate: {
                    equals: new Date(`${isoEndDate}T00:00:00.000Z`)
                }
            };

            returnFlights = await prisma.flight.findMany({
                where: returnWhereClause
            });
        }

        //console.log("Flights", { outboundFlights, returnFlights });

        // Post-process flights to calculate available seats and filter based on required seats
        const processFlights = (flights) => {
            return flights.map(flight => ({
                ...flight,
                dividerLocations: JSON.parse(flight.dividerLocations),
                seatsData: JSON.parse(flight.seatsData),
                availableSeats: calculateAvailableSeats(flight.seatsData)
            })).filter(flight => flight.availableSeats >= (adults + minors));
        };

        //if(oneWay) outboundFlights = outboundFlights.filter(flight => flight.type === "one way"); //do same for roundway

        const outboundProcessedFlights = processFlights(outboundFlights);
        const returnProcessedFlights = processFlights(returnFlights);
        //console.log("Processed Flights", { outboundProcessedFlights, returnProcessedFlights });
        return NextResponse.json({ outboundFlights: outboundProcessedFlights, returnFlights: returnProcessedFlights });
    } catch (error) {
        console.error('Error fetching flights:', error);
        return NextResponse.json({ error: 'An error occurred while fetching flights' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
