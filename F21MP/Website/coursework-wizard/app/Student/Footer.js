import styles from './footer.module.css';

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <hr style={{ border: "none", width: "87%", marginLeft: "0px", height: "2px", backgroundColor: "#3BECB9", marginBottom: "30px" }} />

        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <a href ="/dashboard" className={styles.navDashboard}>Coursework Wizard</a>
            <a href ="/dashboard" className={styles.navLink}>Help</a>
            <a href="/dashboard" className={styles.navLink}>Contact Us</a>
          </div>
        </nav>
      </footer>
    );
  }