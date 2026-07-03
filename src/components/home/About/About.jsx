"use client";

import React from "react";
import { motion } from "motion/react";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutContainer}>
        
        {/* Contenido */}
        <motion.div
          className={styles.aboutContent}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <motion.h2
            className={styles.aboutTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            Nosotros
          </motion.h2>

          <motion.div
            className={styles.aboutBody}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
          >
            <p>
              Somos una empresa especializada en proyectos eléctricos y
              fotovoltaicos, con sede en Medellín, Colombia. Nos destacamos
              por nuestra capacidad para adaptarnos a las necesidades
              específicas de cada cliente.
            </p>

            <p>
              Orientamos nuestra gestión hacia la calidad, respaldada por la
              certificación del Sistema de Gestión de Calidad.
            </p>
          </motion.div>
        </motion.div>

        {/* Video */}
        <motion.div
          className={styles.aboutVideoSide}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
            <motion.div className={styles.videoWrapper}>
              <iframe
                className={styles.aboutVideo}
                src="https://www.youtube.com/embed/dSsJTkIXNMA"
                title="¿Quienes somos? - Acema Ingeniería"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;