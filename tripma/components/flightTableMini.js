import Image from 'next/image'
import styles from './flightTableMini.module.css'

export default function FlightTableMini({flights}) {
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
                        
                            <div className={styles.row1}>
                                <div className={styles.label1}>
                                    {flight.airline}
                                </div>
                                <div className={styles.label2}>
                                    {flight.id}
                                </div>
                            </div>
                            <div className={styles.row2}>
                                <div className={styles.label1}>
                                    {flight.duration}
                                </div>
                                <div className={styles.label1}>
                                    {flight.fromtoTime}
                                </div>
                                <div className={styles.label2}>
                                    {flight.stopduration}
                                </div>
                            </div>
                        

                    </div>
                    <div className={styles.divider}></div>
                    </>
                ))}
            </div>
  )
}
