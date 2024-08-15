
import styles from './PriceGrid.module.css';



export default function PriceGrid ({prices, dates}) {
    if(!prices || !dates) return <p>Loading...</p>;
    const columns = dates.length + 1; // +1 for the date column
    
    return (
        <div className={styles.container}>
            <div className={styles.title}>Price grid (flexible dates)</div>
            <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
                <div className={styles.headerCell}></div>
                
                {dates.map((date, index) => (
                <div key={index} className={styles.headerCell}>{date}</div>
                ))}
                
                {prices.map((row, rowIndex) => (
                <>
                    {row.map((price, colIndex) => (
                    <div 
                        key={`${rowIndex}-${colIndex}`} 
                        className={colIndex === 0 ? styles.dateCell : styles.priceCell}
                    >
                        {colIndex === 0 ? price : `$${price}`}
                    </div>
                    ))}
                </>
                ))}

            </div>
        </div>
    );
};