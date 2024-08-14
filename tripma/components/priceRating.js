import styles from './priceRating.module.css'

export default function PriceRating({ recommendation }) {

    return (
        
        <div className={styles.container}>
            
            <div className={styles.title}>
                <div className={styles.Pricerating}>
                Price rating
                </div>

                <div className={styles.basepricebadge}>
                    <label>
                    Buy soon
                    </label>
                </div>
            </div>


            <div className={styles.textContainer}>
                <div className={styles.recommendation}>
                    {recommendation? recommendation : "loading recommendation..."}
                </div>
                <div className={styles.textstyle1}>
                    Tripma analyzes thousands of flights, prices, and trends to ensure you get the best deal.
                </div>
            </div>

        </div>
    )
}

