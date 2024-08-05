import Link from "next/link";
import styles from './navbar.module.css';

export default function navbar({ onSignupClick }) {
  return (
    <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>Tripma</div>
          <div className={styles.navLinks}>
            <Link href="#" className={styles.navLink}>Flights</Link>
            <Link href="#" className={styles.navLink}>Hotels</Link>
            <Link href="#" className={styles.navLink}>Packages</Link>
            <Link href="#" className={styles.navLink}>Sign in</Link>
            <button onClick={onSignupClick} className={styles.signUp}>Sign up</button>
          </div>
        </nav>
      </header>

  )
}
