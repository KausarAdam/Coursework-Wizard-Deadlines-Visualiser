"use client";

import Link from "next/link";
import styles from "./studentMenu.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function StudentMenu() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(2);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const [courseCodes, setCourseCodes] = useState([]); // State for course codes
  const [courseNames, setCourseNames] = useState([]); // State for course names
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null; // Check if in the browser
  
  const handleLogout = () => {
    localStorage.clear(); // Clear all temporary storage variables
    router.push("/"); // Redirect to homepage after logout
  };

  const menuItems = [
    { id: 1, name: "Account", icon: "/White/account.png", iconActive: "/Black/account.png", link: null },
    { id: 2, name: "Dashboard", icon: "/White/dashboard.png", iconActive: "/Black/dashboard.png", link: "/Student/dashboard" },
    { id: 3, name: "Courses", icon: "/White/courses.png", iconActive: "/Black/courses.png", link: null },
    { id: 4, name: "Timeline", icon: "/White/timeline.png", iconActive: "/Black/timeline.png", link: "/Student/timeline" },
    { id: 5, name: "Board", icon: "/White/board.png", iconActive: "/Black/board.png", link: "/Student/board" },
    { id: 6, name: "Contact Us", icon: "/White/contact.png", iconActive: "/Black/contact.png", link: "/Student/contact/contact_us" },
    { id: 7, name: "Log Out", icon: "/White/logout.png", iconActive: "/Black/logout.png", link: handleLogout }
  ];

  const accountLinks = [
    { name: "Profile", link: "/Student/account/profile" },
    { name: "Settings", link: "/Student/account/settings" },
  ];

  // Dynamically generate courseLinks from courseCodes and courseNames
  const courseLinks = Array.isArray(courseCodes) ? courseCodes.map((code, index) => ({
    name: courseNames[index] || "Unnamed Course", // Fallback in case courseNames doesn't have a value
    link: `/Student/courses/course?code=${code}`, // Adjust the link as needed
  })) : []; // Provide an empty array if courseCodes is not available

  useEffect(() => {
    const currentPath = window.location.pathname;

    // Check if the current path is for account-related links
    if (currentPath.startsWith("/Student/account")) {
      setActiveItem(1);
      setIsSidebarOpen(false); // Close sidebar when on account pages
    } else if (currentPath.startsWith("/Student/courses")) {
      setActiveItem(3);
      setIsSidebarOpen(false); // Close sidebar when on course pages
    } else if (currentPath.startsWith("/Student/contact")) {
      setActiveItem(6);
      setIsSidebarOpen(false);
    } else {
      const item = menuItems.find(menuItem => menuItem.link === currentPath);
      setActiveItem(item ? item.id : 2); // Default to Dashboard if no match
      setIsSidebarOpen(false); // Close sidebar for other pages
    }
  }, [router.pathname]);

  const handleMenuClick = (id, link) => {
    setActiveItem(id);
    // Toggle sidebar for Account and Courses
    if (id === 1 || id === 3) {
      setIsSidebarOpen(prev => !prev);
    } else if (typeof link === 'string' && link) {
      router.push(link);
    } else if (link === handleLogout) {
      handleLogout();
    }
  };

  useEffect(() => {
    const fetchCoursework = async () => {
      const res = await fetch(`/api/getCoursework?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        // Set course codes and names in state
        const codes = data.map(coursework => coursework.course_code);
        const names = data.map(coursework => coursework.course_name);
        setCourseCodes(codes);
        setCourseNames(names);
      } else {
        console.error("Failed to fetch coursework");
      }
    };
    fetchCoursework(); // Call fetchCoursework when the component mounts
  }, []); // Add any dependencies as needed

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
            onClick={() => handleMenuClick(item.id, item.link)}
          >
            <Image
              src={activeItem === item.id ? item.iconActive : item.icon}
              alt={item.name}
              className={styles.navIcon}
              width={30}
              height={30}
            />
            <p className={activeItem === item.id ? styles.activeText : styles.inactiveText}>{item.name}</p>
          </div>
        ))}
      </div>

      {(isSidebarOpen && (activeItem === 1 || activeItem === 3)) && (
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarHeading}>
            {activeItem === 1 ? "Account" : "Courses"}
          </h2>

          <hr style={{ width: "100.5%", backgroundColor: "#1F4E47", border: "none", height: "1px", marginBottom: "10px", marginTop: "0px" }} />

          <ul>
            {activeItem === 1 && accountLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.link} className={styles.sidebarLink}>
                  {link.name}
                </Link>
              </li>
            ))}

            {activeItem === 3 && courseLinks.length > 0 && courseLinks.map((link, index) => (
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
