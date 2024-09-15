import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.heading}>
        <h2>M &nbsp;&nbsp;A &nbsp;&nbsp;S &nbsp;&nbsp;T &nbsp;&nbsp;E &nbsp;&nbsp;R &nbsp;&nbsp;&nbsp;&nbsp; Y &nbsp;&nbsp;O &nbsp;&nbsp;U &nbsp;&nbsp;R &nbsp;&nbsp;&nbsp;&nbsp; C &nbsp;&nbsp;O &nbsp;&nbsp;U &nbsp;R &nbsp;&nbsp;S &nbsp;&nbsp;E</h2>
        <h1>D &nbsp;E &nbsp;A &nbsp;D &nbsp;L &nbsp;I &nbsp;N &nbsp;E &nbsp;S</h1>
        {/* &nbsp is for space */}
      </div>
      <div className={styles.content}>
        <p>Welcome to Coursework Wizard,</p>
        <p>where visualising deadlines is</p>
        <p>made simple and effective.</p>
      </div>
      <div className={styles.logIn}>
        <Link href="/Pre_logged_in/login_student" passHref>
        <button>Log In</button>
        </Link>
      </div>
      <div className={styles.circle}></div>
      <div className={styles.alarmClock}>
        <Image
          src="/alarm clock.jpg"
          alt="Alarm Clock"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.actNowText}>
        <div>ACT -</div>
        <div>NOW</div>
      </div>
    </div>
  );
}