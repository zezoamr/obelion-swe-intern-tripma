import Image from 'next/image';
import styles from './card.module.css';

export default function Card({ name, price, city, description, image, newcolor, className = '' }) {
  return (
    <div className={`${styles.fullCard} ${className}`}>
      <div className={styles.imageContainer}>
        {image ? <Image src={image} alt={name} layout="fill" objectFit="cover" /> : <p>No image available</p>}
      </div>

      <div className={styles.data}>

        <div className={styles.titleRow}>

          <div className={styles.titleRow}>
            <div className={styles.nameContainer}>
              <span className={styles.name}>
                {name + " "}
                <span className={styles.textstyle1} style={{color: newcolor}}>
                  {city}
                </span>
              </span>
            </div>
            <div className={styles.price}>
              {price}
            </div>
          </div>
          
        </div>

        <span className={styles.description}>
          {description}
        </span>
      </div>
    </div>
  );
}
