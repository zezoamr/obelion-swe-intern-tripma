
import styles from './signupform.module.css';

export default function Signupform() {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
            <div className={styles.header}>
                <div className={styles.titlerow}>
                    <h2 className={styles.title}>Sign up for Tripma</h2>
                    <button className={styles.closeButton}>x</button>
                </div>
                <p className={styles.description}>
                    Tripma is totally free to use. Sign up using your email
                    address or phone number below to get started.
                </p>
            </div>
          
          <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Email or phone number"
            className={styles.input}
          />
          <div className={styles.divider}></div>
          </div>

          <div className={styles.inputContainer}>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />
          <div className={styles.divider}></div>
          </div>

          <div className={styles.checkboxesContainer}> 
          <div className={styles.checkboxContainer}>
                <input type="checkbox" id="terms" className={styles.checkbox} />
                <label htmlFor="terms" className={styles.checkboxLabel}>
                I agree to the terms and conditions
                </label>
                </div>
                <div className={styles.checkboxContainer}>
                    <input type="checkbox" id="alerts" className={styles.checkbox} />
                    <label htmlFor="alerts" className={styles.checkboxLabel}>
                    Send me the latest deal alerts
                    </label>
                </div>
           </div>

          <button className={styles.createAccountButton}>
            Create account
          </button>

          <div className={styles.divider2}>
            <div className={styles.divider3}> </div>
                or
            <div className={styles.divider3}> </div>
          </div>

          <button className={`${styles.socialButton} ${styles.googleButton}`}>
            <span className={styles.socialIcon}>G</span>
            Continue with Google
          </button>
          <button className={`${styles.socialButton} ${styles.appleButton}`}>
            <span className={styles.socialIcon}>A</span>
            Continue with Apple
          </button>
          <button className={`${styles.socialButton} ${styles.facebookButton}`}>
            <span className={styles.socialIcon}>f</span>
            Continue with Facebook
          </button>
        </div>
      </div>
    );
  };