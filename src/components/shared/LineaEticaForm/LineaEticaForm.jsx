'use client';

import { useState } from 'react';

const initialState = {
  tipoReporte: '',
  descripcion: '',
  fechaOcurrencia: '',
  tieneEvidencia: null,
  adjuntos: [],
};

export default function LineaEticaForm() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ status: '', message: '' });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ status: '', message: '' });

    if (!formData.tipoReporte || !formData.descripcion.trim() || !formData.fechaOcurrencia || formData.tieneEvidencia === null) {
      setFeedback({ status: 'error', message: 'Por favor completa todos los campos obligatorios y elige si tienes evidencia.' });
      return;
    }

    if (formData.tieneEvidencia && formData.adjuntos.length === 0) {
      setFeedback({ status: 'error', message: 'Selecciona al menos un archivo de evidencia.' });
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

      setFeedback({ status: 'success', message: 'Reporte enviado correctamente. Muchas gracias.' });
      setFormData(initialState);
    } catch (error) {
      console.error('[LINEA ETICA] Error al enviar:', error);
      setFeedback({ status: 'error', message: error.message || 'Error al enviar el reporte. Intenta de nuevo más tarde.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '800px',
      marginTop: '30px',
    }}>
      <div style={{
        position: 'absolute',
        top: '-22px',
        left: '-10px',
        backgroundColor: '#215ba0',
        color: 'white',
        padding: '3px 40px',
        borderRadius: '40px 0 40px 0',
        fontWeight: 800,
        fontSize: '20px',
        zIndex: 5,
      }}>
        Línea Ética
      </div>

      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        borderRadius: '30px',
        padding: '45px 40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 35px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ display: 'grid', gap: '8px' }}>
            <label htmlFor="tipo-reporte" style={{ color: '#215ba0', fontSize: '13.5px', fontWeight: 700 }}>
              Tipo de reporte <span style={{ color: '#b91c1c' }}>*</span>
            </label>
            <select
              id="tipo-reporte"
              name="tipoReporte"
              value={formData.tipoReporte}
              onChange={handleChange}
              required
              style={{
                backgroundColor: '#ecf1f6',
                border: 'none',
                borderRadius: '40px',
                padding: '10px 20px',
                fontSize: '13.5px',
                color: '#1a365d',
                outline: 'none',
              }}
            >
              <option value="">Seleccione una opción</option>
              <option value="Acoso laboral">Acoso laboral</option>
              <option value="Acoso sexual">Acoso sexual</option>
              <option value="Discriminación">Discriminación</option>
              <option value="Fraude o corrupción">Fraude o corrupción</option>
              <option value="Conflicto de intereses">Conflicto de intereses</option>
              <option value="Incumplimiento de normas o políticas">Incumplimiento de normas o políticas</option>
              <option value="Riesgos para la seguridad y salud en el trabajo">Riesgos para la seguridad y salud en el trabajo</option>
              <option value="Maltrato o conductas inapropiadas">Maltrato o conductas inapropiadas</option>
              <option value="Uso indebido de recursos de la empresa">Uso indebido de recursos de la empresa</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <label htmlFor="fecha" style={{ color: '#215ba0', fontSize: '13.5px', fontWeight: 700 }}>
              ¿Cuándo ocurrió? <span style={{ color: '#b91c1c' }}>*</span>
            </label>
            <input
              id="fecha"
              name="fechaOcurrencia"
              type="date"
              value={formData.fechaOcurrencia}
              onChange={handleChange}
              required
              style={{
                backgroundColor: '#ecf1f6',
                border: 'none',
                borderRadius: '40px',
                padding: '10px 20px',
                fontSize: '13.5px',
                color: '#1a365d',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '8px' }}>
          <label htmlFor="descripcion" style={{ color: '#215ba0', fontSize: '13.5px', fontWeight: 700 }}>
            Describe lo ocurrido <span style={{ color: '#b91c1c' }}>*</span>
          </label>
          <div style={{
            backgroundColor: '#ecf1f6',
            borderRadius: '15px',
            padding: '15px 20px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="6"
              value={formData.descripcion}
              onChange={handleChange}
              required
              placeholder="Cuéntanos qué ocurre con el mayor detalle posible"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                resize: 'none',
                height: '90px',
                outline: 'none',
                fontSize: '13.5px',
                color: '#215ba0',
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '8px' }}>
          <label style={{ color: '#215ba0', fontSize: '13.5px', fontWeight: 700 }}>
            ¿Cuentas con evidencia? (opcional)
          </label>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#215ba0', fontWeight: 700, cursor: 'pointer' }}>
              <input
                type="radio"
                name="evidencia"
                value="si"
                checked={formData.tieneEvidencia === true}
                onChange={() => handleEvidence(true)}
              />
              Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#215ba0', fontWeight: 700, cursor: 'pointer' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="adjuntos" style={{ color: '#215ba0', fontWeight: 700, fontSize: '13px' }}>
              Adjuntar evidencias (PDF, JPG, JPEG, DOC, DOCX)
            </label>
            <input
              id="adjuntos"
              name="adjuntos"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg"
              onChange={handleFileChange}
              style={{ color: '#475569' }}
            />
            {formData.adjuntos.length > 0 && (
              <div style={{ color: '#475569', fontSize: '13px', marginTop: '8px' }}>
                Archivos seleccionados:
                <ul style={{ margin: '8px 0 0 16px', padding: 0, listStyleType: 'disc' }}>
                  {formData.adjuntos.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <small style={{ color: '#64748b', fontSize: '12px' }}>
              Se permiten archivos PDF, JPG, JPEG, DOC y DOCX.
            </small>
          </div>
        )}

        {feedback.message && (
          <div style={{
            padding: '12px 18px',
            borderRadius: '20px',
            backgroundColor: feedback.status === 'success' ? '#d1fae5' : '#fee2e2',
            color: feedback.status === 'success' ? '#065f46' : '#991b1b',
            fontSize: '14px',
          }}>
            {feedback.message}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: '#215ba0',
              color: 'white',
              border: 'none',
              padding: '8px 45px',
              borderRadius: '50px 10px 50px 10px',
              fontWeight: 700,
              fontSize: '16px',
              cursor: isSubmitting ? 'wait' : 'pointer',
              opacity: isSubmitting ? 0.75 : 1,
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
          </button>
        </div>
      </form>
    </div>
  );
}
