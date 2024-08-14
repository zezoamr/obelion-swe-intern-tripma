const PriceGridDates = ['2/12', '2/13', '2/14', '2/15', '2/16'];
const PriceGridPrices = [
    ['3/7', 837, 592, 592, 1308, 837],
    ['3/8', 837, 592, 592, 837, 1308],
    ['3/9', 624, 592, 624, 592, 592],
    ['3/10', 1308, 624, 624, 837, 837],
    ['3/11', 592, 624, 1308, 837, 624]
    ];


const priceHistoryChartData = [
    { date: 'Jan', price: 850 },
    { date: 'Feb', price: 920 },
    { date: 'Mar', price: 800 },
    { date: 'Apr', price: 940 },
    { date: 'May', price: 1000 },
    { date: 'Jun', price: 1300 },
    { date: 'Jul', price: 910 },
    { date: 'Aug', price: 850 },
    { date: 'Sep', price: 680 },
    { date: 'Oct', price: 790 },
    { date: 'Nov', price: 650 },
    { date: 'Dec', price: 700 },
    ];
const priceRecommendation = "We recommend booking soon. The average cost of this flight is $750, but could rise 18% to $885 in two weeks."

import { NextResponse } from 'next/server';

export async function GET() {
    const data = {}; // Define the data object
    try {
        data.priceRecommendation = priceRecommendation;
        data.priceHistoryChartData = priceHistoryChartData;
        data.priceGridDates = PriceGridDates;
        data.priceGridPrices = PriceGridPrices;
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching flight price info:', error);
        return NextResponse.json({ error: 'An error occurred while fetching flight price info' }, { status: 500 });
    }
}