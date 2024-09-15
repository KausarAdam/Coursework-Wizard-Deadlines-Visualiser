import { Inter } from "next/font/google";
import styles from './header.module.css';
import Image from 'next/image';
import './globals.css'; // globals.cc has the no scroll bar rule

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coursework Wizard",
  description: "Visualise and manage your coursework deadlines",
};

// Header for pre-login pages
function Header() {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header/>
      <main>
        {children}
      </main>
        </body>
    </html>
  );
}
