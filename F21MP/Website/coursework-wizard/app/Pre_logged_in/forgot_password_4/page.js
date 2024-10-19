"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get('username');
  const router = useRouter();

  const handleNext = async () => {

    if (!newPassword || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`/api/updatePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userId,
          newPassword,
        }),
      });

      // Parse the response JSON
      const result = await response.json();

      // Handle success or error responses
      if (response.ok) {
          console.log(result.message); // Success message
          router.push(`/Pre_logged_in/forgot_password_5`); // Redirect to next page
      } else {
          console.error(result.error); // Log the error message
          alert(result.error); // Optionally, show an alert with the error
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("There was an error updating your password. Please try again.");
    }
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
          
          {/* <Link href="/Pre_logged_in/forgot_password_5" onClick={handleNext}> */}
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
