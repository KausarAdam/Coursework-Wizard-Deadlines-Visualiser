"use client";

import Link from "next/link";
import styles from "./studentMenu.module.css";
import Image from "next/image";
import { useState } from "react";

const menuItems = [
  { id: 1, name: "Account", icon: "/White/account.png", iconActive: "/Black/account.png", link: "/Student/account" },
  { id: 2, name: "Dashboard", icon: "/White/dashboard.png", iconActive: "/Black/dashboard.png", link: "/Student/dashboard" },
  { id: 3, name: "Courses", icon: "/White/courses.png", iconActive: "/Black/courses.png", link: "/Student/courses" },
  { id: 4, name: "Timeline", icon: "/White/timeline.png", iconActive: "/Black/timeline.png", link: "/Student/timeline" },
  { id: 5, name: "Board", icon: "/White/board.png", iconActive: "/Black/board.png", link: "/Student/board" },
  { id: 6, name: "Contact Us", icon: "/White/contact.png", iconActive: "/Black/contact.png", link: "/Student/contactUs" },
  { id: 7, name: "Log Out", icon: "/White/logout.png", iconActive: "/Black/logout.png", link: "/" }
];

export default function StudentMenu() {
  const [activeItem, setActiveItem] = useState(2); // Default to 'Dashboard'

  const handleMenuClick = (id) => {
    setActiveItem(id);
  };

  return (
    <div className={styles.navbar}>
      {/* Logo */}
      <div className={styles.navItem}>
        <Link href="/Student/dashboard">
          <Image src="/Main white green.png" alt="Student Logo" width="90" height="70" className={styles.navImage} />
        </Link>
      </div>

      {/* Menu Items */}
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
  );
}
