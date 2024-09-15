"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function ForgotPassword() {
  const [verificationMethod, setVerificationMethod] = useState("phone");

  return (
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
              <><p>
                In order to protect your account, we need you to enter your
                complete mobile phone number (050*****74) below. You will
                then receive a text message with a verification code which can
                be used to reset your password.
              </p><input
                  type="tel"
                  placeholder="Enter your mobile phone number"
                  className={styles.inputField} /></>
            ) : (
              <><p>
                  In order to protect your account, we need you to enter your
                  complete email address (kau*********@gmail.com) below. You will
                  then receive an email with a verification code which can
                  be used to reset your password.
                </p><input
                    type="email"
                    placeholder="Enter your email address"
                    className={styles.inputField} /></>
            )}
          </div>
        </div>

        <Link href="/Pre_logged_in/forgot_password_3">
          <button className={styles.button}>Next</button>
        </Link>
        <Link href="/">
          <button className={`${styles.button} ${styles.cancel}`}>Cancel</button>
        </Link>
      </div>
    </div>
  );
}
