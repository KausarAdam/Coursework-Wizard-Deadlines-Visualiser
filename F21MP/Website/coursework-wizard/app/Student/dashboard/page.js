"use client";

import StudentMenu from "../student_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../student_notification";
import { useRouter } from 'next/navigation';

export default function Dashboard() {

  const router = useRouter();

  const goToCourseworkPage = () => {
    router.push('/Student/courses/coursework');
  };
  
  return (
    <div className={styles.container}>
      <StudentMenu/>

      <div className={styles.dashboardPage}>

        <div className={styles.header}>
          <h1 className={styles.heading}>Student Dashboard</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>

          <hr style={{ width: "100.5%", marginLeft: "0" }} />
        
          <h2 className={styles.subheading}>Hello, John Doe!</h2>

          <div className= {styles.firstSetOfBoxes}>

            <div className={styles.box}>
              <h3 className={styles.heading3}>Important Announcement</h3>
              <hr></hr>
              <div className={styles.subheading}>Announcement Details</div>
            </div>

            <div className={styles.box2}>
              <h3 className={`${styles.heading3} ${styles.heading33}`}>24th September</h3>
              <br></br>
              <div className={styles.subheading}>Next Subtask Deadline</div>
            </div>

          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Upcoming Coursework</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />
            <div className= {styles.secondSetOfBoxes}>
              <div className={styles.box4} onClick={goToCourseworkPage} style={{border: '5px solid #BEDFE4', '--border-color': '#BEDFE4'}}>
                <div className={`${styles.subheading} ${styles.subheading2}`}>Competitor Application</div>
                <div className={styles.text}>F21SF - Software Engineering Foundations</div>
                <div className={styles.text}>Due on Tuesday, 21st October</div>
              </div>
              <div className={styles.box4} onClick={goToCourseworkPage} style={{border: '5px solid #D8BFEA', '--border-color': '#D8BFEA'}}>
                <div className={`${styles.subheading} ${styles.subheading2}`}>Relational Databases</div>
                <div className={styles.text}>F21DF - Database and Information Systems</div>
                <div className={styles.text}>Due on Saturday, 26th October</div>
              </div>
            </div>

            <div className= {styles.secondSetOfBoxes}>
              <div className={styles.box4} onClick={goToCourseworkPage} style={{border: '5px solid #E8EDC1', '--border-color': '#E8EDC1'}}>
                <div className={`${styles.subheading} ${styles.subheading2}`}>John Lewis</div>
                <div className={styles.text}>F21EC - E-Commerce</div>
                <div className={styles.text}>Due on Wednesday, 23rd October</div>
              </div>
              <div className={styles.box4} onClick={goToCourseworkPage} style={{border: '5px solid #ECC2D1', '--border-color': '#ECC2D1'}}>
                <div className={`${styles.subheading} ${styles.subheading2}`}>Application Design</div>
                <div className={styles.text}>F21AD - Advanced Interaction Design</div>
                <div className={styles.text}>Due on Sunday, 27th October</div>
              </div>
            </div>
          </div>
        
        </div>

        <Footer/>
        
      </div>
      
    </div>
  );
}