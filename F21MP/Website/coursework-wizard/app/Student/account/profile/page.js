import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faGithub, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Profile() {
  return (
    <div className={styles.container}>
      <StudentMenu />

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
                  src={"/Black/account.png"}
                  alt="Profile picture"
                  width="100"
                  height="100"
                  className={styles.profilePicture}
                />
              </div>
            </div>

            <div className={styles.secondColumn}>
              <div className={styles.name}>John Doe</div>
              <div className={styles.heading3}>Preferred Name</div>
              <div className={styles.subheading}>Preferred name here</div>
              <div className={styles.heading3}>Contact Details</div>
              <div className={styles.subheading}>Email or phone number</div>
              <div className={styles.heading3}>Biography</div>
              <div className={styles.subheading}>About me</div>
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
