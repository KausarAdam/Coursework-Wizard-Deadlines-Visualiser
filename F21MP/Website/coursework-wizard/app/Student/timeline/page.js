"use client";

import { useEffect, useState } from "react";
import StudentMenu from "../student_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../student_notification";
import { format, addDays, eachWeekOfInterval, endOfWeek, isToday as dateIsToday } from 'date-fns';

export default function Timeline() {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    // Generate weeks and days for each month
    const generateMonths = () => {
      const monthsData = [];

      const months = [
        { name: "September", start: new Date(2024, 8, 2), end: new Date(2024, 8, 29) },
        { name: "October", start: new Date(2024, 9, 1), end: new Date(2024, 9, 31) },
        { name: "November", start: new Date(2024, 10, 4), end: new Date(2024, 10, 30) },
        { name: "December", start: new Date(2024, 11, 2), end: new Date(2024, 11, 29) },
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

          <div className={styles.box}>
            {/* Gantt Chart Structure */}
            <div className={styles.ganttChart}>
              <div className={styles.monthsContainer}>
                {/* Render months */}
                {months.map((month, monthIndex) => (
                  <div key={monthIndex} className={styles.monthColumn}>
                    <div className={styles.monthHeader}>{month.name}</div>

                    {/* Render weeks */}
                    <div className={styles.weeksContainer}>
                      {month.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className={styles.weekColumn}>
                          <div className={styles.weekHeader}>
                            {`${format(week.start, "dd")} - ${format(week.end, "dd")}`}
                          </div>
                          <div className={styles.daysContainer}>
                            {/* Render days of the week */}
                            {week.days.map((day, dayIndex) => (
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
              {/* Lines in background for coursework */}
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
              <div className={styles.courseLine} style={{ backgroundColor: "#DEECE6" }}></div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
