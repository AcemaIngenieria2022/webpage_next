"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PqrForm.module.css';
import PopupAlert from '../PopupAlert/PopupAlert';

const USER_TYPE_OPTIONS = ['Cliente', 'Proveedor', 'Otros'];
const PQRS_SUBTYPE_OPTIONS = ['Petición', 'Queja', 'Reclamo', 'Sugerencia', 'Felicitaciones'];

const EMPTY_FORM = {
  name: '',
  userType: '',
  idNumber: '',
  email: '',
  phone: '',
  // Los demás canales (acoso, requerimiento legal, comunidad) tienen su propia página
  requestType: 'PQRS',
  pqrsSubtype: '',
  description: '',
};

// Animaciones compartidas con ContactForm para el dropdown
const dropdownVariants = {
  hidden: { opacity: 0, y: -15, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } }
};

export const Dropdown = ({ placeholder, value, options, onSelect, isHoverable, fullWidth = false, zIndex = 10 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.dropdownContainer} ${fullWidth ? styles.dropdownFullWidth : ''}`}
      style={{ zIndex }}
      ref={ref}
      {...(isHoverable
        ? { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) }
        : {})}
    >
      <button
        type="button"
        className={`${styles.requestButtonSelect} ${fullWidth ? styles.selectFullWidth : ''} ${value ? styles.activeBtn : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {value || placeholder}
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
            className={`${styles.dropdownList} ${fullWidth ? styles.dropdownListFullWidth : ''}`}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={value === option}
                className={styles.dropdownItem}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                ○ {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const PqrForm = () => {
  const [popup, setPopup] = useState({ visible: false, status: 'success', message: '' });
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isHoverable, setIsHoverable] = useState(false);


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

  const setField = (name) => (value) => {
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
      !formData.userType.trim() ||
      !formData.idNumber.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.pqrsSubtype.trim() ||
      !formData.description.trim()
    ) {
      setPopup({
        visible: true,
        status: 'error',
        message: 'Por favor completa todos los campos antes de enviar tu solicitud.',
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
        title: '¡Tu solicitud fue radicada!',
        message: 'Guarda este número para hacer seguimiento a tu solicitud.',
        radicado: data.radicado,
        footnote: 'También te enviamos este número a tu correo electrónico.',
      });

      setFormData(EMPTY_FORM);
    } catch (error) {
      setPopup({
        visible: true,
        status: 'error',
        message: 'No pudimos registrar tu solicitud. Inténtalo de nuevo más tarde.',
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
              <Dropdown
                placeholder="Tipo de usuario"
                value={formData.userType}
                options={USER_TYPE_OPTIONS}
                onSelect={setField('userType')}
                isHoverable={isHoverable}
                fullWidth
                zIndex={30}
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
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo"
                className={`${styles.inputField} ${styles.fullRow}`}
                required
              />
            </div>

            <div className={styles.dropdownRow}>
              <Dropdown
                placeholder="Tipo de solicitud"
                value={formData.pqrsSubtype}
                options={PQRS_SUBTYPE_OPTIONS}
                onSelect={setField('pqrsSubtype')}
                isHoverable={isHoverable}
                zIndex={20}
              />
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
          <PopupAlert visible={popup.visible} status={popup.status} title={popup.title} message={popup.message} radicado={popup.radicado} footnote={popup.footnote} onClose={closePopup} />

          <div className={styles.infoBoxSide}>
            <p className={styles.infoText}>
              Nuestra atención al cliente está disponible de: <strong>lunes a viernes de 7:00 a.m a 4:20 p.m.</strong>
            </p>
          </div>
        </div>

        <div className={styles.dividerLine}></div>
      </div>
    </div>
  );
};

export default PqrForm;
