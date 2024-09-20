"use client";

import { useState } from "react";
import StudentMenu from "../../student_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../student_notification";
import Link from "next/link";

export default function Settings() {

  const [fontSizeEnabled, setFontSizeEnabled] = useState(true);
  const [publicProfileEnabled, setPublicProfileEnabled] = useState(false);
  const [darkEnabled, setDarkEnabled] = useState(false);
  const [shortcutsEnabled, setShortcutsEnabled] = useState(false);

  const handleToggleFontSize = () => {
    setFontSizeEnabled(!fontSizeEnabled);
    console.log("Font size increased:", !fontSizeEnabled);
  };

  const handleTogglePublicProfile = () => {
    setPublicProfileEnabled(!publicProfileEnabled);
    console.log("Public profile enabled:", !publicProfileEnabled);
  };

  const handleToggleDark = () => {
    setDarkEnabled(!darkEnabled);
    console.log("Dark theme enabled:", !darkEnabled);
  };

  const handleToggleShortcuts = () => {
    setShortcutsEnabled(!shortcutsEnabled);
    console.log("Shortcuts disabled:", !shortcutsEnabled);
  };

  return (
    <div className={styles.container}>
      <StudentMenu />

      <div className={styles.settingsPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Profile</h1>
          <Notification />
        </div>

        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />

          <div className={styles.box}>
            <div className={styles.settingsColumn}>
              <div className={styles.settingItem}>
                <div>
                  <span className={styles.settingText}>Make Profile Public</span>
                  <br/>
                  <span className={styles.text}>Allow other students to view your profile</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={publicProfileEnabled}
                    onChange={handleTogglePublicProfile}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <div>
                  <span className={styles.settingText}>Increase Font Size</span>
                  <br/>
                  <span className={styles.text}>Make text larger</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={fontSizeEnabled}
                    onChange={handleToggleFontSize}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <div>
                  <span className={styles.settingText}>Enable Dark Theme</span>
                  <br/>
                  <span className={styles.text}>A dark colour background theme</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={darkEnabled}
                    onChange={handleToggleDark}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <div>
                  <span className={styles.settingText}>Disable Keyboard Shortcuts</span>
                  <br/>
                  <span className={styles.text}>This will give improved experience to people using screen readers</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={shortcutsEnabled}
                    onChange={handleToggleShortcuts}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
