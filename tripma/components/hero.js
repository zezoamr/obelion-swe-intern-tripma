import styles from './hero.module.css'

export default function Hero() {
  return (
      <div className={styles.main}>
        <p className={styles.title}>It's more than just a trip</p>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="From where?" className={styles.searchInput} />
          <div className={styles.divider}> </div>
          <input type="text" placeholder="Where to?" className={styles.searchInput} />
          <div className={styles.divider}> </div>
          <input type="date" className={styles.TextInput} />
          <div className={styles.divider}> </div>
          <input type="number" placeholder="1 Adult" className={styles.TextInput2} />
          
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>
  )
}
