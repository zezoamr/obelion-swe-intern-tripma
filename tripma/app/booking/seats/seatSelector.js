"use client";

import { useEffect, useState } from 'react';

import Image from 'next/image';
import styles from './seatSelector.module.css';

const SeatSelector = ({ className = "", OpenOverlay, selectedSeat, flight, handleReset, passengerNumber, flightNumber, passengerName }) => {
    // make sure seat is object and not array

    // toggle based on seat selected not on click on overlay
    const [economySelected, setEconomySelected] = useState(true);
    const [businessSelected, setBusinessSelected] = useState(false);

    useEffect(() => {
        
        if(selectedSeat && selectedSeat.class === 'business') {
            setBusinessSelected(true);
            setEconomySelected(false);
        }
        else if(selectedSeat && selectedSeat.class === 'economy') {
            setEconomySelected(true);
            setBusinessSelected(false);
        }
    }, [selectedSeat])

    return (
        <div className={`${styles.seatSelector} ${className}`}>
        <div className={styles.content}>
            <ProgressStepHeader flight={flight} flightNumber={flightNumber}/>
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
            <NavigationFooter OpenOverlay={OpenOverlay}
                selectedSeat={selectedSeat} handleReset={handleReset}
                passengerNumber={passengerNumber} passengerName={passengerName}/>
        </div>
        </div>
    );
};


const airportToCityMap = {
    'NRT': 'Narita, Tokyo',
    'PVG': 'Shanghai',
    'STL': 'St. Louis',
    'ATL': 'Atlanta',
    'MSP': 'Minneapolis',
    'SFO': 'San Francisco',
    'JFK': 'New York',
    'LAX': 'Los Angeles',
};

export function getCityByAirportCode(code) {
    return airportToCityMap[code] || 'Unknown airport code';
}

const ProgressStepHeader = ({ flight, flightNumber }) => {
    // Ensure flight is not null or undefined before attempting to destructure
    const [departureTime, arrivalTime] = flight?.fromtoTime?.split(' - ') || ['08:00AM', '08:00PM'];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formatDate =  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        if (formatDate === 'Invalid Date') {
            return 'invalid'
        }
        return formatDate;
    };

    const formatTime = (timeString) => {
        const [time] = timeString.split(' ');
        return time;
    };

    //console.log('flight no.', flightNumber);

    const sectionClass1 = flightNumber === 1 ? `${styles.section} ${styles.hoverEffect} ${styles.purpleBackground}` : `${styles.section} ${styles.hoverEffect}`;
    const sectionClass2 = flightNumber !== 1 ? `${styles.section} ${styles.hoverEffect} ${styles.purpleBackground}` : `${styles.section} ${styles.hoverEffect}`;
    return (
        <div className={styles.progressStepHeadercontainer}>
            <div className={styles.section}>
                <h1 className={styles.Headertitle}>{flight?.from || 'SFO'}</h1>
                <p className={styles.subtitle}>{flight?.from ? getCityByAirportCode(flight?.from) : 'US, California'}</p>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.section}>
                <h1 className={styles.Headertitle}>{flight?.to || 'NRT'}</h1>
                <p className={styles.subtitle}>{ flight?.to ? getCityByAirportCode(flight?.to) : 'Tokyo, Japan'}</p>
            </div>
            <div className={sectionClass1}>
                <h3 className={styles.Headertitle}>
                    {formatDate(flight?.startDate) || 'Aug 25'} | {formatTime(departureTime) || '08:00 AM'}
                </h3>
                <p className={styles.subtitle}>Departing</p>
            </div>
            <div className={sectionClass2}>
                <h2 className={styles.Headertitle}>
                    {formatDate(flight?.endDate) || 'Aug 25'} | {formatTime(arrivalTime) || '08:00 AM'}
                </h2>
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

const NavigationFooter = ({
    OpenOverlay,
    selectedSeat,
    handleReset,
    passengerNumber,
    passengerName,
}) => {

    return (
        <div className={styles.navigationFooter}>
            <div className={styles.passengerInfo}>
                <div className={styles.passenger}>
                    <span className={styles.passengerlabel}>Passenger {passengerNumber}</span>
                    <span className={styles.passengername}>
                        {passengerName || 'Unnamed Passenger'}
                    </span>
                </div>
                <div className={styles.seatNumber}>
                    <span className={styles.passengerlabel}>Seat number</span>
                    <span className={styles.passengername}>
                        {selectedSeat?.seatDisplay || '--'}
                    </span>
                </div>
            </div>
            <div className={styles.buttons}>
                <button
                    className={`${styles.button} ${styles.saveButton}`}
                    onClick={OpenOverlay}
                >
                    Choose Seat
                </button>
                <button
                    className={`${styles.button} ${styles.nextButton}`}
                    onClick={handleReset}
                >
                    Reset All Selections
                </button>
            </div>
        </div>
    );
};


export default SeatSelector;