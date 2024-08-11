import styles from './footer.module.css'
import Image from 'next/image'

import TripmaImage from '@/components/tripma.svg'
import GoogleplayImage from '@/components/GoogleplayImage.png'
import AppleStore from '@/components/AppleStore.png'

export default function Footer() {

    const firstColumn = [
        "About Tripma",
        "How it works",
        "Careers",
        "Press",
        "Blog",
        "Forum"
    ];
    
    const secondColumn = [
        "Partnership programs",
        "Affiliate program",
        "Connectivity partners",
        "Promotions and events",
        "Integrations",
        "Community",
        "Loyalty program"
    ];
    
    const thirdColumn = [
        "Help Center",
        "Contact us",
        "Privacy policy",
        "Terms of service",
        "Trust and safety",
        "Accessibility"
    ];
    
    const  fourthColumn= [
        "About Tripma",
        "Tripma for Android",
        "Tripma for iOS",
        "Mobile site"
    ];

  return (
    <div className={styles.footer}>

        <div className={styles.footercontent}>
            <div className={styles.Wordmark} > 
                <div className={styles.round}>
                    <Image src={TripmaImage} alt="Tripma" layout="fill" objectFit="cover" /> 
                </div>
            </div>            

            <div className={styles.columnabout}>
                <span className={styles.Footerheader}>
                    About
                </span>
                {firstColumn.map(item => <span className={styles.Listitem}>{item}</span>)}
            </div>

            <div className={styles.columnabout}>
                <span className={styles.Footerheader}>
                Partner with us
                </span>
                {secondColumn.map(item => <span className={styles.Listitem}>{item}</span>)}
            </div>

            <div className={styles.columnabout}>
                <span className={styles.Footerheader}>
                Support
                </span>
                {thirdColumn.map(item => <span className={styles.Listitem}>{item}</span>)}
            </div>

            <div className={styles.columnabout}>
                <span className={styles.Footerheader}>
                    Get the app
                </span>
                {fourthColumn.map(item => <span className={styles.Listitem}>{item}</span>)}
                <div className={styles.linkappstore}>
                <Image src={AppleStore} alt="AppleStore" layout="fill" objectFit="cover" /> 
                </div>
                <div className={styles.linkgoogleplay}>
                <Image src={GoogleplayImage} alt="GoogleplayImage" layout="fill" objectFit="cover" /> 
                </div>
            </div>
        </div>

        <div className={styles.divider}>
        </div>

        <div className={styles.bottom}>
            <div className={styles.socialmediastack}>
                <div className={styles.path}>
                    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 2.01262C20.7129 2.4417 20.3882 2.84184 20.0259 3.21304C19.6636 3.58423 19.2705 3.92307 18.8467 4.22956C18.8535 4.32491 18.8586 4.41856 18.8621 4.51051C18.8655 4.60246 18.8672 4.69611 18.8672 4.79146C18.8672 5.64963 18.7749 6.49759 18.5903 7.33533C18.4058 8.17307 18.1392 8.98356 17.7905 9.76682C17.2847 10.9042 16.6523 11.9208 15.8936 12.8164C15.1348 13.712 14.2751 14.4697 13.3147 15.0895C12.3543 15.7093 11.3066 16.1827 10.1719 16.5096C9.03711 16.8365 7.84766 17 6.60351 17C5.42773 17 4.281 16.8382 3.16333 16.5147C2.04565 16.1912 0.991207 15.7093 0 15.0691C0.33496 15.11 0.676757 15.1304 1.02539 15.1304C2.00293 15.1304 2.94799 14.9738 3.86059 14.6605C4.77319 14.3471 5.6123 13.8908 6.37792 13.2915C5.91992 13.2846 5.479 13.208 5.05517 13.0616C4.63134 12.9152 4.2434 12.7108 3.89135 12.4486C3.5393 12.1864 3.23168 11.8748 2.9685 11.5138C2.70531 11.1528 2.50194 10.7544 2.35839 10.3185C2.49511 10.3389 2.63012 10.356 2.76342 10.3696C2.89672 10.3832 3.03173 10.39 3.16845 10.39C3.55126 10.39 3.92723 10.3389 4.29638 10.2368C3.79052 10.1346 3.32739 9.95412 2.90698 9.69531C2.48657 9.43649 2.12255 9.12149 1.81493 8.7503C1.50732 8.3791 1.26806 7.96024 1.09716 7.49369C0.926263 7.02714 0.840814 6.53846 0.840814 6.02764V5.97656C1.44238 6.3171 2.09521 6.49759 2.79931 6.51803C2.49853 6.3137 2.23022 6.08043 1.99438 5.81821C1.75854 5.55599 1.55859 5.27163 1.39453 4.96514C1.23046 4.65865 1.104 4.33514 1.01513 3.99459C0.926264 3.65405 0.88183 3.30329 0.88183 2.94231C0.88183 2.5609 0.929681 2.188 1.02538 1.82362C1.12109 1.45924 1.26806 1.11358 1.4663 0.786661C2.01318 1.46094 2.62158 2.06541 3.2915 2.60006C3.96142 3.13472 4.67407 3.59275 5.42944 3.97416C6.18481 4.35557 6.97607 4.65695 7.80321 4.87831C8.63036 5.09966 9.47802 5.23077 10.3462 5.27164C10.3052 5.11498 10.2761 4.95323 10.259 4.78636C10.2419 4.61949 10.2334 4.45433 10.2334 4.29087C10.2334 3.69832 10.3462 3.14153 10.5718 2.62049C10.7974 2.09946 11.105 1.64483 11.4946 1.25661C11.8843 0.868389 12.3406 0.561899 12.8635 0.337139C13.3865 0.11238 13.9453 0 14.54 0C15.1416 0 15.7141 0.117488 16.2576 0.352464C16.801 0.58744 17.2778 0.922876 17.688 1.35877C18.1733 1.26342 18.6433 1.1289 19.0979 0.955227C19.5525 0.78155 19.9917 0.568709 20.4155 0.316706C20.2583 0.813903 20.0173 1.26683 19.6926 1.67548C19.3679 2.08413 18.98 2.42127 18.5288 2.6869C19.3901 2.58474 20.2139 2.35998 21 2.01262L21 2.01262Z" fill="#6E7491"/>
                    </svg>
                </div>
                <div className={styles.path}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.25 6.45455C0.25 3.04033 3.04033 0.25 6.45455 0.25H15.5455C18.9597 0.25 21.75 3.04033 21.75 6.45455V15.5455C21.75 18.9597 18.9597 21.75 15.5455 21.75H6.45455C3.04033 21.75 0.25 18.9597 0.25 15.5455V6.45455ZM6.45455 1.75C3.86876 1.75 1.75 3.86876 1.75 6.45455V15.5455C1.75 18.1312 3.86876 20.25 6.45455 20.25H15.5455C18.1312 20.25 20.25 18.1312 20.25 15.5455V6.45455C20.25 3.86876 18.1312 1.75 15.5455 1.75H6.45455ZM11 14.5C12.933 14.5 14.5 12.933 14.5 11C14.5 9.067 12.933 7.5 11 7.5C9.067 7.5 7.5 9.067 7.5 11C7.5 12.933 9.067 14.5 11 14.5ZM11 16C13.7614 16 16 13.7614 16 11C16 8.23858 13.7614 6 11 6C8.23858 6 6 8.23858 6 11C6 13.7614 8.23858 16 11 16ZM16 6C16.5523 6 17 5.55228 17 5C17 4.44771 16.5523 4 16 4C15.4477 4 15 4.44771 15 5C15 5.55228 15.4477 6 16 6Z" fill="#6E7491"/>
                    </svg>
                </div>
                <div className={styles.path}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.0524 0H0.947647C0.701782 0.0166027 0.470272 0.121774 0.296023 0.296023C0.121774 0.470272 0.0166027 0.701782 0 0.947647L0 17.0524C0.00139008 17.3033 0.101678 17.5435 0.279095 17.7209C0.456513 17.8983 0.696744 17.9986 0.947647 18H9.56859V10.9895H7.29424V8.33718H9.66282V6.34765C9.61178 5.87052 9.66658 5.388 9.82333 4.93447C9.98009 4.48095 10.2349 4.06757 10.5697 3.72379C10.9045 3.38002 11.311 3.1143 11.7602 2.94558C12.2094 2.77685 12.6903 2.70927 13.1686 2.74765C14.1162 2.74765 14.9686 2.84188 15.2524 2.84188V5.30577H13.8314C12.6942 5.30577 12.5047 5.87435 12.5047 6.63247V8.33718H15.1571L14.778 11.0848H12.4105V18H17.0524C17.3033 17.9986 17.5435 17.8983 17.7209 17.7209C17.8983 17.5435 17.9986 17.3033 18 17.0524V0.947647C17.9834 0.701782 17.8782 0.470272 17.704 0.296023C17.5297 0.121774 17.2982 0.0166027 17.0524 0V0Z" fill="#6E7491"/>
                    </svg>
                </div>
            </div>
            <div className={styles.copyright}>
                © 2020 Tripma incorporated
            </div>
        </div>
    </div>
  )
}
