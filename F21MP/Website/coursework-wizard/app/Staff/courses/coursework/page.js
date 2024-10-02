"use client";

import { useRouter } from "next/navigation";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import { useRef } from "react";
import Image from "next/image";

export default function Coursework({ params }) {

  return (
    <div className={styles.container}>
      <StaffMenu />
      <div className={styles.courseworkPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>F21SF - Competitor Application</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />
          <h2 className={styles.subheading}>Coursework Details</h2>

            

          <div className={styles.box33}>
            <h3 className={styles.heading3}>Coursework Progress</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />
              <div className={styles.firstSetOfBoxes}>
                <div className={styles.box}>
                </div>

                <div className={styles.box}>
                </div>

                <div className={styles.box}>
                </div>
              </div>
          </div>

          <div className={styles.box3}>
            <h3 className={styles.heading3}>Coursework Progress</h3>
            <hr style={{ width: "99.5%", marginLeft: "0" }} />

          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
