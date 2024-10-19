"use client";

import { useState } from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../Header";

export default function HelpPage() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I log in?",
      answer: "Click on the login button on the home page to get to the login screen. If you are a staff member, please click on the 'Staff Portal' link."
    },
    {
      question: "How can I reset my password?",
      answer: (
        <span>
          Click on &apos;Forgot Password&apos; on the login page and follow the instructions to reset your password. In case you are unable to change your password, please submit an inquiry {" "}
          <a href="/Pre_logged_in/contact_us_signed_out" className={styles.link}> here</a>.
        </span>
      )
    },
    {
      question: "I forgot my username or staff ID. What should I do now?",
      answer: (
        <span>
          Please submit an inquiry {" "}
          <a href="/Pre_logged_in/contact_us_signed_out" className={styles.link}> here</a> and we will get in touch with you soon.
        </span>
      )
    },
    {
      question: "I can't find an answer to my question. What should I do?",
      answer: (
        <>
          If you can&apos;t find an answer to your question, or your question hasn&apos;t been fully answered, then <a href="/Pre_logged_in/contact_us_signed_out" className={styles.link}>click here</a> to submit your enquiry.
        </>
      )
    }
  ];

  return (
    <div>
      <Header/>
      <div className={styles.helpPage}>
        
        <div className={styles.circle}></div>
        
        <h1 className={styles.heading}>Frequently Asked Questions (FAQs)</h1>

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

          <Link href="/">
            <button className={styles.button}>Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
