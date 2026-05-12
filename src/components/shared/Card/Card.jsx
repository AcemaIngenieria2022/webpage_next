import React from 'react';
import Image from 'next/image';
import styles from './Card.module.css';

const Card = ({ title, image }) => {
  return (
    <div className={styles.projectCard}>
      {/* Contenedor de la Imagen con el efecto de escala al hacer hover */}
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={title} 
          className={styles.projectImg} 
        />
      </div>

      {/* Panel de información con el azul corporativo y Montserrat */}
      <div className={styles.infoDetails}>
        <h3 className={styles.projectName}>{title}</h3>
        {/* Si en el futuro quieres añadir ubicación, puedes pasarla como prop */}
        <p className={styles.projectLocation}>ACEMA Ingeniería</p>
      </div>
    </div>
  );
};

export default Card;