import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
    // console.log('POST request received at /api/payment', req);

    // Check authentication
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     return new Response(JSON.stringify({ message: 'Unauthorized' }), {
    //         status: 401,
    //         headers: { 'Content-Type': 'application/json' },
    //     });
    // }


    const { cartItems, paymentData, flightSeats, passengersInfo, userId } = await req.json();
    
    // console.log({ cartItems, paymentData, flightSeats, passengersInfo, userId });
    // const flightSeatsJson = JSON.stringify(flightSeats);
    // console.log(flightSeatsJson);

    // Ensure the authenticated user matches the userId in the request
    // if (session.user.id !== userId) {
    //     return new Response(JSON.stringify({ message: 'Unauthorized: User ID mismatch' }), {
    //         status: 403,
    //         headers: { 'Content-Type': 'application/json' },
    //     });
    // }

    // Input validation
    if (!cartItems || !paymentData || !flightSeats || !passengersInfo ) { //|| !userId
        return new Response(JSON.stringify({ message: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!Array.isArray(cartItems) || !Array.isArray(flightSeats) || !Array.isArray(passengersInfo)) {
        return new Response(JSON.stringify({ message: 'Invalid input data structure' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    

    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Always create payment_info
            const paymentInfoRecord = await prisma.payment_info.create({
                data: {
                    nameOnCard: paymentData.formData.nameOnCard,
                    cardNumber: paymentData.formData.cardNumber,
                    expDate: paymentData.formData.expirationDate,
                    CVV: parseInt(paymentData.formData.cvv),
                    billingAddress: paymentData.billingAddress,
                    // Only connect to user if saveCard is true
                    ...(paymentData.saveCard ? { user: { connect: { id: userId } } } : {}),
                },
            });
    
            // Flatten the flightSeats array
            const flattenedFlightSeats = flightSeats.flat();
    
            // Check if selected seats are still available and mark them as unavailable
            for (let i = 0; i < cartItems.length; i++) {
                const flight = cartItems[i];
                const flightRecord = await prisma.flight.findUnique({
                    where: { id: flight.id },
                    select: { seatsData: true },
                });
                
                if (!flightRecord) {
                    throw new Error(`Flight with id ${flight.id} not found`);
                }
                
                let currentSeatsData = JSON.parse(flightRecord.seatsData);
                
                for (let j = 0; j < passengersInfo.length; j++) {
                    const seatIndex = i * passengersInfo.length + j;
                    const seat = flattenedFlightSeats[seatIndex];
                    
                    if (seat.row === undefined || seat.seat === undefined) {
                        throw new Error(`Invalid seat data for flight ${flight.id}: row ${seat.row}, seat ${seat.seat}`);
                    }
                    
                    if (!currentSeatsData[seat.row] || !currentSeatsData[seat.row][seat.seat]) {
                        throw new Error(`Invalid seat data for flight ${flight.id}: row ${seat.row}, seat ${seat.seat}`);
                    }
                    
                    if (!currentSeatsData[seat.row][seat.seat].available) {
                        throw new Error(`Seat ${seat.seatDisplay} is no longer available for flight ${flight.id}`);
                    }
                    
                    // Mark the seat as unavailable
                    currentSeatsData[seat.row][seat.seat].available = false;
                }
                
                // Update the flight with the new seat data
                await prisma.flight.update({
                    where: { id: flight.id },
                    data: {
                        seatsData: JSON.stringify(currentSeatsData),
                    },
                });
            }
    
            // Prepare payment data
            const paymentCreateData = {
                paymentInfo: {
                    connect: { id: paymentInfoRecord.id },
                },
                passengers: {
                    create: cartItems.flatMap((flight, flightIndex) => 
                        passengersInfo.map((passenger, passengerIndex) => {
                            const seatIndex = flightIndex * passengersInfo.length + passengerIndex;
                            const seat = flattenedFlightSeats[seatIndex];
                            
                            return {
                                firstName: passenger.passengerInfo.firstName,
                                middleName: passenger.passengerInfo.middleName,
                                lastName: passenger.passengerInfo.lastName,
                                suffix: passenger.passengerInfo.suffix,
                                emailAddress: passenger.passengerInfo.email,
                                phoneNumber: passenger.passengerInfo.phone,
                                redressNumber: passenger.passengerInfo.redressNumber,
                                knownTravelNumber: passenger.passengerInfo.knownTravellerNumber,
                                emergencyFirstName: passenger.emergencyContact.firstName,
                                emergencyLastName: passenger.emergencyContact.lastName,
                                emergencyEmailAddress: passenger.emergencyContact.email,
                                emergencyPhoneNumber: passenger.emergencyContact.phone,
                                checkedBags: passenger.checkedBags,
                                flightId: flight.id,
                                seatRow: seat.row,
                                seatNumber: seat.seat,
                                seatClass: seat.class,
                                seatDisplay: seat.seatDisplay,
                                upgraded: seat.upgraded || false,
                                upgradeCost: seat.upgradeCost || 0,
                            };
                        })
                    ),
                },
            };


            // Only connect to user if userId is provided
            if (userId) {
                paymentCreateData.user = {
                    connect: { id: userId },
                };
            }
    
            // Create payment record
            const payment = await prisma.payment.create({
                data: paymentCreateData,
                include: {
                    passengers: true,
                    paymentInfo: true,
                },
            });

            // Format the response data
            const formattedResponse = {
                flights: cartItems,
                confirmationNumber: payment.id,
                passengerName: passengersInfo[0].passengerInfo.firstName + ' ' + passengersInfo[0].passengerInfo.lastName,
                departureDate: new Date(cartItems[0].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                /* ex: February 25th, 2021 */

                arrivalDate: cartItems[1] ? new Date(cartItems[1].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null,
                seatInfo: passengersInfo.map((passenger, index) => ({
                    departure: `Seat ${flightSeats[0][index].seatDisplay} (${flightSeats[0][index].class}), ${passenger.checkedBags} checked bag(s)`,
                    arrival: cartItems[1] ? `Seat ${flightSeats[1][index].seatDisplay} (${flightSeats[1][index].class}), ${passenger.checkedBags} checked bag(s)` : null
                })), /* ex:  Seat 9F (economy), 1 checked bag */

                departingFlightPrice: cartItems[0].price,
                arrivingFlightPrice: cartItems[1] ? cartItems[1].price : null,

                baggageFees: cartItems[1]? payment.passengers.reduce((total, passenger) => total + passenger.checkedBags * 30, 0) *2 
                : payment.passengers.reduce((total, passenger) => total + passenger.checkedBags * 30, 0), // Assuming $30 per checked bag

                seatUpgradePrice: cartItems[1]? payment.passengers.reduce((total, passenger) => total + (passenger.upgradeCost || 0), 0) *2:
                payment.passengers.reduce((total, passenger) => total + (passenger.upgradeCost || 0), 0),

                taxes: [cartItems[0].taxes /100 * cartItems[0].price, cartItems[1]? cartItems[1].taxes /100 * cartItems[1].price: 0], 
                taxRate: [cartItems[0].taxes, cartItems[1]? cartItems[1].taxes: 0],

                cardHolderName: payment.paymentInfo.nameOnCard,
                cardNumber: payment.paymentInfo.cardNumber.slice(-4).padStart(payment.paymentInfo.cardNumber.length, '*'),
                cardExpiryDate: payment.paymentInfo.expDate,
            };

            return formattedResponse;
    
        });
    
        return new Response(JSON.stringify({ message: 'Booking successful', result }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error booking seats:', error);
        return new Response(JSON.stringify({ message: 'Internal server error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

