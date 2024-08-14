"use client";

import React from 'react'
import Image from 'next/image'
import styles from './flightTableMini.module.css'

export default function FlightTableMini({flights, setFlights, className=''}) {

    const handleRemoveFlight = (flightId) => {
        setFlights(prevFlights => {
            const index = prevFlights.findIndex(flight => flight.id === flightId);
            if (index!== -1) {
                return [...prevFlights.slice(0, index),...prevFlights.slice(index + 1)];
            }
            return prevFlights;
        });
    };

    return (
        <div className={`${styles.tableflight} ${className}`}>
        {flights.map((flight, index) => (
            <React.Fragment key={index}>
            <div className={styles.flightrow} onClick={() => handleRemoveFlight(flight.id)}>
                <div className={styles.image25}>
                <Image
                    src={flight.image}
                    alt={flight.airline}
                    fill
                />
                </div>
                <div className={styles.row1}>
                <div className={styles.label1}>
                    {flight.airline}
                </div>
                <div className={styles.label2}>
                    {flight.flightid? flight.flightid : flight.id}
                </div>
                </div>
                <div className={styles.row2}>
                <div className={styles.label1}>
                    {flight.duration}
                </div>
                <div className={styles.label1}>
                    {flight.fromtoTime}
                </div>
                <div className={styles.label2}>
                    {flight.stopduration}
                </div>
                </div>
            </div>
            <div className={styles.divider}></div>
            </React.Fragment>
        ))}
        </div>
    )
}
