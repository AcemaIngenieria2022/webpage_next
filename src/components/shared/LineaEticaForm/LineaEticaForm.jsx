'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './LineaEticaForm.module.css';
import PopupAlert from '../PopupAlert/PopupAlert';

const initialState = {
  tipoReporte: '',
  descripcion: '',
  fechaOcurrencia: '',
  tieneEvidencia: null,
  adjuntos: [],
};

const reportOptions = [
  'Acoso laboral',
  'Acoso sexual',
  'Discriminación',
  'Fraude o corrupción',
  'Conflicto de intereses',
  'Incumplimiento de normas o políticas',
  'Riesgos para la seguridad y salud en el trabajo',
  'Maltrato o conductas inapropiadas',
  'Uso indebido de recursos de la empresa',
  'Otro',
];

export default function LineaEticaForm() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({ visible: false, status: 'success', title: '', message: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHoverable, setIsHoverable] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setPopup({
      visible: true,
      status: 'success',
      title: 'Bienvenido a la línea ética',
      message: 'Este canal está diseñado para reportar, de manera confidencial y anónima, situaciones que puedan afectar la ética, la transparencia, el cumplimiento de las políticas empresariales de la compañía o el bienestar de los trabajadores.',
    });
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateHoverState = () => setIsHoverable(!!mediaQuery.matches);

    updateHoverState();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateHoverState);
      return () => mediaQuery.removeEventListener('change', updateHoverState);
    }

    mediaQuery.addListener(updateHoverState);
    return () => mediaQuery.removeListener(updateHoverState);
  }, []);

  const selectedReportLabel = useMemo(() => {
    return reportOptions.find((option) => option === formData.tipoReporte) || 'Seleccione una opción';
  }, [formData.tipoReporte]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEvidence = (value) => {
    setFormData((prev) => ({ ...prev, tieneEvidencia: value, adjuntos: [] }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setFormData((prev) => ({ ...prev, adjuntos: files }));
  };

  const handleSelectOption = (value) => {
    setFormData((prev) => ({ ...prev, tipoReporte: value }));
    setIsDropdownOpen(false);
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, visible: false }));
  };

  const handleDropdownToggle = () => {
    if (!isHoverable) {
      setIsDropdownOpen((prev) => !prev);
      return;
    }

    setIsDropdownOpen((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.tipoReporte || !formData.descripcion.trim() || !formData.fechaOcurrencia || formData.tieneEvidencia === null) {
      setPopup({
        visible: true,
        status: 'error',
        message: 'Por favor completa todos los campos obligatorios y elige si tienes evidencia.',
      });
      return;
    }

    if (formData.tieneEvidencia && formData.adjuntos.length === 0) {
      setPopup({
        visible: true,
        status: 'error',
        message: 'Selecciona al menos un archivo de evidencia.',
      });
      return;
    }

    const formPayload = new FormData();
    formPayload.append('tipoReporte', formData.tipoReporte);
    formPayload.append('descripcion', formData.descripcion);
    formPayload.append('fechaOcurrencia', formData.fechaOcurrencia);
    formPayload.append('tieneEvidencia', String(formData.tieneEvidencia));

    formData.adjuntos.forEach((file) => {
      formPayload.append('adjuntos', file);
    });

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/etica', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        const details = Array.isArray(data.details) ? ` ${data.details.join(', ')}` : '';
        throw new Error(`${data.error || 'No se pudo enviar el reporte.'}${details}`);
      }

      setPopup({
        visible: true,
        status: 'success',
        message: 'Reporte enviado correctamente. Muchas gracias.',
      });
      setFormData(initialState);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('[LINEA ETICA] Error al enviar:', error);
      setPopup({
        visible: true,
        status: 'error',
        message: error.message || 'Error al enviar el reporte. Intenta de nuevo más tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.badge}>Línea Ética</div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <label htmlFor="tipo-reporte" className={styles.label}>
              Tipo de reporte <span className={styles.required}>*</span>
            </label>
            <div
              id="tipo-reporte"
              ref={dropdownRef}
              onMouseEnter={() => {
                if (isHoverable) {
                  setIsDropdownOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (isHoverable) {
                  setIsDropdownOpen(false);
                }
              }}
              onClick={handleDropdownToggle}
              className={styles.dropdownContainer}
            >
              <button
                type="button"
                aria-label="Seleccionar tipo de reporte"
                className={`${styles.requestButton} ${formData.tipoReporte ? styles.activeBtn : ''}`}
              >
                <span>{selectedReportLabel}</span>
                <span aria-hidden="true" className={styles.icon}>{isDropdownOpen ? '−' : '+'}</span>
              </button>

              {isDropdownOpen && (
                <ul className={styles.dropdownList}>
                  {reportOptions.map((option, index) => (
                    <li
                      key={index}
                      className={styles.dropdownItem}
                      onClick={() => handleSelectOption(option)}
                    >
                      • {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input type="hidden" name="tipoReporte" value={formData.tipoReporte} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="fecha" className={styles.label}>
              ¿Cuándo ocurrió? <span className={styles.required}>*</span>
            </label>
            <input
              id="fecha"
              name="fechaOcurrencia"
              type="date"
              value={formData.fechaOcurrencia}
              onChange={handleChange}
              required
              className={styles.dateInput}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="descripcion" className={styles.label}>
            Describe lo ocurrido <span className={styles.required}>*</span>
          </label>
          <div className={styles.textareaWrap}>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="6"
              value={formData.descripcion}
              onChange={handleChange}
              required
              placeholder="Cuéntanos qué ocurre con el mayor detalle posible"
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            ¿Cuentas con evidencia? (opcional)
          </label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="evidencia"
                value="si"
                checked={formData.tieneEvidencia === true}
                onChange={() => handleEvidence(true)}
              />
              Sí
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="evidencia"
                value="no"
                checked={formData.tieneEvidencia === false}
                onChange={() => handleEvidence(false)}
              />
              No
            </label>
          </div>
        </div>

        {formData.tieneEvidencia && (
          <div className={styles.uploadContent}>
            <label htmlFor="adjuntos" className={styles.label}>
              Adjuntar evidencias (PDF, JPG, JPEG, DOC, DOCX)
            </label>

            <div className={styles.uploadContent}>
              <label htmlFor="adjuntos" className={styles.filePickerLabel}>
                <span>Elegir archivos</span>
              </label>
              <input
                id="adjuntos"
                name="adjuntos"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <small className={styles.helperText}>
                Capacidad máxima de subida: 15 MB por archivo. Se permiten PDFs, JPG, JPEG, DOC y DOCX.
              </small>
            </div>

            {formData.adjuntos.length > 0 && (
              <div className={styles.selectedFiles}>
                Archivos seleccionados:
                <ul className={styles.selectedFilesList}>
                  {formData.adjuntos.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className={styles.submitRow}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles.submitButton} ${isSubmitting ? styles.submitButtonDisabled : ''}`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
          </button>
        </div>
      </form>
      <PopupAlert visible={popup.visible} status={popup.status} title={popup.title} message={popup.message} onClose={closePopup} />
    </div>
  );
}
