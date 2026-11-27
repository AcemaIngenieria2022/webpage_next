'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const SERVICES_LINKS = [
  { href: '/services/construccion-de-granjas/construccion-de-granjas', label: 'Construcción de granjas' },
  { href: '/services/servicios-electricos', label: 'Servicios eléctricos' },
];

const CHANNEL_LINKS = [
  { href: '/pqrs', label: 'PQRS' },
  { href: '/linea-etica', label: 'Línea Ética' },
  { href: '/acoso-laboral', label: 'Acoso laboral y discriminación' },
  { href: '/acoso-sexual', label: 'Acoso sexual' },
  { href: '/requerimiento-legal', label: 'Requerimientos legales' },
  { href: '/atencion-comunidad', label: 'Atención a la comunidad' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // 'services' | 'channels' | null
  const [openDropdown, setOpenDropdown] = useState(null);
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
  const handleMouseEnter = (key) => {
    if (window.innerWidth > 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpenDropdown(key);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
      }, 150);
    }
  };

  // Cerrar dropdown cuando se abre el menú móvil
  useEffect(() => {
    if (isOpen && window.innerWidth <= 1024) {
      setOpenDropdown(null);
    }
  }, [isOpen]);

  const handleDropdownClick = (key) => {
    if (window.innerWidth <= 1024) {
      setOpenDropdown((prev) => (prev === key ? null : key));
    }
  };

  const closeMenus = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const renderDropdown = (key, label, links, activePaths) => {
    const isShown = openDropdown === key;
    const active = activePaths.some((path) => isActive(path));
    return (
      <div
        className={styles.navDropdown}
        onMouseEnter={() => handleMouseEnter(key)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleDropdownClick(key)}
      >
        <div className={`${styles.navLink} ${active ? styles.active : ''}`}>
          <span className={styles.linkText}>{label}</span>
          <span className={`${styles.arrow} ${isShown ? styles.arrowRotate : ''}`}>▾</span>
        </div>

        {isShown && (
          <div className={styles.dropdownMenu}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={styles.dropdownItem} onClick={closeMenus}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
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

          {renderDropdown('services', 'Servicios', SERVICES_LINKS, ['/services'])}

          <Link href="/projects" className={`${styles.navLink} ${isActive('/projects') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Proyectos</span>
          </Link>
          <Link href="/en-medios" className={`${styles.navLink} ${isActive('/en-medios') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>En medios</span>
          </Link>
          <Link href="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Contáctanos</span>
          </Link>

          {renderDropdown('channels', 'Canales de atención', CHANNEL_LINKS, CHANNEL_LINKS.map((link) => link.href))}
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