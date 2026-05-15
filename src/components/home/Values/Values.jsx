import React from 'react';
import styles from './Values.module.css';

const Values = () => {
  const questions = [
    "¿Quiénes somos?",
    "¿Qué servicios ofrecemos?",
    "¿Cuáles son los beneficios de trabajar con nosotros?",
    "¿Contamos con cobertura nacional e internacional?"
  ];

  return (
    <section className={styles.valuesSection}>
      <div className={styles.valuesGrid}>
        {questions.map((question, index) => (
          <div key={index} className={styles.valueItem}>
            <span className={styles.valueText}>{question}</span>
            <div className={styles.valueIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;