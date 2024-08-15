const { PrismaClient } = require('@prisma/client');
const { data, mockFlights, hotels, experiences, cities } = require('./mockData');

const prisma = new PrismaClient();

async function main() {
// Clear existing data
await prisma.flight.deleteMany(); 
await prisma.testimonial.deleteMany();
await prisma.city.deleteMany();
await prisma.cityLocation.deleteMany();
await prisma.place.deleteMany();

await prisma.user.deleteMany();
await prisma.payment_passenger.deleteMany();
await prisma.payment_info.deleteMany();
await prisma.payment.deleteMany();

//seed cites
for (const city of cities) {
    await prisma.city.create({
        data: {
            id: city.id,
        }
    });
}

// Seed CityLocations
for (const location of data.cityLocations) {
    await prisma.cityLocation.create({
        data: {
            name: location.name,
            city: location.city,
            description: location.description,
            image: location.image,
            price: location.price,
            newcolor: location.newcolor,
            cityref: location.cityref,
        },
    });
}

// Seed Places
for (const place of data.places) {
    await prisma.place.create({
        data: {
            name: place.name,
            price: place.price,
            city: place.city,
            description: place.description,
            image: place.image,
            newcolor: place.newcolor,
            cityref: place.cityref,
        },
    });
}

// Seed Hotels
for (const hotel of hotels) {
    await prisma.hotel.create({
        data: {
            name: hotel.name,
            price: hotel.price,
            description: hotel.description,
            image: hotel.image,
            cityref: hotel.cityref,
        },
    });
}

// Seed Experiences
for (const experience of experiences) {
    await prisma.experience.create({
        data: {
            name: experience.name,
            price: experience.price,
            description: experience.description,
            image: experience.image,
            cityref: experience.cityref,
        },
    });
}

// Seed Testimonials
for (const testimonial of data.testimonials) {
    await prisma.testimonial.create({
    data: {
        avatarSrc: testimonial.avatarSrc,
        name: testimonial.name,
        location: testimonial.location,
        date: testimonial.date,
        rating: testimonial.rating,
        review: testimonial.review,
    },
    });
}


// saving to database:
// const flightToSave = {
//     ...flightData,
//     dividerLocations: JSON.stringify(flightData.dividerLocations),
//     seatsData: JSON.stringify(flightData.seatsData),
//     // nah availableSeats: calculateAvailableSeats(JSON.stringify(flightData.seatsData))
// };

// retrieving from database:
// const retrievedFlight = {
//     ...flightFromDb,
//     dividerLocations: JSON.parse(flightFromDb.dividerLocations),
//     seatsData: JSON.parse(flightFromDb.seatsData)
// };

// Seed Flights
for (const flight of mockFlights) {
    await prisma.flight.create({
    data: {
        duration: flight.duration,
        fromtoTime: flight.fromtoTime,
        stops: flight.stops,
        price: flight.price,
        airline: flight.airline,
        stopduration: flight.stopduration,
        type: flight.type,
        image: flight.image,
        taxes: flight.taxes,
        from: flight.from,
        to: flight.to,
        startDate: new Date(flight.startDate),
        endDate: new Date(flight.endDate),

        flightid: flight.flightid,
        businessprice: flight.businessprice,
        seatsData: JSON.stringify(flight.seatsData),
        dividerLocations: JSON.stringify(flight.dividerLocations),
    },
    });
}

console.log('Data seeding completed.');
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});