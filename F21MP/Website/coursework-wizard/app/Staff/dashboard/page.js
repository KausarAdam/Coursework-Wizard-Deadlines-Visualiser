import StaffMenu from "../staff_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../staff_notification";

export default function Dashboard() {
    return (
      <div className={styles.container}>
        <StaffMenu/>

        <div className={styles.dashboardPage}>

          <div className={styles.header}>
            <h1 className={styles.heading}>Dashboard</h1>
            <Notification />
          </div>

          <div className={styles.withoutFooter}>

            <hr style={{ width: "100.5%", marginLeft: "0" }} />
          
            <h2 className={styles.subheading}>Hello, Professor John Doe!</h2>

            <div className= {styles.firstSetOfBoxes}>

              <div className={styles.box}>
                <h3 className={styles.heading3}>Students with zero submissions: 14</h3>
              </div>

              <div className={styles.box2}>
                <h3 className={styles.heading3}>24th September</h3>
                <br></br>
                <div className={styles.subheading}>Next Subtask Deadline</div>
              </div>

            </div>

            <div className={styles.box3}>
              <h3 className={styles.heading3}>Coursework Submissions</h3>
              <hr style={{ width: "99.5%", marginLeft: "0" }} />
              <div className={styles.graphBoxMain}>
                <div className={styles.graphBox}>
                  <div className={styles.subheadingSmall}>Competitor Application</div>
                  <div className={styles.subheadingSmaller}>F21SF - Software Engineering</div>
                </div>

                <div className={styles.graphBox}>
                  <div className={styles.subheadingSmall}>Competitor Application</div>
                  <div className={styles.subheadingSmaller}>F21SF - Software Engineering</div>
                </div>

                <div className={styles.graphBox}>
                  <div className={styles.subheadingSmall}>Competitor Application</div>
                  <div className={styles.subheadingSmaller}>F21SF - Software Engineering</div>
                </div>

                <div className={styles.graphBox}>
                  <div className={styles.subheadingSmall}>Competitor Application</div>
                  <div className={styles.subheadingSmaller}>F21SF - Software Engineering</div>
                </div>
              </div>
            </div>
          
          </div>

          <Footer/>
          
        </div>
        
      </div>
    );
  }