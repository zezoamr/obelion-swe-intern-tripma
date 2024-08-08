"use client";
import FlightTableMini from "./flightTableMini"
import styles from "./cart.module.css"
import { useMemo } from 'react';

export default function Cart({ flights, setFlights, buttonText, buttonClassName, buttonChangeHandler }) {
    const summaryItems = useMemo(() => {
        const subtotal = flights.reduce((sum, flight) => sum + flight.price, 0);
        const taxes = flights.reduce((sum, flight) => sum + flight.taxes, 0);
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
                    onClick={() => {buttonChangeHandler((prev) => !prev)}}
                > 
                    {buttonText} 
                </button>
            </div>
        </div>
    )
}