"use client";

import { useState } from 'react';

import Image from 'next/image';
import styles from './seat-selector.module.css';

const SeatSelector = ({ className = "", toggleOverlay }) => {
    // toggle based on seat selected not on click on overlay
    const [economySelected, setEconomySelected] = useState(true);
    const [businessSelected, setBusinessSelected] = useState(false);
    // const handleEconomySelected = () => {
    //     setEconomySelected(true);
    //     setBusinessSelected(false);
    // }
    // const handleBusinessSelected = () => {
    //     setBusinessSelected(true);
    //     setEconomySelected(false);
    // }

    return (
        <div className={`${styles.seatSelector} ${className}`}>
        <div className={styles.content}>
            <ProgressStepHeader />
            <div className={styles.featureLists} style={{ marginTop: '8px'}}>
                {/* <div onClick={handleEconomySelected}> */}
                <FeatureList
                    className={styles.economy}
                    title="Economy"
                    selected={economySelected}
                    description="Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service"
                    features={[
                    "Built-in entertainment system",
                    "Complimentary snacks and drinks",
                    "One free carry-on and personal item"
                    ]}
                    
                />
                {/* </div> */}
                {/* <div onClick={handleBusinessSelected}> */}
                <FeatureList
                    className={styles.business}
                    title="Business"
                    description="Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service"
                    selected={businessSelected}
                    features={[
                    "Extended leg room",
                    "First two checked bags free",
                    "Priority boarding",
                    "Personalized service",
                    "Enhanced food and drink service",
                    "Seats that recline 40% more than economy"
                    ]}
                />
                {/* </div> */}
            </div>
            <NavigationFooter toggleOverlay={toggleOverlay} />
        </div>
        </div>
    );
};

const ProgressStepHeader = () => {
    return (
        <div className={styles.progressStepHeadercontainer}>
        <div className={styles.section}>
            <h1 className={styles.Headertitle}>SFO</h1>
            <p className={styles.subtitle}>California, US</p>
        </div>
        <div className={styles.arrow}>→</div>
        <div className={styles.section}>
            <h1 className={styles.Headertitle}>NRT</h1>
            <p className={styles.subtitle}>Tokyo, Japan</p>
        </div>
        <div className={`${styles.section} ${styles.hoverEffect}`}>
            <h1 className={styles.Headertitle}>Feb 25 | 7:00AM</h1>
            <p className={styles.subtitle}>Departing</p>
        </div>
        <div className={`${styles.section} ${styles.hoverEffect}`}>
            <h1 className={styles.Headertitle}>Mar 21 | 12:15PM</h1>
            <p className={styles.subtitle}>Arriving</p>
        </div>
        </div>
    );
};

const FeatureList = ({ className, title, selected, description, features }) => {
    return (
        <div className={`${styles.featureList} ${className} `}> {/* ${selected ? styles.selected : ''}*/}
            <div className={styles.seats}>
                <Image src={`/${title.toLowerCase()}.svg`} alt="Seat" width={320} height={180} />
            </div>
            <div className={styles.featureListContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%' }}>
                    <div className={styles.featureListTitle}>{title === "Business" ? title + " class" : title}</div>
                    {selected && <div className={styles.selectedLabel}>Selected</div>}
                </div>
                
                <p className={styles.featureListDescription}>{description}</p>
                
                {title ===  "Business" ? <div className={`${styles.dividerthick} ${styles.dividerGreen}`}></div> 
                : <div className={`${styles.dividerthick} ${styles.dividerPurple}`}></div>}

                <ul className={styles.features}>
                {features.map((feature, index) => (
                    <li key={index} className={styles.feature}>
                    {title === "Economy" ? (
                        <span className={styles.bullet}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12.001" r="5" fill="#605DEC"/>
                            </svg>
                        </span>
                    ) : (
                        <span className={styles.checkmark}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12.001L10.2426 16.2436L18.7279 7.75834" stroke="#5CD6C0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                    )}
                    {feature}
                    </li>
                ))}
                </ul>
                
            </div>
        </div>
    );
};

const NavigationFooter = ({GotoPayment = false, toggleOverlay}) => {
    return (
        <div className={styles.navigationFooter}>
        <div className={styles.passengerInfo}>
            <div className={styles.passenger}>
            <span className={styles.passengerlabel}>Passenger 1</span>
            <span className={styles.passengername}>Sofia Knowles</span>
            </div>
            <div className={styles.seatNumber}>
            <span className={styles.passengerlabel}>Seat number</span>
            <span className={styles.passengername}>--</span>
            </div>
        </div>
        <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.saveButton}`} onClick={toggleOverlay}>Save and close</button>
            {GotoPayment? <button className={`${styles.button} ${styles.nextButton}`}>Payment Method</button>:
                <button className={`${styles.button} ${styles.saveButton}`}>Next flight</button>}
        </div>
        </div>
    );
};

export default SeatSelector;