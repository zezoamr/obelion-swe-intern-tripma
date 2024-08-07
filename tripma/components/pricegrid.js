
import styles from './PriceGrid.module.css';

const dates = ['2/12', '2/13', '2/14', '2/15', '2/16'];
const prices = [
    ['3/7', 837, 592, 592, 1308, 837],
    ['3/8', 837, 592, 592, 837, 1308],
    ['3/9', 624, 592, 624, 592, 592],
    ['3/10', 1308, 624, 624, 837, 837],
    ['3/11', 592, 624, 1308, 837, 624]
  ];


export default function PriceGrid () {
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