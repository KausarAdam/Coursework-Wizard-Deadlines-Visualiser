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
      question: "How do I personalise my account?",
      answer: "To personalise your account, go to your account settings and update your preferences."
    },
    {
      question: "How can I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password."
    },
    {
      question: "How can I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password."
    },
    {
      question: "I can’t find an answer to my question, what should I do?",
      answer: (
        <>
          If you can't find an answer to your question, or your question hasn't been fully answered, then <a href="/Pre_logged_in/contact_us_signed_out" className={styles.link}>click here</a> to submit your enquiry.
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