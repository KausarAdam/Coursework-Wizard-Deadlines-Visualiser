"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginStudent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem('username', username); // Save username in localStorage
      router.push('/Student/dashboard'); 
      console.log("hello " + username); // testing
    } else {
      alert("Invalid credentials");
    }
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
              {/*<p className={styles.email}>(Email)</p>*/}
            </div>
            
            <input 
              type="text" 
              placeholder="Enter username here" 
              className={styles.inputField} 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <div className={styles.passwordContainer}>
              <p className={styles.username}>Password</p>
              <input 
                type={showPassword ? "text" : "password"} // Change type based on state
                placeholder="Enter password here" 
                className={styles.inputField} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span 
                className={styles.eyeIcon} 
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? "hide" : "show"}
              </span>
            </div>
            
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
          If you&apos;re a staff member, please visit the{" "}
          <a href="/Pre_logged_in/login_staff_1" className={styles.staffLink}>Staff Portal</a>.
        </div>
      </div>
    </div>
  );
}
