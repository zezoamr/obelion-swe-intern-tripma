import Popup from '@/components/popup';
import styles from './page.module.css';
import Hero from '@/components/hero';
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

  const testimonials = [
    {
        avatarSrc: avatarImage,
        name: "Yifei Chen",
        location: "Seoul, South Korea",
        date: "April 2019",
        rating: 5,
        review: "What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me"
    },
    {
        avatarSrc: avatarImage,
        name: "Yifei Chen",
        location: "Seoul, South Korea",
        date: "April 2019",
        rating: 4,
        review: "What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me"
    },
    {
        avatarSrc: avatarImage,
        name: "Yifei Chen",
        location: "Seoul, South Korea",
        date: "April 2019",
        rating: 1,
        review: "What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me"
    }
];

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
          {testimonials.map(testimonial =>  
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

        <Footer />
      </div>
      
      <Popup />

    </div>
  );
}