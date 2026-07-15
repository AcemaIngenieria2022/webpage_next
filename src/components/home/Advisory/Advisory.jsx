import React from 'react';
import Link from 'next/link';
import styles from './Advisory.module.css';

const Advisory = () => {
  return (
    <section className={styles.advisorySection}>
      <div className={styles.advisoryCapsule}>
        <h2 className={styles.advisoryTitle}>
          Solicite asesoría técnica{' '}
          <Link href="/contact" className={styles.advisoryButton} aria-label="Ir al formulario de contacto">
            aquí
          </Link>
        </h2>
      </div>
    </section>
  );
};

export default Advisory;