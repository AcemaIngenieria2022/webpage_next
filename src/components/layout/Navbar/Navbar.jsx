'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSendingReport, setIsSendingReport] = useState(false);
  const [reportStatus, setReportStatus] = useState('');
  const timeoutRef = useRef(null);

  // --- FUNCIÓN isActive (DEBE ESTAR AQUÍ DENTRO) ---
  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };
  // --------------------------------------------------

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Funciones de manejo de eventos
  const handleMouseEnter = () => {
    if (window.innerWidth > 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      timeoutRef.current = setTimeout(() => {
        setShowDropdown(false);
      }, 150);
    }
  };

  // Cerrar dropdown cuando se abre el menú móvil
  useEffect(() => {
    if (isOpen && window.innerWidth <= 1024) {
      setShowDropdown(false);
    }
  }, [isOpen]);

  const handleDropdownClick = () => {
    if (window.innerWidth <= 1024) {
      setShowDropdown(!showDropdown);
    }
  };

  const handleSendWeeklyReport = async () => {
    try {
      setIsSendingReport(true);
      setReportStatus('');

      const response = await fetch('/api/reports/weekly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ days: 7 }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'No se pudo enviar el informe.');
      }

      setReportStatus('Informe enviado');
    } catch (error) {
      setReportStatus(error.message || 'Error al enviar el informe');
    } finally {
      setIsSendingReport(false);
      window.setTimeout(() => {
        setReportStatus('');
      }, 4000);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/">
          <div className={styles.navbarLogo}>
            <picture>
              <source srcSet="/images/logs/logo-acema.webp" type="image/webp" />
              <img 
                src="/images/logs/logo-acema.png" 
                alt="Logo ACEMA" 
                width={160} height={60} 
                className={`${styles.logoImage}`}
                fetchPriority="high"
                loading="eager"
              />
            </picture>
          </div>
        </Link>

        <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Inicio</span>
          </Link>

          <div 
            className={styles.navDropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDropdownClick}
          >
            <div className={`${styles.navLink} ${isActive('/services') ? styles.active : ''}`}>
              <span className={styles.linkText}>Servicios</span>
              <span className={`${styles.arrow} ${showDropdown ? styles.arrowRotate : ''}`}>▾</span>
            </div>

            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <Link href="/services/construccion-de-granjas/construccion-de-granjas" className={styles.dropdownItem} onClick={() => { setIsOpen(false); setShowDropdown(false); }}>
                  Construcción de granjas
                </Link>
                <Link href="/services/servicios-electricos" className={styles.dropdownItem} onClick={() => { setIsOpen(false); setShowDropdown(false); }}>
                  Servicios eléctricos
                </Link>
              </div>
            )}
          </div>

          <Link href="/projects" className={`${styles.navLink} ${isActive('/projects') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Proyectos</span>
          </Link>
          <Link href="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Contáctanos</span>
          </Link>
        </div>

        <button 
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span><span></span><span></span>
        </button>

        {reportStatus && (
          <div className={styles.reportStatus} role="status" aria-live="polite">
            {reportStatus}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;