import React, { useEffect } from 'react';
import styles from './PopupAlert.module.css';

const PopupAlert = ({ visible, status = 'success', message = '', onClose }) => {
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => {
      onClose?.();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} role="alert" onClick={(event) => event.stopPropagation()}>
        <div className={`${styles.icon} ${status === 'success' ? styles.success : styles.error}`}> 
          {status === 'success' ? '✔' : ''}
        </div>
        <div className={styles.content}>
          <strong className={styles.title}>{status === 'success' ? '¡Listo!' : 'Atención'}</strong>
          <p className={styles.message}>{message}</p>
        </div>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar alerta">
          ×
        </button>
      </div>
    </div>
  );
};

export default PopupAlert;
