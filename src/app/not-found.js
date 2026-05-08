"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import ErrorContent from "@/components/ErrorContent/ErrorContent";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      {/* Capas decorativas de fondo */}
      <div className={styles.background}>
        <div className={styles.blurGreen}></div>
        <div className={styles.blurBlue}></div>
      </div>

      <Navbar />

      <main className={styles.main}>
        <ErrorContent />
      </main>
    </div>
  );
}