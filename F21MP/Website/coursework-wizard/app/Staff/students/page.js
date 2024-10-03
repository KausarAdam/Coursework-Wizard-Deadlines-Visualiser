"use client";

import { useState } from "react";
import StaffMenu from "../staff_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../staff_notification";

// Example data
const studentData = [
  { id: 1, name: "Selena Gomez", courseName: "F21SF", coursework: "Coursework 1", status: "Completed", completedSubtasks: 5, remainingSubtasks: 0 },
  { id: 1, name: "Selena Gomez", courseName: "F21SF", coursework: "Coursework 2", status: "In Progress", completedSubtasks: 3, remainingSubtasks: 2 },
  { id: 2, name: "Justin Timberlake", courseName: "F21SF", coursework: "Coursework 1", status: "In Progress", completedSubtasks: 3, remainingSubtasks: 2 },
  { id: 2, name: "Justin Timberlake", courseName: "F21SF", coursework: "Coursework 2", status: "No Submission", completedSubtasks: 0, remainingSubtasks: 5 },
  { id: 3, name: "Charles Dickens", courseName: "F21SF", coursework: "Coursework 1", status: "No Submission", completedSubtasks: 0, remainingSubtasks: 5 },
  { id: 3, name: "Charles Dickens", courseName: "F21SF", coursework: "Coursework 2", status: "In Progress", completedSubtasks: 2, remainingSubtasks: 3 },
  { id: 4, name: "Mona Lisa", courseName: "F21AD", coursework: "Coursework 1", status: "Completed", completedSubtasks: 6, remainingSubtasks: 0 },
  { id: 4, name: "Mona Lisa", courseName: "F21AD", coursework: "Coursework 2", status: "In Progress", completedSubtasks: 4, remainingSubtasks: 2 },
  { id: 5, name: "Victoria Justice", courseName: "F21AD", coursework: "Coursework 1", status: "Completed", completedSubtasks: 5, remainingSubtasks: 0 },
  { id: 5, name: "Victoria Justice", courseName: "F21AD", coursework: "Coursework 2", status: "No Submission", completedSubtasks: 0, remainingSubtasks: 5 },
  { id: 6, name: "Elvis Presley", courseName: "F21SF", coursework: "Coursework 1", status: "Completed", completedSubtasks: 5, remainingSubtasks: 0 },
  { id: 6, name: "Elvis Presley", courseName: "F21SF", coursework: "Coursework 2", status: "In Progress", completedSubtasks: 3, remainingSubtasks: 2 },
  { id: 7, name: "Agatha Christie", courseName: "F21AD", coursework: "Coursework 1", status: "Completed", completedSubtasks: 5, remainingSubtasks: 0 },
  { id: 7, name: "Agatha Christie", courseName: "F21AD", coursework: "Coursework 2", status: "Completed", completedSubtasks: 5, remainingSubtasks: 0 },
];

export default function Students() {
  const [selectedCourse, setSelectedCourse] = useState("F21SF - Coursework 1");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  // Extract course name and coursework from selectedCourse
  const [courseName, coursework] = selectedCourse.split(" - ");

  // Filter students based on selected course name
  const filteredStudents = studentData.filter(student => {
    const isAllStudents = coursework === "All Students"; // Check if "All Students" is selected
    const isCourseMatch = student.courseName === courseName;

    return (
      isCourseMatch && // Check for matching courseName
      (isAllStudents || student.coursework === coursework) && // If "All Students" is selected, include all; otherwise match coursework
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedStudents = filteredStudents.sort((a, b) => {
    const isAsc = sortOrder === "asc";
    if (sortField === "name") {
      return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === "coursework") {
      return isAsc ? a.coursework.localeCompare(b.coursework) : b.coursework.localeCompare(a.coursework);
    } else if (sortField === "completedSubtasks" || sortField === "remainingSubtasks") {
      return isAsc ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    }
    return isAsc ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
  });

  const getSortIndicator = (field) => {
    if (field === "id") {
      return ""; // No sorting arrow for the id column
    }
    if (field === "courseName") {
      return ""; // No sorting arrow for the course name column
    }
    if (sortField === field) {
      return sortOrder === "asc" ? " ▲" : " ▼";
    }
    return " ↕";
  };

  // Colour code the status
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return styles.statusCompleted;
      case "In Progress":
        return styles.statusInProgress;
      case "No Submission":
        return styles.statusNoSubmission;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <StaffMenu />

      <div className={styles.studentsPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Students</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
            <div className={styles.filterContainer}>
              <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
                <option value="F21SF - Coursework 1">F21SF - Coursework 1</option>
                <option value="F21SF - Coursework 2">F21SF - Coursework 2</option>
                <option value="F21AD - Coursework 1">F21AD - Coursework 1</option>
                <option value="F21AD - Coursework 2">F21AD - Coursework 2</option>
                <option value="F21SF - All Students">F21SF</option>
                <option value="F21AD - All Students">F21AD</option>
              </select>

              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
            </div>

            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")}>#{getSortIndicator("id")}<span className={styles.sortIndicator}></span></th>
                  <th onClick={() => handleSort("name")}>NAME<span className={styles.sortIndicator}>{getSortIndicator("name")}</span></th>
                  <th onClick={() => handleSort("courseName")}>COURSE NAME<span className={styles.sortIndicator}>{getSortIndicator("courseName")}</span></th>
                  <th onClick={() => handleSort("coursework")}>COURSEWORK<span className={styles.sortIndicator}>{getSortIndicator("coursework")}</span></th>
                  <th onClick={() => handleSort("status")}>STATUS<span className={styles.sortIndicator}>{getSortIndicator("status")}</span></th>
                  <th onClick={() => handleSort("completedSubtasks")}>COMPLETED<span className={styles.sortIndicator}>{getSortIndicator("completedSubtasks")}</span></th>
                  <th onClick={() => handleSort("remainingSubtasks")}>REMAINING<span className={styles.sortIndicator}>{getSortIndicator("remainingSubtasks")}</span></th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map(student => (
                  <tr key={`${student.id}-${student.coursework}`}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.courseName}</td>
                    <td>{student.coursework}</td>
                    <td className={getStatusClass(student.status)}>{student.status}</td>
                    <td>{student.completedSubtasks}</td>
                    <td>{student.remainingSubtasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
