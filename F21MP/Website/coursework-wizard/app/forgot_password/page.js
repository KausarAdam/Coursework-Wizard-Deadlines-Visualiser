"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from "./page.module.css";
import Link from "next/link";

// Dynamically import the ReCAPTCHA component
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

export default function ForgotPassword() {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRecaptchaLoaded(true);
    }
  }, []);

  return (
    <div className={styles.forgotPassword}>
      <div className={styles.circle}></div>
      
      <h1 className={styles.heading}>Reset Password</h1>

      <h2 className={styles.subheading}>
        <div>Step 1 of 4</div>
        <div>To recover your account, begin by entering your student username or staff ID</div>
        <div>and the characters in the picture or audio below.</div>
      </h2>

      <div className={styles.box}>
        <div className={styles.userInfo}>
          <p className={styles.enter}>Student Username or Staff ID</p>
        </div>
        
        <input 
          type="text" 
          placeholder="Enter student username or staff ID here" 
          className={styles.inputField} 
        />

        {recaptchaLoaded && (
          <ReCAPTCHA
            sitekey="6Lc6tkMqAAAAAPxluHPrR7PjKG4yRVfLMNAR7p6X"
            className={styles.recaptcha}
          />
        )}
        
        <Link href="/forgot_password_2">
          <button className={styles.button}>Next</button>
        </Link>
        <Link href="/">
          <button className={`${styles.button} ${styles.cancel}`}>Cancel</button>  
        </Link>
      </div>
    </div>
  );
}
