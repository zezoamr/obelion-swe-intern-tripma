import Popup from '@/components/popup';
import styles from './page.module.css';
import Searchbar from '@/components/searchbar';
import Footer from '@/components/footer';
import TestimonialSocialProof from '@/components/TestimonialCard';

import Card from '@/components/card';
import LargeCard from '@/components/largeCard';
import card1Image from '@/components/card1.jpg';
import avatarImage from '@/components/avatar.jpg';


export default function TripmaPage() {

  const cardRow1 = [
    {
        name: "The Bund,",
        price: "$598",
        textstyle1Text: "Shanghai",
        description: "China’s most international city",
        image: card1Image
    },
    {
        name: "The Bund,",
        price: "$598",
        textstyle1Text: "Shanghai",
        description: "China’s most international city",
        image: card1Image
    },
    {
        name: "The Bund,",
        price: "$598",
        textstyle1Text: "Shanghai",
        description: "China’s most international city",
        image: card1Image
    }
];


  const cardRow2 = [
    {
        name: "The Bund",
        textstyle1Text: "Shanghai",
        description: "China’s most international city",
        image: card1Image,
        newcolor: "#98FF98"
    },
    {
        name: "The Bund",
        textstyle1Text: "Shanghai",
        description: "China’s most international city",
        image: card1Image,
        newcolor: "#98FF98"
    },
    {
        name: "The Bund",
        textstyle1Text: "Shanghai",
        description: "China’s most international city",
        image: card1Image,
        newcolor: "#98FF98"
    }
  ];


  return (
    <div className={styles.container}>
      <Searchbar />

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
                    <path d="M1 8.5H20.5M20.5 8.5L13 1M20.5 8.5L13 16" stroke="#A1B0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
          </div>

          <div className={styles.cards}> 
            {cardRow1.map(card => 
              <Card 
              name={card.name}
              textstyle1Text={card.textstyle1Text}
              price={card.price} 
              description={card.description} 
              image={card.image} />
            )}
          </div>
          <LargeCard name="The Bund, " price="$598" textstyle1Text="Shanghai" description="China’s most international city" image={card1Image}/>
            
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
                    <path d="M1 8.5H20.5M20.5 8.5L13 1M20.5 8.5L13 16" stroke="#A1B0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
          </div>

          <div className={styles.cards}> 

            {cardRow2.map(card => 
              <Card 
              name={card.name}
              textstyle1Text={card.textstyle1Text} 
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