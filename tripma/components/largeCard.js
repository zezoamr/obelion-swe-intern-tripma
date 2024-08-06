import Image from 'next/image';
import styles from './largeCard.module.css';

export default function LargeCard({ name, price, textstyle1Text, description, image }) {
 return (
    <div className={styles.fullCard}>
      <div className={styles.imageContainer}>
        {image ? <Image src={image} alt={name} layout="fill" objectFit="cover" /> : <p>No image available</p>}
      </div>

      <div className={styles.data}>

        <div className={styles.titleRow}>

          <div className={styles.titleRow}>
            <div className={styles.nameContainer}>
              <span className={styles.name}>
                {name + " "}
                <span className={styles.textstyle1}>
                  {textstyle1Text}
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
