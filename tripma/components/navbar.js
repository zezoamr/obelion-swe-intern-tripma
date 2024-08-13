"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import styles from './navbar.module.css';

export default function Navbar({ onSignupClick, onSignInClick }) {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
            <svg width="131" height="54" viewBox="0 0 131 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <TripmaLogo />
            </svg>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/search" className={styles.navLink}>Flights</Link>
          <Link href="#" className={styles.navLink}>Hotels</Link>
          <Link href="#" className={styles.navLink}>Packages</Link>
          
          {session ? (
            <>
              <Link href="#" className={styles.navLink}>My trips</Link>
              <div className={styles.userMenu}>
                <div onClick={toggleDropdown} className={styles.avatarContainer}>
                  {session.user.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="User avatar" 
                      width={32} 
                      height={32} 
                      className={styles.avatar}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {session.user.name ? session.user.name[0].toUpperCase() : <div style={{width: 32, height: 32, color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>?</div>}
                    </div>
                  )}
                </div>
                {dropdownOpen && (
                  <div className={styles.dropdown}>
                    <button onClick={() => signOut()} className={styles.logoutButton}>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div onClick={onSignInClick} className={styles.navLink}>Sign in</div>
              <button onClick={onSignupClick} className={styles.signUp}>Sign up</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

const TripmaLogo = () => (
            <svg width="131" height="54" viewBox="0 0 131 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.6533 16.3051H12V12H32.7089V16.3051H25.0556V34.9979C25.0556 35.4952 24.6525 35.8983 24.1552 35.8983C21.6689 35.8983 19.6533 33.8827 19.6533 31.3964V16.3051Z" fill="#605DEC"/>
            <path d="M44.3751 21.1149C44.4544 22.1933 43.6623 23.1395 42.5867 23.251L41.5739 23.3559C40.1195 23.4915 39.0921 23.8983 38.4919 24.5763C37.8916 25.2316 37.5915 26.113 37.5915 27.2203V34.8983C37.5915 35.4506 37.1438 35.8983 36.5915 35.8983H34.3623C33.2577 35.8983 32.3623 35.0029 32.3623 33.8983V20.2542C32.3623 19.702 32.81 19.2542 33.3623 19.2542H36.3837C36.936 19.2542 37.3837 19.702 37.3837 20.2542V22.0678C38.2379 20.1469 40.004 19.096 42.6821 18.9153C43.5253 18.859 44.2559 19.4938 44.3179 20.3366L44.3751 21.1149Z" fill="#605DEC"/>
            <path d="M46.2617 20.2542C46.2617 19.702 46.7095 19.2542 47.2617 19.2542H50.4909C51.0432 19.2542 51.4909 19.702 51.4909 20.2542V34.8983C51.4909 35.4506 51.0432 35.8983 50.4909 35.8983H48.2617C47.1572 35.8983 46.2617 35.0029 46.2617 33.8983V20.2542Z" fill="#605DEC"/>
            <path d="M66.0218 18.8475C67.4763 18.8475 68.7691 19.2203 69.9004 19.9661C71.0547 20.6893 71.9436 21.7175 72.5669 23.0508C73.2134 24.3616 73.5366 25.8757 73.5366 27.5932C73.5366 29.3107 73.2134 30.8249 72.5669 32.1356C71.9436 33.4237 71.0663 34.4181 69.935 35.1186C68.8038 35.8192 67.4994 36.1695 66.0218 36.1695C64.8675 36.1695 63.817 35.9435 62.8705 35.4915C61.947 35.017 61.2313 34.3616 60.7234 33.5254V41.1285C60.7234 41.6098 60.3332 42 59.8519 42C57.4452 42 55.4942 40.049 55.4942 37.6424V20.2542C55.4942 19.702 55.9419 19.2542 56.4942 19.2542H59.6541C60.2064 19.2542 60.6541 19.702 60.6541 20.2542V21.5932C61.162 20.7345 61.8893 20.0678 62.8358 19.5932C63.7824 19.096 64.8444 18.8475 66.0218 18.8475ZM64.4981 32.2712C65.7217 32.2712 66.6682 31.8757 67.3378 31.0847C68.0073 30.2712 68.342 29.1073 68.342 27.5932C68.342 26.0565 68.0073 24.8701 67.3378 24.0339C66.6682 23.1751 65.7217 22.7458 64.4981 22.7458C63.2745 22.7458 62.3279 23.1638 61.6584 24C60.9889 24.8136 60.6541 25.9887 60.6541 27.5254C60.6541 29.0396 60.9889 30.2147 61.6584 31.0508C62.3279 31.8644 63.2745 32.2712 64.4981 32.2712Z" fill="#605DEC"/>
            <path d="M95.2787 18.8475C97.218 18.8475 98.6609 19.4237 99.6075 20.5763C100.554 21.7288 101.027 23.4915 101.027 25.8644V33.8983C101.027 35.0029 100.132 35.8983 99.0273 35.8983H97.7982C96.6936 35.8983 95.7982 35.0029 95.7982 33.8983V26.0339C95.7982 24.904 95.6135 24.0904 95.2441 23.5932C94.8978 23.096 94.2975 22.8475 93.4433 22.8475C91.8206 22.8475 91.2539 24.3635 91.2539 26.7119V33.8983C91.2539 35.0029 90.3585 35.8983 89.2539 35.8983H88.0247C86.9202 35.8983 86.0247 35.0029 86.0247 33.8983V26.0339C86.0247 24.904 85.84 24.0904 85.4707 23.5932C85.1244 23.096 84.5241 22.8475 83.6699 22.8475C82.0472 22.8475 81.4805 24.3635 81.4805 26.7119V33.8983C81.4805 35.0029 80.5851 35.8983 79.4805 35.8983H78.2513C77.1468 35.8983 76.2513 35.0029 76.2513 33.8983V22.2542C76.2513 20.5974 77.5945 19.2542 79.2513 19.2542H80.342C80.8942 19.2542 81.342 19.702 81.342 20.2542V21.4915C82.4865 19.6406 83.0013 18.8475 85.5745 18.8475C88.091 18.8475 89.7764 19.8757 90.6306 21.9322C91.8088 19.9139 92.5463 18.8475 95.2787 18.8475Z" fill="#605DEC"/>
            <path d="M111.554 18.8475C114.094 18.8475 115.964 19.435 117.165 20.6102C118.388 21.7853 119 23.6045 119 26.0678V33.3734C119 35.0302 117.657 36.3734 116 36.3734H114.048V33.4237C113.702 34.2825 113.124 34.9605 112.316 35.4576C111.508 35.9322 110.562 36.1695 109.477 36.1695C108.322 36.1695 107.272 35.9435 106.325 35.4915C105.402 35.0396 104.663 34.4068 104.109 33.5932C103.578 32.7797 103.312 31.8757 103.312 30.8814C103.312 29.661 103.624 28.7006 104.248 28C104.894 27.2994 105.921 26.791 107.33 26.4746C108.738 26.1582 110.666 26 113.113 26H114.013V25.3898C114.013 24.3955 113.794 23.6949 113.355 23.2881C112.917 22.8814 112.155 22.678 111.07 22.678C110.239 22.678 109.315 22.8249 108.299 23.1186C107.962 23.2161 107.63 23.3261 107.303 23.4484C106.254 23.8411 105.018 23.4193 104.598 22.381C104.256 21.5362 104.575 20.5573 105.413 20.1985C106.064 19.9197 106.784 19.6727 107.572 19.4576C109.003 19.0508 110.331 18.8475 111.554 18.8475ZM110.619 32.6441C111.635 32.6441 112.455 32.3164 113.078 31.661C113.702 30.9831 114.013 30.113 114.013 29.0508V28.4746H113.425C111.554 28.4746 110.239 28.6215 109.477 28.9153C108.738 29.209 108.369 29.7401 108.369 30.5085C108.369 31.1186 108.576 31.6271 108.992 32.0339C109.431 32.4407 109.973 32.6441 110.619 32.6441Z" fill="#605DEC"/>
            <path d="M51.5 15C51.5 16.3807 50.3807 17.5 49 17.5C47.6193 17.5 46.5 16.3807 46.5 15C46.5 13.6193 47.6193 12.5 49 12.5C50.3807 12.5 51.5 13.6193 51.5 15Z" fill="#605DEC"/>
            </svg>
)