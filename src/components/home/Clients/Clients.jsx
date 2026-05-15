import React from 'react';
import Image from 'next/image';
import styles from './Clients.module.css';

const Clients = () => {
  const clientList = [
    { name: 'ERCO', logo: '/images/clients/erco.webp' },
    { name: 'Suncolombia', logo: '/images/clients/sun.webp' },
    { name: 'URRÁ', logo: '/images/clients/urra.webp' },
    { name: 'ABB', logo: '/images/clients/abb.webp' },
    { name: 'GREEN', logo: '/images/clients/green.webp' },
    { name: 'POWER', logo: '/images/clients/power.webp' },
    { name: 'ELECTRIC', logo: '/images/clients/electric.webp' },
    { name: 'SIEMENS', logo: '/images/clients/siemens.webp' },
  ];

  // Duplicamos la lista para asegurar un loop infinito sin saltos visuales
  const logos = [...clientList, ...clientList];

  return (
    <section className={styles.clientsSection}>
      <h2 className={styles.clientsTitle}>Nuestros clientes</h2>

      <div className={styles.marquee}>
        <div className={styles.logosTrack}>
          {logos.map((client, index) => (
            <div key={`${client.name}-${index}`} className={styles.logoItem}>
              <Image 
                src={client.logo} 
                alt={client.name}
                width={180}   
                height={80}   
                className={styles.clientImage}
                priority={index < 8}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;