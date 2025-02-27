"use client";

import StaffMenu from "../staff_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../staff_notification";
import DoughnutChartF21SF1 from "../DoughnutChartF21SF1";
import DoughnutChartF21SF2 from "../DoughnutChartF21SF2";
// import DoughnutChartF21AD1 from "../DoughnutChartF2AD1";
// import DoughnutChartF21AD2 from "../DoughnutChartF2AD2";
import DoughnutChartF21AD1 from "../DoughnutChartF21AD1";
import DoughnutChartF21AD2 from "../DoughnutChartF21AD2";
import { useEffect, useState } from 'react';

// Create a legend component to display the same legend for all graphs
function DoughnutLegend() {
  return (
    <div className={styles.legendContainer}>
      <ul className={styles.legendList}>
        <li><span className={styles.legendColor1}></span> Completed</li>
        <li><span className={styles.legendColor2}></span> In Progress</li>
        <li><span className={styles.legendColor3}></span> Pending</li>
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const username = typeof window !== 'undefined' ? localStorage.getItem('staffID') : null; // Check if in the browser
  console.log(username);

  const [staffName, setStaffName] = useState("John Doe"); // Default name
  const [nextDeadline, setNextDeadline] = useState(null);
  const [nextCourseCode, setNextCourseCode] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // Using "en-GB" for dd/mm/yyyy format
  };

  useEffect(() => {
    const fetchStaffName = async () => {
      if (username) {
        const res = await fetch(`/api/getStaffName?username=${username}`);
        if (res.ok) {
          const data = await res.json();
          if (data.name) {
            setStaffName(data.name); // Set the staff's name
          }
        } else {
          console.error("Failed to fetch staff name");
        }
      }
    };

    const fetchNextDeadline = async () => {
      if (username) {
        try {
          const res = await fetch(`/api/getStaffSubtaskDeadline?username=${username}`);
          if (res.ok) {
            const subtasks = await res.json();
            if (subtasks && subtasks.end_date) {
              setNextDeadline(subtasks.end_date);
              setNextCourseCode(subtasks.course_code);
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

    fetchStaffName();
    fetchNextDeadline(); // call fetch functions
  }, [username]);




  return (
    <div className={styles.container}>
      <StaffMenu />

      <div className={styles.dashboardPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Instructor Dashboard</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />
          <h2 className={styles.subheading}>Hello, Professor {staffName}!</h2>

          <div className={styles.firstSetOfBoxes}>
            <div className={styles.box}>
              <h3 className={styles.heading3}>Students with zero submissions: 5</h3>
            </div>

            <div className={styles.box2}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>
                {nextDeadline ? formatDate(nextDeadline) : 'No upcoming deadlines'}
              </h3>
              <br />
              <div className={styles.subheading33}>{"Next Subtask Deadline for " + nextCourseCode}</div>
            </div>
          </div>

          <div className={styles.box3}>
            <div className={styles.submissionHeader}>
              <h3 className={styles.heading33}>Coursework Submissions</h3>
              <DoughnutLegend /> {/* Display the common legend next to the heading */}
            </div>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />

            <div className={styles.graphBoxMain}>
              <div className={styles.graphBox}>
                <DoughnutChartF21AD1 />
                <div className={styles.subheadingSmall}>Application Design</div>
                <div className={styles.subheadingSmaller}>F21AD - Advanced Interaction Design</div>
              </div>

              <div className={styles.graphBox}>
                <DoughnutChartF21SF1 />
                <div className={styles.subheadingSmall}>Competitor Application</div>
                <div className={styles.subheadingSmaller}>F21SF - Software Engineering</div>
              </div>

              <div className={styles.graphBox}>
                <DoughnutChartF21AD2 />
                <div className={styles.subheadingSmall}>Application Evaluation</div>
                <div className={styles.subheadingSmaller}>F21AD - Advanced Interaction Design</div>
              </div>

              <div className={styles.graphBox}>
                <DoughnutChartF21SF2 />
                <div className={styles.subheadingSmall}>Application GUI</div>
                <div className={styles.subheadingSmaller}>F21SF - Software Engineering</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
