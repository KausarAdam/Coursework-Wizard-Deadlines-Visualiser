"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";

// Dynamically import the ReCAPTCHA component
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

export default function ForgotPassword() {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [userId, setUserId] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRecaptchaLoaded(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleNext = () => {
    if (!userId || !recaptchaValue) {
      alert("Please enter your ID and complete the CAPTCHA.");
      return;
    }

    console.log('User ID:', userId);
  };

  return (
    <div>
      <Header/>

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
            aria-label="Student Username or Staff ID"
            value={userId}
            onChange={handleInputChange}
          />

          {recaptchaLoaded && (
            <ReCAPTCHA
              sitekey="6Lc_t0QqAAAAAGMnTvnHgQHSnaZ59h3Dcqrl1fxk"
              className={styles.recaptcha}
              onChange={setRecaptchaValue}
            />
          )}
          
          <Link href="/Pre_logged_in/forgot_password_2" onClick={handleNext}>
            <button className={styles.button}>Next</button>
          </Link>
          <Link href="/">
            <button className={`${styles.button} ${styles.cancel}`}>Cancel</button>  
          </Link>
        </div>
      </div>
    </div>
  );
}
