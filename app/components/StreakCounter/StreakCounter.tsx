import Image from "next/image";
import styles from "./StreakCounter.module.css";
import { Icon } from "@iconify/react";

export default function StreakCounter() {
  return (
    <div className={styles.streakContainer}>
      <div className={styles.streakCounterContainer}>
        <Icon icon="bi:fire" className={styles.streakIcon}></Icon>
        <div className={styles.hole}></div>
        <div className={styles.streakCounter}>7</div>
      </div>
      <div className={styles.streakTexts}>
        <div className={styles.streakTitle}>Streak</div>
        <div className={styles.streakSubtitle}>
          Realize as análises para aumentar seu streak
        </div>
      </div>
    </div>
  );
}
