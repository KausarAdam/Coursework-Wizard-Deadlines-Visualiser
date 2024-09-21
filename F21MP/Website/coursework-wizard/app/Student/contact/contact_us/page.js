"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";

export default function ContactUs() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const enquiryData = { subject, message };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enquiryData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry.');
      }

      setSuccess("Your enquiry has been submitted successfully!");
      setSubject("");
      setMessage("");

      router.push('/Student/contact/contact_us_submitted');
    } catch (err) {
      setError(err.message);
    }
  };

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
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <div className={styles.subheading}>Subject*</div>
            <input 
              type="text" 
              placeholder="Enter enquiry subject here" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.inputField}
              required
            />
            <div className={styles.subheading}>Message*</div>
            <textarea 
              placeholder="Enter details about your enquiry here" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${styles.inputField} ${styles.inputFieldEnquiry}`}
              required
            />
            <p className={styles.text}>*Required Fields</p>
            <button onClick={handleSubmit} className={styles.button}>Submit</button>
          </div>
        </div>

        <Footer/>
      </div>
    </div>
  );
}
