import StudentMenu from "../student_menu";
import styles from "./page.module.css";

export default function Dashboard() {
    return (
      <div className={styles.container}>
        <StudentMenu/>

        <div className={styles.dashboardPage}>
          <h1 className={styles.heading}>Dashboard</h1>

          <hr style={{ width: "98.2%", marginLeft: "0" }} />
        
          <h2 className={styles.subheading}>Hello, John Doe!</h2>

          <div className= {styles.firstSetOfBoxes}>

            <div className={styles.box}>
              <h3 className={styles.heading3}>Important Announcement</h3>
              <hr></hr>
              <div className={styles.subheading}>Announcement Details</div>
            </div>

            <div className={styles.box2}>
              <h3 className={styles.heading3}>24th September</h3>
              <br></br>
              <div className={styles.subheading}>Next Subtask Deadline</div>
            </div>

          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Upcoming Coursework</h3>
            <hr style={{ width: "98.2%", marginLeft: "0" }} />
            <div className= {styles.secondSetOfBoxes}>
              <div className={styles.box4}>
                <div className={`${styles.subheading} ${styles.subheading2}`}>Competitor Application</div>
                <div className={styles.text}>F21SF - Software Engineering Foundations</div>
                <div className={styles.text}>Due on Tuesday, 21st October</div>
              </div>
              <div className={styles.box4}>
                <div className={`${styles.subheading} ${styles.subheading2}`}>Competitor Application</div>
                <div className={styles.text}>F21SF - Software Engineering Foundations</div>
                <div className={styles.text}>Due on Tuesday, 21st October</div>
              </div>
            </div>

            <div className= {styles.secondSetOfBoxes}>
              <div className={styles.box4}>
                <div className={`${styles.subheading} ${styles.subheading2}`}>Competitor Application</div>
                <div className={styles.text}>F21SF - Software Engineering Foundations</div>
                <div className={styles.text}>Due on Tuesday, 21st October</div>
              </div>
              <div className={styles.box4}>
                <div className={`${styles.subheading} ${styles.subheading2}`}>Competitor Application</div>
                <div className={styles.text}>F21SF - Software Engineering Foundations</div>
                <div className={styles.text}>Due on Tuesday, 21st October</div>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    );
  }