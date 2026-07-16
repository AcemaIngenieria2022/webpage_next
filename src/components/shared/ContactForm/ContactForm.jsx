"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 1. Importar Framer Motion
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
  const [isHoverable, setIsHoverable] = useState(false);

  const options = ["Servicios solares", "Servicios eléctricos", "Trabaja con nosotros"];
  const [attachment, setAttachment] = useState(null);
  const [attachmentError, setAttachmentError] = useState('');
  const [missingAttachmentAlert, setMissingAttachmentAlert] = useState(false);

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
    if (name === 'requestType') {
      setMissingAttachmentAlert(false);
      setAttachmentError('');
    }
  };

  const handleFile = (e) => {
    setAttachmentError('');
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setAttachment(null);
      return;
    }
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxBytes = 5 * 1024 * 1024; // 5 MB
    if (!allowed.includes(file.type)) {
      setAttachmentError('Formato no permitido. Solo PDF o Word.');
      setAttachment(null);
      return;
    }
    if (file.size > maxBytes) {
      setAttachmentError('Archivo demasiado grande (máx 5MB).');
      setAttachment(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || '';
      const base64 = result.split(',')[1] || '';
      setAttachment({ filename: file.name, content: base64, mimeType: file.type });
    };
    reader.readAsDataURL(file);
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

    if (formData.requestType === 'Trabaja con nosotros' && !attachment) {
      setMissingAttachmentAlert(true);
      setIsSubmitting(false);
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = { ...formData };
      if (attachment) payload.attachment = attachment;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.error || 'Fallo del servidor');
      }

      setPopup({
        visible: true,
        status: 'success',
        message: 'Formulario enviado con éxito. Tus datos han sido registrados y el equipo fue notificado.',
      });

      setFormData({ name: '', phone: '', email: '', company: '', requestType: '', message: '', accepted: false });
      setAttachment(null);
    } catch (error) {
      setPopup({
        visible: true,
        status: 'error',
        message: 'Hubo un problema al enviar la información. Por favor, reintenta.',
      });
    }
  };

  // 2. VARIANTES DE ANIMACIÓN CENTRALIZADAS
  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } }
  };

  const expandVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: "auto", marginTop: 15, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2, delay: 0.1 } } },
    exit: { opacity: 0, height: 0, marginTop: 0, transition: { height: { duration: 0.25 }, opacity: { duration: 0.1 } } }
  };

  const alertVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.15 } }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.tabHeader}>
          <span>Contáctanos</span>
        </div>

        {/* 3. layout permite que el contenedor crezca de forma animada automáticamente */}
        <motion.form layout className={styles.formCard} onSubmit={handleSubmit}>
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

          <div
            className={styles.dropdownContainer}
            ref={dropdownRef}
            {...(isHoverable
              ? { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) }
              : {})}
          >
            <button
              type="button"
              className={`${styles.requestButton} ${formData.requestType ? styles.activeBtn : ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {formData.requestType || 'Tipo de solicitud'}
              {/* 4. Animación nativa de rotación para el indicador +/- */}
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
                        setMissingAttachmentAlert(false);
                        setAttachmentError('');
                      }}
                    >
                      • {option}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Entrada del File Upload suavizada y expandible */}
          <AnimatePresence initial={false}>
            {formData.requestType === 'Trabaja con nosotros' && (
              <motion.div 
                className={styles.fileUploadWrapper}
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ overflow: 'hidden' }}
              >
                <label className={styles.fileLabel}>Adjunta tu Hoja de Vida (PDF, DOC, DOCX, máx 5MB)</label>
                <div className={styles.filePickerStack}>
                  <label htmlFor="contact-attachment" className={styles.filePickerLabel}>
                    Elegir archivo
                  </label>
                  <input
                    id="contact-attachment"
                    type="file"
                    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFile}
                    className={styles.fileInput}
                  />
                  <small className={styles.helperText}>Capacidad máxima de subida: 5 MB por archivo.</small>
                </div>
                
                <AnimatePresence>
                  {attachmentError && (
                    <motion.div className={styles.attachmentError} variants={alertVariants} initial="hidden" animate="visible" exit="exit">
                      {attachmentError}
                    </motion.div>
                  )}
                  {missingAttachmentAlert && (
                    <motion.div className={styles.missingAlert} variants={alertVariants} initial="hidden" animate="visible" exit="exit">
                      Por favor adjunta tu hoja de vida antes de enviar.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 6. El prop layout heredado aquí previene saltos bruscos cuando aparece el file input */}
          <motion.div layout="position" className={styles.textareaWrapper}>
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
          </motion.div>

          <motion.div layout="position" className={styles.footerRow}>
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
            
            {/* 7. Feedback táctil para el botón de enviar */}
            <motion.button
              type="submit"
              className={`${styles.submitButton} ${(popup.visible || isSubmitting) ? styles.submitButtonDisabled : ''} ${buttonAnimating ? styles.animateBlock : ''}`}
              disabled={popup.visible || isSubmitting}
              whileHover={(popup.visible || isSubmitting) ? {} : { scale: 1.02 }}
              whileTap={(popup.visible || isSubmitting) ? {} : { scale: 0.98 }}
            >
              {(isSubmitting) ? (
                <>
                  <span className={styles.spinner} aria-hidden="true"></span>
                  Enviando...
                </>
              ) : (
                'Enviar'
              )}
            </motion.button>
          </motion.div>
        </motion.form>
        <PopupAlert visible={popup.visible} status={popup.status} message={popup.message} onClose={closePopup} />
      </div>
      <p className={styles.footerSlogan}>¡Hacemos realidad tus proyectos eléctricos!</p>
    </div>
  );
};

export default ContactForm;