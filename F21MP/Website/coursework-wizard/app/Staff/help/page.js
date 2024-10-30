"use client";

import { useState } from 'react';
import StaffMenu from "../staff_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../staff_notification";
import Link from "next/link";

export default function Help() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqItems = [
    {
      question: "How can I edit my profile?",
      answer: "To edit your profile, select 'Account' from the side menu and click on 'Profile.' Once the page loads, click on 'Edit Profile,' make your changes, and remember to save them."
    },
    {
      question: "How can I upload coursework?",
      answer: "To upload a coursework, go to the course page and click on the 'New' button. Enter the details of the coursework and click on 'Publish' when done. Please note that every coursework can have a maximum of 6 subtasks and only 1 independent subtask is allowed. 2 or more dependent subtasks cannot run concurrently."
    },
    {
      question: "How can I edit coursework?",
      answer: "This feature is currently not supported. You will have to delete the coursework and re-upload it."
    },
    {
      question: "I can't find an answer to my question. What should I do?",
      answer: (
        <>
          If you can&apos;t find an answer to your question, or your question hasn&apos;t been fully answered, then <a href="./contact/contact_us" className={styles.link}>click here</a> to submit your enquiry.
        </>
      )
    }
  ];

    return (
      <div className={styles.container}>
        <StaffMenu/>

        <div className={styles.helpPage}>

          <div className={styles.header}>
            <h1 className={styles.heading}>Help</h1>
            <Notification />
          </div>

          <div className={styles.withoutFooter}>

            <hr style={{ width: "100.5%", marginLeft: "0" }} />

            <div className={styles.box}>
              {faqItems.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                  <div className={styles.question} onClick={() => toggleExpand(index)}>
                    <span>{item.question}</span>
                    <span className={`${styles.arrow} ${expanded === index ? styles.arrowExpanded : ''}`}>
                      {expanded === index ? '▲' : '▼'}
                    </span>
                  </div>
                  {expanded === index && (
                    <div className={styles.answer}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                  <hr className={styles.separator} />
                </div>
              ))}
            </div>
          
          </div>

          <Footer/>
          
        </div>
        
      </div>
    );
  }