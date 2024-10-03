"use client";

import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import DoughnutChartCompleted from "../../DoughnutChartCompleted";
import DoughnutChartInProgress from "../../DoughnutChartInProgress";
import DoughnutChartNoSubmission from "../../DoughnutChartNoSubmission";

export default function Coursework({ params }) {

  // Sample data
  const courseworkWeeks = [
    { week: 1, subtasks: [{ id: 1, text: "F21SF - Subtask 1.1", dueDate: new Date("2024-09-20") }] },
    { week: 2, subtasks: [{ id: 2, text: "F21SF - Subtask 2.1", dueDate: new Date("2024-09-27") }] },
    { week: 3, subtasks: [{ id: 3, text: "F21SF - Subtask 3.1", dueDate: new Date("2024-09-27") }] },
    { week: 4, subtasks: [{ id: 4, text: "F21SF - Subtask 4.1", dueDate: new Date("2024-09-27") }] },
    { week: 5, subtasks: [{ id: 5, text: "F21SF - Subtask 5.1", dueDate: new Date("2024-10-05") }] },
    { week: 6, subtasks: [{ id: 6, text: "F21SF - Subtask 6.1", dueDate: new Date("2024-10-12") }] },
  ];

  const handleClick = (filePath) => {
    window.open(filePath, "_blank");
  };

  // Determine next subtask deadline dynamically
  const nextDeadline = courseworkWeeks
    .flatMap(week => week.subtasks)
    .filter(subtask => new Date(subtask.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.dueDate;

  return (
    <div className={styles.container}>
      <StaffMenu />
      <div className={styles.courseworkPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>F21SF - Competitor Application</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />
          <h2 className={styles.subheading}>Coursework Details</h2>

          <div className={styles.box33}>
            <h3 className={styles.heading3}>Coursework Progress</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />
            <div className={styles.firstSetOfBoxes}>
              <div className={styles.box}>
                <p className={`${styles.subheadingGraphs} ${styles.subheadingGraphsGreen}`}>COMPLETED</p>
                <center><DoughnutChartCompleted/></center>
              </div>
              <div className={styles.box}>
                <p className={`${styles.subheadingGraphs} ${styles.subheadingGraphsOrange}`}>IN PROGRESS</p>
                <center><DoughnutChartInProgress/></center>
              </div>
              <div className={styles.box}>
                <p className={`${styles.subheadingGraphs} ${styles.subheadingGraphsRed}`}>NO SUBMISSION</p>
                <center><DoughnutChartNoSubmission/></center>
              </div>
            </div>
          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Coursework Breakdown</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />

            {courseworkWeeks.flatMap((week) => week.subtasks).reduce((acc, subtask, index) => 
            {
              if (index % 3 === 0) {
                acc.push([]); // Start a new row 
              }
              acc[acc.length - 1].push(subtask); // Add subtask to the current row
              return acc;
            }, []).map((subtaskRow, rowIndex) => (
              <div key={rowIndex} className={styles.insideBox3}>
                {subtaskRow.map((subtask) => (
                  <div key={subtask.id} className={styles.boxCourse} onClick={() => handleClick(subtask.filePath)}>
                    <div className={styles.first}>
                      <p className={styles.subheading2}>{subtask.text}</p>
                      <p className={styles.text}>Due on {subtask.dueDate.toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
