import Popup from '@/components/popup';
import styles from './page.module.css';
import Hero from '@/components/hero';

import Card from '@/components/card';
import LargeCard from '@/components/largeCard';
import card1Image from '@/components/card1.jpg';

export default function TripmaPage() {
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
                    <path d="M1 8.5H20.5M20.5 8.5L13 1M20.5 8.5L13 16" stroke="#A1B0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
          </div>

          <div className={styles.cards}> 

            <Card name="The Bund, " price="$598" textstyle1Text="Shanghai" description="China’s most international city" image={card1Image}/>
            <Card name="The Bund, " price="$598" textstyle1Text="Shanghai" description="China’s most international city" image={card1Image}/>
            <Card name="The Bund, " price="$598" textstyle1Text="Shanghai" description="China’s most international city" image={card1Image}/>

          </div>
          <LargeCard name="The Bund, " price="$598" textstyle1Text="Shanghai" description="China’s most international city" image={card1Image}/>
            
        </div>


        <div className={styles.cardRow}>
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
                    <path d="M1 8.5H20.5M20.5 8.5L13 1M20.5 8.5L13 16" stroke="#A1B0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
          </div>

          <div className={styles.cards}> 

            <Card name="The Bund " textstyle1Text="Shanghai" description="China’s most international city" image={card1Image} newcolor="#98FF98"/>
            <Card name="The Bund " textstyle1Text="Shanghai" description="China’s most international city" image={card1Image} newcolor="#98FF98"/>
            <Card name="The Bund " textstyle1Text="Shanghai" description="China’s most international city" image={card1Image} newcolor="#98FF98"/>

          </div>
          
        </div>

      </div>
      <Popup />

    </div>
  );
}