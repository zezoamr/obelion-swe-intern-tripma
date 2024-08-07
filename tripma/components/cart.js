import FlightTableMini from "./flightTableMini"
import styles from "./cart.module.css"

const summaryItems = [
    {
        label: "Subtotal",
        details: "$503",
    },
    {
        label: "Taxes and fees",
        details: "$121",
    },
    {
        label: "Total",
        details: "$624",
    },
]

export default function Cart({flights}) {
    return (
        <div className={styles.cart}>
            <FlightTableMini flights={flights}/>

            <div className={styles.summary}> 
                {summaryItems.map((item) => (
                    <div className={styles.summaryItem}>
                    <div className={styles.labels}>
                        {item.label}
                    </div>
                    <div className={styles.details}>
                        {item.details}
                    </div>
                    </div>
                ))}
            <button className={styles.saveAndClose}>Save and Close</button>    
            </div>
        </div>
    )
}
