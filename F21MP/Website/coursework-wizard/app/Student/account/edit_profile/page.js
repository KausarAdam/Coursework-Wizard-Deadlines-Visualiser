"use client";

import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EditProfile() {
  const [preferredName, setPreferredName] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    instagram: "",
    github: ""
  });
  const [dp, setDp] = useState(null);

  const handleDpChange = (e) => {
    setDp(URL.createObjectURL(e.target.files[0]));
  };

  const handleLinkChange = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <StudentMenu />
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Edit Profile</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <form className={styles.box} onSubmit={handleSubmit}>
            <div className={styles.firstColumn}>
              <div className={styles.circle}>
                {dp ? (
                  <Image
                    src={dp}
                    alt="Profile picture"
                    width="100"
                    height="100"
                    className={styles.profilePicture}
                  />
                ) : (
                  <Image
                    src={"/Black/account.png"}
                    alt="Profile picture"
                    width="100"
                    height="100"
                    className={styles.profilePicture}
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleDpChange}
                className={styles.uploadDp}
              />
            </div>

            <div className={styles.secondColumn}>
              <div className={styles.name}>John Doe</div>
              <div className={styles.heading3}>Preferred Name</div>
              <input
                type="text"
                placeholder="Enter your preferred name here"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
                className={styles.inputField}
              />
              <div className={styles.heading3}>Contact Details</div>
              <div className={styles.subheading}>Email or phone number</div>
              <div className={styles.heading3}>Biography</div>
              <textarea
                value={bio}
                placeholder="Tell us about yourself"
                onChange={(e) => setBio(e.target.value)}
                className={`${styles.inputField} ${styles.inputFieldArea}`}
              />
              <div className={styles.heading3}>Social Links</div>
              {Object.keys(socialLinks).map((key) => (
                <input
                  key={key}
                  name={key}
                  placeholder={`Your ${key.charAt(0).toUpperCase() + key.slice(1)} link`}
                  value={socialLinks[key]}
                  onChange={handleLinkChange}
                  className={styles.inputField}
                />
              ))}
            </div>

            <div className={styles.thirdColumn}>
              <Link href="./profile">
                <button type="submit" className={styles.button}>Save Changes</button>
              </Link>
              <Link href="./profile">
                <button type="cancel" className={`${styles.button} ${styles.cancel}`}>Cancel</button>
              </Link>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
}
