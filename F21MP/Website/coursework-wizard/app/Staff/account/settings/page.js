"use client";

import { useState, useEffect } from "react";
import StaffMenu from "../../staff_menu";
import styles from "./page.module.css";
import Footer from "../../Footer";
import Notification from "../../staff_notification";

export default function Settings() {
  const [fontSizeEnabled, setFontSizeEnabled] = useState(true);
  const [publicProfileEnabled, setPublicProfileEnabled] = useState(false);
  const [darkEnabled, setDarkEnabled] = useState(false);
  const [shortcutsEnabled, setShortcutsEnabled] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        
        setFontSizeEnabled(data.fontSizeEnabled);
        setPublicProfileEnabled(data.publicProfileEnabled);
        setDarkEnabled(data.darkEnabled);
        setShortcutsEnabled(data.shortcutsEnabled);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchSettings();
  }, []);

  const handleToggleFontSize = () => {
    setFontSizeEnabled(!fontSizeEnabled);
  };

  const handleTogglePublicProfile = () => {
    setPublicProfileEnabled(!publicProfileEnabled);
  };

  const handleToggleDark = () => {
    setDarkEnabled(!darkEnabled);
  };

  const handleToggleShortcuts = () => {
    setShortcutsEnabled(!shortcutsEnabled);
  };

  const handleSaveChanges = async () => {
    const settingsData = {
      fontSizeEnabled,
      publicProfileEnabled,
      darkEnabled,
      shortcutsEnabled
    };
  
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settingsData)
    });
  
    if (response.ok) {
      console.log("Settings saved successfully");
    } else {
      console.error("Failed to save settings");
    }
  };

  return (
    <div className={styles.container}>
      <StaffMenu />

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

              <div className={styles.saveButton}>
                <button onClick={handleSaveChanges} className={styles.button}>Save Changes</button>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
