'use client';

import Image from 'next/image';
import { motion } from 'motion/react'; // Importamos motion
import styles from '../service.module.css';
import Card from '@/components/shared/Card/Card';
import { construccionFeatures } from '@/data/construccion-features';

export default function ConstruccionPage() {
  const features = construccionFeatures;

  return (
    <main className={styles.servicePage}>
      <div className={styles.bannerBox}>
        <Image src="/images/services/banner/construccion-granjas.webp" alt="Construcción de granjas" fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} priority />
        <Image src="/images/services/banner/contruccion-movil.png" alt="Construcción de granjas" fill className={styles.bannerImgMobile} sizes="100vw" quality={70} priority />
      </div>

      <section className={styles.featuresSection}>
        <div className={styles.content}>
          {/* Aquí va tu menú de texto superior u otros elementos si los necesitas */}
        </div>
        
        {/* Contenedor optimizado para centrar y reducir espacios */}
        <div className={styles.featuresContainer}>
          {features.map((f, index) => (
            <motion.div 
              key={f.slug} 
              style={{ width: '100%', maxWidth: 320 }}
              // --- EFECTOS EXACTOS COPIADOS DE TU COMPONENTE PROJECTS ---
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.25,
                delay: index * 0.08, // Retraso secuencial en cascada
              }}
              whileHover={{
                y: -8, // Elevación exacta de la tarjeta al pasar el mouse
              }}
            >
              <Card 
                title={f.title} 
                image={f.image} 
                variant="grid" 
                href={`/services/construccion-de-granjas/${f.slug}`} 
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}