import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.css';

const Card = ({ title, image, variant = 'grid', href, titleClassName }) => {
  const cardClassName = `${styles.projectCard} ${styles[variant]}`;

  const inner = (
    <>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title || ''}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 33vw"
          className={styles.projectImg}
          loading="lazy"
        />
      </div>
      <div className={styles.infoDetails}>
        <h3 className={`${styles.projectName} ${titleClassName || ''}`.trim()}>{title}</h3>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {inner}
      </Link>
    );
  }

  return <div className={cardClassName}>{inner}</div>;
};

export default Card;


