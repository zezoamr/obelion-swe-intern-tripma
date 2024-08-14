"use client";
import React from 'react';

import styles from './seats.module.css';

export default function Seats({ seats, dividerLocations = [], selectedSeat, setSelectedSeat, takenSeats }) {
    const handleSeatClick = (rowIndex, seatIndex) => {
        const seat = seats[rowIndex][seatIndex];
        const seatLetter = String.fromCharCode(65 + seatIndex);
        const seatDisplay = `${rowIndex + 1}${seatLetter}`;

        if (!seat.available || takenSeats.some(s => s.seatDisplay === seatDisplay)) {
            console.log(`Seat ${seatDisplay} is unavailable`);
            return;
        }

        console.log(`Seat ${seatDisplay} reserved (${seat.class})`);
        setSelectedSeat({ row: rowIndex, seat: seatIndex, seatDisplay, class: seat.class });
        
    };

    return (
        <div className={styles.airplane}>
            {seats.map((row, rowIndex) => {
                const middleIndex = Math.floor(row.length / 2);
                return (
                    <React.Fragment key={`row-fragment-${rowIndex}`}>
                    {dividerLocations.includes(rowIndex) && (
                        <div key={`divider-${rowIndex}`} className={styles.divider}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="6" stroke="#7C8DB0" strokeWidth="1.5"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.99984 7.66667C9.46007 7.66667 9.83317 7.29357 9.83317 6.83333C9.83317 6.3731 9.46007 6 8.99984 6C8.5396 6 8.1665 6.3731 8.1665 6.83333C8.1665 7.29357 8.5396 7.66667 8.99984 7.66667ZM9.74983 9C9.74983 8.58579 9.41405 8.25 8.99983 8.25C8.58562 8.25 8.24983 8.58579 8.24983 9V11.3333C8.24983 11.7475 8.58562 12.0833 8.99983 12.0833C9.41405 12.0833 9.74983 11.7475 9.74983 11.3333V9Z" fill="#7C8DB0"/>
                            </svg> Exit row</div>
                    )}

                    <div key={rowIndex} className={styles.row}>
                        {row.slice(0, middleIndex).map((seat, seatIndex) => {
                            const isSelected = selectedSeat && selectedSeat.row === rowIndex && selectedSeat.seat === seatIndex;
                            return (
                                <button
                                    key={`1seat-${rowIndex}-${seatIndex}`}
                                    className={`${styles.seat} ${
                                        isSelected
                                            ? styles.selected
                                            : seat.available && !takenSeats?.some(s => s.seatDisplay === `${rowIndex + 1}${String.fromCharCode(65 + seatIndex)}`)
                                            ? (seat.class === 'business' ? styles.business : styles.economy)
                                            : styles.unavailable
                                    }`}
                                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                                >
                                    {isSelected && <span className={styles.checkmark}>✓</span>}
                                </button>
                            );
                        })}

                        <div className={styles.rowNumber}>{rowIndex + 1}</div>

                        {row.slice(middleIndex).map((seat, seatIndex) => {
                            const newSeatIndex = middleIndex + seatIndex;
                            const isSelected = selectedSeat && selectedSeat.row === rowIndex && selectedSeat.seat === newSeatIndex;
                            return (
                                <button
                                    key={`2seat-${rowIndex}-${newSeatIndex}`}
                                    className={`${styles.seat} ${
                                        isSelected
                                            ? styles.selected
                                            : seat.available && !takenSeats?.some(s => s.seatDisplay === `${rowIndex + 1}${String.fromCharCode(65 + newSeatIndex)}`)
                                            ? (seat.class === 'business' ? styles.business : styles.economy)
                                            : styles.unavailable
                                    }`}
                                    onClick={() => handleSeatClick(rowIndex, newSeatIndex)}
                                >
                                    {isSelected && <span className={styles.checkmark}>✓</span>}
                                </button>
                            );
                        })}
                    </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
    //✓
}
