"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Header from "../../Header";
import Router from "next/navigation";
import { useRouter } from 'next/navigation';

export default function ContactUs() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enrolled: "",
    enquiry: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   });

    //   if (response.ok) {
    //   console.log('Form submitted successfully');
        router.push('/Pre_logged_in/contact_us_signed_out_2');
    //   } else {
    //     console.error('Error submitting form');
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  };


  return (
    <div>
    <Header/>

      <div className={styles.contactUsPage}>

        <div className={styles.circle}></div>
        
        <h1 className={styles.heading}>Contact Us</h1>
        
        <h2 className={styles.subheading}>
          Please fill in the form below.
        </h2>

        <div className={styles.box}>

        <form onSubmit={handleSubmit}>
          <div className={styles.userInfo}>
            <p className={styles.name}>Full name</p>
          </div>

          <div className={styles.nameFields}>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className={`${styles.inputField} ${styles.inputFieldName}`}
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className={`${styles.inputField} ${styles.inputFieldName}`}
                required
              />
          </div>

            <p className={styles.name}>Email Address</p>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address here"
              className={styles.inputField}
              required
            />

            <p className={styles.name}>Contact Phone Number</p>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter contact phone number here"
              className={styles.inputField}
              required
            />

            <p className={styles.name}>Are you currently enrolled at Heriot-Watt?</p>

            <fieldset className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="enrolled"
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData.enrolled === "yes"}
                  className={styles.radioInput}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="enrolled"
                  value="no"
                  onChange={handleInputChange}
                  checked={formData.enrolled === "no"}
                  className={styles.radioInput}
                />
                No
              </label>
            </fieldset>

            <p className={styles.name}>Enquiry</p>

            <textarea
              name="enquiry"
              value={formData.enquiry}
              onChange={handleInputChange}
              placeholder="Enter enquiry details here"
              className={`${styles.inputField} ${styles.inputFieldEnquiry}`}
              required
            />
            
            <button type="submit" className={styles.button}>Submit</button>
            <button type="button" className={`${styles.button} ${styles.cancel}`} onClick={() => window.history.back()}>Cancel</button>
            </form>
          </div>
        
      </div>
    </div>
  );
}
