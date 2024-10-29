"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from 'next/navigation';

// Get today's date formatted as YYYY-MM-DD for date inputs
const today = new Date();

export default function AddCoursework({ params }) {

  const searchParams = useSearchParams();
  const courseworkName = searchParams.get('courseworkName');
  const submissionDate = searchParams.get('date');
  const courseworkDetails = searchParams.get('details');

  // Convert submissionDate to a Date object
  const submissionDateObj = new Date(submissionDate);

  const [subtaskTotal, setSubtaskTotal] = useState("");
  const [subtaskDependent, setSubtaskDependent] = useState("");
  const [subtaskIndependent, setSubtaskIndependent] = useState("");
  const [dependentSubtasks, setDependentSubtasks] = useState([]);
  const [independentSubtaskRow, setIndependentSubtaskRow] = useState({
    name: '',
    weight: '',
    from: null,
    to: null,
    attachment: null, 
    fileNameInd: ''
  });

  const router = useRouter();

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-11, so add 1) and pad with zero
    const year = date.getFullYear(); // Get year
    return `${day}/${month}/${year}`; // Return formatted date
  }

  const moveUp = (index) => {
    if (index === 0) return; // Prevent moving the first item up
    const newSubtasks = [...dependentSubtasks];
    [newSubtasks[index - 1], newSubtasks[index]] = [newSubtasks[index], newSubtasks[index - 1]];
    setDependentSubtasks(newSubtasks);
  };

  const moveDown = (index) => {
    if (index === dependentSubtasks.length - 1) return; // Prevent moving the last item down
    const newSubtasks = [...dependentSubtasks];
    [newSubtasks[index], newSubtasks[index + 1]] = [newSubtasks[index + 1], newSubtasks[index]];
    setDependentSubtasks(newSubtasks);
  };

  const handleDependentChange = (e) => {
    const value = e.target.value;
  
    // Check if the input is a valid number and within the range of 0 to 6
    if (value >= 0 && value <= 6) {
      const currentSubtasks = [...dependentSubtasks];
      
      // Save existing subtasks before updating
      const newSubtasks = Array.from({ length: value }, (_, index) => {
        if (index < currentSubtasks.length) {
          // Keep existing subtask data if within bounds
          return currentSubtasks[index];
        }
        // Return a new empty subtask if new length exceeds current
        return {
          name: "",
          weight: "",
          from: "",
          to: "",
          attachment: null,
        };
      });
  
      setSubtaskDependent(value);
      setDependentSubtasks(newSubtasks);
    } else {
      window.alert("Dependent subtasks must be between 0 and 6.");
    }
  };
  

  const handleDeleteIndependentSubtask = () => {
    setIndependentSubtaskRow({
      name: "",
      weight: "",
      from: "",
      to: "",
      attachment: null,
    });
    setSubtaskIndependent("0"); // Set the total number of independent subtasks to 0
  };

  const handleInputChange = (index, field, value) => {
    const newSubtasks = [...dependentSubtasks];
    // If the field is 'attachment', store the file name
    if (field === 'attachment') {
      newSubtasks[index][field] = value; // Store the file object
      newSubtasks[index].fileName = value.name; // Store the file name separately
    } else {
        newSubtasks[index][field] = value; // For other fields
    }
    setDependentSubtasks(newSubtasks);
  };

  const handleDeleteRow = (index) => {
    const newSubtasks = dependentSubtasks.filter((_, i) => i !== index);
    setDependentSubtasks(newSubtasks);
    setSubtaskDependent(newSubtasks.length); // Update the dependent count
  };

  const handleIndependentChange = (e) => {
    const value = e.target.value;
  
    // Check if the input is either "0" or "1"
    if (value === "0" || value === "1" || value === "") {
      setSubtaskIndependent(value);
    } else {
      window.alert("Independent subtasks must be either 0 or 1.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!subtaskTotal || subtaskDependent === "" || !subtaskIndependent) {
      window.alert("Total, dependent, and independent subtasks are required.");
      return;
    }
  
    // Limit total subtasks to 6
    if (Number(subtaskTotal) > 6) {
      window.alert("Total subtasks cannot exceed 6.");
      return;
    }
  
    if (subtaskIndependent < 0 || subtaskIndependent > 1) {
      window.alert("Independent subtasks must be either 0 or 1.");
      return;
    }
  
    // Check if total subtasks equal dependent + independent
    const totalSubtasks = Number(subtaskDependent) + Number(subtaskIndependent);
    if (totalSubtasks !== Number(subtaskTotal)) {
      window.alert("Total subtasks must equal the sum of dependent and independent subtasks.");
      return;
    }
  
    // Validate each dependent subtask field
    for (let i = 0; i < dependentSubtasks.length; i++) {
      const subtask = dependentSubtasks[i];
      if (!subtask.name || !subtask.weight || !subtask.from || !subtask.to || !subtask.attachment) {
        window.alert(`All fields for dependent subtask are required.`);
        return;
      }
  
      // Check if 'from' date is older than 'to' date
      if (new Date(subtask.from) >= new Date(subtask.to)) {
        window.alert("The 'From' date for dependent subtasks must be earlier than the 'To' date.");
        return;
      }
  
      // Ensure neither date can be before today
      if (new Date(subtask.from) < today || new Date(subtask.to) < today) {
        window.alert("Dependent subtask dates cannot be before today.");
        return;
      }

      // Ensure both 'from' and 'to' dates are before `submissionDate`
      if (new Date(subtask.from) >= submissionDateObj || new Date(subtask.to) >= submissionDateObj) {
        const formattedSubmissionDate = formatDate(submissionDateObj);
        window.alert(`Subtask dates must be before the submission date ${formattedSubmissionDate}.`);
        return;
      }
    }

    // Check for overlapping dependent subtasks
    for (let i = 0; i < dependentSubtasks.length; i++) {
      const subtaskA = dependentSubtasks[i];
      for (let j = i + 1; j < dependentSubtasks.length; j++) {
          const subtaskB = dependentSubtasks[j];

          // Check if the 'from' date of subtask A is before the 'to' date of subtask B
          // and vice versa, indicating an overlap
          if (new Date(subtaskA.from) < new Date(subtaskB.to) && new Date(subtaskB.from) < new Date(subtaskA.to)) {
              window.alert("Dependent subtasks cannot overlap in their date ranges.");
              return;
          }
      }
    }
  
    // Validate independent subtask fields if it exists
    if (subtaskIndependent === "1") {
      const independentSubtask = independentSubtaskRow;
      if (!independentSubtask.name || !independentSubtask.weight || !independentSubtask.from || !independentSubtask.to || !independentSubtask.attachment) {
        window.alert("All fields for the independent subtask are required.");
        return;
      }
  
      // Check if 'from' date is older than 'to' date
      if (new Date(independentSubtask.from) >= new Date(independentSubtask.to)) {
        window.alert("The 'From' date for the independent subtask must be earlier than the 'To' date.");
        return;
      }
  
      // Ensure neither date can be before today
      if (new Date(independentSubtask.from) < today || new Date(independentSubtask.to) < today) {
        window.alert("Independent subtask dates cannot be before today.");
        return;
      }

      // Ensure both 'from' and 'to' dates are before `submissionDate`
      if (new Date(independentSubtask.from) >= submissionDateObj || new Date(independentSubtask.to) >= submissionDateObj) {
        const formattedSubmissionDate = formatDate(submissionDateObj);
        window.alert(`Subtask dates must be before the submission date ${formattedSubmissionDate}.`);
        return;
      }
    }
  
    // Adjust validation based on the independent subtask count
    const dependentLimit = subtaskIndependent === "1" ? 5 : 6;
    if (subtaskDependent > dependentLimit) {
      window.alert(`Dependent subtasks cannot exceed ${dependentLimit}.`);
      return;
    }
  
    if (totalSubtasks > 6) {
      window.alert("The sum of dependent and independent subtasks must equal 6 or less.");
      return;
    }

    // Collect the dependent and independent subtask data
    const dependentSubtasksData = dependentSubtasks.map(subtask => ({
      name: subtask.name,
      weight: subtask.weight,
      from: subtask.from,
      to: subtask.to,
      attachment: subtask.attachment,
    }));

    const independentSubtaskData = {
      name: independentSubtaskRow.name,
      weight: independentSubtaskRow.weight,
      from: independentSubtaskRow.from,
      to: independentSubtaskRow.to,
      attachment: independentSubtaskRow.attachment,
      fileNameInd: independentSubtaskRow.fileNameInd
    };
    
    const fileNames = dependentSubtasks.map(subtask => subtask.fileName || 'No file provided');

    // Manually append query params to the URL
    router.push(
      `/Staff/courses/add_coursework_3?` +
      `courseworkName=${encodeURIComponent(courseworkName)}&` +
      `date=${encodeURIComponent(new Date(submissionDate).toISOString())}&` +
      `details=${encodeURIComponent(courseworkDetails)}&` +
      `subtaskTotal=${encodeURIComponent(subtaskTotal)}&` +
      `subtaskDependent=${encodeURIComponent(subtaskDependent)}&` +
      `dependentSubtasks=${encodeURIComponent(JSON.stringify(dependentSubtasksData))}&` +
      `subtaskIndependent=${encodeURIComponent(subtaskIndependent)}&` +
      `independentSubtask=${encodeURIComponent(JSON.stringify(independentSubtaskData))}&` +
      `fileNames=${encodeURIComponent(JSON.stringify(fileNames))}&` +
      `fileNameInd=${encodeURIComponent(JSON.stringify(independentSubtaskRow.fileNameInd))}&`
    );
  };
  
  
  const handleBack = () => {
    router.push("/Staff/courses/course");
  };

  return (
    <div className={styles.container}>
      <StaffMenu />

      <div className={styles.addCourseworkPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>F21SF - Software Engineering</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
            <div className={styles.subheading}>Total Number of Subtasks</div>
            <input
              type="number"
              placeholder="Enter total number of subtasks here"
              value={subtaskTotal}
              onChange={(e) => setSubtaskTotal(e.target.value)}
              className={styles.inputField}
              required
              max="7" // Limit the input to a maximum of 7
            />
            
            <div className={styles.subheading}>Total Number of Dependent Subtasks</div>
            <input
              type="number"
              placeholder="Enter total number of dependent subtasks here"
              value={subtaskDependent} // Keep this to control the value of the input
              onChange={handleDependentChange}
              className={styles.inputField}
              required
              min="0" // Set minimum value
              max="6" // Set maximum value
            />
            
            {dependentSubtasks.length > 0 && (
              <div className={styles.draggableContainer}>
                {dependentSubtasks.map((subtask, index) => (
                  <div key={index} className={styles.subtaskRow}>
                    <button onClick={() => moveUp(index)} className={styles.arrowButton}>
                      <svg width="15" height="15" viewBox="0 0 24 24">
                        <path d="M12 2L2 12h5v8h10v-8h5L12 2z" fill="currentColor" />
                      </svg>
                    </button>
                    <button onClick={() => moveDown(index)} className={styles.arrowButton}>
                      <svg width="15" height="15" viewBox="0 0 24 24">
                        <path d="M12 22l10-10h-5v-8H7v8H2l10 10z" fill="currentColor" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Subtask Name"
                      value={subtask.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className={`${styles.inputField2} ${styles.inputName}`}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Weight"
                      value={subtask.weight}
                      onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                      className={`${styles.inputField2} ${styles.inputWeight}`}
                      required
                    />
                    <DatePicker
                      selected={subtask.from ? new Date(subtask.from) : null}
                      onChange={(date) => handleInputChange(index, "from", date)}
                      minDate={new Date()} // Prevent selection of past dates
                      placeholderText="From (date)"
                      className={`${styles.inputField2} ${styles.inputDate}`}
                      portalId="date-picker-portal" // Use portal to render above other elements
                      required
                    />
                    <DatePicker
                      selected={subtask.to ? new Date(subtask.to) : null}
                      onChange={(date) => handleInputChange(index, "to", date)}
                      minDate={new Date()} // Prevent selection of past dates
                      placeholderText="To (date)"
                      className={`${styles.inputField2} ${styles.inputDate}`}
                      portalId="date-picker-portal" // Use portal to render above other elements
                      required
                    />
                    <input
                      type="file"
                      onChange={(e) => handleInputChange(index, 'attachment', e.target.files[0])}
                      className={`${styles.inputField2} ${styles.inputFile}`}
                      required
                    />
                    <button onClick={() => handleDeleteRow(index)} className={styles.deleteButton}>-</button>
                  </div>
                ))}
              </div>
            )}

            <div className={`${styles.subheading} ${styles.subheadingMargin}`}>Total Number of Independent Subtasks</div>
            <input
              type="number"
              placeholder="Enter total number of independent subtasks here (0 or 1)"
              value={subtaskIndependent}
              onChange={handleIndependentChange}
              className={styles.inputField}
              required
              min="0"
              max="1"
            />

            {subtaskIndependent === "1" && (
              <div className={styles.subtaskRow2}>
                <input
                  type="text"
                  placeholder="Independent Subtask Name"
                  value={independentSubtaskRow.name}
                  onChange={(e) => setIndependentSubtaskRow({ ...independentSubtaskRow, name: e.target.value })}
                  className={`${styles.inputField2} ${styles.inputName2}`}
                  required
                />
                <input
                  type="number"
                  placeholder="Weight"
                  value={independentSubtaskRow.weight}
                  onChange={(e) => setIndependentSubtaskRow({ ...independentSubtaskRow, weight: e.target.value })}
                  className={`${styles.inputField2} ${styles.inputWeight}`}
                  required
                />
                <DatePicker
                  selected={independentSubtaskRow.from ? new Date(independentSubtaskRow.from) : null}
                  onChange={(date) => setIndependentSubtaskRow({ ...independentSubtaskRow, from: date })}
                  minDate={today} // Prevent selection of past dates
                  placeholderText="From (date)"
                  className={`${styles.inputField2} ${styles.inputDate}`}
                  required
                  portalId="date-picker-portal" // Use portal to render above other elements
                  popperPlacement = "top"
                />
                <DatePicker
                  selected={independentSubtaskRow.to ? new Date(independentSubtaskRow.to) : null}
                  onChange={(date) => setIndependentSubtaskRow({ ...independentSubtaskRow, to: date })}
                  minDate={today} // Prevent selection of past dates
                  placeholderText="To (date)"
                  className={`${styles.inputField2} ${styles.inputDate}`}
                  required
                  portalId="date-picker-portal" // Use portal to render above other elements
                  popperPlacement = "top"
                />
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setIndependentSubtaskRow({
                      ...independentSubtaskRow,
                      attachment: file,
                      fileNameInd: file ? file.name : '' // Store the file name
                    });
                  }}
                  className={`${styles.inputField2} ${styles.inputFile}`}
                  required
                />
                <button onClick={handleDeleteIndependentSubtask} className={styles.deleteButton}>-</button>
              </div>
            )}

            <div className={styles.buttonContainer}>
              <button onClick={handleBack} className={styles.button}>Cancel</button>
              <button onClick={handleSubmit} className={styles.button}>Next</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
