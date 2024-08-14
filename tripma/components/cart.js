"use client";

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/providers/CartProvider'

import FlightTableMini from "./flightTableMini"
import styles from "./cart.module.css"


export default function Cart({ flights, setFlights, buttonText, buttonClassName, buttonChangeHandler, disableModifications = false }) {

    const router = useRouter();
    const { updateCart, passengerTotal, passengersInfo, flightSeats,  cartItems} = useCart();
    //console.log("passengertotal = passengerinfo", passengerTotal(), passengersInfo.length)
    //console.log("seatstotal = seatsdone", passengerTotal.length*cartItems.length, flightSeats.flat().length )
    
    const handleButtonClick = () => {
        if (buttonClassName === 'saveAndClose' && !disableModifications) { //extra safety disableModifications 
            // Update the cart with the current flights
            updateCart(flights);
            // Call the buttonChangeHandler
            buttonChangeHandler((prev) => !prev);
        } 
        else if(passengersInfo.length === passengerTotal() && passengerTotal.length*cartItems.length, flightSeats.flat().length ) { //skip both if cart saved data
                router.push('/booking/payment');
        }
        else if(passengersInfo.length === passengerTotal() ){ //skip both if cart has passenger info
            router.push('/booking/seats')
        }
        else if (buttonClassName === 'passengerInfo') {
            // Navigate to the payment page
            router.push('/booking/');
        } else if (buttonClassName === 'selectSeatsPurple') {
            // Navigate to the payment page
            router.push('/booking/seats/');
        }
    };

    const summaryItems = useMemo(() => {
        const subtotal = flights.reduce((sum, flight) => sum + flight.price, 0);
        const taxes = flights.reduce((sum, flight) => sum + (flight.price * flight.taxes / 100), 0);
        const total = subtotal + taxes;
        return [
            {
                label: "Subtotal",
                details: `$${subtotal.toFixed(2)}`,
            },
            {
                label: "Taxes and fees",
                details: `$${taxes.toFixed(2)}`,
            },
            {
                label: "Total",
                details: `$${total.toFixed(2)}`,
            },
        ];
    }, [flights]);
    
    

    return (
        <div className={styles.cart}>
            <FlightTableMini flights={flights} setFlights={setFlights}/>
            <div className={styles.summary}>
                {summaryItems.map((item, index) => (
                    <div key={index} className={styles.summaryItem}>
                        <div className={styles.labels}>
                            {item.label}
                        </div>
                        <div className={styles.details}>
                            {item.details}
                        </div>
                    </div>
                ))}
                <button 
                    className={buttonClassName ? styles[buttonClassName] : styles.saveAndClose}
                    onClick={handleButtonClick}
                > 
                    {buttonText} 
                </button>
            </div>
        </div>
    )
}