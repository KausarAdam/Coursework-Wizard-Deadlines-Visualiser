"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";

export default function ForgotPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {

    if (!newPassword || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }


    console.log('New Password:', newPassword);
  };

  return (
    <div>
      <Header/>
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
            type="password" 
            placeholder="Enter new password here" 
            className={styles.inputField} 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <div className={styles.userInfo}>
            <p className={styles.enter}>Confirm Password</p>
          </div>
          
          <input 
            type="password" 
            placeholder="Re-enter password to confirm" 
            className={styles.inputField} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <Link href="/Pre_logged_in/forgot_password_5" onClick={handleNext}>
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
