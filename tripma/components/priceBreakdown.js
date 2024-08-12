
import styles from './PriceBreakdown.module.css';

export default function  PriceBreakdown ({ 
    departingFlightPrice,     
    arrivingFlightPrice, 
    baggageFees, 
    seatUpgradePrice, 
    taxRate 
    }) {
    const subtotal = departingFlightPrice + arrivingFlightPrice + baggageFees + seatUpgradePrice;
    const taxes = subtotal * (taxRate / 100);
    const totalPaid = subtotal + taxes;

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
                    <span>Taxes ({taxRate}%)</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                <div className={`${styles.row} ${styles.totalRow}`}>
                    <span>Amount paid</span>
                    <span>${totalPaid.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
