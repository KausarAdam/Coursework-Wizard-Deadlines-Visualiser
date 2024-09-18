import StudentMenu from "../student_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../student_notification";
import Link from "next/link";

export default function contactUs() {
    return (
      <div className={styles.container}>
        <StudentMenu/>

        <div className={styles.contactUsPage}>

          <div className={styles.header}>
            <h1 className={styles.heading}>Contact Us</h1>
            <Notification />
          </div>

          <div className={styles.withoutFooter}>

            <hr style={{ width: "100.5%", marginLeft: "0" }} />

            <div className={styles.box}>
              <h3 className={styles.heading3}>Submit an Enquiry</h3>
              <hr style={{ marginBottom: "20px" }} />
              <div className={styles.subheading}>Subject*</div>
              <input 
                type="text" 
                placeholder="Enter enquiry subject here" 
                className={styles.inputField}
              />
              <div className={styles.subheading}>Message*</div>
              <textarea 
                placeholder="Enter details about your enquiry here" 
                className={`${styles.inputField} ${styles.inputFieldEnquiry}`}
              />
              <p className={styles.text}>*Required Fields</p>
              <Link href="/Student/contact_us_submitted" className={styles.Link}>
                <button className={styles.button}>Submit</button>
              </Link>
            </div>
          
          </div>

          <Footer/>
          
        </div>
        
      </div>
    );
  }