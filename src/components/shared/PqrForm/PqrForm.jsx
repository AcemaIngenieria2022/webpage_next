"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './PqrForm.module.css';

const PqrForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Tipo de solicitud');
  const dropdownRef = useRef(null);

  const options = ["Petición", "Queja", "Reclamo", "Sugerencia"];

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
        
        {/* Encabezado Píldora */}
        <div className={styles.pillHeader}>
          Preguntas, quejas y reclamos
        </div>

        {/* Línea decorativa verde SUPERIOR */}
        <div className={styles.dividerLine}></div>

        <div className={styles.formContentWrapper}>
          <form className={styles.formCard} onSubmit={(e) => e.preventDefault()}>
            <h3 className={styles.subtitle}>¿Tienes algo que decirnos?</h3>
            
            <div className={styles.gridInputs}>
              <input type="text" placeholder="Nombre completo" className={styles.inputField} />
              <input type="text" placeholder="Número de identificación" className={styles.inputField} />
              <input type="email" placeholder="Correo" className={styles.inputField} />
              <input type="text" placeholder="Número de celular" className={styles.inputField} />
            </div>

            {/* Select Personalizado */}
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <button 
                type="button" 
                className={`${styles.requestButtonSelect} ${isOpen ? styles.activeBtn : ''}`}
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
                      onClick={() => {
                        setSelectedType(option);
                        setIsOpen(false);
                      }}
                    >
                      • {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Textarea */}
            <div className={styles.textareaWrapper}>
              <textarea className={styles.textArea} placeholder="Descripción detallada"></textarea>
            </div>

            {/* Botón Enviar (Alineado a la derecha debajo de la caja de texto) */}
            <div className={styles.footerRow}>
              <button type="submit" className={styles.submitButton}>
                Enviar
              </button>
            </div>
          </form>

          {/* Cuadro de Información Lateral */}
          <div className={styles.infoBoxSide}>
            <p>
              Nuestra atención al cliente está disponible de: <br />
              <strong>lunes a viernes, de 7:00 a.m. a 5:00 p.m.</strong>
            </p>
          </div>
        </div>

        {/* Línea decorativa verde INFERIOR */}
        <div className={styles.dividerLine}></div>
      </div>
    </div>
  );
};

export default PqrForm;