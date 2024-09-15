import styles from "./page.module.css";
import Link from "next/link";

export default function ContactUs() {
  return (
    <div className={styles.contactUsPage}>
      <div className={styles.circle}></div>
      
      <h1 className={styles.heading}>Contact Us</h1>
      
      <h2 className={styles.subheading}>
        Please fill in the form below.
      </h2>

      <div className={styles.box}>
      <div className={styles.userInfo}>
        <p className={styles.name}>Full name</p>
      </div>

      <div className={styles.nameFields}>
        <input 
          type="text" 
          placeholder="First name" 
          className={`${styles.inputField} ${styles.inputFieldName}`}
        />
        <input 
          type="text" 
          placeholder="Last name" 
          className={`${styles.inputField} ${styles.inputFieldName}`}
        />
      </div>

        <p className={styles.name}>Email Address</p>

        <input 
          type="email"
          placeholder="Enter email address here" 
          className={styles.inputField} 
        />

        <p className={styles.name}>Contact Phone Number</p>

        <input 
          type="tel"
          placeholder="Enter contact phone number here" 
          className={styles.inputField} 
        />

        <p className={styles.name}>Are you currently enrolled at Heriot-Watt?</p>

        <fieldset className={styles.radioGroup}>
          <label>
            <input type="radio" name="enrolled" value="yes" className={styles.radioInput}/>
            Yes
          </label>
          <label>
            <input type="radio" name="enrolled" value="no" className={styles.radioInput}/>
            No
          </label>
        </fieldset>

        <p className={styles.name}>Enquiry</p>

        <textarea 
          placeholder="Enter enquiry details here" 
          className={`${styles.inputField} ${styles.inputFieldEnquiry}`}
        />
        
        <Link href="/Pre_logged_in/contact_us_signed_out_2">
          <button className={styles.button}>Submit</button>
        </Link>
        <Link href="/Pre_logged_in/login_student">
          <button className={`${styles.button} ${styles.cancel}`}>Cancel</button>  
        </Link>
      </div>
      
    </div>
  );
}
