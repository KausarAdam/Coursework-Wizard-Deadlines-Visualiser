"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import { useState } from "react";

export default function LoginStudent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
  };

  return (
    <div>
      <Header/>
      <div className={styles.loginStudentPage}>
        
        <div className={styles.circle}></div>
        
        <h1 className={styles.heading}>Log in to Coursework Wizard</h1>
        
        <h2 className={styles.subheading}>
          Welcome back! Please enter your details!
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.box}>
            <div className={styles.userInfo}>
              <p className={styles.username}>Username</p>
              <p className={styles.email}>(Email)</p>
            </div>
            
            <input 
              type="text" 
              placeholder="Enter username here" 
              className={styles.inputField} 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <p className={styles.username}>Password</p>
            <input 
              type="password" 
              placeholder="Enter password here" 
              className={styles.inputField} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <a href="/Pre_logged_in/forgot_password" className={styles.forgotPassword}>
              Forgot your password?
            </a>
            
            <button type="submit" className={styles.button}>Log In</button>
            <Link href="/">
              <button type="button" className={`${styles.button} ${styles.back}`}>Go Back</button>  
            </Link>
          </div>
        </form>

        <div className={styles.staffBox}>
          If you're a staff member, please visit the{" "}
          <a href="/Pre_logged_in/login_staff_1" className={styles.staffLink}>Staff Portal</a>.
        </div>
      </div>
    </div>
  );
}
