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
  const [coursework, setCoursework] = useState([]); // State to hold coursework details
  const [submissionData, setSubmissionData] = useState({}); // State to hold submission data
  const router = useRouter();
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null; // Retrieve username from local storage
  
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

  // Fetch coursework details based on courseCode
  useEffect(() => {
    const fetchCoursework = async () => {
      try {
        const response = await fetch(`/api/getCoursePageCoursework?courseCode=${courseCode}`);
        const data = await response.json();
  
        const mappedCoursework = data.map((coursework) => ({
          coursework_id: coursework.coursework_id,
          title: coursework.title,
          description: coursework.description,
          start: new Date(coursework.start_date),
          end: new Date(coursework.end_date),
          course_code: coursework.course_code,
          coursework_sequence: coursework.coursework_sequence
        }));
  
        setCoursework(mappedCoursework); // Set individually saved coursework data
      } catch (error) {
        console.error("Failed to fetch coursework:", error);
      }
    };
  
    if (courseCode) {
      fetchCoursework();
    }
  }, [courseCode, courseName]); // Include courseName in the dependency array if used
  

  // Fetch submission data based on courseCode and studentUsername
  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const response = await fetch(`/api/getSubmissions?courseCode=${courseCode}&studentUsername=${username}`);
        const data = await response.json();
        
        const submissionMap = {};
        data.forEach((submission) => {
          if (!submissionMap[submission.coursework_id]) {
            submissionMap[submission.coursework_id] = {
              totalSubtasks: 0,
              submittedSubtasks: 0
            };
          }
          submissionMap[submission.coursework_id].totalSubtasks += 1;
          if (submission.status === "done") {
            submissionMap[submission.coursework_id].submittedSubtasks += 1;
          }
        });

        setSubmissionData(submissionMap); // Store the submission data for coursework
      } catch (error) {
        console.error("Failed to fetch submission data:", error);
      }
    };

    if (courseCode && username) {
      fetchSubmissionData();
    }
  }, [courseCode, username]);


  // Calculate progress percentage and assign the correct class
  const calculateProgress = (courseworkId) => {
    const submission = submissionData[courseworkId];
    if (submission) {
      const { totalSubtasks, submittedSubtasks } = submission;
      const progressPercentage = totalSubtasks > 0 ? (submittedSubtasks / totalSubtasks) * 100 : 0;
      const progressClass = progressPercentage >= 50 ? styles.onTime : styles.late;
      return { progressPercentage, progressClass };
    }
    return { progressPercentage: 0, progressClass: styles.late };
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

            {coursework.length > 0 ? (
              coursework.map((cw) => {
                const { progressPercentage, progressClass } = calculateProgress(cw.coursework_id);

                return (
                  <div key={cw.coursework_id} className={styles.boxCourse}>
                    <div className={styles.first}>
                      <p className={styles.subheading2}>{cw.title}</p>
                      <p className={styles.text}>{cw.description}</p>
                      <p className={styles.text}>Due on {new Date(cw.end).toLocaleDateString('en-GB')}</p>
                    </div>
                    <div className={`${styles.progressBarContainer} ${progressClass}`}>
                      <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <div className={styles.third}>
                      <Link href={`/Student/courses/coursework?code=${courseCode}`} className={styles.Link}>
                        <button className={styles.button}>View/<br/>Submit</button>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No coursework available for this course.</p>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
