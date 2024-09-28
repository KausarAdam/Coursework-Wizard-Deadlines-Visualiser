"use client";

import { useRouter } from "next/navigation";
import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";
import { useRef } from "react";
import Image from "next/image";

export default function Coursework({ params }) {
  const { courseId } = params;
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Sample data
  const isOnTrack = true; // Change based on your logic
  const courseworkWeeks = [
    { week: 1, subtasks: [{ id: 1, text: "F21SF - Subtask 1.1", dueDate: new Date("2024-09-20") }] },
    { week: 2, subtasks: [{ id: 2, text: "F21SF - Subtask 2.1", dueDate: new Date("2024-09-27") }] },
    { week: 3, subtasks: [{ id: 3, text: "F21SF - Subtask 3.1", dueDate: new Date("2024-09-27") }] },
    { week: 4, subtasks: [{ id: 4, text: "F21SF - Subtask 4.1", dueDate: new Date("2024-09-27") }] },
    { week: 5, subtasks: [{ id: 5, text: "F21SF - Subtask 5.1", dueDate: new Date("2024-10-05") }] },
    { week: 6, subtasks: [{ id: 6, text: "F21SF - Subtask 6.1", dueDate: new Date("2024-10-12") }] },
  ];

  const completedTasks = 3; // Example: Total completed tasks
  const totalTasks = courseworkWeeks.flatMap(week => week.subtasks).length;
  const completedPercentage = (completedTasks / totalTasks) * 100;

  // Trigger file input when "Resubmit" button is clicked
  const handleResubmitClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file explorer
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = (filePath) => {
    window.open(filePath, "_blank");
  };

  // Determine next subtask deadline dynamically
  const nextDeadline = courseworkWeeks
    .flatMap(week => week.subtasks)
    .filter(subtask => new Date(subtask.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.dueDate;

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

          <div className={styles.firstSetOfBoxes}>
            <div className={styles.box}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>75%</h3>
              <br />
              <div className={styles.subheading}>Work Completed</div>
            </div>

            <div className={styles.box}>
              <Image src={isOnTrack ? "/happy.png" : "/sad.png"} alt={isOnTrack ? "Happy" : "Sad"} width="90" height="90" />
              <br />
              <div className={styles.subheading}>{isOnTrack ? "You are on track!" : "Get back on track!"}</div>
            </div>

            <div className={styles.box}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>{nextDeadline?.toLocaleDateString("en-GB") || "No deadlines"}</h3>
              <br />
              <div className={styles.subheading}>Next Subtask Deadline</div>
            </div>
          </div>

          <div className={styles.box3}>
            <div className={styles.courseworkProgressBox}>
              <h3 className={styles.heading3}>Coursework Progress</h3>
              <div className={`${styles.progressBarContainer} ${completedPercentage < 100 ? styles.onTime : ""}`}>
                <div className={styles.progressBar} style={{ width: `${completedPercentage}%` }}></div>
              </div>
            </div>

            <hr style={{ width: "99.5%", marginLeft: "0" }} />

            {/* Group subtasks into insideBox3 divs based on the max of 3 per row */}
            {courseworkWeeks.flatMap(week => week.subtasks).reduce((acc, subtask, index) => {
              if (index % 3 === 0) {
                acc.push([]); // Start a new row
              }
              acc[acc.length - 1].push(subtask); // Add subtask to the current row
              return acc;
            }, []).map((subtaskRow, rowIndex) => (
              <div key={rowIndex} className={styles.insideBox3}>
                {subtaskRow.map((subtask) => (
                  <div key={subtask.id} className={`${styles.boxCourse} ${completedTasks ? styles.onTrack : styles.noWork}`}>
                    <div className={styles.first}>
                      <p className={styles.subheading2}>{subtask.text}</p>
                      <p className={styles.text}>Due on {subtask.dueDate.toLocaleDateString('en-GB')}</p>
                    </div>
                    <div className={styles.third}>
                      <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                      <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".pdf"
          onChange={handleFileChange}
        />

        <Footer />
      </div>
    </div>
  );
}
