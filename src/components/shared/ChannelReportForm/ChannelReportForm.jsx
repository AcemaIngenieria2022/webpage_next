"use client";

import React, { useEffect, useState } from 'react';
import styles from '../PqrForm/PqrForm.module.css';
import PopupAlert from '../PopupAlert/PopupAlert';
import { Dropdown } from '../PqrForm/PqrForm';

const USER_TYPE_OPTIONS = ['Cliente', 'Proveedor', 'Otros'];

const EMPTY_FORM = {
  name: '',
  userType: '',
  phone: '',
  idNumber: '',
  email: '',
  city: '',
  department: '',
  position: '',
  description: '',
  tieneEvidencia: null,
  adjuntos: [],
};

/**
 * Formulario de los canales de atención que se radican por correo
 * (Acoso laboral, Acoso sexual, Requerimiento legal).
 * `channel` debe coincidir con un tipo de solicitud aceptado por /api/canales.
 * variant="acoso": ciudad, departamento y cargo.
 * variant="legal": tipo de usuario (mismo diseño que PQRS) y "¿Desea adjuntar documentación?".
 */
const ChannelReportForm = ({ title, channel, intro, variant = 'acoso' }) => {
  const isLegal = variant === 'legal';
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsHoverable(!!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({ visible: false, status: 'success', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phone' || name === 'idNumber') {
      setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, '') }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEvidence = (value) => {
    setFormData((prev) => ({ ...prev, tieneEvidencia: value, adjuntos: [] }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setFormData((prev) => ({ ...prev, adjuntos: files }));
  };

  const closePopup = () => setPopup((prev) => ({ ...prev, visible: false }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const required = isLegal
      ? ['name', 'userType', 'phone', 'idNumber', 'email', 'description']
      : ['name', 'phone', 'idNumber', 'email', 'city', 'department', 'position', 'description'];

    if (required.some((field) => !String(formData[field]).trim())) {
      setPopup({ visible: true, status: 'error', message: 'Por favor completa todos los campos antes de enviar.' });
      return;
    }

    if (formData.tieneEvidencia && formData.adjuntos.length === 0) {
      setPopup({ visible: true, status: 'error', message: 'Selecciona al menos un archivo de evidencia.' });
      return;
    }

    const MAX_FILE_BYTES = 15 * 1024 * 1024;
    const tooBig = formData.adjuntos.find((file) => file.size > MAX_FILE_BYTES);
    if (tooBig) {
      setPopup({ visible: true, status: 'error', message: `El archivo "${tooBig.name}" pesa más de 15 MB. Reduce su tamaño o adjunta otro archivo.` });
      return;
    }

    const payload = new FormData();
    payload.append('requestType', channel);
    ['name', 'userType', 'phone', 'idNumber', 'email', 'city', 'department', 'position', 'description'].forEach((field) => {
      payload.append(field, formData[field]);
    });
    payload.append('tieneEvidencia', String(formData.tieneEvidencia === true));
    formData.adjuntos.forEach((file) => payload.append('adjuntos', file));

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/canales', { method: 'POST', body: payload });
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
      setPopup({ visible: true, status: 'error', message: error.message && error.message !== 'Fallo del servidor' && error.message !== 'Error interno al radicar.' ? error.message : 'No pudimos registrar tu solicitud. Inténtalo de nuevo más tarde.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitButton = (
    <button
      type="submit"
      className={`${styles.submitButton} ${(popup.visible || isSubmitting) ? styles.submitButtonDisabled : ''}`}
      disabled={popup.visible || isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className={styles.spinner} aria-hidden="true"></span>
          Enviando...
        </>
      ) : 'Enviar'}
    </button>
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.pillHeader}>{title}</div>
        <div className={styles.dividerLine}></div>

        {intro && <div className={styles.channelIntro}>{intro}</div>}

        <div className={styles.formContentWrapper}>
          <form className={styles.formCard} onSubmit={handleSubmit}>
            {isLegal && <h3 className={styles.subtitle}>¿Tienes algo que decirnos?</h3>}

            {isLegal ? (
              <div className={styles.gridInputs}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre completo" className={styles.inputField} required />
                <Dropdown
                  placeholder="Tipo de usuario"
                  value={formData.userType}
                  options={USER_TYPE_OPTIONS}
                  onSelect={(value) => setFormData((prev) => ({ ...prev, userType: value }))}
                  isHoverable={isHoverable}
                  fullWidth
                  zIndex={30}
                />
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="Número de identificación" className={styles.inputField} inputMode="numeric" required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Número de celular" className={styles.inputField} inputMode="numeric" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo" className={`${styles.inputField} ${styles.fullRow}`} required />
              </div>
            ) : (
              <div className={styles.gridInputs}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre completo" className={styles.inputField} required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Número de celular" className={styles.inputField} inputMode="numeric" required />
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="Número de identificación" className={styles.inputField} inputMode="numeric" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo" className={styles.inputField} required />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad o municipio" className={styles.inputField} required />
                <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Departamento" className={styles.inputField} required />
                <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Cargo" className={`${styles.inputField} ${styles.fullRow}`} required />
              </div>
            )}

            <div className={styles.textareaWrapper}>
              <label htmlFor="description" className={styles.textareaLabel}>Descripción detallada</label>
              <textarea id="description" className={styles.textArea} name="description" value={formData.description} onChange={handleChange} required />
            </div>

            <div className={styles.evidenceRow}>
              <div>
                <span className={styles.evidenceLabel}>{isLegal ? '¿Desea adjuntar documentación?' : '¿Cuentas con evidencia? (opcional)'}</span>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="evidencia" checked={formData.tieneEvidencia === true} onChange={() => handleEvidence(true)} />
                    Sí
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="evidencia" checked={formData.tieneEvidencia === false} onChange={() => handleEvidence(false)} />
                    No
                  </label>
                </div>
              </div>

              {!formData.tieneEvidencia && submitButton}
            </div>

            {formData.tieneEvidencia && (
              <div className={styles.uploadBox}>
                <label htmlFor="adjuntos" className={styles.filePickerLabel}>Elegir archivos</label>
                <input
                  id="adjuntos"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                <small className={styles.helperText}>Máximo 15 MB por archivo. Se permiten PDF, JPG, JPEG, DOC y DOCX.</small>
                {formData.adjuntos.length > 0 && (
                  <ul className={styles.selectedFilesList}>
                    {formData.adjuntos.map((file) => <li key={file.name}>{file.name}</li>)}
                  </ul>
                )}
              </div>
            )}

            {/* Como en Línea Ética: con evidencia, el botón baja debajo de los adjuntos */}
            {formData.tieneEvidencia && <div className={styles.footerRow}>{submitButton}</div>}
          </form>
          <PopupAlert visible={popup.visible} status={popup.status} title={popup.title} message={popup.message} radicado={popup.radicado} footnote={popup.footnote} onClose={closePopup} />

          <div className={styles.infoBoxSide}>
            <p className={styles.infoText}>
              Nuestra atención al cliente está disponible de: <strong>lunes a viernes, de 7:00 a.m. a 4:20 p.m.</strong>
            </p>
          </div>
        </div>

        <div className={styles.dividerLine}></div>
      </div>
    </div>
  );
};

export default ChannelReportForm;
