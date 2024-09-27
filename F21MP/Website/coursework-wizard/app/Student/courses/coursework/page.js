"use client";

import { useRouter } from "next/navigation";
import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";
import { useRef } from "react";

export default function Coursework({ params }) {
  const { courseId } = params;
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const handleSubmit = (courseworkFile) => {
    window.open(courseworkFile, "_blank");
  };

  const handleResubmitClick = () => {
    fileInputRef.current.click(); // Resubmit button (sleepy, will explain later)
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      console.log("Selected file:", file);
    } else {
      alert("Please select a PDF file.");
    }
  };

  return (
    <div className={styles.container}>
      <StudentMenu />

      <div className={styles.courseworkPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>F21SF - Competitor Application</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <h2 className={styles.subheading}>Coursework Details</h2>

          <div className= {styles.firstSetOfBoxes}>

            <div className={styles.box}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>75%</h3>
              <br/>
              <div className={styles.subheading}>Work Completed</div>
            </div>

            <div className={styles.box}>
              <h3 className={styles.heading3}>24th September</h3>
              <br></br>
              <div className={styles.subheading}>You are on track!</div>
            </div>

            <div className={styles.box}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>24th September</h3>
              <br></br>
              <div className={styles.subheading}>Next Subtask Deadline</div>
            </div>

          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Coursework Progress</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />
            <div className={`${styles.boxCourse} ${styles.onTrack}`}>
              <div className={styles.first}>
                <p className={styles.subheading2}>Competitor Application</p>
                <p className={styles.text}>Subtask Details</p>
                <p className={styles.text}>Due on Tuesday, 21st October</p>
              </div>
              <div className={styles.third}>
                <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                <button onClick={handleResubmitClick} className={styles.button}>Resubmit</button>
              </div>
            </div>

            <div className={`${styles.boxCourse} ${styles.noWork}`}>
              <div className={styles.first}>
                <p className={styles.subheading2}>Application GUI</p>
                <p className={styles.text}>Subtask Details</p>
                <p className={styles.text}>Due on Tuesday, 26th November</p>
              </div>
              <div className={styles.third}>
                <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                <button onClick={handleResubmitClick} className={styles.button}>Resubmit</button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
