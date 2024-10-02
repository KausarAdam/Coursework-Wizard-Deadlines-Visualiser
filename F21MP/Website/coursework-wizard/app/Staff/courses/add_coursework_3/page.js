"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import { useSearchParams } from 'next/navigation';

export default function AddCoursework() {

  const searchParams = useSearchParams();
  const courseworkName = searchParams.get('courseworkName');
  const submissionDate = new Date(searchParams.get('date')); // Convert back to date object
  const courseworkDetails = searchParams.get('details');
  const subtaskTotal = searchParams.get('subtaskTotal');
  const subtaskDependent = searchParams.get('subtaskDependent');
  const dependentSubtasks = JSON.parse(decodeURIComponent(searchParams.get('dependentSubtasks') || '[]'));
  const subtaskIndependent = searchParams.get('subtaskIndependent');
  const independentSubtask = JSON.parse(decodeURIComponent(searchParams.get('independentSubtask') || '{}'));

  // Date formatting function
  const formatDate = (date) => {
    if (!date) return 'No date provided';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    router.push("/Staff/courses/add_coursework_4");
  };

  const handleBack = () => {
    router.push("/Staff/courses/add_coursework_2");
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
          <div className={styles.headingBox}>
            <h3 className={`${styles.heading3} ${styles.heading4}`}>{courseworkName ? courseworkName : 'No name provided'}</h3>
            
            <div className={`${styles.subheading} ${styles.subheading2} ${styles.subheading3}`}>
              <span>Submission Date: </span>
              <span style={{ fontWeight: 'lighter' }}>{formatDate(submissionDate)}</span>
            </div>
          </div>
            <hr style={{ marginBottom: "20px" }} />

            <div className={styles.subheading}>Coursework Details: {courseworkDetails ? courseworkDetails : 'No details provided'}</div>
            <div className={styles.subheading}>Total Number of Subtasks: {subtaskTotal ? subtaskTotal : 'No name provided'}</div>
            <div className={styles.subheading}>Total Number of Dependent Subtasks: {subtaskDependent ? subtaskDependent : 'No name provided'}</div>
            <div className={styles.subheading}>Total Number of Independent Subtasks: {subtaskIndependent ? subtaskIndependent : 'No name provided'}</div>

            <div className={styles.buttonContainer}>
              <button onClick={handleBack} className={styles.button}>Back</button>
              <button onClick={handleSubmit} className={styles.button}>Publish</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
