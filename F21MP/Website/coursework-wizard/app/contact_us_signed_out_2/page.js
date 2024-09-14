import styles from "./page.module.css";
import Link from "next/link";

export default function ContactUs() {
  return (
    <div className={styles.contactUs}>
      <div className={styles.circle}></div>
      
      <h1 className={styles.heading}>Enquiry Submitted</h1>

      <h2 className={styles.subheading}>
        <div>Your enquiry has been received. We will contact you soon!</div>
      </h2>

      <Link href="/">
        <button className={styles.button}>Home</button>  
      </Link>
    </div>
  );
}
