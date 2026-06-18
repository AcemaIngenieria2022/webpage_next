'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
// Use native picture/img so browser picks WEBP when available with PNG fallback
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  // Función para determinar si un link es activo
  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  // Cerrar menús al cambiar el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
        setShowDropdown(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lógica para escritorio: Abrir con retraso para suavidad
  const handleMouseEnter = () => {
    if (window.innerWidth > 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      // Retraso de 150ms para que no se cierre si el mouse sale un segundo
      timeoutRef.current = setTimeout(() => {
        setShowDropdown(false);
      }, 150);
    }
  };

  // Lógica para móvil: Click
  const handleDropdownClick = () => {
    if (window.innerWidth <= 1024) {
      setShowDropdown(!showDropdown);
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
                width={160} 
                height={60} 
                className={styles.logoImage}
                fetchPriority="high"  // ✅ CORREGIDO: 'P' mayúscula
                loading="eager"
              />
            </picture>
          </div>
        </Link>

        <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Inicio</span>
          </Link>

          {/* <Link href="/about" className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Nosotros</span>
          </Link> */}

          {/* CONTENEDOR DEL DROPDOWN */}
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
                <Link href="/services/construccion-de-granjas" className={styles.dropdownItem} onClick={() => { setIsOpen(false); setShowDropdown(false); }}>
                  Construcción de granjas
                </Link>
                <Link href="/services/centros-de-transformacion" className={styles.dropdownItem} onClick={() => { setIsOpen(false); setShowDropdown(false); }}>
                  Centros de transformación
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
          <Link href="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Blog</span>
          </Link>
  {/*            
            <Link href="/pqrs" className={`${styles.navLink} ${isActive('/pqrs') ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
              <span className={styles.linkText}>PQRS</span>
            </Link> */}
          {/* Tratamiento de datos moved to Footer for easier access on mobile */}

        </div>

        <button 
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;