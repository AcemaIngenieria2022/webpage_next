"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Values.module.css";

const valuesData = [
  {
    question: "¿Quiénes somos?",
    answer:
      "Acema Ingeniería es una empresa colombiana que impulsa proyectos eléctricos y de energía renovable con innovación, calidad y compromiso, conectando la energía del presente con el futuro sostenible del país.",
  },
  {
    question: "¿Qué servicios ofrecemos?",
    answer:
      "Ofrecemos servicios integrales en el sector eléctrico y en la construcción de granjas solares, incluyendo diseño, ingeniería, construcción y puesta en marcha. Desarrollamos infraestructura como subestaciones, puntos de conexión, centros de transformación, sistemas SCADA, tableros eléctricos, sistemas de protección y estaciones meteorológicas, garantizando soluciones completas y adaptadas a las necesidades de cada proyecto.",
  },
  {
    question: "¿Cuáles son los beneficios de trabajar con nosotros?",
    isList: true,
    intro:
      "Al elegirnos, nuestros clientes obtienen un aliado con experiencia, respaldo y compromiso. Garantizamos:",
    answer: [
      "Soluciones seguras y eficientes.",
      "Cumplimiento normativo y de plazos.",
      "Acompañamiento experto en cada etapa.",
      "Innovación y sostenibilidad en cada proyecto.",
      "Transparencia y comunicación constante.",
    ],
  },
  {
    question: "¿Contamos con cobertura nacional?",
    answer:
      "Sí. Actualmente tenemos presencia en los departamentos de Cesar, Santander, Boyacá, Sucre y Córdoba, y contamos con la capacidad técnica y logística para ejecutar proyectos a nivel nacional. Nuestro equipo está preparado para desarrollar obras eléctricas y energéticas.",
  },
];

const Values = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className={styles.valuesSection}>
      <motion.div layout className={styles.valuesGrid}>
        {valuesData.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={item.question}
              layout
              className={styles.valueWrapper}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 24,
              }}
            >

              {/* Botón principal */}
              <div
                className={`${styles.valueItem} ${
                  isHovered ? styles.activeItem : ""
                }`}
              >
                <span
                  className={`${styles.valueText} ${
                    isHovered ? styles.activeText : ""
                  }`}
                >
                  {item.question}
                </span>

                {/* Icono */}
                <motion.div
                  className={`${styles.valueIcon} ${
                    isHovered ? styles.activeIcon : ""
                  }`}
                  animate={{
                    rotate: isHovered ? 180 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="10" />

                    <line
                      x1="8"
                      y1="12"
                      x2="16"
                      y2="12"
                    />

                    <motion.line
                      x1="12"
                      y1="8"
                      x2="12"
                      y2="16"
                      initial={false}
                      animate={{
                        opacity: isHovered ? 0 : 1,
                        scaleY: isHovered ? 0 : 1,
                      }}
                      transition={{
                        duration: 0.15,
                      }}
                      style={{
                        originX: "50%",
                        originY: "50%",
                      }}
                    />
                  </svg>
                </motion.div>
              </div>


              {/* Contenido desplegable */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    layout
                    className={styles.dropdownCard}
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      height: {
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                      },
                      opacity: {
                        duration: 0.2,
                      },
                    }}
                  >
                    <div className={styles.dropdownContent}>
                      {item.isList ? (
                        <>
                          <p className={styles.listIntro}>
                            {item.intro}
                          </p>

                          <ol className={styles.numberedList}>
                            {item.answer.map((text, i) => (
                              <li key={i}>
                                {text}
                              </li>
                            ))}
                          </ol>
                        </>
                      ) : (
                        <p>{item.answer}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Values;