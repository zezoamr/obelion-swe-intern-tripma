"use client";

import Image from 'next/image'
import styles from './flightTable.module.css'

export default function FlightTable({flights, isOneWay, pickedflights, setFlights, className='', className2='', disablePicking=false}) {

    const handleAddFlight = (flightId) => {
        if (disablePicking) return;
        if(isOneWay && pickedflights.length == 1) return;
        if(pickedflights.length == 2) return;
    
        const selectedFlight = flights.find(flight => flight.id === flightId);
        if (!selectedFlight) setFlights(prevPickedFlights => [...prevPickedFlights, selectedFlight]);
    
        const existingFlightCount = pickedflights.filter(flight => flight.id === flightId).length;
    
        if (existingFlightCount < selectedFlight.availableSeats) {
            setFlights(prevPickedFlights => [...prevPickedFlights, selectedFlight]);
        }
    };

    return (
        <div className={`${styles.tableflight} ${className}`}>
                    {flights.map((flight) => (
                        <>
                        <div className={`${styles.flightrow} ${className2}`} onClick={() => handleAddFlight(flight.id)}>
                            <div className={styles.image25}>
                                <Image
                                    src={flight.image}
                                    alt={flight.airline}
                                    fill
                                />
                            </div>
                            <div className={styles.datarows}>
                                <div className={styles.row}>
                                    <div className={styles.label1}>
                                        {flight.duration}
                                    </div>
                                    <div className={styles.label2}>
                                        {flight.fromtoTime}
                                    </div>
                                    <div className={styles.label3right}>
                                        {flight.stops}
                                    </div>
                                    <div className={styles.label4right}>
                                        {"$"+flight.price}
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label1}>
                                        {flight.airline}
                                    </div>
                                    <div className={styles.label2}>
                                        
                                    </div>
                                    <div className={styles.label3right}>
                                        {flight.stopduration}
                                    </div>
                                    <div className={styles.label4right}>
                                        {isOneWay? 'one way' : 'round trip'}
                                    </div>
                                </div>
                            </div>   

                        </div>
                        <div className={styles.divider}></div>
                        </>
                    ))}
                </div>
    )
}
