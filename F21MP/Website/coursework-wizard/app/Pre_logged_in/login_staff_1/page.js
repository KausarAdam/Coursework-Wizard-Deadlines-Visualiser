import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";

export default function LoginStaff() {
  return (
    <div>
      <Header/>
    
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
          
          <input 
            type="text" 
            placeholder="Enter staff ID here" 
            className={styles.inputField} 
          />
          
          <Link href="/Pre_logged_in/login_staff_2">
            <button className={styles.button}>Next</button>
          </Link>
          <Link href="/Pre_logged_in/login_student">
            <button className={`${styles.button} ${styles.back}`}>Go Back</button>  
          </Link>
        </div>
        
      </div>

    </div>
  );
}
