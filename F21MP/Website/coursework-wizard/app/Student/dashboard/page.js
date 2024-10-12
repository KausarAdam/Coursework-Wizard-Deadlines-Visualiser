"use client";

import StudentMenu from "../student_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../student_notification";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("John Doe"); // Default name
  const [courseworkList, setCourseworkList] = useState([]); // State for coursework
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null; // Check if in the browser
  
  // Temporary store for border colors
  const borderColors = ['#BEDFE4', '#D8BFEA', '#E8EDC1', '#ECC2D1'];

  const goToCourseworkPage = () => {
    router.push('/Student/courses/coursework');
  };

  useEffect(() => {
    const fetchStudentName = async () => {
      if (username) {
        const res = await fetch(`/api/getStudentName?username=${username}`);
        if (res.ok) {
          const data = await res.json();
          if (data.name) {
            setStudentName(data.name); // Set the student's name
          }
        } else {
          console.error("Failed to fetch student name");
        }
      }
    };

    const fetchCoursework = async () => {
      if (username) {
        const res = await fetch(`/api/getCoursework?username=${username}`);
        if (res.ok) {
          const data = await res.json();
          setCourseworkList(data); // Set the coursework list from the response
        } else {
          console.error("Failed to fetch coursework");
        }
      }
    };

    fetchStudentName();
    fetchCoursework(); // Call fetchCoursework when the component mounts
  }, [username]);
  
  return (
    <div className={styles.container}>
      <StudentMenu/>

      <div className={styles.dashboardPage}>

        <div className={styles.header}>
          <h1 className={styles.heading}>Student Dashboard</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>

          <hr style={{ width: "100.5%", marginLeft: "0" }} />
        
          <h2 className={styles.subheading}>Hello, {studentName}!</h2>

          <div className={styles.firstSetOfBoxes}>

            <div className={styles.box}>
              <h3 className={styles.heading3}>Important Announcement</h3>
              <hr />
              <div className={styles.subheading}>Announcement Details</div>
            </div>

            <div className={styles.box2}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>24th September</h3>
              <br />
              <div className={styles.subheading}>Next Subtask Deadline</div>
            </div>

          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Upcoming Coursework</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />

            {/* First Row */}
            <div className={styles.secondSetOfBoxes}>
              {courseworkList.slice(0, 2).map((coursework, index) => (
                <div
                  key={coursework.id} // Use a unique ID if available
                  className={styles.box4}
                  onClick={goToCourseworkPage}
                  style={{ border: `5px solid ${borderColors[index]}`, '--border-color': borderColors[index] }}
                >
                  <div className={`${styles.subheading} ${styles.subheading2}`}>{coursework.title}</div>
                  <div className={styles.text}>{coursework.course_code} - {coursework.course_name}</div>
                  <div className={styles.text}>Due on {new Date(coursework.due_date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>

            {/* Second Row */}
            <div className={styles.secondSetOfBoxes}>
              {courseworkList.slice(2, 4).map((coursework, index) => (
                <div
                  key={coursework.id + index} // Use a unique ID for the second set as well
                  className={styles.box4}
                  onClick={goToCourseworkPage}
                  style={{ border: `5px solid ${borderColors[index + 2]}`, '--border-color': borderColors[index + 2] }} // Adjusted for the second set
                >
                  <div className={`${styles.subheading} ${styles.subheading2}`}>{coursework.title}</div>
                  <div className={styles.text}>{coursework.course_code} - {coursework.course_name}</div>
                  <div className={styles.text}>Due on {new Date(coursework.due_date).toLocaleDateString()}</div>
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
