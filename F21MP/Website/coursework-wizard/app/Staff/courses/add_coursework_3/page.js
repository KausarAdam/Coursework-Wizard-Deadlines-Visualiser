"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import { useSearchParams } from 'next/navigation';

export default function AddCoursework() {

  const searchParams = useSearchParams();
  const courseworkName = searchParams.get('courseworkName');
  const submissionDate = new Date(searchParams.get('date')); // Convert back to date object
  const courseworkDetails = searchParams.get('details');
  const subtaskTotal = searchParams.get('subtaskTotal');
  const subtaskDependent = searchParams.get('subtaskDependent');
  const dependentSubtasks = JSON.parse(decodeURIComponent(searchParams.get('dependentSubtasks') || '[]'));
  const subtaskIndependent = searchParams.get('subtaskIndependent');
  const independentSubtaskString = decodeURIComponent(searchParams.get('independentSubtask') || '{}');
  const independentSubtask = JSON.parse(independentSubtaskString);
  const fileNames = JSON.parse(decodeURIComponent(searchParams.get('fileNames') || '[]'));
  const fileNameInd = searchParams.get('fileNameInd');
  const courseCode = searchParams.get('courseCode');
  const courseName = searchParams.get('courseName');

  // Date formatting function
  const formatDate = (date) => {
    if (!date) return 'No date provided';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const courseworkData = {
      courseCode: courseCode,
      title: courseworkName,
      description: courseworkDetails,
      startDate: new Date(), // Use the current date
      endDate: submissionDate,
      courseworkSequence: 2,
    };
  
    const subtaskData = {
      courseCode: courseCode,
      courseworkId: courseCode === 'F21AD' ? 2 : 4,
      dependentSubtasks: dependentSubtasks.map((subtask, index) => ({
        subtask: `ST${index + 1}`,
        title: subtask.name,
        description: subtask.name,
        startDate: subtask.from,
        endDate: subtask.to,
        taskType: 'dependent',
        fileAttachment: `/${fileNames[index]}`,
        weight: subtask.weight,
        isLocked: 1,
      })),
      independentSubtask: subtaskIndependent === "1" ? {
        subtask: `ST${dependentSubtasks.length + 1}`,
        title: independentSubtask.name,
        description: independentSubtask.name,
        startDate: independentSubtask.from,
        endDate: independentSubtask.to,
        taskType: 'independent',
        fileAttachment: `/${fileNameInd}`,
        weight: independentSubtask.weight,
        isLocked: 1,
      } : null,
    };
  
    try {
      const response = await fetch('/api/addCoursework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseworkData, subtaskData }),
      });
  
      if (response.ok) {
        router.push(`/Staff/courses/add_coursework_4?courseCode=${courseCode}&courseName=${courseName}`);
      } else {
        console.error('Failed to add coursework');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  const handleBack = () => {
    router.push("/Staff/courses/course");
  };

  return (
    <div className={styles.container}>
      <StaffMenu />

      <div className={styles.addCourseworkPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>{courseCode} - {courseName}</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
            <div className={styles.headingBox}>
              <h3 className={`${styles.heading3} ${styles.heading4}`}>{courseworkName ? courseworkName : 'No name provided'}</h3>
              
              <div className={`${styles.subheading} ${styles.subheading2} ${styles.subheading3}`}>
                <span>Submission Date: </span>
                <span style={{ fontWeight: 'lighter' }}>{formatDate(submissionDate)}</span>
              </div>
            </div>
            <hr style={{ marginBottom: "20px" }} />

            <div className={styles.subheading}>
              <span>Coursework Details: </span>
              <span style={{ fontWeight: 'lighter' }}>{courseworkDetails ? courseworkDetails : 'No details provided'}</span>
            </div>

            <div className={styles.subheading}>
              <span>Total Number of Subtasks: </span>
              <span style={{ fontWeight: 'lighter' }}>{subtaskTotal ? subtaskTotal : 'Number not provided'}</span>
            </div>

            <div className={styles.subheading}>
              <span>Total Number of Dependent Subtasks: </span>
              <span style={{ fontWeight: 'lighter' }}>{subtaskDependent ? subtaskDependent : 'Number not provided'}</span>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Subtask</th>
                  <th>Weight</th>
                  <th>From</th>
                  <th>To</th>
                  <th>File Name</th>
                </tr>
              </thead>
              <tbody>
                {dependentSubtasks.length > 0 ? (
                  dependentSubtasks.map((subtask, index) => (
                    <tr key={index}>
                      <td>{subtask.name || 'No name provided'}</td>
                      <td>{subtask.weight || 'N/A'}</td>
                      <td>{formatDate(new Date(subtask.from)) || 'No date provided'}</td>
                      <td>{formatDate(new Date(subtask.to)) || 'No date provided'}</td>
                      <td>{'"' + fileNames[index] + '"' || 'No file provided'}</td> {/* Display the file name */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No dependent subtasks available.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className={styles.subheading}>
              <span>Total Number of Independent Subtasks: </span>
              <span style={{ fontWeight: 'lighter' }}>{subtaskIndependent ? subtaskIndependent : 'Number not provided'}</span>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Subtask</th>
                  <th>Weight</th>
                  <th>From</th>
                  <th>To</th>
                  <th>File Name</th>
                </tr>
              </thead>
              <tbody>
                {subtaskIndependent === "1" && independentSubtask.name ? (
                  <tr>
                    <td>{independentSubtask.name || 'No name provided'}</td>
                    <td>{independentSubtask.weight || 'N/A'}</td>
                    <td>{formatDate(new Date(independentSubtask.from)) || 'No date provided'}</td>
                    <td>{formatDate(new Date(independentSubtask.to)) || 'No date provided'}</td>
                    <td>{fileNameInd || 'No file provided'}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="5">No independent subtasks available.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className={styles.buttonContainer}>
              <button onClick={handleBack} className={styles.button}>Cancel</button>
              <button onClick={handleSubmit} className={styles.button}>Publish</button>
            </div>
          </div>
        </div>
      <Footer />
      </div>
    </div>
  );
}
