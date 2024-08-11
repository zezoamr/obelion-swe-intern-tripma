import styles from './seats.module.css';

export default function Seats({ seats, dividerLocations = [],selectedSeat, setSelectedSeat }) {

    const handleSeatClick = (rowIndex, seatIndex) => {
        const seat = seats[rowIndex][seatIndex];
        const seatLetter = String.fromCharCode(65 + seatIndex); // Convert seatIndex to letter starting from 'A'

        if (!seat.available) {
            console.log(`Seat ${rowIndex + 1}${seatIndex + 1} is unavailable`);
            return; // Do nothing if the seat is unavailable
        }

        if (selectedSeat && selectedSeat.row === rowIndex && selectedSeat.seat === seatIndex) {
            setSelectedSeat(null); // Unreserve the seat if it's already selected
        } else {
            setSelectedSeat({ row: rowIndex, seat: seatIndex, seatDisplay: (rowIndex + 1) + seatLetter, class: seat.class }); // Reserve the new seat
            console.log(`Seat ${(rowIndex + 1) + seatLetter} reserved (${seat.class})`);
        }
    };

    return (
        <div className={styles.airplane}>
            {seats.map((row, rowIndex) => {
                const middleIndex = Math.floor(row.length / 2);
                return (
                    <>
                    {dividerLocations.includes(rowIndex) && (
                        <div key={`divider-${rowIndex}`} className={styles.divider}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="6" stroke="#7C8DB0" stroke-width="1.5"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99984 7.66667C9.46007 7.66667 9.83317 7.29357 9.83317 6.83333C9.83317 6.3731 9.46007 6 8.99984 6C8.5396 6 8.1665 6.3731 8.1665 6.83333C8.1665 7.29357 8.5396 7.66667 8.99984 7.66667ZM9.74983 9C9.74983 8.58579 9.41405 8.25 8.99983 8.25C8.58562 8.25 8.24983 8.58579 8.24983 9V11.3333C8.24983 11.7475 8.58562 12.0833 8.99983 12.0833C9.41405 12.0833 9.74983 11.7475 9.74983 11.3333V9Z" fill="#7C8DB0"/>
                            </svg> Exit row</div>
                    )}

                    <div key={rowIndex} className={styles.row} style={{ '--seats-in-row': row.length }}>
                        {row.slice(0, middleIndex).map((seat, seatIndex) => {
                            const isSelected = selectedSeat && selectedSeat.row === rowIndex && selectedSeat.seat === seatIndex;
                            return (
                                <button
                                    key={seatIndex}
                                    className={`${styles.seat} ${
                                        isSelected
                                            ? styles.selected
                                            : seat.available
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
                                    key={newSeatIndex}
                                    className={`${styles.seat} ${
                                        isSelected
                                            ? styles.selected
                                            : seat.available
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
                    </>
                );
            })}
        </div>
    );
    //✓
}
