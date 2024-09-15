import styles from './header.module.css';
import Image from 'next/image';

export default function Header() {
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>
            <Image
              src="/logo.png"
              alt="Coursework Wizard Logo"
              width={100}
              height={82}
              priority // Preloads the image for better performance
            />
          </a>
          <div className={styles.navLinks}>
            <a href ="/Pre_logged_in/help_signed_out" className={styles.navLink}>Help</a>
            <a href="/Pre_logged_in/contact_us_signed_out" className={styles.navLink}>Contact Us</a>
          </div>
        </nav>
      </header>
    );
  }