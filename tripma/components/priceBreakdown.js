
import styles from './PriceBreakdown.module.css';

export default function  PriceBreakdown ({ 
    departingFlightPrice,     
    arrivingFlightPrice, 
    baggageFees, 
    seatUpgradePrice, 
    taxes, //array
    taxRate 
    }) {
    const subtotal = departingFlightPrice + arrivingFlightPrice + baggageFees + seatUpgradePrice;
    const totalPaid = taxes[1] ? Number(subtotal) + Number(taxes[0]) + Number(taxes[1]) : subtotal + taxes[0];

    return (
        <div className={styles.card}>
        <div className={styles.header}>Price breakdown</div>
            <div className={styles.content}>
                <div className={styles.row}>
                    <span>Departing Flight</span>
                    <span>${departingFlightPrice.toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span>Arriving Flight</span>
                    <span>${arrivingFlightPrice.toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span>Baggage fees</span>
                    <span>${baggageFees.toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span>Seat upgrade (business)</span>
                    <span>${seatUpgradePrice.toFixed(2)}</span>
                </div>
                <div className={`${styles.row}`}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span>Taxes ({taxRate[1] ? taxRate[0] + ' - ' + taxRate[1] : taxRate[0]})%</span>
                    <span>${taxes[1] ? taxes[0] + ' - ' + taxes[1] : taxes[0]}</span>
                </div>
                <div className={`${styles.row} ${styles.totalRow}`}>
                    <span>Amount paid</span>
                    <span>${totalPaid}</span>
                </div>
            </div>
        </div>
    );
};
