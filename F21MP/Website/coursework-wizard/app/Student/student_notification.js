"use client";

import { useState } from 'react';
import styles from './studentNotification.module.css';
import Image from 'next/image';

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.bellIcon} onClick={toggleNotifications}>
        <Image
          src="/Black/notification.png"
          alt="Notifications"
          width="90" height="70"
          className={styles.bell}
        />
        <span className={styles.badge}>3</span> {/* Number of notifications */}
      </div>

      {isOpen && (
        <div className={styles.notificationDropdown}>
          <h3 className={styles.notificationHeader}>Notifications</h3>
          <hr style={{ border: "none", width: "94%", marginLeft: "10px", height: "1px", backgroundColor: "#1F4E47", marginRight: "0px" }} />
          <ul className={styles.notificationList}>
            <li className={styles.notificationItem}>Subtask unlocked</li>
            <li className={styles.notificationItem}>Assignment uploaded</li>
            <li className={styles.notificationItem}>Upcoming deadline: 25th October</li>
          </ul>
        </div>
      )}
    </div>
  );
}
