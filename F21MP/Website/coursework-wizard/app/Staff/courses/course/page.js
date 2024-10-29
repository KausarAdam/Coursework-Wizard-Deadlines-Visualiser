"use client";

import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Course({ params }) {
  const searchParams = useSearchParams();
  const courseCode = searchParams.get('code');
  const router = useRouter();
  const [courseName, setCourseName] = useState("");
  const [coursework, setCoursework] = useState([]);
  const [submissionData, setSubmissionData] = useState({});
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  
  const handleSubmit = async (courseworkId, action) => {
    console.log("Delete action initiated for courseworkId:", courseworkId); // Debugging

    if (action === "delete") {
      // Ask for confirmation before proceeding
      const isConfirmed = window.confirm("Are you sure you want to delete this coursework?");

      if (!isConfirmed) {
          console.log("Deletion cancelled."); // User cancelled the deletion
          return; // Exit the function
      }

      try {
        const response = await fetch(`/api/deleteCoursework?coursework_id=${courseworkId}`, {
          method: 'DELETE',
        });

        console.log("Response status:", response.status); // Debugging response status
        const result = await response.json(); // Parse response

        if (!response.ok) {
          console.error("Failed to delete coursework:", result.error); // Log error if not ok
          throw new Error('Failed to delete coursework');
        }

        console.log("Coursework deleted successfully", result.message); // Success log
        setCoursework(coursework.filter(cw => cw.coursework_id !== courseworkId));

      } catch (error) {
        console.error("Error deleting coursework:", error);
      }
    }
  };


  

  useEffect(() => {
    if (courseCode) {
      if (courseCode === "F21SF") {
        setCourseName("Software Engineering");
      } else if (courseCode === "F21AD") {
        setCourseName("Advanced Interaction Design");
      } else if (courseCode === "F21DF") {
        setCourseName("Database and Information Systems");
      } else if (courseCode === "F21EC") {
        setCourseName("E-Commerce");
      } else {
        setCourseName("Unnamed Course");
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
  
        setCoursework(mappedCoursework);
      } catch (error) {
        console.error("Failed to fetch coursework:", error);
      }
    };
  
    if (courseCode) {
      fetchCoursework();
    }
  }, [courseCode, courseName]);


  return (
    <div className={styles.container}>
      <StaffMenu />

      <div className={styles.coursePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>{courseCode} - {courseName}</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <h2 className={styles.subheading}>Course Details</h2>

          <div className={styles.box}>
            <div className={styles.insideBox}>
              <h3 className={styles.heading3}>Course Announcement</h3>
              <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>+ New</button>
            </div>
            <hr />
            <div className={styles.subheading}>Announcement Details</div>
          </div>

          <div className={styles.box3}>
            <div className={styles.insideBox3}>
              <h3 className={styles.heading3}>Coursework</h3>
              <Link href={`/Staff/courses/add_coursework_1?courseCode=${courseCode}&courseName=${courseName}`} className={styles.Link}>
                <button className={styles.button}>+ New</button>
              </Link>
            </div>

            <hr style={{ width: "99.5%", marginLeft: "0" }} />

            {coursework.length > 0 ? (
              coursework.map((cw) => {

                return (
                  <div key={cw.coursework_id} className={styles.boxCourse}>
                    <div className={styles.first}>
                      <p className={styles.subheading2}>{cw.title}</p>
                      <p className={styles.text}>{cw.description}</p>
                      <p className={styles.text}>Due on {new Date(cw.end).toLocaleDateString('en-GB')}</p>
                    </div>
                    <div className={styles.third}>
                      <Link href={`/Staff/courses/coursework?course_code=${courseCode}&coursework_id=${cw.coursework_id}`} className={styles.Link}>
                        <button className={styles.button}>View</button>
                      </Link>
                      <button onClick={() => handleSubmit(cw.coursework_id, "delete")} className={styles.button}>Delete</button>
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
