"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/providers/CartProvider'

import styles from './page.module.css';
import Searchbar from '@/components/searchbar';

import Card from '@/components/card';


export default function SearchPage() {

  const searchParams = useSearchParams();
  const { updateAdultsAndMinors } = useCart();

  const [data, setData] = useState(null);
  const [PriceInfoData, setPriceInfoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const [flights, setFlights] = useState([]);
  const [flightloading, setFlightLoading] = useState(true);
  const [fromValue, setFromValue] = useState(searchParams.get('from') || '');
  const [toValue, setToValue] = useState(searchParams.get('to') || '');
  const [adults, setAdults] = useState(searchParams.get('adults') || '1');
  const [minors, setMinors] = useState(searchParams.get('minors') || '0');
  const [selectedDateRange, setSelectedDateRange] = useState(() => {
    const dateRange = searchParams.get('dateRange');
    if (dateRange) {
      const [start, end] = dateRange.split(',');
      return { start: new Date(start), end: new Date(end) };
    }
    return null;
  });

  useEffect(() => {
    updateAdultsAndMinors(adults, minors);
  }, [adults, minors]);

  useEffect(() => {
    setAdults(searchParams.get('adults') || '1');
    setMinors(searchParams.get('minors') || '0');
    setFromValue(searchParams.get('from') || '');
    setToValue(searchParams.get('to') || '');
    setSelectedDateRange(() => {
      const dateRange = searchParams.get('dateRange');
    if (dateRange) {
      const [start, end] = dateRange.split(',');
      return { start: new Date(start), end: new Date(end) };
    }
    return null;
    })

  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        updateAdultsAndMinors(adults, minors);

        // Fetch search cards data
        const res = await fetch('http://localhost:3000/api/SearchCards');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await res.json();
        setData(jsonData);

        let dateRangex = searchParams.get('dateRange') || '';
        let [startx, endx] = dateRangex.split(',');

        // Fetch flights data
        const params = new URLSearchParams({
          from: searchParams.get('from') || '',
          to: searchParams.get('to') || '',
          
          startDate: startx || '',
          endDate: endx || '',
          adults: searchParams.get('adults') || '1',
          minors: searchParams.get('minors') || '0'
        });

        const flightsRes = await fetch(`http://localhost:3000/api/Flights?${params}`);
        if (!flightsRes.ok) {
          throw new Error('Failed to fetch flights');
        }
        const flightsData = await flightsRes.json();
        setFlights(flightsData);
        //console.log(flightsData);

        setIsLoading(false);
        setFlightLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        setFlightLoading(false);
      }

      try {
        const response = await fetch('http://localhost:3000/api/Flights/priceInfo');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setPriceInfoData(result);
      } catch (error) {
          console.error('Error fetching flight price info:', error);
          setError(error);
      }

    };

    fetchData();
  }, [searchParams]);


  // todo use nextjs loading error app router folder pages
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;


  return (
    <div className={styles.container}>
      <Searchbar 
        flights={flights}
        setFlights={setFlights}
        fromValue={fromValue}
        setFromValue={setFromValue}
        toValue={toValue}
        setToValue={setToValue}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        adults={adults}
        setAdults={setAdults}
        minors={minors}
        setMinors={setMinors}
        loading={flightloading}
        setLoading={setFlightLoading}
        PriceGridPrices={PriceInfoData?.priceGridPrices}
        PriceGridDates={PriceInfoData?.priceGridDates}
        priceHistoryChartData={PriceInfoData?.priceHistoryChartData}
        priceRecommendation={PriceInfoData?.priceRecommendation}
      />

      <div className={styles.pageBody}>
        
        <div className={styles.cardRow}>
          <div className={styles.titleRow}>
            <span className={styles.Nameofsectionandanaccent}>
                Find  
              <span className={styles.textstyle1}> places to stay </span>
              in Japan
              </span>
              
              <div className={styles.titlerowspace}></div>
              <div className={styles.seeall}>
                <span className={styles.All}>
                  All
                </span>
                <div className={styles.arrowRight}>
                  <div className={styles.Vector7}>
                    <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8.5H20.5M20.5 8.5L13 1M20.5 8.5L13 16" stroke="#A1B0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
          </div>

          <div className={styles.cards}> 
            {data.cities.map(card => 
              <Card 
              name={card.name}
              city={card.city}
              price={card.price} 
              description={card.description} 
              image={card.image} />
            )}
          </div>
            
        </div>


        <div className={styles.cardRow2}>
          <div className={styles.titleRow}>
            <span className={styles.Nameofsectionandanaccent}>
              People in
              <span className={styles.textstyle2}> San Francisco </span>
              also searched for
              </span>
              <div className={styles.titlerowspace}></div>
              <div className={styles.seeall}>
                <span className={styles.All}>
                  All
                </span>
                <div className={styles.arrowRight}>
                  <div className={styles.Vector7}>
                    <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8.5H20.5M20.5 8.5L13 1M20.5 8.5L13 16" stroke="#A1B0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
          </div>

          <div className={styles.cards}> 

            {data.places.map(card => 
              <Card 
              name={card.name}
              city={card.city} 
              description={card.description} 
              image={card.image} 
              newcolor={card.newcolor}/>
            )}
          </div>
          
        </div>


      </div>

    </div>
  );
}