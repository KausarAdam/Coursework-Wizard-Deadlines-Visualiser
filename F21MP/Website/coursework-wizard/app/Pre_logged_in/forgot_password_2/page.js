"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [verificationMethod, setVerificationMethod] = useState("phone");
  const [contactInfo, setContactInfo] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get('username');
  const router = useRouter();

  const handleInputChange = (e) => {
    setContactInfo(e.target.value);
  };

  const handleNext = () => {
    // Validate input based on verification method
    if (!contactInfo) {
      alert("Please fill in your phone number or email.");
      return;
    }

    if (verificationMethod === "phone") {
      if (contactInfo === "0501234567") {
        console.log("Phone number correct");
      } else {
        alert("The phone number you entered is incorrect.");
        return;
      }
    } else if (verificationMethod === "email") {
      if (contactInfo === "student@gmail.com") {
        console.log("Email address correct");
      } else {
        alert("The email address you entered is incorrect.");
        return;
      }
    }
    router.push(`/Pre_logged_in/forgot_password_3?username=${userId}`);
  };

  return (
    <div>
      <Header/>

      <div className={styles.forgotPassword}>
          
        <div className={styles.circle}></div>

        <h1 className={styles.heading}>Reset Password</h1>

        <h2 className={styles.subheading}>
          <div>Step 2 of 4</div>
          <div>Select your preferred method for verification.</div>
        </h2>

        <div className={styles.box}>
          <div className={styles.verificationContainer}>
            
            {/* Left Column: Radio Buttons */}
            <div className={styles.leftColumn}>
              <p className={styles.enter}>User Verification</p>
              
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="phone"
                  checked={verificationMethod === "phone"}
                  onChange={() => setVerificationMethod("phone")}
                  className={styles.radioInput}
                />
                Text my mobile phone
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="email"
                  checked={verificationMethod === "email"}
                  onChange={() => setVerificationMethod("email")}
                  className={styles.radioInput}
                />
                Send an email
              </label>
            </div>

            <div className={styles.verticalLine}></div>

            {/* Right Column: Message based on selection */}
            <div className={styles.rightColumn}>
              {verificationMethod === "phone" ? (
                <>
                  <p>
                    In order to protect your account, we need you to enter your
                    complete mobile phone number (050*****67) below. You will
                    then receive a text message with a verification code which can
                    be used to reset your password.
                  </p>
                  <input
                    type="tel"
                    placeholder="Enter your mobile phone number"
                    className={styles.inputField}
                    value={contactInfo}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <p>
                    In order to protect your account, we need you to enter your
                    complete email address (stu****@gmail.com) below. You will
                    then receive an email with a verification code which can
                    be used to reset your password.
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={styles.inputField}
                    value={contactInfo}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
          </div>

          {/* <Link href={`/Pre_logged_in/forgot_password_3?username=${userId}`} onClick={handleNext}> */}
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
