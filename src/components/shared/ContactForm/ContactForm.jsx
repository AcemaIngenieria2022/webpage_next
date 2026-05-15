"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './ContactForm.module.css';
import PopupAlert from '../PopupAlert/PopupAlert';

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState({ visible: false, status: 'success', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    requestType: '',
    message: '',
    accepted: false,
  });
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: value.replace(/\D/g, '') }));
      return;
    }

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
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
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.company.trim() ||
      !formData.requestType.trim() ||
      !formData.message.trim() ||
      !formData.accepted
    ) {
      setPopup({
        visible: true,
        status: 'error',
        message: 'Por favor completa todos los campos y acepta la política de privacidad.',
      });
      return;
    }

    setPopup({
      visible: true,
      status: 'success',
      message: 'Formulario enviado con éxito. ¡Gracias por contactarnos!',
    });

    setFormData({
      name: '',
      phone: '',
      email: '',
      company: '',
      requestType: '',
      message: '',
      accepted: false,
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.tabHeader}>
          <span>Contáctanos</span>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Número de celular"
              className={styles.inputField}
              inputMode="numeric"
              pattern="\d*"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo"
              className={styles.inputField}
            />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de la empresa"
              className={styles.inputField}
            />
          </div>

          <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button
              type="button"
              className={`${styles.requestButton} ${formData.requestType ? styles.activeBtn : ''}`}
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

          <div className={styles.textareaWrapper}>
            <label htmlFor="message" className={styles.textareaLabel}>
              ¿En que podemos ayudarte?
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textArea}
            />
          </div>

          <div className={styles.footerRow}>
            <div className={styles.checkboxWrapper}>
             <a href="/data-processing" target="_blank" rel="noopener noreferrer">
                <span className={styles.policyText}>Políticas de privacidad</span>
              </a>
              
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="accepted"
                  checked={formData.accepted}
                  onChange={handleChange}
                  className={styles.hiddenCheckbox}
                />
                <span className={styles.customCheck}></span>
                Acepto
              </label>
            </div>
            <button type="submit" className={styles.submitButton}>Enviar</button>
          </div>
        </form>
        <PopupAlert visible={popup.visible} status={popup.status} message={popup.message} onClose={closePopup} />
      </div>
      <p className={styles.footerSlogan}>¡Hacemos realidad tus proyectos eléctricos!</p>
    </div>
  );
};

export default ContactForm;