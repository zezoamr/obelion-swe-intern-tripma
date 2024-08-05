import Popup from '@/components/popup';
import styles from './page.module.css';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

import Card from '@/components/card';
import LargeCard from '@/components/largeCard';
import card1Image from '@/components/card1.jpg';
import avatarImage from '@/components/avatar.jpg';

import Image from 'next/image';

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

            <Card name="The Bund " textstyle1Text="Shanghai" description="China’s most international city" image={card1Image} newcolor="#98FF98"/>
            <Card name="The Bund " textstyle1Text="Shanghai" description="China’s most international city" image={card1Image} newcolor="#98FF98"/>
            <Card name="The Bund " textstyle1Text="Shanghai" description="China’s most international city" image={card1Image} newcolor="#98FF98"/>

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
            <div className={styles.TestimonialSocialProof}>
              <div class={styles.avatar}>
              <Image src={avatarImage} alt="photo"  width={48} height={48}/>
              </div>

              <div class={styles.text}>
                <div class={styles.FirstLast}>
                  Yifei Chen
                </div>
                <div class={styles.reviewdate}>
                  Seoul, South Korea | April 2019
                </div>
                <div class={styles.ratingstarrow}>
                  {[0, 1, 2, 3].map(i => <div >
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.57538 0.682938C8.77102 0.368281 9.22898 0.36828 9.42462 0.682937L11.908 4.67708C11.9768 4.78779 12.0862 4.86723 12.2127 4.89849L16.7788 6.02605C17.1385 6.11488 17.28 6.55042 17.0412 6.83372L14.01 10.4298C13.9259 10.5295 13.8842 10.658 13.8936 10.788L14.2322 15.4791C14.2588 15.8486 13.8884 16.1178 13.5451 15.9782L9.18834 14.2066C9.06758 14.1575 8.93242 14.1575 8.81166 14.2066L4.45488 15.9782C4.11165 16.1178 3.74115 15.8486 3.76783 15.4791L4.10644 10.788C4.11583 10.658 4.07406 10.5295 3.99004 10.4298L0.95879 6.83372C0.719989 6.55042 0.861505 6.11488 1.22122 6.02605L5.78727 4.89849C5.91383 4.86723 6.02318 4.78779 6.09202 4.67708L8.57538 0.682938Z" fill="url(#paint0_linear_2784_15395)"/>
                    <defs>
                    <linearGradient id="paint0_linear_2784_15395" x1="9" y1="0" x2="9" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#605DEC"/>
                    <stop offset="1" stop-color="#2A26D9"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </div>)}
                  {[0,].map(i => <div >
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.10172 13.2802L8.10172 13.2802L4.48988 14.749L4.77059 10.86C4.79875 10.47 4.67345 10.0843 4.42139 9.78529L1.90843 6.80409L5.69376 5.86932C6.07345 5.77556 6.4015 5.53722 6.608 5.20509L8.66675 1.89389L10.7255 5.20509L11.5747 4.67708L10.7255 5.20509C10.932 5.53722 11.26 5.77556 11.6397 5.86932L15.4251 6.80409L12.9121 9.78529C12.66 10.0843 12.5347 10.47 12.5629 10.86L12.8436 14.749L9.23178 13.2802L8.85509 14.2066L9.23178 13.2802C8.86949 13.1329 8.464 13.1329 8.10172 13.2802ZM1.12771 6.99689L1.12832 6.99674C1.12812 6.99679 1.12791 6.99684 1.12771 6.99689L1.00784 6.51147L1.12771 6.99689Z" stroke="url(#paint0_linear_2784_15413)" stroke-width="2"/>
                    <defs>
                    <linearGradient id="paint0_linear_2784_15413" x1="8.66675" y1="0" x2="8.66675" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#605DEC"/>
                    <stop offset="1" stop-color="#2A26D9"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </div>)}
                </div>
                <div class={styles.fullreview}>
                  What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me
                  <span class={styles.textstyle1}> read more...</span>
                </div>
              </div>

            </div>

            <div className={styles.TestimonialSocialProof}>
              <div class={styles.avatar}>
              <Image src={avatarImage} alt="photo"  width={48} height={48}/>
              </div>

              <div class={styles.text}>
                <div class={styles.FirstLast}>
                  Yifei Chen
                </div>
                <div class={styles.reviewdate}>
                  Seoul, South Korea | April 2019
                </div>
                <div class={styles.ratingstarrow}>
                  {[0, 1, 2, 3].map(i => <div >
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.57538 0.682938C8.77102 0.368281 9.22898 0.36828 9.42462 0.682937L11.908 4.67708C11.9768 4.78779 12.0862 4.86723 12.2127 4.89849L16.7788 6.02605C17.1385 6.11488 17.28 6.55042 17.0412 6.83372L14.01 10.4298C13.9259 10.5295 13.8842 10.658 13.8936 10.788L14.2322 15.4791C14.2588 15.8486 13.8884 16.1178 13.5451 15.9782L9.18834 14.2066C9.06758 14.1575 8.93242 14.1575 8.81166 14.2066L4.45488 15.9782C4.11165 16.1178 3.74115 15.8486 3.76783 15.4791L4.10644 10.788C4.11583 10.658 4.07406 10.5295 3.99004 10.4298L0.95879 6.83372C0.719989 6.55042 0.861505 6.11488 1.22122 6.02605L5.78727 4.89849C5.91383 4.86723 6.02318 4.78779 6.09202 4.67708L8.57538 0.682938Z" fill="url(#paint0_linear_2784_15395)"/>
                    <defs>
                    <linearGradient id="paint0_linear_2784_15395" x1="9" y1="0" x2="9" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#605DEC"/>
                    <stop offset="1" stop-color="#2A26D9"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </div>)}
                  {[0,].map(i => <div >
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.10172 13.2802L8.10172 13.2802L4.48988 14.749L4.77059 10.86C4.79875 10.47 4.67345 10.0843 4.42139 9.78529L1.90843 6.80409L5.69376 5.86932C6.07345 5.77556 6.4015 5.53722 6.608 5.20509L8.66675 1.89389L10.7255 5.20509L11.5747 4.67708L10.7255 5.20509C10.932 5.53722 11.26 5.77556 11.6397 5.86932L15.4251 6.80409L12.9121 9.78529C12.66 10.0843 12.5347 10.47 12.5629 10.86L12.8436 14.749L9.23178 13.2802L8.85509 14.2066L9.23178 13.2802C8.86949 13.1329 8.464 13.1329 8.10172 13.2802ZM1.12771 6.99689L1.12832 6.99674C1.12812 6.99679 1.12791 6.99684 1.12771 6.99689L1.00784 6.51147L1.12771 6.99689Z" stroke="url(#paint0_linear_2784_15413)" stroke-width="2"/>
                    <defs>
                    <linearGradient id="paint0_linear_2784_15413" x1="8.66675" y1="0" x2="8.66675" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#605DEC"/>
                    <stop offset="1" stop-color="#2A26D9"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </div>)}
                </div>
                <div class={styles.fullreview}>
                  What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me
                  <span class={styles.textstyle1}> read more...</span>
                </div>
              </div>

            </div>

            <div className={styles.TestimonialSocialProof}>
              <div class={styles.avatar}>
              <Image src={avatarImage} alt="photo" width={48} height={48} />
              </div>

              <div class={styles.textbox}>
                <div class={styles.FirstLast}>
                  Yifei Chen
                </div>
                <div class={styles.reviewdate}>
                  Seoul, South Korea | April 2019
                </div>
                <div class={styles.ratingstarrow}>
                  {[0, 1, 2, 3].map(i => <div >
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.57538 0.682938C8.77102 0.368281 9.22898 0.36828 9.42462 0.682937L11.908 4.67708C11.9768 4.78779 12.0862 4.86723 12.2127 4.89849L16.7788 6.02605C17.1385 6.11488 17.28 6.55042 17.0412 6.83372L14.01 10.4298C13.9259 10.5295 13.8842 10.658 13.8936 10.788L14.2322 15.4791C14.2588 15.8486 13.8884 16.1178 13.5451 15.9782L9.18834 14.2066C9.06758 14.1575 8.93242 14.1575 8.81166 14.2066L4.45488 15.9782C4.11165 16.1178 3.74115 15.8486 3.76783 15.4791L4.10644 10.788C4.11583 10.658 4.07406 10.5295 3.99004 10.4298L0.95879 6.83372C0.719989 6.55042 0.861505 6.11488 1.22122 6.02605L5.78727 4.89849C5.91383 4.86723 6.02318 4.78779 6.09202 4.67708L8.57538 0.682938Z" fill="url(#paint0_linear_2784_15395)"/>
                    <defs>
                    <linearGradient id="paint0_linear_2784_15395" x1="9" y1="0" x2="9" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#605DEC"/>
                    <stop offset="1" stop-color="#2A26D9"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </div>)}
                  {[0,].map(i => <div >
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.10172 13.2802L8.10172 13.2802L4.48988 14.749L4.77059 10.86C4.79875 10.47 4.67345 10.0843 4.42139 9.78529L1.90843 6.80409L5.69376 5.86932C6.07345 5.77556 6.4015 5.53722 6.608 5.20509L8.66675 1.89389L10.7255 5.20509L11.5747 4.67708L10.7255 5.20509C10.932 5.53722 11.26 5.77556 11.6397 5.86932L15.4251 6.80409L12.9121 9.78529C12.66 10.0843 12.5347 10.47 12.5629 10.86L12.8436 14.749L9.23178 13.2802L8.85509 14.2066L9.23178 13.2802C8.86949 13.1329 8.464 13.1329 8.10172 13.2802ZM1.12771 6.99689L1.12832 6.99674C1.12812 6.99679 1.12791 6.99684 1.12771 6.99689L1.00784 6.51147L1.12771 6.99689Z" stroke="url(#paint0_linear_2784_15413)" stroke-width="2"/>
                    <defs>
                    <linearGradient id="paint0_linear_2784_15413" x1="8.66675" y1="0" x2="8.66675" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#605DEC"/>
                    <stop offset="1" stop-color="#2A26D9"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </div>)}
                </div>

                <div class={styles.fullreview}>
                  What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me
                  <span class={styles.textstyle1}> read more...</span>
                </div>
              </div>

            </div>

          </div>
        </div>



        <Footer />
      </div>
      
      <Popup />

    </div>
  );
}