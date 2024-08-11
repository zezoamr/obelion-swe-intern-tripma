"use client";
import { useState } from 'react';

import styles from './page.module.css';
import Image from 'next/image';

import Footer from '@/components/footer';
import luggageImage from '@/components/Luggage2.svg';
import PassengerForm from '@/components/passengerForm';
import Cart from '@/components/cart';

import airlineimage from "@/components/airlines.png"

export default function TripmaPage() {
  const [pickedflights, setPickedflights] = useState([
      {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: 624,
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage,
        id: "FiG43215",
        taxes: 1
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: 624,
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in HNL",
        type: "round trip",
        image: airlineimage,
        id: "FiG43216",
        taxes: 1
    },
    ]
  );

  const [FormNotComplete, setFormNotComplete] = useState(false);
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.rightColumn}>
            <PassengerForm FormNotComplete={FormNotComplete} setFormNotComplete={setFormNotComplete}/>
            </div>
            <div className={styles.leftColumn}>
              <Cart 
              flights={pickedflights} 
              setFlights={() => {}} 
              buttonText={FormNotComplete ? "Select Seats" : "Select Seats"}
              buttonClassName={FormNotComplete ? "selectSeatsPurple" : "selectSeatsGray" }
              buttonChangeHandler={setFormNotComplete}
              />
              <Image src={luggageImage} alt="luggage" width={382} height={525} style={{ margin: "47px 96px 56px 184px"}} />
            </div>
        </div>
        
      

    </div>
  );
}