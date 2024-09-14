import styles from "./page.module.css";

export default function LoginStudent() {
  return (
    <div className={styles.loginStudentPage}>
      <h1 className={styles.heading}>Log in to Coursework Wizard</h1>
      
      <h2 className={styles.subheading}>
        Welcome back! Please enter your details!
      </h2>

      <div className={styles.box}>
        <div className={styles.userInfo}>
          <p className={styles.username}>Username</p>
          <p className={styles.email}>(Email)</p>
        </div>
        
        <input 
          type="text" 
          placeholder="Enter username here" 
          className={styles.inputField} 
        />
        
        <p className={styles.username}>Password</p>
        <input 
          type="password" 
          placeholder="Enter password here" 
          className={styles.inputField} 
        />
        
        <a href="/forgot_password" className={styles.forgotPassword}>
          Forgot your password?
        </a>
        
        <button className={styles.button}>Log In</button>
        <button className={`${styles.button} ${styles.back}`}>Go Back</button>
      </div>

      <div className={styles.staffBox}>
        If you're a staff member, please visit the{" "}
        <a href="/login_staff" className={styles.staffLink}>Staff Portal</a>.
      </div>
      
    </div>
  );
}
