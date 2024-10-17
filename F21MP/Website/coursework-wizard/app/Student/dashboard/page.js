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
  const [courseCodes, setCourseCodes] = useState([]); // Temporary storage for course codes
  const [courseNames, setCourseNames] = useState([]); // Temporary storage for course names
  const [courseworkId, setCourseworkId] = useState([]);
  const [nextDeadline, setNextDeadline] = useState(null);
  const [nextCourseCode, setNextCourseCode] = useState('');
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null; // Check if in the browser
  
  // Temporary store for border colors
  const borderColors = ['#BEDFE4', '#D8BFEA', '#E8EDC1', '#ECC2D1'];

  const goToCourseworkPage = (courseworkId, code) => {
    router.push(`/Student/courses/coursework?code=${code}&courseworkId=${courseworkId}`);
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

          // Set course codes and names in temporary storage
          const codes = data.map(coursework => coursework.course_code);
          const names = data.map(coursework => coursework.course_name);
          const ids = data.map(coursework => coursework.coursework_id);
          setCourseCodes(codes);
          setCourseNames(names);
          setCourseworkId(ids);
        } else {
          console.error("Failed to fetch coursework");
        }
      }
    };

    const fetchNextDeadline = async () => {
      if (username) {
        try {
          const res = await fetch(`/api/getSubtaskDeadline?username=${username}`);
          if (res.ok) {
            const subtasks = await res.json();
            if (subtasks.length > 0) {
              // Set the first upcoming deadline and corresponding course code
              setNextDeadline(subtasks[0].end_date);
              setNextCourseCode(subtasks[0].course_code);
            } else {
              console.log('No upcoming deadlines found');
            }
          } else {
            console.error('Failed to fetch subtasks');
          }
        } catch (error) {
          console.error('Error fetching next deadline:', error);
        }
      }
    };    

    fetchStudentName();
    fetchCoursework();
    fetchNextDeadline(); // call fetch functions
  }, [username]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    
    // Determine the ordinal suffix
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // 4-20
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    // Format the date without the year
    return `${day}${suffix(day)} ${date.toLocaleString('default', { month: 'long' })}`;
  };
  
  
  return (
    <div className={styles.container}>
      <StudentMenu courseCodes={courseCodes} courseNames={courseNames} />

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
              <h3 className={`${styles.heading3} ${styles.heading33}`}>
                {nextDeadline ? formatDate(nextDeadline) : 'No upcoming deadlines'}
              </h3>
              <br />
              <div className={styles.subheading}>
                Next Subtask Deadline for {nextCourseCode ? nextCourseCode : 'N/A'}
              </div>
            </div>

          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Upcoming Coursework</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />

            {/* First Row */}
            <div className={styles.secondSetOfBoxes}>
  {courseworkList.slice(0, 2).map((coursework, index) => (
    <div
      key={coursework.coursework_id} // Use coursework.coursework_id here
      className={styles.box4}
      onClick={() => goToCourseworkPage(coursework.coursework_id, coursework.course_code)} // Pass coursework.coursework_id
      style={{ border: `5px solid ${borderColors[index]}`, '--border-color': borderColors[index] }}
    >
      <div className={`${styles.subheading} ${styles.subheading2}`}>{coursework.title}</div>
      <div className={styles.text}>{coursework.course_code} - {coursework.course_name}</div>
      <div className={styles.text}>Due on {new Date(coursework.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
    </div>
  ))}
            </div>

            {/* Second Row */}
            <div className={styles.secondSetOfBoxes}>
              {courseworkList.slice(2, 4).map((coursework, index) => (
                <div
                  key={coursework.coursework_id + index} // Use coursework.coursework_id for the second set as well
                  className={styles.box4}
                  onClick={() => goToCourseworkPage(coursework.coursework_id, coursework.course_code)} // Pass coursework.coursework_id
                  style={{ border: `5px solid ${borderColors[index + 2]}`, '--border-color': borderColors[index + 2] }} // Adjusted for the second set
                >
                  <div className={`${styles.subheading} ${styles.subheading2}`}>{coursework.title}</div>
                  <div className={styles.text}>{coursework.course_code} - {coursework.course_name}</div>
                  <div className={styles.text}>Due on {new Date(coursework.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
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
