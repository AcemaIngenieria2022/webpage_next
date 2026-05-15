'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

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
            <Image 
              src="/images/logs/logo-acema.png" 
              alt="Logo ACEMA" 
              width={160} 
              height={60} 
              className={styles.logoImage}
              priority 
            />
          </div>
        </Link>

        <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Inicio</span>
          </Link>

          {/* CONTENEDOR DEL DROPDOWN */}
          <div 
            className={styles.navDropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDropdownClick}
          >
            <div className={styles.navLink}>
              <span className={styles.linkText}>Servicios</span>
              <span className={`${styles.arrow} ${showDropdown ? styles.arrowRotate : ''}`}>▾</span>
            </div>

              
                
            {/*      showDropDown modificado del original que tengo con Santi */}
            
            
                        {/* DENTRO DEL DROPDOWN EN TU NAVBAR */}
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                {/* Este va a la página principal de servicios (Granjas) */}
                <Link href="/services" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>
                  Construcción de granjas
                </Link>
                
                {/* Este ENTRA a la ruta dinámica [slug] */}
                <Link href="/services/centros-transformacion" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>
                  Centros de transformación
                </Link>
                
                {/* Este también entraría a la ruta dinámica */}
                <Link href="/services/servicios-electricos" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>
                  Servicios eléctricos
                </Link>
              </div>
            )}
          </div>

          <Link href="/projects" className={styles.navLink} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Proyectos</span>
          </Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Contáctanos</span>
          </Link>
          <Link href="/blog" className={styles.navLink} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Blog</span>
          </Link>
           
          <Link href="/pqrs" className={styles.navLink} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>PQRS</span>
          </Link>
          <Link href="/data-processing" className={styles.navLink} onClick={() => setIsOpen(false)}>
            <span className={styles.linkText}>Tratamiento de datos</span>
          </Link>

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