
import Signupform from './signupform';
import styles from './signupOverlay.module.css';

export default function SignupOverlay({ onClose, isSignIn }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <Signupform onClose={onClose} isSignIn={isSignIn} />
      </div>
    </div>
  );
}
