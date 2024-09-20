import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";

export default function ContactUs() {
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
              <h3 className={styles.heading3}>Enquiry Submitted</h3>
              <div className={styles.subheading}>Your enquiry has been received. We will contact you soon!</div>
            </div>
          
          </div>

          <Footer/>
          
        </div>
        
      </div>
    );
  }