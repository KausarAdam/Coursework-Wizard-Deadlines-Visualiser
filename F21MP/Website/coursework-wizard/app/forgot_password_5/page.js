import styles from "./page.module.css";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className={styles.forgotPassword}>
      <div className={styles.circle}></div>
      
      <h1 className={styles.heading}>Password has been reset</h1>

      <Link href="/">
        <button className={styles.button}>Home</button>  
      </Link>
    </div>
  );
}
