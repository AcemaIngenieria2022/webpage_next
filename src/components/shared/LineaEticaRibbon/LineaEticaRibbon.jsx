"use client";

import React from 'react';
import Link from 'next/link';
import { FaUserShield } from 'react-icons/fa';
import styles from './LineaEticaRibbon.module.css';

export default function LineaEticaRibbon() {
  return (
    <Link 
      href="/linea-etica" 
      aria-label="Ir a la Línea Ética" 
      className={styles.ribbon}
    >
      <FaUserShield className={styles.icon} aria-hidden="true" />
      <span className={styles.text}>Línea Ética</span>
    </Link>
  );
}