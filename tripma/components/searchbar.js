import Hero from "./hero";
import styles from './searchbar.module.css'

import Image from 'next/image'
import airlineimage from "@/components/airlines.png"
import mapimage from "@/components/mapimage.png"

import PriceGrid from "@/components/pricegrid";
import PriceHistoryChart from "@/components/PriceHistoryChart";

const flights = [
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },{
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },{
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airlines: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
]
const labels = [
    "Max price",
    "Shops",
    "Times",
    "Airlines",
    "Seat Class",
    "More"
]
export default function Searchbar() {
  return (
    <div className={styles.Searchbarcontainer}>
        <Hero className={styles.heroOverride}/>
        <div className={styles.pills}>
            {labels.map((buttonlabel) => (
                <button className={styles.basepillchit}>
                    <label>
                        {buttonlabel}
                    </label>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.35355 11.6464L12.1464 8.85355C12.4614 8.53857 12.2383 8 11.7929 8H6.20711C5.76165 8 5.53857 8.53857 5.85355 8.85355L8.64645 11.6464C8.84171 11.8417 9.15829 11.8417 9.35355 11.6464Z" fill="#6E7491"/>
                    </svg>
                </button>
            ))}
            
        </div>
        
        <>
            <span className={styles.Chooseflight}>
            Choose a
            <span className={styles.textstyle1}> departing </span>
            flight
            </span>
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

            <button className={styles.button1}>
                <label>
                Show all flights
                </label>
            </button>

            <div className={styles.Map}>
                <Image src={mapimage} alt="map" fill />
            </div>
        </>

        <>
            <PriceGrid />
            <PriceHistoryChart />
        </>
        
    
    </div>
  )
}
