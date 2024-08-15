"use client";
import { useState } from 'react';

import styles from './page.module.css';
import Image from 'next/image';

import PassengerForm from './passengerForm';
import Cart from '@/components/cart';

import { useCart } from '@/providers/CartProvider'

export default function PassengerformPage() {
  const { cartItems, passengerDoneCount } = useCart();

  const [FormNotComplete, setFormNotComplete] = useState(true);
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.rightColumn}>
            <PassengerForm FormNotComplete={FormNotComplete} setFormNotComplete={setFormNotComplete}/>
            </div>
            <div className={styles.leftColumn}>
              <Cart 
              flights={cartItems} 
              setFlights={() => {}} 
              buttonText={cartItems.length > passengerDoneCount() ? "Select Seats" : "Select Seats"}
              buttonClassName={cartItems.length > passengerDoneCount() ? "selectSeatsGray" : "selectSeatsPurple"}
              buttonChangeHandler={setFormNotComplete}
              />
              <Image src='/Luggage2.svg' alt="luggage" width={382} height={525} style={{ margin: "47px 96px 56px 184px"}} />
            </div>
        </div>

    </div>
  );
}