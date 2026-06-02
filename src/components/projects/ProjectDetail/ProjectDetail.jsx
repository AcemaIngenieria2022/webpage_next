'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // 1. Importar Framer Motion
import ProjectsToggle from '@/components/shared/Toggle/ProjectsToggle';
import ProjectMiniCarousel from '@/components/shared/ProjectMiniCarousel/ProjectMiniCarousel';
import { getCarouselImagesBySlug } from '@/data/projects-carousel';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail({ project }) {
  const router = useRouter();
  const carouselImages = getCarouselImagesBySlug(project?.slug);

  if (!project) return null;

  // 2. VARIANTES PARA ANIMACIÓN ESCALONADA (TEXTO, VIDEO, SPECS)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Hace que los hijos aparezcan uno tras otro
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] } 
    }
  };

  const specCardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <article className={styles.container}>
      {/* El Toggle superior aparece suavemente desde arriba */}
      <motion.div 
        className={styles.toggleWrapper}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ProjectsToggle
          className={styles.slugToggle}
          onFilterChange={(filter) => router.push(`/projects?filter=${filter}`)}
        />
      </motion.div>

      {/* Sección Hero con Imagen y Wave */}
      <section className={styles.heroSection}>
        {project.heroImage ? (
          <div className={styles.imageContainer}>
            {/* 3. Efecto Parallax / Zoom Cinemático inicial en la imagen */}
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full"
              style={{ height: '100%', position: 'relative' }}
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className={styles.heroImage}
              />
            </motion.div>
          </div>
        ) : null}
        
        {/* Curva SVG inferior animada con un sutil slide up */}
        <motion.div 
          className={styles.waveWrapper}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,192L80,213.3C160,235,320,277,480,261.3C640,245,800,171,960,154.7C1120,139,1280,181,1360,202.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </motion.div>
      </section>

      {/* Título Flotante y Contenido con contenedor controlado */}
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          {/* 4. Entrada del Título de abajo hacia arriba de manera dramática pero elegante */}
          <motion.div 
            className={styles.titleBadge}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1>{project.title}</h1>
          </motion.div>
        </header>

        {/* Contenedor principal que coordina la cascada de animaciones de sus hijos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <section className={styles.mainGrid}>
            {/* Columna de descripción */}
            <motion.div className={styles.descriptionColumn} variants={itemVariants}>
              {project.description.split(/\n{2,}/g).map((paragraph, index) => (
                <p key={index} className={styles.textWithLines}>
                  {paragraph.trim()}
                </p>
              ))}
            </motion.div>

            {/* Box del Video que entra fluidamente */}
            <motion.div className={styles.videoColumn} variants={itemVariants}>
              <div className={styles.videoBox}>
                <iframe src={project.videoUrl} title="Video" allowFullScreen />
              </div>
            </motion.div>
          </section>

          {/* 5. Sección de Especificaciones con animaciones individuales escalonadas */}
          <section className={styles.specsGrid}>
            {project.specs?.map((spec, i) => (
              <motion.div 
                key={i} 
                className={styles.specCard}
                variants={specCardVariants}
                whileHover={{ scale: 1.03, y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.specLabel}>{spec.label}</span>
                <span className={styles.specValue}>{spec.value}</span>
              </motion.div>
            ))}
          </section>

          {/* Footer de la página */}
          <footer className={styles.footer}>
            <motion.p variants={itemVariants}>{project.textfooter}</motion.p>
            
            {/* Botón Call to Action dinámico */}
            <motion.button 
              className={styles.ctaButton} 
              onClick={() => router.push('/contact')}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Hacemos realidad tus proyectos
            </motion.button>
            
            {/* Carrusel inferior */}
            <motion.div variants={itemVariants} className="w-full">
              <ProjectMiniCarousel images={carouselImages || [project.heroImage]} />
            </motion.div>
          </footer>
        </motion.div>
      </div>
    </article>
  );
}