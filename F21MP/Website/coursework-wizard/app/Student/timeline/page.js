"use client";

import { useState, useEffect } from "react";
import StudentMenu from "../student_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../student_notification";

export default function Timeline() {

  return (
    <div className={styles.container}>
      <StudentMenu />

      <div className={styles.timelinePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Timeline</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
