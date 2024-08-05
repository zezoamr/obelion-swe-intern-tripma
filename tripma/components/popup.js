"use client";

import styles from './popup.module.css';
import { useState } from 'react';

export default function Popup() {
  const [isVisible, setIsVisible] = useState(true);

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className={styles.popup}>
        <div className={styles.popupContent}>
            <div className={styles.popupText}>By using our site, you agree to eat our cookies.</div>
            <button className={styles.popupCloseButton} onClick={closePopup}>x</button>
        </div>
        <div className={styles.popupButtons}>
            <button className={styles.AcceptButton}>Accept cookies </button>
            <button className={styles.SettingsButton}>Go to settings</button>
        </div>
        
      </div>
    )
  );
}
