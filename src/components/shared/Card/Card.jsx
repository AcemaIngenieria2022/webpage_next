  
import Image from 'next/image';
import styles from './Card.module.css';

const Card = ({ title, image }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 33vw"
          className={styles.projectImg}
          loading="lazy"
          priority={false}
        />
      </div>
      <div className={styles.infoDetails}>
        <h3 className={styles.projectName}>{title}</h3>
      </div>
    </div>
  );
};
export default Card;