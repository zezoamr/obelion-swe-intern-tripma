"use client";
import { useState } from 'react';

import styles from './page.module.css';
import Image from 'next/image';

import luggageImage from '@/components/Luggage2.svg';
import PaymentForm from './paymentForm';
import Cart from '@/components/cart';

import { useCart } from '@/providers/CartProvider'

export default function PaymentPage() {
  const { cartItems } = useCart();

  const [FormNotComplete, setFormNotComplete] = useState(true);
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.rightColumn}>
            <PaymentForm />
            </div>
            <div className={styles.leftColumn}>
              <Cart 
              flights={cartItems} 
              setFlights={() => {}} 
              buttonText={FormNotComplete ? "Select Seats" : "Select Seats"}
              buttonClassName={FormNotComplete ? "selectSeatsGray" : "selectSeatsPurple"}
              buttonChangeHandler={setFormNotComplete}
              disableModifications={true}
              />
              <Image src={luggageImage} alt="luggage" width={382} height={525} style={{ margin: "47px 96px 56px 184px"}} />
            </div>
        </div>
        

      

    </div>
  );
}