"use client";

import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = ({ onLearnMore }) => {
  const treatmentPurposes = [
    "Ejecutar contratos y gestionar relaciones comerciales, laborales o civiles.",
    "Cumplir con obligaciones legales, tributarias, laborales y de seguridad social.",
    "Gestionar los servicios ofrecidos y optimizar la atención al cliente.",
    "Desarrollar procesos de selección, contratación, nómina y bienestar laboral.",
    "Enviar comunicaciones comerciales, promocionales y de interés, siempre que el titular haya autorizado su envío.",
    "Realizar encuestas de satisfacción, análisis de tendencias y mejora de procesos.",
    "Cumplir requerimientos judiciales o administrativos.",
    "Controlar el acceso a las instalaciones mediante sistemas biométricos y de videovigilancia."
  ];

  const userRights = [
    "Conocer, actualizar, rectificar y suprimir sus datos personales.",
    "Solicitar prueba de la autorización otorgada.",
    "Ser informados del uso dado a sus datos.",
    "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.",
    "Revocar la autorización y/o solicitar la eliminación de sus datos cuando proceda."
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header Section */}
        <header className={styles.header}>
          <h1 className={styles.mainTitle}>
            POLÍTICA DE PRIVACIDAD Y <br />
            TRATAMIENTO DE DATOS PERSONALES
          </h1>

          <h2 className={styles.sectionTitle}>
            Introducción a la Política de Tratamiento de Datos
          </h2>
          <p className={styles.description}>
            En ACEMA INGENIERÍA S.A.S. garantizamos la protección y confidencialidad 
            de los datos personales de nuestros usuarios, clientes, proveedores y 
            colaboradores, en cumplimiento de la Ley 1581 de 2012, la Ley 1266 de 2008, 
            el Decreto 1377 de 2013 y demás normas aplicables en Colombia.
          </p>
          <span className={styles.subtitle}>Finalidad del tratamiento de datos</span>
        </header>

        {/* Highlighted Purposes Card */}
        <section className={styles.purposesCard}>
          <h3 className={styles.cardHeader}>Usamos la información personal para:</h3>
          <ul className={styles.list}>
            {treatmentPurposes.map((purpose, index) => (
              <li key={index} className={styles.listItem}>
                {purpose}
              </li>
            ))}
          </ul>
        </section>

        {/* Information Blocks */}
        <div className={styles.detailsContainer}>
          <section className={styles.infoBlock}>
            <h3 className={styles.blockTitle}>Principios del tratamiento de datos</h3>
            <p className={styles.textSmall}>
              Nuestros datos se manejan bajo los principios de legalidad, finalidad, consentimiento, seguridad, transparencia, veracidad y conservación limitada.
            </p>
          </section>

          <section className={styles.infoBlock}>
            <h3 className={styles.blockTitle}>Derechos de los titulares</h3>
            <p className={styles.textMedium}>Usted puede:</p>
            <ul className={styles.list}>
              {userRights.map((right, index) => (
                <li key={index} className={styles.listItem}>
                  {right}
                </li>
              ))}
            </ul>

            <div className={styles.contactInfo}>
              <p>Para ejercer estos derechos, contáctenos en:</p>
              <p><strong>Correo:</strong> <span className={styles.link}>comunicaciones.corporativas@acemaingenieria.com</span></p>
              <p><strong>Teléfono:</strong> 313 663 3929</p>
              <p><strong>Dirección:</strong> Calle 48A #81A-30, Barrio Calasanz, Medellín – Antioquia, Colombia</p>
            </div>
          </section>

          <section className={styles.infoBlock}>
            <h3 className={styles.blockTitle}>Seguridad y transferencia</h3>
            <p className={styles.textSmall}>
              Implementamos medidas de seguridad físicas, técnicas y administrativas para proteger la información. Los datos 
              podrán ser transferidos dentro o fuera del país solo cuando sea necesario para fines contractuales, legales u 
              operativos, garantizando protección equivalente.
            </p>
          </section>

          {/* Action Footer */}
          <footer className={styles.actionFooter}>
            <p className={styles.ctaText}>Para conocer la política completa, haga clic aquí:</p>
            <button className={styles.ctaButton} onClick={onLearnMore}>
              Conocer más
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;