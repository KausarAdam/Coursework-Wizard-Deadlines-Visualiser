import StudentMenu from "../student_menu";
import styles from "./page.module.css";

export default function Dashboard() {
    return (
      <div className={styles.container}>
        <StudentMenu/>

        <div className={styles.dashboardPage}>
          <h1 className={styles.heading}>Dashboard</h1>

          <hr></hr>
        
          <h2 className={styles.subheading}>Hello, John Doe!</h2>

          <div className={styles.box}></div>

        </div>
        
      </div>
    );
  }