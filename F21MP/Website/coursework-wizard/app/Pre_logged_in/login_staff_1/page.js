"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginStaff() {
  const [staffID, setStaffID] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/login/staff-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ staffID }),
    });

    const data = await res.json();
    if (data.success) {
      //sessionStorage.setItem('staffID', staffID);
      localStorage.setItem('staffID', staffID); // Save username in localStorage
      router.push('/Pre_logged_in/login_staff_2'); 
    } else {
      alert("Invalid Staff ID");
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
            <p className={styles.staffID}>Staff ID</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Enter staff ID here" 
              className={styles.inputField} 
              value={staffID}
              onChange={(e) => setStaffID(e.target.value)}
            />
            
            <button type="submit" className={styles.button}>Next</button>
            <Link href="/Pre_logged_in/login_student">
              <button type="button" className={`${styles.button} ${styles.back}`}>Go Back</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
