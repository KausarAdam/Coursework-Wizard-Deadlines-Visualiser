"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginStaff() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const staffID = sessionStorage.getItem('staffID');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ staffID, password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push('/Staff/dashboard'); 
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <Header />

      <div className={styles.loginStaffPage}>
        <div className={styles.circle}></div>

        <h1 className={styles.heading}>Log in to the Staff Portal</h1>

        <h2 className={styles.subheading}>
          Welcome back! Please enter your details!
        </h2>

        <div className={styles.box}>
          <div className={styles.userInfo}>
            <p className={styles.password}>Password</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input 
              type="password" 
              placeholder="Enter password here" 
              className={styles.inputField} 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />

            <a href="/Pre_logged_in/forgot_password" className={styles.forgotPassword}>
              Forgot your password?
            </a>

            <button type="submit" className={styles.button}>Log In</button>
            <Link href="/Pre_logged_in/login_staff_1">
              <button type="button" className={`${styles.button} ${styles.back}`}>Go Back</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
