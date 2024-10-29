"use client";

import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import DoughnutChartCompleted from "../../DoughnutChartCompleted";
import DoughnutChartInProgress from "../../DoughnutChartInProgress";
import DoughnutChartNoSubmission from "../../DoughnutChartNoSubmission";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Coursework() {
  const searchParams = useSearchParams();
  const courseCode = searchParams.get('course_code');
  const courseworkId = searchParams.get('coursework_id');
  
  const [subtasks, setSubtasks] = useState([]);
  const [cwTitle, setCwTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const response = await fetch(`/api/getCourseworkSubtasks?course_code=${courseCode}&coursework_id=${courseworkId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch subtasks');
        }
        const data = await response.json();
        setSubtasks(data); // Update the state with fetched subtasks
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchCourseworkTitle = async () => {
      try {
        const response = await fetch(`/api/getCourseworkTitle?coursework_id=${courseworkId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch title');
        }
        const data = await response.json();
        // Ensure data is not empty and access the title correctly
        if (data.length > 0) {
          setCwTitle(data[0].title); // Update with the correct title
        } else {
          setCwTitle('No title found'); // Fallback if no data is returned
        }
      } catch (error) {
        setError(error.message);
      }
    };
    

    fetchSubtasks();
    fetchCourseworkTitle();
  }, [courseCode, courseworkId]);

  const handleClick = (filePath) => {
    window.open(filePath, "_blank");
  };

  return (
    <div className={styles.container}>
      <StaffMenu />
      <div className={styles.courseworkPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>{courseCode} - {cwTitle}</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />
          <h2 className={styles.subheading}>Coursework Details</h2>

          <div className={styles.box33}>
            <div className={styles.shareButtonContainer}>
              <h3 className={styles.heading3}>Coursework Progress</h3>
              <button className={styles.button}>Share</button>
            </div>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />
            <div className={styles.firstSetOfBoxes}>
              <div className={styles.box}>
                <p className={`${styles.subheadingGraphs} ${styles.subheadingGraphsGreen}`}>COMPLETED</p>
                <center><DoughnutChartCompleted /></center>
              </div>
              <div className={styles.box}>
                <p className={`${styles.subheadingGraphs} ${styles.subheadingGraphsOrange}`}>IN PROGRESS</p>
                <center><DoughnutChartInProgress /></center>
              </div>
              <div className={styles.box}>
                <p className={`${styles.subheadingGraphs} ${styles.subheadingGraphsRed}`}>NO SUBMISSION</p>
                <center><DoughnutChartNoSubmission /></center>
              </div>
            </div>
          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Coursework Breakdown</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />
            <div className={styles.insideBox3}>
              {subtasks.map((subtask) => (
                <div key={subtask.id} className={styles.boxCourse} onClick={() => handleClick(subtask.file_attachment)}>
                  <div className={styles.first}>
                    <p className={styles.subheading2}>{subtask.subtask} - {subtask.title}</p>
                    <p className={styles.text}>Due on {new Date(subtask.end_date).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}