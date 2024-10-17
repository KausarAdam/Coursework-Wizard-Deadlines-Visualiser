"use client";

import { useRouter } from "next/navigation";
import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';

export default function Coursework({ params }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const searchParams = useSearchParams();
  const courseCode = searchParams.get('code');
  const courseworkId = searchParams.get('courseworkId');
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null; // Retrieve username from local storage

  const [courseworkSubtasks, setCourseworkSubtasks] = useState([]);
  const [submissionData, setSubmissionData] = useState({});
  const [unlockedSubtasks, setUnlockedSubtasks] = useState({});
  const [subtaskStatus, setSubtaskStatus] = useState({});
  const [nextDeadline, setNextDeadline] = useState(null);

  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const response = await fetch(`/api/getCourseworkSubtasks?course_code=${courseCode}&coursework_id=${courseworkId}`);
        if (!response.ok) throw new Error('Failed to fetch subtasks');
        const data = await response.json();
  
        // Map the fetched data to the desired structure
        const mappedCoursework = data.map((subtask) => ({
          coursework_id: subtask.coursework_id,
          title: subtask.title,
          description: subtask.description,
          start: new Date(subtask.start_date),
          end: new Date(subtask.end_date),
          course_code: subtask.course_code,
          subtask: subtask.subtask,
        }));
  
        // Set the mapped coursework in state
        setCourseworkSubtasks(mappedCoursework);

      } catch (error) {
        console.error('Error fetching subtasks:', error);
      }
    };
  
    const fetchSubmissionData = async () => {
      try {
        const submissionResponse = await fetch(`/api/getSubmissions?courseCode=${courseCode}&studentUsername=${username}`);
        if (!submissionResponse.ok) throw new Error('Failed to fetch submissions');
        
        const submissionData = await submissionResponse.json();
  
        // Map submissions to track submitted subtasks
        const submissionMap = {};
        submissionData.forEach((submission) => {
          if (!submissionMap[submission.coursework_id]) {
            submissionMap[submission.coursework_id] = {
              submittedSubtasks: 0,
            };
          }
          if (submission.status === "done") {
            submissionMap[submission.coursework_id].submittedSubtasks += 1;
          }
        });
  
        setSubmissionData(submissionMap);
  
        // Map for status of each subtask
        const statusMap = {};
        submissionData.forEach((submission) => {
          if (!statusMap[submission.coursework_id]) {
            statusMap[submission.coursework_id] = {
              statusSubtasks: [],
            };
          }
          if (submission.status === "done") {
            statusMap[submission.coursework_id].statusSubtasks.push(submission.subtask);
          }
        });
  
        setSubtaskStatus(statusMap);
  
        // Fetch and map unlocked subtasks
        const unlockedResponse = await fetch(`/api/getUnlockedSubtasks?courseCode=${courseCode}`);
        if (!unlockedResponse.ok) throw new Error('Failed to fetch unlocked subtasks');
        
        const unlockedData = await unlockedResponse.json();
  
        const unlockedMap = {};
        unlockedData.forEach((subtask) => {
          if (!unlockedMap[subtask.coursework_id]) {
            unlockedMap[subtask.coursework_id] = {
              totalUnlocked: 0,
            };
          }
          if (subtask.is_locked === 0) {
            unlockedMap[subtask.coursework_id].totalUnlocked += 1;
          }
        });
  
        setUnlockedSubtasks(unlockedMap);
        console.log("Fetch successful");
      } catch (error) {
        console.error("Failed to fetch submission data:", error);
      }
    };

    const fetchNextDeadline = async () => {
      try {
        const deadlineResponse = await fetch(`/api/getCourseworkSubtasksWithStatus?username=${username}&course_code=${courseCode}&coursework_id=${courseworkId}`);
        if (!deadlineResponse.ok) throw new Error('Failed to fetch next deadline');
        
        const deadlineData = await deadlineResponse.json();
        console.log("Fetched deadline data:", deadlineData); // Log fetched deadline data
        
        if (deadlineData.length > 0) {
          const nextDeadline = new Date(deadlineData[0].end_date); // Directly get the end_date from the first (and only) object
          setNextDeadline(nextDeadline); // Set the next deadline
        } else {
          setNextDeadline(null); // If no data is returned, set deadline to null
        }
        
      } catch (error) {
        console.error("Failed to fetch next deadline:", error);
      }
    };
    
    
  
    // Fetch subtasks and submission data
    fetchSubtasks();
  
    if (courseCode && username) {
      fetchSubmissionData();
      fetchNextDeadline();
    }

    
  }, [courseCode, courseworkId, username]);
  

  // Calculate completion percentage for each coursework
  const totalUnlockedTasks = unlockedSubtasks[courseworkId]?.totalUnlocked || 0; // Get the total number of unlocked subtasks
  const completedTasks = submissionData[courseworkId]?.submittedSubtasks || 0; // Get the number of submitted tasks
  const completedPercentage = totalUnlockedTasks > 0 ? (completedTasks / totalUnlockedTasks) * 100 : 0; // Calculate completion percentage

  const handleView = (filePath) => {
    window.open(filePath, "_blank");
  };

  const handleFileSubmit = async (subtask) => {
    const fileInput = fileInputRef.current;
    fileInput.click(); // Trigger the file picker

      fileInput.onchange = async () => {
          const selectedFile = fileInput.files[0];
          if (selectedFile) {
              const filePath = `/${selectedFile.name}`; // Store the file name with a leading slash

              try {
                  const response = await fetch('/api/updateSubmission', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          subtask: subtask.subtask, // Subtask ID
                          course_code: courseCode,
                          coursework_id: courseworkId,
                          username,
                          newStatus: 'done',
                          filePath, // Only the file path
                      }),
                  });

                  if (response.ok) {
                      alert('Submitted');
                      // router.push(`/Student/courses/coursework?code=${courseCode}&courseworkId=${subtask.coursework_id}`);
                      // router.push(`/Student/dashboard`);
                      window.location.href = `/Student/courses/coursework?code=${courseCode}&courseworkId=${subtask.coursework_id}`;
                  } else {
                      const result = await response.json();
                      alert(`Error: ${result.error}`);
                  }
              } catch (error) {
                  console.error("Failed to submit:", error);
                  alert("Failed to submit");
              }
          }
      };
    };

  return (
    <div className={styles.container}>
      <StudentMenu />
      <div className={styles.courseworkPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>F21SF - Competitor Application Coursework</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />
          <h2 className={styles.subheading}>Coursework Details</h2>

          <div className={styles.firstSetOfBoxes}>
            <div className={styles.box}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>{completedPercentage.toFixed(0)}%</h3>
              <br />
              <div className={styles.subheading}>Work Completed</div>
            </div>

            <div className={styles.box}>
            <Image
              src={
                completedPercentage === 100
                  ? "/party.png"
                  : completedPercentage >= 80
                  ? "/happy.png"
                  : completedPercentage >= 50
                  ? "/neutral.png"
                  : "/sad.png"
              }
              alt={
                completedPercentage === 100
                  ? "Party"
                  : completedPercentage >= 80
                  ? "Happy"
                  : completedPercentage >= 50
                  ? "Neutral"
                  : "Sad"
              }
              width={90}
              height={90}
            />
              <br />
              <div className={styles.subheading}>{
              completedPercentage === 100
              ? "Good Job!"
              : completedPercentage >= 80
              ? "Almost there!"
              : completedPercentage >= 50
              ? "Keep Going!"
              : "Move Quickly!"
              }</div>
            </div>

            <div className={styles.box}>
              <h3 className={`${styles.heading3} ${styles.heading333}`}>
                {nextDeadline ? nextDeadline.toLocaleDateString("en-GB") : "No upcoming deadlines"}</h3>
              <br />
              <div className={styles.subheading}>Next Subtask Deadline</div>
            </div>
          </div>

          <div className={styles.box3}>
            <div className={styles.courseworkProgressBox}>
              <h3 className={styles.heading3}>Coursework Progress</h3>
              <div className={`${styles.progressBarContainer} ${completedPercentage < 50 ? styles.late : styles.onTime}`}>
                <div className={styles.progressBar} style={{ width: `${completedPercentage}%` }}></div>
              </div>
            </div>

            <hr style={{ width: "99.5%", marginLeft: "0" }} />
            
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} /> {/* Hidden file input */}
            
            {/* Group subtasks into insideBox3 divs based on the max of 3 per row */}
            {courseworkSubtasks.reduce((acc, subtask, index) => {
              if (index % 3 === 0) {
                acc.push([]); // Start a new row
              }
              acc[acc.length - 1].push(subtask); // Add subtask to the current row
              return acc;
            }, []).map((subtaskRow, rowIndex) => (
              <div key={rowIndex} className={styles.insideBox3}>
                {subtaskRow.map((subtask) => {
                  // Check if the current subtask is in the statusSubtasks array
                  const isCompleted = subtaskStatus[subtask.coursework_id]?.statusSubtasks.includes(subtask.subtask);
                  return(
                    <div key={subtask.subtask} className={`${styles.boxCourse} ${isCompleted ? styles.onTrack : styles.noWork}`}>
                      <div className={styles.first}>
                        <p className={styles.subheading2}>{subtask.subtask} - {subtask.title}</p>
                        <p className={styles.text}>{subtask.description}</p>
                        <p className={styles.text}>Due on {subtask.end.toLocaleDateString("en-GB")}</p>
                      </div>
                      <div className={styles.third}>
                        <button onClick={() => handleView("/subtask_sample.pdf")} className={styles.button}>View Subtask</button>
                        <button onClick={() => handleFileSubmit(subtask)} className={styles.button}>Re/Submit</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
