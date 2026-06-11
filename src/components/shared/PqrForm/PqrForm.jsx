"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isHoverable, setIsHoverable] = useState(false);

  const options = ["Petición", "Queja", "Reclamo", "Sugerencia"];

  // Animaciones compartidas con ContactForm para el dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsHoverable(!!mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
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

  const [buttonAnimating, setButtonAnimating] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (popup.visible) {
      setButtonAnimating(true);
      const t = setTimeout(() => {
        setButtonAnimating(false);
        setIsSubmitting(false);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [popup.visible]);

  const handleSubmit = async (event) => {
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

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/pqrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.error || 'Fallo del servidor');
      }

      setPopup({
        visible: true,
        status: 'success',
        message: `Tu PQRS ha sido radicado con éxito. Número asignado: ${data.radicado}. Se envió una copia de confirmación a tu correo.`,
      });

      setFormData({ name: '', idNumber: '', email: '', phone: '', requestType: '', description: '' });
    } catch (error) {
      setPopup({
        visible: true,
        status: 'error',
        message: 'No pudimos registrar tu PQRS. Inténtalo de nuevo más tarde.',
      });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.pillHeader}>Preguntas, quejas y reclamos</div>
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
                type="text"
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

            <div
              className={styles.dropdownContainer}
              ref={dropdownRef}
              {...(isHoverable
                ? { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) }
                : {})}
            >
                <button
                  type="button"
                  className={`${styles.requestButtonSelect} ${formData.requestType ? styles.activeBtn : ''}`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {formData.requestType || 'Tipo de solicitud'}
                  <motion.span
                    className={styles.icon}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? '−' : '+'}
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      className={styles.dropdownList}
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
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
                    </motion.ul>
                  )}
                </AnimatePresence>
            </div>

            <div className={styles.textareaWrapper}>
              <label htmlFor="description" className={styles.textareaLabel}>Descripción detallada</label>
              <textarea
                id="description"
                className={styles.textArea}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.footerRow}>
              <button
                type="submit"
                className={`${styles.submitButton} ${(popup.visible || isSubmitting) ? styles.submitButtonDisabled : ''} ${buttonAnimating ? styles.animateBlock : ''}`}
                disabled={popup.visible || isSubmitting}
              >
                {(isSubmitting) ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true"></span>
                    Enviando...
                  </>
                ) : (
                  'Enviar'
                )}
              </button>
            </div>
          </form>
          <PopupAlert visible={popup.visible} status={popup.status} message={popup.message} onClose={closePopup} />

          <div className={styles.infoBoxSide}>
            <p className={styles.infoText}>
              Nuestra atención al cliente está disponible de: <strong>lunes a viernes, de 7:00 a.m. a 5:00 p.m.</strong>
            </p>
          </div>
        </div>

        <div className={styles.dividerLine}></div>
      </div>
    </div>
  );
};

export default PqrForm;