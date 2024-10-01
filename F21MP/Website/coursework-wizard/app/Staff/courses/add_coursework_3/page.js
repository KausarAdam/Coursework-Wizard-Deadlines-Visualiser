"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";

export default function AddCoursework() {

  const handleSubmit = async (e) => {
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
            <div className={styles.subheading}>Total Number of Subtasks</div>
            
            <div className={styles.subheading}>Total Number of Dependent Subtasks</div>
            
            <div className={`${styles.subheading} ${styles.subheadingMargin}`}>Total Number of Independent Subtasks</div>

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
