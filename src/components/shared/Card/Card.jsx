import Image from 'next/image';
import styles from './Card.module.css';

const Card = ({ title, image, variant = 'grid' }) => {
  // Combinamos la clase base con la variante dinámica
  // Esto generará clases como "projectCard grid" o "projectCard horizontal"
  const cardClassName = `${styles.projectCard} ${styles[variant]}`;

  return (
    <div className={cardClassName}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 33vw"
          className={styles.projectImg}
          loading="lazy"
        />
      </div>
      <div className={styles.infoDetails}>
        <h3 className={styles.projectName}>{title}</h3>
      </div>
    </div>
  );
};

export default Card;


