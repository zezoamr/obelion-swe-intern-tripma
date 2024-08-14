// app/api/flights/airports/route.js
import { NextResponse } from 'next/server';

export async function GET() {
    const airports = ['NRT', 'PVG', 'STL', 'ATL', 'MSP', 'SFO', 'JFK', 'LAX', ''];
    return NextResponse.json(airports);
}