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

          

          <div className= {styles.firstSetOfBoxes}>

            <div className={styles.box}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>75%</h3>
              <br/>
              <div className={styles.subheading}>Work Completed</div>
            </div>

            <div className={styles.box}>
              <Image src="/happy.png" alt="Happy" width="90" height="90"/>
              <br></br>
              <div className={styles.subheading}>You are on track!</div>
            </div>

            <div className={styles.box}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>24th September</h3>
              <br></br>
              <div className={styles.subheading}>Next Subtask Deadline</div>
            </div>

          </div>



          <div className={styles.box3}>
            <div className={styles.courseworkProgressBox}>
              <h3 className={styles.heading3}>Coursework Progress</h3>

              <div className={`${styles.progressBarContainer} ${styles.onTime}`}>
                <div className={styles.progressBar} style={{ width: '75%' }}></div>
              </div>
            </div>

            <hr style={{ width: "99.5%", marginLeft: "0" }} />



            <div className={styles.insideBox3}>
              <div className={`${styles.boxCourse} ${styles.onTrack}`}>
                <div className={styles.first}>
                  <p className={styles.subheading2}>Competitor Application</p>
                  <p className={styles.text}>Due on Tuesday, 21st October</p>
                </div>
                <div className={styles.third}>
                  <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                  <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
                </div>
              </div>

              <div className={`${styles.boxCourse} ${styles.onTrack}`}>
                <div className={styles.first}>
                  <p className={styles.subheading2}>Competitor Application</p>
                  <p className={styles.text}>Due on Tuesday, 21st October</p>
                </div>
                <div className={styles.third}>
                  <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                  <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
                </div>
              </div>

              <div className={`${styles.boxCourse} ${styles.onTrack}`}>
                <div className={styles.first}>
                  <p className={styles.subheading2}>Competitor Application</p>
                  <p className={styles.text}>Due on Tuesday, 21st October</p>
                </div>
                <div className={styles.third}>
                  <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                  <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
                </div>
              </div>

            </div>
            

            <div className={styles.insideBox3}>
              <div className={`${styles.boxCourse} ${styles.noWork}`}>
                <div className={styles.first}>
                  <p className={styles.subheading2}>Application GUI</p>
                  <p className={styles.text}>Due on Tuesday, 26th November</p>
                </div>
                <div className={styles.third}>
                  <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                  <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
                </div>
              </div>

              <div className={`${styles.boxCourse} ${styles.noWork}`}>
                <div className={styles.first}>
                  <p className={styles.subheading2}>Application GUI</p>
                  <p className={styles.text}>Due on Tuesday, 26th November</p>
                </div>
                <div className={styles.third}>
                  <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                  <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
                </div>
              </div>

              <div className={`${styles.boxCourse} ${styles.noWork}`}>
                <div className={styles.first}>
                  <p className={styles.subheading2}>Application GUI</p>
                  <p className={styles.text}>Due on Tuesday, 26th November</p>
                </div>
                <div className={styles.third}>
                  <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>View Subtask</button>
                  <button onClick={handleResubmitClick} className={styles.button}>Re/Submit</button>
                </div>
              </div>

            </div>



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
