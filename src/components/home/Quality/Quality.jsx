'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Quality.module.css';

const qualityImages = [
  {
    src: '/images/quality/calidad%20ISO9001.png',
    alt: 'Certificación ISO 9001',
    title: 'ISO 9001',
    description: 'Gestión de Calidad'
  },
  {
    src: '/images/quality/calidad%20ISO14001.png',
    alt: 'Certificación ISO 14001',
    title: 'ISO 14001',
    description: 'Gestión Ambiental'
  },
  {
    src: '/images/quality/calidad%20ISO45001.png',
    alt: 'Certificación ISO 45001',
    title: 'ISO 45001',
    description: 'Seguridad y Salud'
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  },
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0 20px 40px rgba(33, 91, 160, 0.2)",
    transition: { duration: 0.3 }
  }
};

export default function Quality() {
  return (
    <section className={styles.section}>
      <div className={styles.backgroundDecoration} />
      
      <motion.div 
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className={styles.content} variants={itemVariants}>
           
          
          <h2 className={styles.title}>
            Política Integral de
            <span className={styles.highlight}> Seguridad, Salud, Ambiente y Calidad</span>
          </h2>
          
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>
              <span className={styles.dropCap}>A</span>cema Ingeniería orienta su gestión hacia la calidad del servicio 
              y la prevención de accidentes y enfermedades laborales, a través de la correcta 
              identificación de riesgos, evaluación de peligros y establecimiento de controles 
              asociados a la eliminación de los peligros y la reducción de los riesgos.
            </p>
            <p className={styles.description}>
              Dirige sus esfuerzos en proveer condiciones de trabajo óptimas y seguras, 
              fomentando una cultura de autocuidado, bienestar, comunicación y participación 
              de sus colaboradores y sus representantes. Además, protege y cuida el medio 
              ambiente, previniendo la contaminación y asegurando el cumplimiento de los 
              requisitos legales y otros aplicables.
            </p>
          </div>
        </motion.div>

        <motion.div className={styles.gallery} variants={itemVariants}>
          {qualityImages.map((image, index) => (
            <motion.div
              className={styles.imageCard}
              key={index}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className={styles.image}
                  priority={index === 0}
                />
                <div className={styles.imageOverlay}>
                  
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{image.title}</h3>
                <p className={styles.cardDescription}>{image.description}</p>
                 
              </div>
            </motion.div>
          ))}
        </motion.div>

         
      </motion.div>
    </section>
  );
}