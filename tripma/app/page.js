import Popup from '@/components/popup';
import styles from './page.module.css';
import Hero from '@/components/hero';
import TestimonialSocialProof from '@/components/TestimonialCard';

import Card from '@/components/card';
import LargeCard from '@/components/largeCard';


async function getTripmaData() {
  const res = await fetch('http://localhost:3000/api/HomepageCards', { next: { revalidate: 10 * 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function TripmaPage() {

  
  const data = await getTripmaData();

  return (
    <div className={styles.container}>
      <Hero />

      <div className={styles.pageBody}>
        
        <div className={styles.cardRow}>
          <div className={styles.titleRow}>
            <span className={styles.Nameofsectionandanaccent}>
              Find your next adventure with these 
              <span className={styles.textstyle1}> flight deals</span>
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
              price={card.price} 
              description={card.description} 
              image={card.image} />
            )}
          </div>
          <LargeCard {...data.placesLargeCard} />
            
        </div>


        <div className={styles.cardRow2}>
          <div className={styles.titleRow}>
            <span className={styles.Nameofsectionandanaccent}>
              Explore unique 
              <span className={styles.textstyle2}> places to stay</span>
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
              description={card.description} 
              image={card.image} 
              newcolor={card.newcolor}/>
            )}
          </div>
          
        </div>

        <button className={styles.button}>
          <label className={styles.label}>
            Explore more stays
          </label>
        </button>

        <div className={styles.TestimonialRow}>
          <span className={styles.WhatTripmausersaresaying}>
            What
            <span className={styles.textstyle1}> Tripma </span>
            users are saying
          </span>

          <div className={styles.Frame71}>
          {data.testimonials.map(testimonial =>  
          <TestimonialSocialProof
              avatarSrc={testimonial.avatarSrc}
              name={testimonial.name}
              location={testimonial.location}
              date={testimonial.date}
              rating={testimonial.rating}
              review={testimonial.review}
            />
          )}

          </div>
        </div>


      </div>
      
      <Popup />

    </div>
  );
}