import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutContainer}>
        
        {/* Left Side: Text Content */}
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutTitle}>Nosotros</h2>
          <div className={styles.aboutBody}>
            <p>
              Somos una empresa especializada en proyectos eléctricos y fotovoltaicos, 
              con sede en Medellín, Colombia. Nos destacamos por nuestra capacidad 
              para adaptarnos a las necesidades específicas de cada cliente.
            </p>
            <p>
              Orientamos nuestra gestión hacia la calidad, respaldada por la certificación 
              del Sistema de Gestión de Calidad.
            </p>
          </div>
        </div>

        {/* Right Side: YouTube Video */}
        <div className={styles.aboutVideoSide}>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/ilSGYjWafGM"
              title="Acema Corporate Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;