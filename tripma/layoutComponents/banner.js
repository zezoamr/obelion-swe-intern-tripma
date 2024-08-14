import styles from './banner.module.css';

export default function Banner() {
    return (
      <div className={styles.banner}>
        <p className={styles.bannerText}>
          Join Tripma today and save up to 20% on your flight using code TRAVEL at checkout. Promotion valid for new users only.
        </p>
        <button className={styles.bannerButton}>
          X
        </button>
      </div>
    );
  }