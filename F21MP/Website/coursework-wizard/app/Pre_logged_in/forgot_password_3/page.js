"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [verificationCode, setVerificationCode] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get('username');
  const router = useRouter();

  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleNext = () => {

    if (!verificationCode) {
      alert("Please enter the verification code.");
      return;
    }

    if (verificationCode === "123") {
      console.log("Correct code");
    } else {
      alert("The verification code you entered is incorrect.");
      return;
    }
    console.log('Verification Code:', verificationCode);
    router.push(`/Pre_logged_in/forgot_password_4?username=${userId}`);
  };

  return (
    <div>
      <Header/>
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
            value={verificationCode}
            onChange={handleInputChange}
          />
          
          {/* <Link href={`/Pre_logged_in/forgot_password_4?username=${userId}`} onClick={handleNext}> */}
            <button className={styles.button} onClick={handleNext}>Next</button>
          {/* </Link> */}
          <Link href="/">
            <button className={`${styles.button} ${styles.cancel}`}>Cancel</button>  
          </Link>
        </div>
      </div>
    </div>
  );
}
