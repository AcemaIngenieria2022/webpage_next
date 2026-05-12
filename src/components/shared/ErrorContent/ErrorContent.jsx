"use client";

import Link from "next/link";
import styles from "./ErrorContent.module.css";

export default function ErrorContent() {
  return (
    <section className={styles.errorSection}>
      <div className={styles.content}>
        <span className={styles.errorCode}>404</span>

        <h1 className={styles.title}>
       
        </h1>

        <p className={styles.description}>
         
        </p>

        <Link href="/" className={styles.button}>
       
        </Link>
      </div>
    </section>
  );
}