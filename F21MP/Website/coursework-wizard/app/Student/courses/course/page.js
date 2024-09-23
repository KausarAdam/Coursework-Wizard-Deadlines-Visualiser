"use client";

import { useRouter } from "next/navigation";
import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";

export default function Course({ params }) {
  const { courseId } = params;
  const router = useRouter();
  
  const handleSubmit = (courseworkFile) => {
    window.open(courseworkFile, "_blank");
  };

  return (
    <div className={styles.container}>
      <StudentMenu />

      <div className={styles.coursePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>F21SF - Software Engineering</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <h2 className={styles.subheading}>Course Details</h2>

          <div className={styles.box}>
            <h3 className={styles.heading3}>Course Announcement</h3>
            <hr />
            <div className={styles.subheading}>Announcement Details</div>
          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Pending Coursework</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />
            <div className={styles.boxCourse}>
              <div className={styles.first}>
                <p className={styles.subheading2}>Competitor Application</p>
                <p className={styles.text}>Details</p>
                <p className={styles.text}>Due on Tuesday, 21st October</p>
              </div>
              <div className={`${styles.progressBarContainer} ${styles.onTime}`}>
                <div className={styles.progressBar} style={{ width: '75%' }}></div>
              </div>
              <div className={styles.third}>
                <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>
                  View/<br />Submit
                </button>
              </div>
            </div>

            <div className={styles.boxCourse}>
              <div className={styles.first}>
                <p className={styles.subheading2}>Application GUI</p>
                <p className={styles.text}>Details</p>
                <p className={styles.text}>Due on Tuesday, 26th November</p>
              </div>
              <div className={`${styles.progressBarContainer} ${styles.late}`}>
                <div className={styles.progressBar} style={{ width: '5%' }}></div>
              </div>
              <div className={styles.third}>
                <button onClick={handleSubmit} className={styles.button}>View/<br/>Submit</button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
