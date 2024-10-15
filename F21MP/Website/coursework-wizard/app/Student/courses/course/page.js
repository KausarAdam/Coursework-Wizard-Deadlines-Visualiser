"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function Course() {
  const searchParams = useSearchParams();
  const courseCode = searchParams.get('code');
  const [courseName, setCourseName] = useState(""); // State to hold course name
  const router = useRouter();

  useEffect(() => {
    if (courseCode) {
      // Fetch course details based on the courseCode
      if (courseCode === "F21SF") {
        setCourseName("Software Engineering");
      } else if (courseCode === "F21AD") {
        setCourseName("Advanced Interaction Design");
      } else if (courseCode === "F21DF") {
        setCourseName("Database and Information Systems");
      } else if (courseCode === "F21EC") {
        setCourseName("E-Commerce");
      } else {
        setCourseName("Unnamed Course"); // Fallback if no course name is found
      }
    }
  }, [courseCode]);
  
  const handleSubmit = (courseworkFile) => {
    window.open(courseworkFile, "_blank");
  };

  return (
    <div className={styles.container}>
      <StudentMenu />

      <div className={styles.coursePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>{courseCode} - {courseName}</h1>
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
                <Link href={`/Student/courses/coursework?code=${courseCode}`} className={styles.Link}>
                  <button className={styles.button}>View/<br/>Submit</button>
                </Link>
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
                <Link href={`/Student/courses/coursework?code=${courseCode}`} className={styles.Link}>
                  <button className={styles.button}>View/<br/>Submit</button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
