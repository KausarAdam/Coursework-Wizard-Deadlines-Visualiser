import styles from "./page.module.css";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className={styles.forgotPassword}>
      <div className={styles.circle}></div>
      
      <h1 className={styles.heading}>Reset Password</h1>

      <h2 className={styles.subheading}>
        <div>Step 3 of 4</div>
        <div>Enter the verification code sent to your mobile phone or email.</div>
      </h2>

      <div className={styles.box}>
        <div className={styles.userInfo}>
          <p className={styles.enter}>Verification Code</p>
        </div>
        
        <input 
          type="text" 
          placeholder="Enter verification code here" 
          className={styles.inputField} 
        />
        
        <Link href="/Pre_logged_in/forgot_password_4">
          <button className={styles.button}>Next</button>
        </Link>
        <Link href="/">
          <button className={`${styles.button} ${styles.cancel}`}>Cancel</button>  
        </Link>
      </div>
    </div>
  );
}
