import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.circle}></div>
      <div className={styles.alarmClock}>
        <Image
          src="/alarm clock.jpg" // Path to your alarm clock image
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