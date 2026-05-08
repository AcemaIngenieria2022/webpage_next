import React from 'react';
import Image from 'next/image';
import styles from './Clients.module.css';

const Clients = () => {
  const clientList = [
    { name: 'ERCO', logo: '/images/clients/erco.webp' },
    { name: 'Suncolombia', logo: '/images/clients/sun.webp' },
    { name: 'URRÁ', logo: '/images/clients/urra.webp' }
  ];

  return (
    <section className={styles.clientsSection}>
      <h2 className={styles.clientsTitle}>
        Nuestros clientes
      </h2>

      <div className={styles.logosGrid}>
        {clientList.map((client, index) => (
          <div key={index} className={styles.logoItem}>
            <Image 
              src={client.logo} 
              alt={client.name}
              width={180}   
              height={80}   
              className={styles.clientImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;