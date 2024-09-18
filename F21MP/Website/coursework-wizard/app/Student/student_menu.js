"use client";

import Link from "next/link";
import styles from "./studentMenu.module.css";
import Image from "next/image";
import { useState } from "react";

const menuItems = [
  { id: 1, name: "Account", icon: "/White/account.png", iconActive: "/Black/account.png", link: "/Student/dashboard" },
  { id: 2, name: "Dashboard", icon: "/White/dashboard.png", iconActive: "/Black/dashboard.png", link: "/Student/dashboard" },
  { id: 3, name: "Courses", icon: "/White/courses.png", iconActive: "/Black/courses.png", link: "/Student/dashboard" },
  { id: 4, name: "Timeline", icon: "/White/timeline.png", iconActive: "/Black/timeline.png", link: "/Student/dashboard" },
  { id: 5, name: "Board", icon: "/White/board.png", iconActive: "/Black/board.png", link: "/Student/dashboard" },
  { id: 6, name: "Contact Us", icon: "/White/contact.png", iconActive: "/Black/contact.png", link: "/Student/contact_us" },
  { id: 7, name: "Log Out", icon: "/White/logout.png", iconActive: "/Black/logout.png", link: "/" }
];


const accountLinks = [
  { name: "Profile", link: "/Student/account/profile" },
  { name: "Settings", link: "/Student/account/settings" },
];

const courseLinks = [
  { name: "Course 1", link: "/Student/courses/course1" },
  { name: "Course 2", link: "/Student/courses/course2" },
  { name: "Course 3", link: "/Student/courses/course3" },
  { name: "Course 4", link: "/Student/courses/course4" },
];

export default function StudentMenu() {
  const [activeItem, setActiveItem] = useState(2); // Default to 'Dashboard'

  const handleMenuClick = (id) => {
    setActiveItem(id);
  };

  return (

    <div className={styles.container}>

      <div className={styles.navbar}>
        
        <div className={styles.navItem}>
          <Link href="/Student/dashboard">
            <Image src="/Main white green.png" alt="Student Logo" width="90" height="70" className={styles.navImage} />
          </Link>
        </div>

        
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.navItem} ${activeItem === item.id ? styles.active : ""}`}
            onClick={() => handleMenuClick(item.id)}
          >

            <Link href={item.link}>
              <Image
                src={activeItem === item.id ? item.iconActive : item.icon}
                alt={item.name}
                className={styles.navIcon}
                width={30}
                height={30}
              />
              <p className={activeItem === item.id ? styles.activeText : styles.inactiveText}>{item.name}</p>
            </Link>
          </div>
        ))}
      </div>


      {(activeItem === 1 || activeItem === 3) && (
        <div className={styles.sidebar}>

          <h2 className={styles.sidebarHeading}>
            {activeItem === 1 ? "Account" : "Courses"}
          </h2>

          <hr style={{ width: "100.5%", backgroundColor: "#1F4E47", border: "none", height: "1px", marginBottom: "10px", marginTop: "0px"}} />

          <ul>
            {activeItem === 1 &&
              accountLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.link} className={styles.sidebarLink}>
                    {link.name}
                  </Link>
                </li>
              ))}

            {activeItem === 3 &&
              courseLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.link} className={styles.sidebarLink}>
                    {link.name}
                  </Link>
                </li>
              ))}

          </ul>
        </div>
      )}
    </div>
  );
}
