import Image from 'next/image'
import styles from './flightTable.module.css'

export default function FlightTable({flights}) {
  return (
    <div className={styles.tableflight}>
                {flights.map((flight) => (
                    <>
                    <div className={styles.flightrow}>
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
                                    {flight.price}
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
                                    {flight.type}
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
