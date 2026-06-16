 'use client';

import Image from 'next/image';
import thumbs from '@/data/project-thumbs.json';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // 1. Importar Framer Motion
import { useEffect, useRef, useState } from 'react';
import ProjectsToggle from '@/components/shared/Toggle/ProjectsToggle';
import ProjectMiniCarousel from '@/components/shared/ProjectMiniCarousel/ProjectMiniCarousel';
import { getCarouselImagesBySlug } from '@/data/projects-carousel';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail({ project }) {
  const router = useRouter();
  const carouselImages = getCarouselImagesBySlug(project?.slug);
  
  // Normaliza distintas formas de URL de YouTube a la forma embebible
  function toEmbedUrl(url) {
    if (!url) return '';
    try {
      // Si ya es /embed/ devolvemos tal cual
      if (url.includes('/embed/')) return url;

      // Enlace tipo watch?v=VIDEOID
      if (url.includes('youtube.com/watch')) {
        const parts = url.split('v=');
        const id = parts[1] ? parts[1].split('&')[0] : null;
        if (id) return `https://www.youtube.com/embed/${id}`;
      }

      // Enlace corto youtu.be/VIDEOID
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1].split('?')[0];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }

      return url;
    } catch (e) {
      return url;
    }
  }

  const videoEmbedUrl = toEmbedUrl(project.videoUrl);
  // Extrae el ID de YouTube para construir miniatura y enlace directo
  function getYouTubeId(url) {
    if (!url) return null;
    try {
      if (url.includes('/embed/')) return url.split('/embed/')[1].split('?')[0];
      if (url.includes('youtube.com/watch')) {
        const parts = url.split('v=');
        return parts[1] ? parts[1].split('&')[0] : null;
      }
      if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
      return null;
    } catch (e) {
      return null;
    }
  }

  const youtubeId = getYouTubeId(project.videoUrl || videoEmbedUrl);
  const youtubeWatchUrl = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : null;
  const youtubeThumb = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null;

  // YouTube IFrame API player handling to detect playback errors (owner restrictions)
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const [playerError, setPlayerError] = useState(false);
  const [playerLoading, setPlayerLoading] = useState(false);
  const containerRef = useRef(null);
  const [showFallbackModal, setShowFallbackModal] = useState(false);

  useEffect(() => {
    if (!youtubeId) return;
    setPlayerError(false);
    setPlayerLoading(true);

    function mountPlayer() {
      if (!window.YT || !window.YT.Player) {
        setPlayerLoading(false);
        return;
      }

      if (playerInstanceRef.current) return;

      try {
        playerInstanceRef.current = new window.YT.Player(`youtube-player-${youtubeId}`, {
          videoId: youtubeId,
          playerVars: { modestbranding: 1, rel: 0, playsinline: 1, controls: 1, enablejsapi: 1 },
          events: {
            onReady: (event) => {
              setPlayerLoading(false);
              // Try to set higher playback quality to reduce initial low-res playback
              try {
                // Preferred qualities in order
                const prefs = ['hd1080', 'hd720', 'large', 'medium'];
                for (const q of prefs) {
                  try {
                    if (typeof playerInstanceRef.current.setPlaybackQuality === 'function') {
                      playerInstanceRef.current.setPlaybackQuality(q);
                    }
                  } catch (err) {
                    // ignore and try next
                  }
                }
              } catch (err) {
                // noop
              }
            },
            onError: (event) => {
              // Codes 101 and 150 indicate embedding is not allowed by the owner
              setPlayerError(true);
              setPlayerLoading(false);
              try { playerInstanceRef.current.destroy(); } catch (e) {}
              playerInstanceRef.current = null;
            },
            onPlaybackQualityChange: (ev) => {
              // optional: could log or react to quality changes
              // console.log('quality changed', ev.data);
            }
          }
        });
      } catch (e) {
        setPlayerError(true);
        setPlayerLoading(false);
      }
    }

    if (window.YT && window.YT.Player) {
      mountPlayer();
    } else {
      // Load API
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existing) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      // API will call this global when ready
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        mountPlayer();
      };
    }

    return () => {
      try { if (playerInstanceRef.current) playerInstanceRef.current.destroy(); } catch (e) {}
      playerInstanceRef.current = null;
    };
  }, [youtubeId]);

  // Fullscreen handling: when entering fullscreen, remove transform hacks and request higher quality
  useEffect(() => {
    if (!youtubeId) return;

    function onFsChange() {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
      const isFs = !!fsEl && containerRef.current && (containerRef.current === fsEl || containerRef.current.contains(fsEl));

      if (isFs) {
        document.body.classList.add('youtube-fullscreen');
        // request higher quality when entering fullscreen
        try {
          if (playerInstanceRef.current && typeof playerInstanceRef.current.setPlaybackQuality === 'function') {
            playerInstanceRef.current.setPlaybackQuality('hd1080');
          }
        } catch (e) {}
      } else {
        document.body.classList.remove('youtube-fullscreen');
      }
    }

    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    document.addEventListener('mozfullscreenchange', onFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
      document.removeEventListener('mozfullscreenchange', onFsChange);
      document.body.classList.remove('youtube-fullscreen');
    };
  }, [youtubeId]);

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
              <ProjectHeroImage project={project} />
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
                {youtubeId && !playerError ? (
                  <div id={`youtube-player-${youtubeId}`} ref={playerRef} style={{ width: '100%', height: '100%' }} />
                ) : videoEmbedUrl && !playerError ? (
                  <iframe
                    src={videoEmbedUrl}
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : null}

                {/* Fallback: miniatura y enlace a YouTube cuando el embed está bloqueado por derechos */}
                {youtubeThumb && youtubeWatchUrl ? (
                  <div className={styles.videoFallback}>
                    <button
                      type="button"
                      onClick={() => setShowFallbackModal(true)}
                      className={styles.videoThumbButton}
                      aria-label={`Abrir opciones de video para ${project.title}`}
                    >
                      <img src={youtubeThumb} alt={`Ver ${project.title} en YouTube`} className={styles.videoThumb} />
                    </button>
                    <p className={styles.videoFallbackText}>
                      Este video puede estar bloqueado para reproducción embebida. Pulsa la miniatura para ver opciones.
                    </p>

                    {showFallbackModal ? (
                      <div className={styles.fallbackModal} role="dialog" aria-modal="true">
                        <div className={styles.fallbackModalContent}>
                          <h3>Video no reproducible aquí</h3>
                          <p>El propietario del video ha restringido la reproducción embebida. Puedes verlo en YouTube.</p>
                          <div className={styles.fallbackModalActions}>
                            <a href={youtubeWatchUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>Ver en YouTube</a>
                            <button type="button" onClick={() => { navigator.clipboard?.writeText(youtubeWatchUrl); }} className={styles.secondaryButton}>Copiar enlace</button>
                            <button type="button" onClick={() => setShowFallbackModal(false)} className={styles.ghostButton}>Cerrar</button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
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

// Progressive hero image: show fast thumb first, then upgrade to original when loaded
function ProjectHeroImage({ project }) {
  const mapped = thumbs[project.heroImage];
  const [src, setSrc] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If mapped is a small thumb, don't render it — preload the original and swap when ready
    if (mapped && mapped.includes('-800') && project.heroImage) {
      if (typeof globalThis !== 'undefined' && typeof globalThis.Image === 'function') {
        const hi = new globalThis.Image();
        hi.src = project.heroImage;
        hi.onload = () => {
          setSrc(project.heroImage);
          // small delay to ensure transition applies
          requestAnimationFrame(() => setVisible(true));
        };
        return;
      }
    }

    // Otherwise use mapped thumb or original immediately and show
    setSrc(mapped || project.heroImage);
    requestAnimationFrame(() => setVisible(true));
  }, [mapped, project.heroImage]);

  if (!src) {
    return <div className={styles.heroPlaceholder} />;
  }

  return (
    <Image
      src={src}
      alt={project.title}
      fill
      priority
      loading="eager"
      sizes="100vw"
      quality={90}
      className={`${styles.heroImage} ${visible ? styles.heroImageVisible : ''}`}
    />
  );
}