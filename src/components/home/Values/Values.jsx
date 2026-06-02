"use client";

import React from "react";
import { motion } from "motion/react";
import styles from "./Values.module.css";

const Values = () => {
  const questions = [
    "¿Quiénes somos?",
    "¿Qué servicios ofrecemos?",
    "¿Cuáles son los beneficios de trabajar con nosotros?",
    "¿Contamos con cobertura nacional e internacional?",
  ];

  return (
    <section className={styles.valuesSection}>
      <div className={styles.valuesGrid}>
        {questions.map((question, index) => (
          <motion.div
            key={index}
            className={styles.valueItem}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
          >
            <span className={styles.valueText}>
              {question}
            </span>

            <motion.div
              className={styles.valueIcon}
              whileHover={{
                rotate: 90,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Values;