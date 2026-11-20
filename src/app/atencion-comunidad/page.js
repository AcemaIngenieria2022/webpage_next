import styles from '@/components/shared/PqrForm/PqrForm.module.css';

export const metadata = {
  title: 'Atención a la comunidad - ACEMA Ingeniería',
  description: 'Línea de WhatsApp para atender los requerimientos de la comunidad.',
};

// Chat bot de WhatsApp del área social (+57 302 297 6086).
// Se puede sobrescribir con la variable NEXT_PUBLIC_WHATSAPP_SOCIAL_URL.
const WHATSAPP_SOCIAL_URL = process.env.NEXT_PUBLIC_WHATSAPP_SOCIAL_URL || 'https://wa.me/573022976086';

export default function AtencionComunidadPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f1f1f1' }}>
      <div className={styles.mainContainer}>
        <div className={styles.formWrapper}>
          <div className={styles.pillHeader}>Atención a la comunidad</div>
          <div className={styles.dividerLine}></div>
          <div className={`${styles.communityNotice} ${styles.communityPageBox}`}>
            <p>
              Para ofrecerte una atención más directa, hemos habilitado una línea de WhatsApp para atender tus
              requerimientos. Accede a este canal haciendo clic{' '}
              <a href={WHATSAPP_SOCIAL_URL} target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                AQUÍ
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
