import Image from 'next/image'
import styles from './TestimonialCard.module.css'

export default function TestimonialCard({
    avatarSrc,
    name,
    location,
    date,
    rating,
    review
  })  {
    return (
        <div className={styles.TestimonialSocialProof}>
          <div className={styles.avatar}>
            <Image src={avatarSrc} alt={`${name}'s photo`} width={48} height={48}/>
          </div>
          <div className={styles.text}>
            <div className={styles.FirstLast}>
              {name}
            </div>
            <div className={styles.reviewdate}>
              {location} | {date}
            </div>
            <div className={styles.ratingstarrow}>
              {[...Array(rating)].map((_, i) => (
                <div key={`filled-star-${i}`}>
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.57538 0.682938C8.77102 0.368281 9.22898 0.36828 9.42462 0.682937L11.908 4.67708C11.9768 4.78779 12.0862 4.86723 12.2127 4.89849L16.7788 6.02605C17.1385 6.11488 17.28 6.55042 17.0412 6.83372L14.01 10.4298C13.9259 10.5295 13.8842 10.658 13.8936 10.788L14.2322 15.4791C14.2588 15.8486 13.8884 16.1178 13.5451 15.9782L9.18834 14.2066C9.06758 14.1575 8.93242 14.1575 8.81166 14.2066L4.45488 15.9782C4.11165 16.1178 3.74115 15.8486 3.76783 15.4791L4.10644 10.788C4.11583 10.658 4.07406 10.5295 3.99004 10.4298L0.95879 6.83372C0.719989 6.55042 0.861505 6.11488 1.22122 6.02605L5.78727 4.89849C5.91383 4.86723 6.02318 4.78779 6.09202 4.67708L8.57538 0.682938Z" fill="url(#paint0_linear_2784_15395)"/>
                    <defs>
                    <linearGradient id="paint0_linear_2784_15395" x1="9" y1="0" x2="9" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#605DEC"/>
                    <stop offset="1" stopColor="#2A26D9"/>
                    </linearGradient>
                    </defs>
                  </svg>
                </div>
              ))}
              {[...Array(5 - rating)].map((_, i) => (
                <div key={`empty-star-${i}`}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.10172 13.2802L8.10172 13.2802L4.48988 14.749L4.77059 10.86C4.79875 10.47 4.67345 10.0843 4.42139 9.78529L1.90843 6.80409L5.69376 5.86932C6.07345 5.77556 6.4015 5.53722 6.608 5.20509L8.66675 1.89389L10.7255 5.20509L11.5747 4.67708L10.7255 5.20509C10.932 5.53722 11.26 5.77556 11.6397 5.86932L15.4251 6.80409L12.9121 9.78529C12.66 10.0843 12.5347 10.47 12.5629 10.86L12.8436 14.749L9.23178 13.2802L8.85509 14.2066L9.23178 13.2802C8.86949 13.1329 8.464 13.1329 8.10172 13.2802ZM1.12771 6.99689L1.12832 6.99674C1.12812 6.99679 1.12791 6.99684 1.12771 6.99689L1.00784 6.51147L1.12771 6.99689Z" stroke="url(#paint0_linear_2784_15413)" strokeWidth="2"/>
                    <defs>
                    <linearGradient id="paint0_linear_2784_15413" x1="8.66675" y1="0" x2="8.66675" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#605DEC"/>
                    <stop offset="1" stopColor="#2A26D9"/>
                    </linearGradient>
                    </defs>
                  </svg>
                </div>
              ))}
            </div>
            <div className={styles.fullreview}>
              {review}
              <span className={styles.textstyle1}> read more...</span>
            </div>
          </div>
        </div>
      );
    };
