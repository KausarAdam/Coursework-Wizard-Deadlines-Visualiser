"use client";

import { useEffect, useState, useRef } from "react";
import StudentMenu from "../student_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../student_notification";
import { format, addDays, eachWeekOfInterval, endOfWeek, isToday as dateIsToday } from 'date-fns';

export default function Timeline() {
  const [months, setMonths] = useState([]);
  const [todayPosition, setTodayPosition] = useState(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Generate weeks and days for each month
    const generateMonths = () => {
      const monthsData = [];

      const months = [
        { name: "September", monthLeft: 80, start: new Date(2024, 8, 2), end: new Date(2024, 8, 29) },
        { name: "October", monthLeft: 90, start: new Date(2024, 9, 1), end: new Date(2024, 9, 31) },
        { name: "November", monthLeft: 10, start: new Date(2024, 10, 4), end: new Date(2024, 10, 30) },
        { name: "December", monthLeft: 11, start: new Date(2024, 11, 2), end: new Date(2024, 11, 29) },
      ];

      months.forEach((month) => {
        const weeks = eachWeekOfInterval({
          start: month.start,
          end: month.end,
        }, { weekStartsOn: 1 }); // Week starts on Monday

        const formattedWeeks = weeks.map(weekStart => ({
          start: weekStart,
          end: endOfWeek(weekStart, { weekStartsOn: 1 }),
          days: Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
        }));

        monthsData.push({
          name: month.name,
          weeks: formattedWeeks,
        });
      });

      setMonths(monthsData);
    };

    generateMonths();
  }, []);

  // Function to check if a date is today
  const isToday = (date) => dateIsToday(date);

  useEffect(() => {
    if (timelineRef.current) {
      const todayElement = timelineRef.current.querySelector(`.${styles.todayCell}`);
      if (todayElement) {
        const position = todayElement.offsetLeft + todayElement.offsetWidth / 2;
        setTodayPosition(position);
      }
    }
  }, [months]);

  const subtasks = [
    { title: "ST 1", courseId: 1, start: new Date(2024, 8, 5), end: new Date(2024, 9, 10), color: styles.course1, type: 'dependent' },
    { title: "ST 2", courseId: 1, start: new Date(2024, 9, 11), end: new Date(2024, 9, 20), color: styles.course1, type: 'independent' },
    { title: "ST 3", courseId: 2, start: new Date(2024, 9, 5), end: new Date(2024, 9, 10), color: styles.course2, type: 'dependent' },
    { title: "ST 4", courseId: 2, start: new Date(2024, 9, 8), end: new Date(2024, 9, 12), color: styles.course2, type: 'independent' },
    { title: "ST 5", courseId: 3, start: new Date(2024, 10, 6), end: new Date(2024, 10, 10), color: styles.course3, type: 'independent' },
    { title: "ST 6", courseId: 4, start: new Date(2024, 11, 3), end: new Date(2024, 11, 18), color: styles.course4, type: 'dependent' },
    { title: "ST 7", courseId: 1, start: new Date(2024, 11, 3), end: new Date(2024, 11, 18), color: styles.course1, type: 'dependent' },
    { title: "ST 8", courseId: 1, start: new Date(2024, 10, 3), end: new Date(2024, 10, 18), color: styles.course1, type: 'dependent' },
    { title: "ST 8", courseId: 4, start: new Date(2024, 10, 3), end: new Date(2024, 10, 18), color: styles.course4, type: 'independent' },
    { title: "ST 8", courseId: 2, start: new Date(2024, 10, 3), end: new Date(2024, 10, 18), color: styles.course2, type: 'dependent' },
    { title: "ST 8", courseId: 2, start: new Date(2024, 10, 3), end: new Date(2024, 10, 18), color: styles.course2, type: 'independent' },
  ];

  // Function to calculate width of a subtask
  const calculateWidth = (subtask) => {
    const timelineStart = new Date(2024, 8, 2); // Starting date of the timeline
    const totalWidth = 100; // Total width of the timeline (in percentage)

    const duration = (subtask.end - subtask.start) / (1000 * 60 * 60 * 24); // Duration in days
    const totalDays = (new Date(2024, 11, 29) - timelineStart) / (1000 * 60 * 60 * 24); // Total days in the timeline

    // Calculate startOffset correctly to ensure it reflects the start month accurately
    const startOffset = ((subtask.start - timelineStart) / (1000 * 60 * 60 * 24)) / totalDays * 100; // Start offset in percentage
    // const leftValue = 0.8 * ((subtask.start - timelineStart) / (1000 * 60 * 60 * 24))
    // const startOffset = leftValue + 1.2;

    // Ensure that the width is always a positive value and capped by totalWidth
    const widthPercentage = Math.max(0, Math.min((duration / totalDays) * totalWidth, totalWidth)); // Width in percentage

    return { startOffset, widthPercentage };
  };

  // Function to organize subtasks into 8 course lines for 4 courses
  const organizeSubtasks = () => {
    const organizedSubtasks = Array.from({ length: 8 }, () => []);
    
    subtasks.forEach(subtask => {
      let weekIndex = -1;

      // Determine which week the subtask starts in
      months.forEach((month) => {
        month.weeks.forEach((week, index) => {
          if (subtask.start >= week.start && subtask.start <= week.end) {
            weekIndex = index;
          }
        });
      });

      // Check if weekIndex was found
      if (weekIndex === -1) return; // Skip if not found

      // Ensure courseId is valid
      const courseLineIndex = (subtask.courseId - 1) * 2 + (subtask.type === 'dependent' ? 0 : 1); // Assign based on dependency type
      if (courseLineIndex >= 0 && courseLineIndex < organizedSubtasks.length) {
        organizedSubtasks[courseLineIndex].push(subtask);
      } else {
        console.error(`Invalid courseLineIndex: ${courseLineIndex} for subtask: ${subtask.title}`);
      }
    });

    return organizedSubtasks;
  };
  

  const organizedSubtasks = organizeSubtasks();

  return (
    <div className={styles.container}>
      <StudentMenu />

      <div className={styles.timelinePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Timeline</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box} ref={timelineRef}>
            {/* Render the vertical line from the top to the todayCell */}
            {todayPosition !== null && (
              <div
                className={styles.verticalLine}
                style={{ left: `${todayPosition}px` }}
              />
            )}

            {/* Gantt Chart Structure */}
            <div className={styles.ganttChart}>

              {/* months */}
              <div className={styles.monthsContainer}>
                {months.map((month, monthIndex) => (
                  <div key={monthIndex} className={styles.monthColumn}>
                    <div className={styles.monthHeader}>{month.name}</div>

                    {/* weeks */}
                    <div className={styles.weeksContainer}>
                      {month.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className={styles.weekColumn}>
                          <div className={styles.weekHeader}>
                            {`${format(week.start, "dd")} - ${format(week.end, "dd")}`}
                          </div>

                          {/* days */}
                          <div className={styles.daysContainer}>
                            {week.days.map((day, dayIndex) => (
                              // get today
                              <div
                                key={dayIndex}
                                className={`${styles.dayCell} ${isToday(day) ? styles.todayCell : ""}`}
                              >
                                {format(day, "E").toUpperCase().charAt(0)} {/* Display day abbreviation */}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.courseLines}>
              {organizedSubtasks.map((tasks, index) => (
                <div key={index} className={styles.courseLine}>
                  {/* Subtasks with dynamic width based on duration */}
                  {tasks.map(subtask => {
                    const { startOffset, widthPercentage } = calculateWidth(subtask);
                    return (
                      <div
                        key={subtask.title}
                        className={`${styles.subTask} ${subtask.color}`}
                        style={{
                          left: `${startOffset}%`,
                          width: `${widthPercentage}%`,
                        }}
                      >
                        {subtask.title}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className={styles.courseNames}>
              <div className={`${styles.course} ${styles.course1}`}>Advanced Interaction Design</div>
              <div className={`${styles.course} ${styles.course2}`}>Database and Information Systems</div>
              <div className={`${styles.course} ${styles.course3}`}>E-Commerce</div>
              <div className={`${styles.course} ${styles.course4}`}>Software Engineering</div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
