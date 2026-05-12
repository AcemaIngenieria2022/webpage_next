"use client";

import Link from "next/link";
import styles from "./ErrorContent.module.css";

export default function ErrorContent() {
  return (
    <section className={styles.errorSection}>
      <div className={styles.content}>
        <span className={styles.errorCode}>404</span>

        <h1 className={styles.title}>
          Página no encontrada
        </h1>

        <p className={styles.description}>
          La página que intentas visitar no existe o fue movida.
        </p>

        <Link href="/" className={styles.button}>
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}