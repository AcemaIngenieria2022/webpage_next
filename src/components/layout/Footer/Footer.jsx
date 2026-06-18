import React from "react";
// Use native picture/img element to allow WEBP with PNG fallback for broader compatibility
import Link from "next/link";
import styles from "./Footer.module.css";

import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBriefcase,
  FaInstagram,
  FaLinkedin,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer} id="contacto">
      <div className={styles.footerContainer}>
        
        {/* LOGO IZQUIERDA */}
        <div className={styles.footerBrand}>
          <a href="">
            <picture>
              <source srcSet="/images/logs/logo-acema.webp" type="image/webp" />
              <img src="/images/logs/logo-acema.png" alt="ACEMA Ingeniería" width={220} height={80} className={styles.footerLogo} />
            </picture>
          </a>
        </div>

        {/* DATOS DE CONTACTO EN DOS COLUMNAS */}      
        <div className={styles.footerContact}>
          {/* Columna 1: WhatsApp, Dirección, Email */}
          <div className={styles.contactColumn}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaWhatsapp />
              </div>
              <span>(+57) 301 4577572</span>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaMapMarkerAlt />
              </div>
              <span>
                Calle 48A #81 A 30 Calasanz<br />
                - Medellín, Antioquia
              </span>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaEnvelope />
              </div>
              <span>Comercial@acemaingenieria.com</span>
            </div>
          </div>

          {/* Columna 2: Trabaja con nosotros + Tratamiento de datos + Síguenos */}
          <div className={styles.contactColumn}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaBriefcase />
              </div>
              <Link href="/contact" className={styles.workLink}>
                Trabaja con nosotros
              </Link>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaShieldAlt />
              </div>
              <Link href="/data-processing" className={styles.dataLink}>
                Tratamiento de datos
              </Link>
            </div>

            {/* SÍGUENOS CON ICONOS - DENTRO DE LA COLUMNA 2 */}
            <div className={styles.socialWrapper}>
              <div className={styles.socialLabel}>Síguenos:</div>
              <div className={styles.socialIcons}>
                <a href="https://www.instagram.com/acema_ingenieria/" className={styles.socialLink} aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/company/acema-ingenier%C3%ADa/posts/?feedView=all" className={styles.socialLink} aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MAPA DERECHA */}
        <div className={styles.footerMap}>
          <iframe
            title="Ubicación ACEMA"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.05436665042!2d-75.60333!3d6.25658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMjMuNyJOIDc1wrAzNicxMi4wIldc!5e0!3m2!1ses!2sco!4v1650000000000!5m2!1ses!2sco"
            className={styles.mapIframe}
            loading="lazy"
          ></iframe>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className={styles.footerBottom}>
        <p>© Todos los derechos reservados Acema ingeniería - 2026</p>
      </div>
    </footer>
  );
};

export default Footer;