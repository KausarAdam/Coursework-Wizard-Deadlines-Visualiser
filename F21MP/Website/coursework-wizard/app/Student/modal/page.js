"use client";
import { useRef } from "react";
import styles from "./page.module.css";
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function Modal({ isOpen, onClose, subtask }) {
  const fileInputRef = useRef(null);
  const router = useRouter();

  if (!isOpen || !subtask) return null;

  // Trigger file input when "Resubmit" button is clicked
  const handleResubmitClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file explorer
    }
  };

  // Function to handle viewing
  const handleView = (path) => {
    window.open(path, '_blank');
  };

  // Mapping of courseId to course names
  const courseNames = {
    1: "Advanced Interaction Design",
    2: "Database and Information Systems",
    3: "E-Commerce",
    4: "Software Engineering"
  };

  // Get the course name based on the subtask's courseId
  const courseName = courseNames[subtask.courseId];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalPage}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={styles.heading}>{subtask.title}</h1>
        <hr style={{ width: "100.5%", marginLeft: "0" }} />
        <h2 className={styles.subheading}>Task for Course {courseName}</h2>
        <h2 className={styles.subheadingSmall}>Start Date: {format(subtask.start, 'dd/MM/yyyy')}</h2>
        <h2 className={styles.subheadingSmall}>End Date: {format(subtask.end, 'dd/MM/yyyy')}</h2>

        <div className={styles.buttonContainer}>
          <button onClick={() => handleView("/path/to/pdf")} className={styles.button}>View Subtask</button>
          <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} /> {/* Hidden file input */}
        </div>
      </div>
    </div>
  );
}
