import Image from 'next/image';
import styles from './card.module.css';

export default function Card({ name, price, textstyle1Text, description, image, newcolor }) {
  return (
    <div className={styles.fullCard}>
      <div className={styles.imageContainer}>
        {image ? <Image src={image} alt={name} layout="fill" objectFit="cover" /> : <p>No image available</p>}
      </div>
      <div className={styles.data}>
        <div className={styles.titleRow}>
          <span className={styles.name}>
            {name}
            <span className={styles.textstyle1} style={{color: newcolor}}>
              {textstyle1Text}
            </span>
            <span className={styles.price}>
              {price}
            </span>
          </span>
        </div>
        <span className={styles.description}>
          {description}
        </span>
      </div>
    </div>
  );
}
