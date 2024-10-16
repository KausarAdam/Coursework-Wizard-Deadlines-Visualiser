"use client";

import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Profile() {
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  const [studentProfile, setStudentProfile] = useState({});

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await fetch(`/api/getStudentProfile?username=${username}`);
        const data = await response.json();

        if (data.length > 0) {
          const student = data[0]; // Access the first (and presumably only) object in the array
          setStudentProfile({
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            phone: student.phone,
            description: student.description,
            preferred_name: student.preferred_name,
            picture: student.picture,  //image path
          });
        }
      } catch (error) {
        console.error("Failed to fetch student:", error);
      }
    };

    if (username) {
      fetchStudentProfile();
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <StudentMenu />

      <div className={styles.profilePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Student Profile</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
            <div className={styles.firstColumn}>
              <div className={styles.circle}>
                {/* Use studentProfile.picture as the src */}
                <Image
                  src={studentProfile.picture || "/Black/account.png"}  // Fallback image
                  alt="Profile picture"
                  width="100"
                  height="100"
                  className={styles.profilePicture}
                />
              </div>
            </div>

            <div className={styles.secondColumn}>
              <div className={styles.name}>{studentProfile.first_name} {studentProfile.last_name}</div>
              <div className={styles.heading3}>Preferred Name</div>
              <div className={styles.subheading}>{studentProfile.preferred_name}</div>
              <div className={styles.heading3}>Contact Details</div>
              <div className={styles.subheading}>{studentProfile.email}</div>
              <div className={styles.heading3}>Biography</div>
              <div className={styles.subheading}>{studentProfile.description}</div>
              <div className={styles.socialMedia}>
                <a href="https://linkedin.com" target="_blank">
                  <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
                </a>
                <a href="https://instagram.com" target="_blank">
                  <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                </a>
                <a href="https://github.com" target="_blank">
                  <FontAwesomeIcon icon={faGithub} className={styles.icon} />
                </a>
              </div>
            </div>

            <div className={styles.thirdColumn}>
              <Link href="/Student/account/edit_profile" className={styles.Link}>
                <button className={styles.button}>Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
