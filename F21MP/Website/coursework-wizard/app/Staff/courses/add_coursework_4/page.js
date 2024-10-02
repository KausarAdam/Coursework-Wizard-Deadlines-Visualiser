"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";


export default function AddCoursework() {

  const router = useRouter();
  
  const handleSubmit = async (e) => {
    router.push("/Staff/timeline");
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
            <div className={styles.heading3}>Coursework Added</div>
            <br/><br/>
            <button onClick={handleSubmit} className={styles.button}>View<br/>Timeline</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
