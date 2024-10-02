"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddCoursework() {
  const [courseworkName, setCourseworkName] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [courseworkDetails, setCourseworkDetails] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleNext = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation: Check if all fields are filled
    if (!courseworkName || !submissionDate || !courseworkDetails) {
      window.alert("All fields are required.");
      return;
    }

    // Store data for the next page
    const courseworkData = {
      courseworkName,
      submissionDate,
      courseworkDetails,
    };

    try {
      // Storing data, pass it to next page
      localStorage.setItem("courseworkData", JSON.stringify(courseworkData));

      // Navigate to the next page
      router.push("/Staff/courses/add_coursework_2");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    router.push("/Staff/courses/course");
  };

  return (
    <div className={styles.container}>
      <StaffMenu />

      <div className={styles.addCourseworkPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>F21SF - Software Engineering</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
            <h3 className={styles.heading3}>Add New Coursework</h3>
            <hr style={{ marginBottom: "20px" }} />
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            
            <div className={styles.subheading}>Coursework Name</div>
            <input
              type="text"
              placeholder="Enter coursework name here"
              value={courseworkName}
              onChange={(e) => setCourseworkName(e.target.value)}
              className={styles.inputField}
              required
            />
            
            <div className={styles.subheading}>Submission Date</div>
            <DatePicker
              selected={submissionDate ? new Date(submissionDate) : null}
              onChange={(date) => setSubmissionDate(date)}
              className={`${styles.inputField} ${styles.inputFieldDate}`}
              required
              placeholderText="Select submission date"
              minDate={new Date()}
              portalId="date-picker-portal" // Use portal to render above other elements
              popperPlacement="top"
            />
            
            <div className={styles.subheading}>Coursework Details</div>
            <textarea
              placeholder="Enter details about the coursework here"
              value={courseworkDetails}
              onChange={(e) => setCourseworkDetails(e.target.value)}
              className={`${styles.inputField} ${styles.inputFieldEnquiry}`}
              required
            />
            
            <div className={styles.buttonContainer}>
              <button onClick={handleBack} className={styles.button}>Back</button>
              <button onClick={handleNext} className={styles.button}>Next</button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
