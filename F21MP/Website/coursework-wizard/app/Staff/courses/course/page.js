"use client";

import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import Link from "next/link";

export default function Course({ params }) {
  const { courseId } = params;
  const router = useRouter();
  
  const handleSubmit = (courseworkFile, action) => {
    if (action === "delete") {
      console.log("Deleting coursework:", courseworkFile);
    }
  };

  return (
    <div className={styles.container}>
      <StaffMenu />

      <div className={styles.coursePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>F21SF - Software Engineering</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <h2 className={styles.subheading}>Course Details</h2>

          <div className={styles.box}>
            <div className={styles.insideBox}>
              <h3 className={styles.heading3}>Course Announcement</h3>
              <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>+ New</button>
            </div>
            <hr />
            <div className={styles.subheading}>Announcement Details</div>
          </div>

          <div className={styles.box3}>
            <div className={styles.insideBox3}>
              <h3 className={styles.heading3}>Coursework</h3>
              <button onClick={() => handleSubmit("/path/to/pdf")} className={styles.button}>+ New</button>
            </div>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />
            <div className={styles.boxCourse}>
              <div className={styles.first}>
                <p className={styles.subheading2}>Competitor Application</p>
                <p className={styles.text}>Details</p>
                <p className={styles.text}>Due on Tuesday, 21st October</p>
              </div>
              <div className={styles.third}>
                <Link href={`/Staff/courses/coursework`} className={styles.Link}>
                  <button className={styles.button}>View</button>
                </Link>
                <button onClick={() => handleSubmit("/path/to/pdf", "delete")} className={styles.button}>Delete</button>
              </div>
            </div>

            <div className={styles.boxCourse}>
              <div className={styles.first}>
                <p className={styles.subheading2}>Application GUI</p>
                <p className={styles.text}>Details</p>
                <p className={styles.text}>Due on Tuesday, 26th November</p>
              </div>
              <div className={styles.third}>
                <Link href={`/Staff/courses/coursework`} className={styles.Link}>
                  <button className={styles.button}>View</button>
                </Link>
                <button onClick={() => handleSubmit("/path/to/pdf", "delete")} className={styles.button}>Delete</button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
