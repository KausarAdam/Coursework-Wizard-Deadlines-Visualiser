"use client";

import { useEffect, useState } from "react"; // Ensure useEffect is imported
import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";

export default function AddCoursework() {
  const router = useRouter();
  const { query } = router;
  const [courseworkData, setCourseworkData] = useState({});

  useEffect(() => {
    if (query) {
      // Parse dependentSubtasks if they are passed as JSON
      const dependentSubtasks = query.dependentSubtasks
        ? JSON.parse(query.dependentSubtasks)
        : [];

      setCourseworkData({
        subtaskTotal: query.subtaskTotal,
        subtaskDependent: query.subtaskDependent,
        subtaskIndependent: query.subtaskIndependent,
        dependentSubtasks: dependentSubtasks,
        independentSubtaskRow: query.independentSubtaskRow,
      });
    }
  }, [query]);

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
              <h3 className={styles.heading3}>Coursework Name</h3>
              <div className={`${styles.subheading} ${styles.subheading2} ${styles.subheading3}`}>
                Submission Date:
              </div>
            </div>
            <hr style={{ marginBottom: "20px" }} />

            <div className={styles.subheading}>Coursework Details: </div>
            <div className={styles.subheading}>
              Total Number of Subtasks: {courseworkData.subtaskTotal}
            </div>
            <div className={styles.subheading}>
              Total Number of Dependent Subtasks: {courseworkData.subtaskDependent}
            </div>
            <div className={styles.subheading}>
              Total Number of Independent Subtasks: {courseworkData.subtaskIndependent}
            </div>

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
