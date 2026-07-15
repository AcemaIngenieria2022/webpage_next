"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import styles from "./About.module.css";

const AnimatedCounter = ({ value, prefix = "", suffix = "", label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    // Configurar el Intersection Observer para detectar cuando el componente entra en vista
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startAnimation();
          }
        });
      },
      { threshold: 0.3 } // El 30% del componente debe estar visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  const startAnimation = () => {
    let frameId;
    const duration = 2000; // Duración de la animación en milisegundos
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Función de easing (easeOutCubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(value * eased);

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Asegurar que termine exactamente en el valor final
      }
    };

    setDisplayValue(0); // Resetear a 0 antes de comenzar
    frameId = requestAnimationFrame(animate);
    
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  };

  return (
    <div className={styles.statCard} ref={counterRef}>
      <div className={styles.statValue}>
        {prefix}{displayValue}{suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};

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

      <motion.div
        className={styles.statsSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <AnimatedCounter value={5} prefix="+" suffix=" años" label="de experiencia" />
        <AnimatedCounter value={100} prefix="+" suffix=" proyectos" label="desarrollados" />
        <AnimatedCounter value={250} prefix="+" suffix=" MW" label="de potencia instalada" />
      </motion.div>
    </section>
  );
};

export default About;