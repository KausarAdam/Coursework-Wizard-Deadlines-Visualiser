"use client";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function Modal({ isOpen, onClose, subtask }) {
  const fileInputRef = useRef(null);
  const router = useRouter();

  // State to track the position of the modal
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  if (!isOpen || !subtask) return null;

  // Handle mouse down event to start dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Handle mouse move event to move the modal
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Trigger file input when "Resubmit" button is clicked
  const handleResubmitClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file explorer
    }
  };

  // Function to handle viewing
  const handleView = (path) => {
    window.open(path, '_blank');
  };

  // Mapping of courseId to course names
  const courseNames = {
    1: "Advanced Interaction Design - Coursework 1",
    2: "Advanced Interaction Design - Coursework 2",
    3: "Software Engineering - Coursework 1",
    4: "Software Engineering - Coursework 2"
  };

  // Get the course name based on the subtask's courseId
  const courseName = courseNames[subtask.coursework_id];

  return (
    <div className={styles.modalOverlay}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}>
      <div
        className={styles.modalPage}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onMouseDown={handleMouseDown}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h1 className={styles.heading}>{subtask.title}</h1>
        <hr style={{ width: "100.5%", marginLeft: "0" }} />
        <h2 className={styles.subheading}>Task for {courseName}</h2>
        <h2 className={styles.subheadingSmall}>Start Date: {format(subtask.start, 'dd/MM/yyyy')}</h2>
        <h2 className={styles.subheadingSmall}>End Date: {format(subtask.end, 'dd/MM/yyyy')}</h2>

        <div className={styles.buttonContainer}>
          <button onClick={() => handleView("/subtask_sample.pdf")} className={styles.button}>View Subtask</button>
          <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} /> {/* Hidden file input */}
        </div>
      </div>
    </div>
  );
}
