"use client";

import React from 'react';
import styles from './WhatsAppButton.module.css';
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // Datos de contacto de ACEMA S.A.S.
  const phoneNumber = "573014577572";
  const message = "Hola, me gustaría obtener más información sobre sus servicios de ingeniería y energía solar.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      className={styles.whatsappButton}
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className={styles.whatsappIcon} />
    </button>
  );
};

export default WhatsAppButton;