import Image from 'next/image';
import { mediosData } from '@/data/medios';
import styles from './page.module.css';

export const metadata = {
  title: 'En medios | Acema Ingeniería',
  description: 'Notas de prensa y publicaciones sobre Acema Ingeniería y la generación distribuida en Colombia.',
};

export default function EnMediosPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>En medios</h1>

      <ul className={styles.grid}>
        {mediosData.map((nota) => (
          <li key={nota.slug} className={styles.card}>
            <a
              href={`/medios/${nota.slug}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageWrapper}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={`/images/medios/${nota.slug}.webp`}
                alt={`${nota.titulo} (${nota.medio}, ${nota.fecha})`}
                fill
                sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 260px"
                className={styles.image}
              />
            </a>
            <a
              href={`/medios/${nota.slug}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
              aria-label={`Ver más: ${nota.titulo} (${nota.medio})`}
            >
              Ver más
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
