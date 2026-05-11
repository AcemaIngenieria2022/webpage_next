"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './PqrForm.module.css';
import PopupAlert from '../PopupAlert/PopupAlert';

const PqrForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState({ visible: false, status: 'success', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    email: '',
    phone: '',
    requestType: '',
    description: '',
  });
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'phone' || name === 'idNumber') {
      setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, '') }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, visible: false }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.idNumber.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.requestType.trim() ||
      !formData.description.trim()
    ) {
      setPopup({
        visible: true,
        status: 'error',
        message: 'Por favor completa todos los campos antes de enviar tu PQR.',
      });
      return;
    }

    setPopup({
      visible: true,
      status: 'success',
      message: 'PQR enviado correctamente. Gracias por tu mensaje.',
    });

    setFormData({
      name: '',
      idNumber: '',
      email: '',
      phone: '',
      requestType: '',
      description: '',
    });
  };

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
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h3 className={styles.subtitle}>¿Tienes algo que decirnos?</h3>
            
            <div className={styles.gridInputs}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre completo"
                className={styles.inputField}
              />
              <input
                type="tel"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="Número de identificación"
                className={styles.inputField}
                inputMode="numeric"
                pattern="\d*"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo"
                className={styles.inputField}
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Número de celular"
                className={styles.inputField}
                inputMode="numeric"
                pattern="\d*"
                required
              />
            </div>

            {/* Select Personalizado */}
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <button 
                type="button" 
                className={`${styles.requestButtonSelect} ${formData.requestType ? styles.activeBtn : ''}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {formData.requestType || 'Tipo de solicitud'} 
                <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <ul className={styles.dropdownList}>
                  {options.map((option, index) => (
                    <li 
                      key={index} 
                      className={styles.dropdownItem}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, requestType: option }));
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
              <label htmlFor="description" className={styles.textareaLabel}>
                Descripción detallada
              </label>
              <textarea
                id="description"
                className={styles.textArea}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botón Enviar (Alineado a la derecha debajo de la caja de texto) */}
            <div className={styles.footerRow}>
              <button type="submit" className={styles.submitButton}>
                Enviar
              </button>
            </div>
          </form>
          <PopupAlert visible={popup.visible} status={popup.status} message={popup.message} onClose={closePopup} />

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