import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';
import thumbs from '@/data/project-thumbs.json';

const BlogCard = ({ slug, title, subtitle, image, variant = 'regular', href }) => {
  const cardClass = `${styles.card} ${styles[variant] ?? ''}`;
  const destination = href ?? `/blog/${slug}`;

  return (
    <Link href={destination} className={cardClass}>
      <div className={styles.imageContainer}>
        <Image
          src={thumbs[image] || image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 33vw"
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.textContent}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
    </Link>
  );
};

export default BlogCard;
