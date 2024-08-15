"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Image from 'next/image'

import styles from './searchbar.module.css'
import PriceGrid from "./pricegrid";
import PriceHistoryChart from "./PriceHistoryChart";
import PriceRating from "./priceRating";

import FlightTable from "@/components/flightTable";
import Cart from "@/components/cart";
import Hero from "@/components/hero";

import { useCart } from '@/providers/CartProvider';

const labels = [
    "Max price",
    "Shops",
    "Times",
    "Airlines",
    "Seat Class",
    "More"
]

export default function Searchbar({ fromValue, setFromValue, toValue, setToValue, selectedDateRange, 
    setSelectedDateRange, adults, setAdults, minors, setMinors, flights, setFlights, loading, setLoading,
    PriceGridPrices, PriceGridDates, priceHistoryChartData, priceRecommendation }) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const {cartItems} = useCart();
    const [pickedflights, setPickedflights] = useState(cartItems);
    const [cartOpen, setCartOpen] = useState(false);
    const [SaveAndExit, setSaveAndExit] = useState(true);
    const [isOneWay, setIsOneWay] = useState(true);

    useEffect(() => {
        if (selectedDateRange?.end) {
            //console.log(selectedDateRange);
            setIsOneWay(true);
            if (selectedDateRange.end) {
                setIsOneWay(false);
            }
            else{
                setIsOneWay(true);
            }
        }
    }, [selectedDateRange]);

    // Close the cart when pickedflights becomes empty and open when items are added
    useEffect(() => {
        if (pickedflights.length === 0) {
            setCartOpen(false);
        } else {
            setCartOpen(true);
        }
    }, [pickedflights]);

    function handleShowAll() {
        const params = new URLSearchParams({
            adults: searchParams.get('adults') || '1',
            minors: searchParams.get('minors') || '0'
          });
        router.push(`/search?${params}`, undefined, { shallow: false });
    }


    return (
        <div className={styles.Searchbarcontainer} > 
            <Hero 
                className={styles.heroOverride}
                fromValue={fromValue}
                toValue={toValue}
                selectedDateRange={selectedDateRange}
                adults={adults}
                minors={minors}
                setFromValue={setFromValue}
                setToValue={setToValue}
                setSelectedDateRange={setSelectedDateRange}
                setAdults={setAdults}
                setMinors={setMinors}
            />
            <div className={styles.pills}>
                {labels.map((buttonlabel) => (
                    <button key={buttonlabel} className={styles.basepillchit}>
                        <label>
                            {buttonlabel}
                        </label>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.35355 11.6464L12.1464 8.85355C12.4614 8.53857 12.2383 8 11.7929 8H6.20711C5.76165 8 5.53857 8.53857 5.85355 8.85355L8.64645 11.6464C8.84171 11.8417 9.15829 11.8417 9.35355 11.6464Z" fill="#6E7491"/>
                        </svg>
                    </button>
                ))}
            </div>
            
            <div style={{display: "flex", justifyContent: "space-evenly", alignContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "center", gap: "20px"}}>
                    {isOneWay && pickedflights.length === 1 ?
                        <div className={`${styles.Chooseflight} ${styles.textstyle1} `}> please save the cart </div>
                        :
                        (pickedflights.length === 2 ?
                            <div className={`${styles.Chooseflight} ${styles.textstyle1} `}> please save the cart </div>
                            :
                            <span className={styles.Chooseflight}>
                                Choose a
                                <span className={styles.textstyle1}> {isOneWay ? "Departing" : (pickedflights.length === 0 ? "Departing" : "returning")} </span>
                                flight
                            </span>
                        )
                    }
                    {loading ? (
                        <p>Loading flights...</p>
                    ) : (
                        <FlightTable flights={isOneWay? flights.outboundFlights : (pickedflights.length === 0? flights.outboundFlights : flights.returnFlights)}
                            pickedflights={pickedflights} setFlights={setPickedflights} isOneWay={isOneWay}/>
                    )}

                    {/* move button inside flight table? */}
                    <button className={styles.button1} onClick={handleShowAll}> 
                        <label>
                        Show all flights
                        </label>
                    </button>

                    <div className={styles.Map}>
                        <Image src='/mapimage.png' alt="map" fill />
                    </div>
                </div>

                {!cartOpen ? 
                <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "center", gap: "70px"}}>
                    <PriceGrid prices={PriceGridPrices} dates={PriceGridDates}/>
                    <PriceHistoryChart data={priceHistoryChartData}/>
                    <PriceRating recommendation={priceRecommendation}/>
                    
                </div> :
                <Cart 
                    flights={pickedflights} 
                    setFlights={setPickedflights} 
                    buttonText={SaveAndExit ? "Save and Exit" : "Passenger information"}
                    buttonClassName={SaveAndExit ? "saveAndClose" : "passengerInfo"}
                    buttonChangeHandler={setSaveAndExit}
                />
                }
            </div>
            
        
        </div>
    )
}
