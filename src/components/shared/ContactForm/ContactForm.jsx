"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Tipo de solicitud');
  const dropdownRef = useRef(null);

  const options = ["Servicios solares", "Servicios eléctricos", "Trabaja con nosotros"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.tabHeader}>
          <span>Contáctanos</span>
        </div>

        <form className={styles.formCard} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.gridInputs}>
            <input type="text" placeholder="Nombre completo" className={styles.inputField} />
            <input type="text" placeholder="Número de celular" className={styles.inputField} />
            <input type="email" placeholder="Correo" className={styles.inputField} />
            <input type="text" placeholder="Nombre de la empresa" className={styles.inputField} />
          </div>

          <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button 
              type="button" 
              className={`${styles.requestButton} ${isOpen ? styles.activeBtn : ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedType} 
              <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen && (
              <ul className={styles.dropdownList}>
                {options.map((option, index) => (
                  <li 
                    key={index} 
                    className={styles.dropdownItem}
                    onClick={() => { setSelectedType(option); setIsOpen(false); }}
                  >
                    • {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.textareaWrapper}>
            <label className={styles.textareaLabel}>¿En que podemos ayudarte?</label>
            <textarea className={styles.textArea}></textarea>
          </div>

          <div className={styles.footerRow}>
            <div className={styles.checkboxWrapper}>
              <span className={styles.policyText}>Políticas de privacidad</span>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.hiddenCheckbox} />
                <span className={styles.customCheck}></span>
                Acepto
              </label>
            </div>
            <button type="submit" className={styles.submitButton}>Enviar</button>
          </div>
        </form>
      </div>
      <p className={styles.footerSlogan}>¡Hacemos realidad tus proyectos eléctricos!</p>
    </div>
  );
};

export default ContactForm;