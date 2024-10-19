"use client";

import { useState } from 'react';
import StudentMenu from "../student_menu";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../student_notification";
import Link from "next/link";

export default function Help() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I submit a subtask?",
      answer: "To submit a subtask, select the course from the side menu and click on the coursework. Then, click the Re/Submit button for the specific subtask you wish to submit."
    },
    {
      question: "Why are subtasks locked?",
      answer: "Subtasks are automatically locked until the relevant material is taught in class. Once the material is covered, the system will unlock the subtasks and send notifications to inform you."
    },
    {
      question: "I missed the deadline of the subtask. What should I do now?",
      answer: "If you missed the deadline for a subtask, you can still submit it as long as the overall coursework deadline has not passed."
    },
    {
      question: "How can I edit my profile?",
      answer: "To edit your profile, select 'Account' from the side menu and click on 'Profile.' Once the page loads, click on 'Edit Profile,' make your changes, and remember to save them."
    },
    {
      question: "What are the stars on my account?",
      answer: "Stars are rewards you earn for submitting subtasks on time. At the end of the semester, you can exchange these stars for prizes."
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
        <StudentMenu/>

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