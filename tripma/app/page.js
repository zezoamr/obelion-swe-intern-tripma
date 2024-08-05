import Popup from '@/components/popup';
import styles from './page.module.css';
import Hero from '@/components/hero';

export default function TripmaPage() {
  return (
    <div className={styles.container}>
      <Hero />
      <Popup />
    </div>
  );
}