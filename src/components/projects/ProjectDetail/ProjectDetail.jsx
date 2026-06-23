'use client';

import Image from 'next/image';
import thumbs from '@/data/project-thumbs.json';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
      if (url.includes('/embed/')) return url;
      if (url.includes('youtube.com/watch')) {
        const parts = url.split('v=');
        const id = parts[1] ? parts[1].split('&')[0] : null;
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
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

  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const [playerError, setPlayerError] = useState(false);
  const [playerLoading, setPlayerLoading] = useState(false);
  const containerRef = useRef(null);
  const [showFallbackModal, setShowFallbackModal] = useState(false);

  // YouTube IFrame API player handling
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
          playerVars: { 
            modestbranding: 1, 
            rel: 0, 
            playsinline: 1, 
            controls: 1, 
            enablejsapi: 1,
            origin: window.location?.origin || location.origin
          },
          events: {
            onReady: (event) => {
              setPlayerLoading(false);
              try {
                const prefs = ['hd1080', 'hd720', 'large', 'medium'];
                for (const q of prefs) {
                  try {
                    if (typeof playerInstanceRef.current.setPlaybackQuality === 'function') {
                      playerInstanceRef.current.setPlaybackQuality(q);
                    }
                  } catch (err) {
                    // ignore
                  }
                }
              } catch (err) {
                // noop
              }
            },
            onError: (event) => {
              setPlayerError(true);
              setPlayerLoading(false);
              try { playerInstanceRef.current.destroy(); } catch (e) {}
              playerInstanceRef.current = null;
            },
            onPlaybackQualityChange: (ev) => {
              // optional
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
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existing) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
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

  // Fullscreen handling
  useEffect(() => {
    if (!youtubeId) return;

    function onFsChange() {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
      const isFs = !!fsEl && containerRef.current && (containerRef.current === fsEl || containerRef.current.contains(fsEl));

      if (isFs) {
        document.body.classList.add('youtube-fullscreen');
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

  // Asegurar que el video se mantenga dentro del contenedor
  useEffect(() => {
    const ensureVideoBounds = () => {
      const videoBox = containerRef.current;
      if (!videoBox) return;
      
      const iframe = videoBox.querySelector('iframe');
      if (!iframe) return;
      
      const containerWidth = videoBox.clientWidth;
      if (iframe.clientWidth > containerWidth) {
        iframe.style.width = `${containerWidth}px`;
      }
    };

    ensureVideoBounds();
    window.addEventListener('resize', ensureVideoBounds);
    
    return () => {
      window.removeEventListener('resize', ensureVideoBounds);
    };
  }, []);

  if (!project) return null;

  // Variants para animación escalonada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      {/* Toggle superior */}
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

      {/* Sección Hero */}
      <section className={styles.heroSection}>
        {project.heroImage ? (
          <div className={styles.imageContainer}>
            <div className="w-full h-full" style={{ height: '100%', position: 'relative' }}>
              <ProjectHeroImage project={project} />
            </div>
          </div>
        ) : null}
        
        {/* Curva SVG */}
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

      {/* Contenido */}
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <motion.div 
            className={styles.titleBadge}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1>{project.title}</h1>
          </motion.div>
        </header>

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

            {/* Columna de video - CORREGIDA */}
            <motion.div className={styles.videoColumn} variants={itemVariants}>
              <div className={styles.videoBox} ref={containerRef}>
                {/* Wrapper interno para asegurar el contenido */}
                <div className={styles.videoInnerWrapper}>
                  {youtubeId && !playerError ? (
                    <div 
                      id={`youtube-player-${youtubeId}`} 
                      ref={playerRef} 
                      className={styles.youtubePlayer}
                    />
                  ) : videoEmbedUrl && !playerError ? (
                    <iframe
                      src={(() => {
                        try {
                          const url = new URL(videoEmbedUrl);
                          if (!url.search) url.search = `origin=${encodeURIComponent(window.location.origin)}`;
                          else url.search += `&origin=${encodeURIComponent(window.location.origin)}`;
                          return url.toString();
                        } catch (e) {
                          return videoEmbedUrl;
                        }
                      })()}
                      title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.videoIframe}
                    />
                  ) : null}

                  {/* Fallback */}
                  {youtubeThumb && youtubeWatchUrl && (playerError || !videoEmbedUrl) ? (
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

                      {showFallbackModal && (
                        <div className={styles.fallbackModal} role="dialog" aria-modal="true">
                          <div className={styles.fallbackModalContent}>
                            <h3>Video no reproducible aquí</h3>
                            <p>El propietario del video ha restringido la reproducción embebida. Puedes verlo en YouTube.</p>
                            <div className={styles.fallbackModalActions}>
                              <a href={youtubeWatchUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
                                Ver en YouTube
                              </a>
                              <button 
                                type="button" 
                                onClick={() => { navigator.clipboard?.writeText(youtubeWatchUrl); }} 
                                className={styles.secondaryButton}
                              >
                                Copiar enlace
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setShowFallbackModal(false)} 
                                className={styles.ghostButton}
                              >
                                Cerrar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Especificaciones */}
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

          {/* Footer */}
          <footer className={styles.footer}>
            <motion.p variants={itemVariants}>{project.textfooter}</motion.p>
            
            <motion.button 
              className={styles.ctaButton} 
              onClick={() => router.push('/contact')}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Hacemos realidad tus proyectos
            </motion.button>
            
            <motion.div variants={itemVariants} className={styles.carouselWrapper}>
              <ProjectMiniCarousel images={carouselImages || [project.heroImage]} />
            </motion.div>
          </footer>
        </motion.div>
      </div>
    </article>
  );
}

// Componente de imagen hero progresiva
function ProjectHeroImage({ project }) {
  const mapped = thumbs[project.heroImage];
  const [src, setSrc] = useState(null);
  const [visible, setVisible] = useState(false);

  // Preload the hero image to speed up rendering in the browser
  useEffect(() => {
    if (!project?.heroImage) return;
    const href = project.heroImage;
    // Avoid adding duplicate preload links
    const existing = Array.from(document.querySelectorAll('link[rel="preload"][as="image"]')).find(l => l.href && l.href.endsWith(href));
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    document.head.appendChild(link);

    return () => {
      try { if (link.parentNode) link.parentNode.removeChild(link); } catch (e) {}
    };
  }, [project?.heroImage]);

  useEffect(() => {
    // Mostrar la imagen original desde el inicio para evitar pixelado
    const initialSrc = project.heroImage || mapped;
    setSrc(initialSrc);
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
      fetchPriority="high"
      sizes="100vw"
      quality={90}
      className={`${styles.heroImage} ${visible ? styles.heroImageVisible : ''}`}
    />
  );
}