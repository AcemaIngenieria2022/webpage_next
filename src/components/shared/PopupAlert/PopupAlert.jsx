import React from 'react';
import styles from './PopupAlert.module.css';

const PopupAlert = ({ visible, status = 'success', message = '', onClose }) => {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup} role="alert">
        <div className={`${styles.iconContainer} ${status === 'success' ? styles.success : styles.error}`}>
          <div className={styles.icon}>
            {status === 'success' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            {status === 'success' ? '¡Enviado con éxito!' : 'Atención'}
          </h2>
          <p className={styles.message}>{message}</p>
        </div>

        <button
          type="button"
          className={`${styles.button} ${status === 'success' ? styles.buttonSuccess : styles.buttonError}`}
          onClick={onClose}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default PopupAlert;
