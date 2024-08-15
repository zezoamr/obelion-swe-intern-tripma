"use client";

import styles from './page.module.css';
import Image from 'next/image';

import PriceBreakdown from './priceBreakdown';
import TravelItinerarySharing from './travelItinerary';

import Card from '@/components/card';
import FlightTable from '@/components/flightTable';
import card1image from '@/components/card1.jpg';

import { useState, useEffect } from 'react';
import { useCart } from '@/providers/CartProvider'

export default function SuccessPage() {
    const { PaymentResponse } = useCart()
    
    const {
        flights = [],
        confirmationNumber = 'missing',
        passengerName = 'missing',
        departureDate = 'missing',
        arrivalDate = 'missing',
        seatInfo = [],
        departingFlightPrice = 0,
        arrivingFlightPrice = 0,
        baggageFees = 0,
        seatUpgradePrice = 0,
        taxes = 0,
        taxRate = [],
        cardHolderName = 'missing',
        cardNumber = 'missing',
        cardExpiryDate = 'missing'
    } = PaymentResponse ? PaymentResponse : {
        flights : [],
        confirmationNumber : 'missing',
        passengerName : 'missing',
        departureDate : 'missing',
        arrivalDate : 'missing',
        seatInfo :[],
        departingFlightPrice : 0,
        arrivingFlightPrice : 0,
        baggageFees : 0,
        seatUpgradePrice : 0,
        taxes : 0,
        taxRate : [],
        cardHolderName : 'missing',
        cardNumber : 'missing',
        cardExpiryDate : 'missing'
    };

    let flight1 = flights[0] || {};
    let flight2 = flights[1] || null;
    let flight1arr = flight1 ? [flight1] : [];
    let flight2arr = flight2 ? [flight2] : [];

    const isRoundTrip = flight2 !== null;

    const {clearRequestData } = useCart();
    useEffect(() => {
        clearRequestData();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.columnLeft}>
                <div className={styles.bookingConfirmation}>
                    <div className={styles.successMessage}>
                        Your flight has been booked successfully! Your confirmation number is {confirmationNumber}
                    </div>
                    <h2 className={styles.greeting}>Bon voyage, {passengerName}!</h2>
                    <p className={styles.confirmationNumber}>Confirmation number: {confirmationNumber}</p>
                    <p className={styles.bookingSummary}>
                        Thank you for booking your travel with Tripma! Below is a summary of your trip to Narita
                        airport in Tokyo, Japan. We've sent a copy of your booking confirmation to your email address.
                        You can also find this page again in My trips.
                    </p>
                    
                    <div className={styles.flightSummary}>
                        <h3>Flight summary</h3>

                        <div className={styles.flight}>
                            <h4>Departing {departureDate}</h4>
                            <FlightTable
                                flights={flight1arr}
                                disablePicking={true}
                                className={styles.flightTableOverride}
                                className2={styles.flightTableOverride2}
                            />
                            {seatInfo.map((seat, index) => (
                                <p key={index} className={styles.seatInfo}>
                                    Passenger {index + 1}: {seat.departure}
                                </p>
                            ))}
                        </div>

                        {isRoundTrip && (
                            <div className={styles.flight}>
                                <h4>Arriving {arrivalDate}</h4>
                                <FlightTable
                                    flights={flight2arr}
                                    disablePicking={true}
                                    className={styles.flightTableOverride}
                                    className2={styles.flightTableOverride2}
                                />
                                {seatInfo.map((seat, index) => (
                                    <p key={index} className={styles.seatInfo}>
                                        Passenger {index + 1}: {seat.arrival}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <PriceBreakdown
                    departingFlightPrice={departingFlightPrice}
                    arrivingFlightPrice={isRoundTrip ? arrivingFlightPrice : 0}
                    baggageFees={baggageFees}
                    seatUpgradePrice={seatUpgradePrice}
                    taxes={taxes}
                    taxRate={taxRate}
                />

                <PaymentMethod name={cardHolderName} cardnumber={cardNumber} expirationdate={cardExpiryDate}/>
                <TravelItinerarySharing />

                <h3 className={styles.pageTitle}>Travel Route</h3>
                <div className={styles.Map}>
                    <Image src='/flightroute.png' alt="map" fill />
                </div>
            </div>
            <ColumnRight />
        </div>
    );
};



const PaymentMethod = ({name, cardnumber, expirationdate }) => {
    return (
    <div className={styles.paymentCardContainer}>
        <h3 className={styles.cardTitle}>Payment method</h3>
        <div className={styles.paymentCard}>
            <svg width="76" height="24" viewBox="0 0 76 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.9329 23.654H26.7764L30.6271 0.421387H36.7833L32.9329 23.654Z" fill="white"/>
                <path d="M55.2511 0.989106C54.0368 0.519026 52.1107 0 49.7292 0C43.6494 0 39.3681 3.16343 39.3418 7.68618C39.2913 11.0231 42.4071 12.8764 44.7375 13.9891C47.1194 15.126 47.9291 15.8681 47.9291 16.8815C47.9048 18.4379 46.0044 19.1553 44.2318 19.1553C41.7739 19.1553 40.4569 18.7854 38.4554 17.9195L37.6447 17.5483L36.7832 22.7635C38.2271 23.4054 40.8874 23.975 43.6494 24C50.1093 24 54.3149 20.8855 54.3647 16.0658C54.3893 13.4211 52.744 11.3946 49.1969 9.73863C47.0436 8.67561 45.7249 7.95883 45.7249 6.87118C45.7502 5.8824 46.8403 4.86964 49.271 4.86964C51.2725 4.82004 52.743 5.28946 53.857 5.75921L54.4138 6.00591L55.2511 0.989106Z" fill="white"/>
                <path d="M63.4334 15.4235C63.9404 14.0888 65.8913 8.92322 65.8913 8.92322C65.8658 8.97283 66.3973 7.5639 66.7014 6.69897L67.1316 8.70083C67.1316 8.70083 68.2975 14.262 68.5506 15.4235C67.5885 15.4235 64.6494 15.4235 63.4334 15.4235ZM71.0328 0.421387H66.2708C64.8022 0.421387 63.6865 0.841206 63.0529 2.34901L53.9082 23.6537H60.3681C60.3681 23.6537 61.4316 20.7862 61.6602 20.1687C62.3689 20.1687 68.653 20.1687 69.5647 20.1687C69.7414 20.9843 70.2993 23.6537 70.2993 23.6537H75.9996L71.0328 0.421387Z" fill="white"/>
                <path d="M21.6345 0.421387L15.6052 16.2638L14.9464 13.0508C13.8317 9.34337 10.3358 5.31534 6.43457 3.31249L11.9572 23.6294H18.4675L28.1445 0.421387H21.6345Z" fill="white"/>
                <path d="M10.0066 0.421387H0.101335L0 0.890809C7.72672 2.81876 12.844 7.46601 14.9464 13.0518L12.7931 2.3743C12.4386 0.890481 11.3492 0.470333 10.0066 0.421387Z" fill="white"/>
            </svg>
            <div className={styles.paymentCardName}>{name}</div>
            <div className={styles.paymentCardLastRow}>
                <div>{cardnumber}</div>
                <div>{expirationdate}</div>
            </div>
        </div>
    </div>
    );
};


{/* <PriceBreakdown
                departingFlightPrice={251.50}
                arrivingFlightPrice={251.50}
                baggageFees={0}
                seatUpgradePrice={199}
                taxRate={9.4}
            />

            <PaymentMethod name="Sofia wells" cardnumber="**** **** **** 3456" expirationdate="12/24"/>
            <TravelItinerarySharing /> */}

const data = {
    cardRow1: [
    {
        name: "Belize Ocean Club",
        city: "Placencia, Belize",
        price: 299,
        description: "Beachfront resort with stunning views",
        image: card1image
    },
    {
        name: "Naia Resort and Spa",
        city: "Placencia, Belize",
        price: 349,
        description: "Luxury spa resort on a private beach",
        image: card1image
    }
    ],
    cardRow2: [
    {
        name: "Hol Chan Marine Reserve",
        city: "Ambergris Caye, Belize",
        price: 89,
        description: "Snorkeling tour in protected marine area",
        image: card1image
    },
    {
        name: "Xunantunich Mayan Ruins",
        city: "San Jose Succotz, Belize",
        price: 59,
        description: "Guided tour of ancient Mayan city",
        image: card1image
    }
    ]
};

const ColumnRight = () => {
    const [data, setData] = useState({ hotels: [], experiences: [] });

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch('/api/SuccessPageCards');
        const result = await response.json();
        setData(result);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    fetchData();
    }, []);

    return (
    <div className={styles.columnRight}>
        <div className={styles.cardsSection}>
        <div className={styles.sectionTitle}>Shop <span style={{color: "#605DEC"}}>hotels</span></div>
        <p className={styles.description}>Tripma partners with thousands of hotels to get you the best deal. Save up to 30% when you add a hotel to your trip.</p>
        <div className={styles.cards}>
            {data.hotels.map((hotel, index) => (
            <Card key={index} {...hotel} className={styles.cardoverride} />
            ))}
            <button className={styles.viewAllButton}>Shop all hotels</button>
        </div>
        </div>
        <div className={styles.cardsSection}>
        <div className={styles.sectionTitle}>Find unique <span style={{color: "#605DEC"}}>experiences</span></div>
        <p className={styles.description}>Find events and authentic cultural experiences available exclusively to Tripma users.</p>
        <div className={styles.cards}>
            {data.experiences.map((experience, index) => (
            <Card key={index} {...experience} className={styles.cardoverride}/>
            ))}
            <button className={styles.viewAllButton}>View all experiences</button>
        </div>
        </div>
    </div>
    );
};
