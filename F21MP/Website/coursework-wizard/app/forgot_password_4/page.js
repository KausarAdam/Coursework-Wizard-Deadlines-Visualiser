import styles from "./page.module.css";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className={styles.forgotPassword}>
      <div className={styles.circle}></div>
      
      <h1 className={styles.heading}>Reset Password</h1>

      <h2 className={styles.subheading}>
        <div>Step 4 of 4</div>
        <div>Enter your new password.</div>
      </h2>

      <div className={styles.box}>
        <div className={styles.userInfo}>
          <p className={styles.enter}>New Password</p>
        </div>
        
        <input 
          type="text" 
          placeholder="Enter new password here" 
          className={styles.inputField} 
        />

        <div className={styles.userInfo}>
          <p className={styles.enter}>Confirm Password</p>
        </div>
        
        <input 
          type="text" 
          placeholder="Re-enter password to confirm" 
          className={styles.inputField} 
        />
        
        <Link href="/forgot_password_5">
          <button className={styles.button}>Next</button>
        </Link>
        <Link href="/">
          <button className={`${styles.button} ${styles.cancel}`}>Cancel</button>  
        </Link>
      </div>
    </div>
  );
}
