import React from 'react';
import Image from 'next/image';
import styles from './Clients.module.css';
import thumbs from '@/data/project-thumbs.json';

const Clients = () => {
  const clientList = [
    { name: 'ERCO', logo: '/images/clients/erco.webp' },
    { name: 'URRÁ', logo: '/images/clients/urra.webp' },
    // { name: 'ABB', logo: '/images/clients/abb.webp' },
    // { name: 'GREEN', logo: '/images/clients/green.webp' },
    // { name: 'POWER', logo: '/images/clients/power.webp' },
    // { name: 'ELECTRIC', logo: '/images/clients/electric.webp' },
    // { name: 'SIEMENS', logo: '/images/clients/siemens.webp' },
    // { name: 'SOL', logo: '/images/clients/sol.webp' },
  ];

  // Duplicamos la lista para asegurar un loop infinito sin saltos visuales
  return (
    <section className={styles.clientsSection}>
      <h2 className={styles.clientsTitle}>Nuestros clientes</h2>

      <div className={styles.logosGrid}>
        {clientList.map((client, index) => (
          <div key={`${client.name}-${index}`} className={styles.logoItem}>
            <Image 
              src={thumbs[client.logo] || client.logo} 
              alt={client.name}
              fill
              className={styles.clientImage}
              style={{ objectFit: 'contain' }}
              priority={index < 8}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;