"use client";

import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProfile() {

  const [preferredName, setPreferredName] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    instagram: "",
    github: ""
  });
  const [existingDp, setExistingDp] = useState("/Black/account.png"); // Default fallback
  const [pictureFile, setPictureFile] = useState(null); // State to hold the selected profile picture file
  const router = useRouter();
  const username = typeof window !== 'undefined' ? localStorage.getItem('staffID') : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/getStaffProfile?username=${username}`);
        const data = await response.json();
        if (data.length > 0) {
          const staff = data[0];
          setPreferredName(staff.preferred_name || "");
          setBio(staff.description || "");
          setSocialLinks({
            linkedin: staff.linkedin || "",
            instagram: staff.instagram || "",
            github: staff.github || ""
          });
          setExistingDp(staff.picture || "/Black/account.png"); // Use existing picture if available
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  const handleLinkChange = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value
    });
  };

  const handleDpChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
        setPictureFile(file); // Update the state with the selected file
        setExistingDp(URL.createObjectURL(file)); // Create a local URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Prepare data to be sent to the API
    const data = {
        preferredName,
        bio,
        username, // Ensure you're sending the username too
        linkedin: socialLinks.linkedin,
        instagram: socialLinks.instagram,
        github: socialLinks.github,
        picture: pictureFile ? `/${pictureFile.name}` : existingDp // Add a leading slash to the filename
    };

    try {
        // Send POST request to the API
        const response = await fetch('/api/updateStaffProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify(data), // Convert data to JSON string
        });

        const result = await response.json(); // Parse JSON response

        // Handle success or error responses
        if (response.ok) {
            console.log(result.message); // Success message
            router.push('/Staff/account/profile'); // Redirect to profile page
        } else {
            console.error(result.error); // Log the error message
            alert(result.error); // Optionally, show an alert with the error
        }
    } catch (error) {
        console.error("Failed to update profile:", error);
        alert("An error occurred while updating your profile.");
    }
  };

  return (
    <div className={styles.container}>
      <StaffMenu />
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Edit Profile</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <form className={styles.box} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className={styles.firstColumn}>
              <div className={styles.circle}>
                <Image
                  src={existingDp}
                  alt="Profile picture"
                  width="100"
                  height="100"
                  className={styles.profilePicture}
                />
              </div>
              <input
                type="file"
                onChange={handleDpChange} // Handle image upload
                className={styles.uploadDp}
              />
            </div>

            <div className={styles.secondColumn}>
              <div className={styles.heading3}>Preferred Name</div>
              <input
                type="text"
                placeholder="Enter your preferred name here"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)} // Handle input change
                className={styles.inputField}
                required
              />
              <div className={styles.heading3}>Biography</div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)} // Handle input change
                placeholder="Tell us about yourself"
                className={`${styles.inputField} ${styles.inputFieldArea}`}
                required
              />
              <div className={styles.heading3}>Social Links</div>
              {Object.keys(socialLinks).map((key) => (
                <input
                  key={key}
                  name={key}
                  placeholder={`Your ${key.charAt(0).toUpperCase() + key.slice(1)} link`}
                  value={socialLinks[key]}
                  onChange={handleLinkChange} // Handle social link change
                  className={styles.inputField}
                />
              ))}
            </div>

            <div className={styles.thirdColumn}>
              <button type="submit" className={styles.button}>Save Changes</button>
              <Link href="/Staff/account/profile">
                <button type="button" className={`${styles.button} ${styles.cancel}`}>Cancel</button>
              </Link>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
}
