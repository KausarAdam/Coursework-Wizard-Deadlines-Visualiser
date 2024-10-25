"use client";

import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faGithub, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Profile() {
  const username = typeof window !== 'undefined' ? localStorage.getItem('staffID') : null;
  const [staffProfile, setStaffProfile] = useState({});
  console.log(username)

  useEffect(() => {
    const fetchStaffProfile = async () => {
      try {
        const response = await fetch(`/api/getStaffProfile?username=${username}`);
        const data = await response.json();

        if (data.length > 0) {
          const staff = data[0]; // Access the first (and presumably only) object in the array
          setStaffProfile({
            first_name: staff.first_name,
            last_name: staff.last_name,
            email: staff.email,
            phone: staff.phone,
            description: staff.description,
            preferred_name: staff.preferred_name,
            picture: staff.picture,  //image path
          });
        }
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };

    if (username) {
      fetchStaffProfile();
      console.log("test");
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <StaffMenu />

      <div className={styles.profilePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Profile</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
            <div className={styles.firstColumn}>
              <div className={styles.circle}>
                <Image
                  src={staffProfile.picture || "/Black/account.png"}  // Fallback image
                  alt="Profile picture"
                  width="100"
                  height="100"
                  className={styles.profilePicture}
                />
              </div>
            </div>

            <div className={styles.secondColumn}>
              <div className={styles.name}>{staffProfile.first_name} {staffProfile.last_name}</div>
              <div className={styles.heading3}>Preferred Name</div>
              <div className={styles.subheading}>{staffProfile.preferred_name}</div>
              <div className={styles.heading3}>Contact Details</div>
              <div className={styles.subheading}>{staffProfile.email}</div>
              <div className={styles.heading3}>Biography</div>
              <div className={styles.subheading}>{staffProfile.description}</div>
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
              <Link href="/Staff/account/edit_profile" className={styles.Link}>
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
