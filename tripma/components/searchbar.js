"use client";

import { useState } from 'react';

import Hero from "./hero";
import styles from './searchbar.module.css'


import Image from 'next/image'
import airlineimage from "@/components/airlines.png"
import mapimage from "@/components/mapimage.png"

import PriceGrid from "@/components/pricegrid";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import PriceRating from "./priceRating";
import FlightTable from "./flightTable";
import Cart from "./cart";

const flights = [
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },{
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },{
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: "$624",
        airline: "Hawaiian Airlines",
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

    /* implement on click */
    const [pickedflights, setPickedflights] = useState([
        {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        id: "FiG4321",
        image: airlineimage
        },
        {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        id: "FiG4321",
        image: airlineimage
        },
    ]
    );
    const [cartOpen, setCartOpen] = useState(false);

    /*tmp for demo purposes */
    const handleToggleCart = (e) => {
        // Prevent toggling when clicking on interactive elements
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'LABEL' && e.target.tagName !== 'SVG' && e.target.tagName !== 'PATH') {
            setCartOpen(!cartOpen);
        }
    };

  return (
    <div className={styles.Searchbarcontainer} onClick={handleToggleCart}>
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
        
        <div style={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "center", gap: "20px"}}>
                <span className={styles.Chooseflight}>
                Choose a
                <span className={styles.textstyle1}> departing </span>
                flight
                </span>
                <FlightTable flights={flights}/>
                {/* move button inside flight table? */}
                <button className={styles.button1}> 
                    <label>
                    Show all flights
                    </label>
                </button>

                <div className={styles.Map}>
                    <Image src={mapimage} alt="map" fill />
                </div>
            </div>
            {!cartOpen ? 
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "center", gap: "70px"}}>
                <PriceGrid />
                <PriceHistoryChart />
                <PriceRating recommendation={"We recommend booking soon. The average cost of this flight is $750, but could rise 18% to $885 in two weeks."}/>
                
            </div> :
            <Cart flights={pickedflights} />}
        </div>
        
    
    </div>
  )
}
