import styles from './InfoTransformacion.module.css';

const InfoTransformacion = () => {
  return (
    <section className={styles.container}>
      {/* Párrafo Introductorio */}
      <div className={styles.introText}>
        <p>
          En Acema Ingeniería diseñamos, suministramos, montamos y ponemos en servicio
          centros de transformación que permiten la supervisión y control integral de parques
          solares. Nuestras soluciones integran monitoreo avanzado, protección, automatización
          y comunicación, adaptadas a las necesidades técnicas de cada proyecto.
        </p>
      </div>

      <div className={styles.contentGrid}>
        {/* Columna Izquierda: Beneficios */}
        <div className={styles.benefitsCol}>
          <h2 className={styles.title}>
            Beneficios de los centros de transformación para granjas solares
          </h2>

          <ul className={styles.list}>
            <li>
              <strong>Integración total:</strong>
              <span className={styles.listDescription}>
                {' '}concentramos en un solo sistema la protección, el control y la supervisión del parque solar.
              </span>
            </li>

            <li>
              <strong>Eficiencia energética:</strong>
              <span className={styles.listDescription}>
                {' '}optimizamos la transferencia de energía desde los inversores hasta el punto de conexión con la red.
              </span>
            </li>

            <li>
              <strong>Diseño modular y adaptable:</strong>
              <span className={styles.listDescription}>
                {' '}estructuras SKID que se ajustan a las condiciones y capacidad de cada proyecto.
              </span>
            </li>

            <li>
              <strong>Seguridad garantizada:</strong>
              <span className={styles.listDescription}>
                {' '}equipos con sistemas de protección, monitoreo y respaldo eléctrico (UPS) que aseguran continuidad operativa.
              </span>
            </li>

            <li>
              <strong>Cumplimiento técnico y normativo:</strong>
              <span className={styles.listDescription}>
                {' '}desarrollos alineados con las regulaciones del sector energético y estándares RETIE.
              </span>
            </li>

            <li>
              <strong>Mayor confiabilidad operativa:</strong>
              <span className={styles.listDescription}>
                {' '}componentes de alta calidad que prolongan la vida útil del sistema y reducen mantenimientos correctivos.
              </span>
            </li>
          </ul>
        </div>

        {/* Columna Derecha: Cuadro Blanco de Componentes */}
        <div className={styles.componentsCard}>
          <h3 className={styles.cardTitle}>Componentes principales:</h3>

          <ul className={styles.cardList}>
            <li>Transformador de potencia de 1.5 MVA.</li>
            <li>Tablero agrupador de inversores 800 V.</li>
            <li>Tablero de servicios auxiliares, incluyendo sistema UPS.</li>
            <li>Estructura SKID con cerramiento y techo.</li>
            <li>Sistema de monitoreo para mini granjas solares.</li>
            <li>
              Suministro de reconectadores y puntos de medida para granjas solares.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InfoTransformacion;