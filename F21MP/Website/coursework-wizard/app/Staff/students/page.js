"use client";

import { useState } from 'react';
import StaffMenu from "../staff_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../staff_notification";
import Link from "next/link";

export default function Students() {

  return (
    <div className={styles.container}>
      <StaffMenu/>

      <div className={styles.studentsPage}>

        <div className={styles.header}>
          <h1 className={styles.heading}>Students</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>

          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
            
          </div>
        
        </div>

        <Footer/>
        
      </div>
      
    </div>
  );
}