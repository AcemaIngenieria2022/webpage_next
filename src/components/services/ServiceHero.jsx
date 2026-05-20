import Image from 'next/image';
import Card from '@/components/shared/Card/Card';
import styles from './ServiceHero.module.css';

const ServiceHero = ({ backgroundImage, altText, subServices = [] }) => {
  return (
    <>
      {/* BANNER REUTILIZANDO TUS CLASES */}
      <div className={styles.hero}>
        <img 
          src={backgroundImage} 
          alt={altText} 
          className={styles.heroImage}
        />
      </div>

      {/* SECCIÓN UNIFICADA DE TARJETAS */}
      {subServices.length > 0 && (
        <section className={styles.cardsSection}>
          {/* Añadimos data-count dinámico basado en la cantidad de elementos */}
          <div className={styles.cardsGrid} data-count={subServices.length}>
            {subServices.map((item, index) => (
              <Card 
                key={index}
                title={item.title}
                image={item.image}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceHero;