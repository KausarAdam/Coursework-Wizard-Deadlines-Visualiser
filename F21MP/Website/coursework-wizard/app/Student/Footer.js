import styles from './footer.module.css';

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <hr style={{ border: "none", width: "88.7%", marginLeft: "0px", height: "2px", backgroundColor: "#3BECB9", marginBottom: "30px" }} />

        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <div className={styles.navDashboard}>&copy; {new Date().getFullYear()} Coursework Wizard</div>
            <a href ="/Student/help" className={styles.navLink}>Help</a>
            <a href="/Student/contact_us" className={styles.navLink}>Contact Us</a>
          </div>
        </nav>
      </footer>
    );
  }