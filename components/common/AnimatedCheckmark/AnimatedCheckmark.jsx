"use client";
import styles from "./AnimatedCheckmark.module.css";

export default function AnimatedCheckmark() {
  return (
    <div className={styles.checkmarkWrapper}>
      <svg
        className={styles.checkmark}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className={styles.checkmarkCircle}
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className={styles.checkmarkCheck}
          fill="none"
          d="M14 27l7 7 16-16"
        />
      </svg>
    </div>
  );
}
