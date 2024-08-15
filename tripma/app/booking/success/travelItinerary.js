"use client";

import { useState } from 'react';
import styles from './travelItinerary.module.css';

export default function  travelItinerary () {
    const [emails, setEmails] = useState(['']);

    const handleEmailChange = (index, value) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
    };

    const handleAddAnother = () => {
        setEmails([...emails, '']);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here handle the email sending logic
        console.log('Sending itinerary to:', emails.filter(email => email !== ''));
    };

    return (
        <div className={styles.card}>
        
        <div className={styles.content}>
            <div className={styles.header}>Share your travel itinerary</div>
            <form onSubmit={handleSubmit}>
            <p className={styles.description}>
                You can email your itinerary to anyone by entering their email address here.
            </p>
            {emails.map((email, index) => (
                <input
                key={index}
                type="email"
                className={styles.input}
                placeholder="Email address"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                />
            ))}
            <div className={styles.buttonContainer}>
                <button type="submit" className={`${styles.button} ${styles.primaryButton}`}>
                Email itinerary
                </button>
                <button type="button" className={`${styles.button} ${styles.secondaryButton}`} onClick={handleAddAnother}>
                Add another
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};
