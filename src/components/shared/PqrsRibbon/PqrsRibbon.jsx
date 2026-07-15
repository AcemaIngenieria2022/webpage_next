"use client";

import React from 'react';
import Link from 'next/link';
import styles from './PqrsRibbon.module.css';

export default function PqrsRibbon() {
  return (
    <Link href="/pqrs" aria-label="Ir al formulario PQRS" className={styles.ribbon}>
      <span className={styles.label}>PQRS</span>
      <span className={styles.text}>Enviar PQRS</span>
    </Link>
  );
}
