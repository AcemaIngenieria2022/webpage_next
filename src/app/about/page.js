import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Nosotros - ACEMA Ingeniería",
  description: "Conoce a ACEMA: misión, visión y valores.",
};

export default function NosotrosPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <Image
          src="/images/about/banner.jpg"
          alt="ACEMA Ingeniería"
          fill
          sizes="100vw"
          quality={70}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </header>

      <section className={styles.aboutSection}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2>Nosotros</h2>

              <p>
                Somos una empresa especializada en proyectos eléctricos y
                fotovoltaicos, con sede en Medellín, Colombia.
              </p>

              <p>
                Nos destacamos por nuestra capacidad para adaptarnos a las
                necesidades específicas de cada cliente.
              </p>

              <p>
                Orientamos nuestra gestión hacia la calidad, respaldada por la
                certificación del Sistema de Gestión de Calidad.
              </p>
            </div>

            <div className={styles.misionVision}>
              <article className={styles.card}>
                <h3>Misión</h3>

                <p>
                  Brindamos soluciones de consultoría, especificaciones técnicas
                  e ingeniería para proyectos de granjas solares y sistemas
                  eléctricos de baja, media y alta tensión, optimizando los
                  tiempos de ejecución y las inversiones necesarias.
                </p>
              </article>

              <article className={styles.card}>
                <h3>Visión</h3>

                <p>
                  Consolidar y posicionar ACEMA como una empresa líder en
                  soporte, consultoría e ingeniería en el desarrollo de
                  proyectos asociados a granjas solares y subestaciones de baja,
                  media y alta tensión.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2 className={styles.valuesTitle}>Valores</h2>

        <div className={styles.valuesGrid}>
          <div className={styles.valuesTop}>
            <div>
              <h4>Compromiso:</h4>
              <p>
                Estamos presentes de principio a fin, asegurando que cada
                proyecto se entregue a tiempo y con el rendimiento esperado.
              </p>
            </div>

            <div>
              <h4>Innovación:</h4>
              <p>
                Aplicamos soluciones y tecnología que optimizan recursos,
                reducen tiempos y generan mayor valor para cada inversión.
              </p>
            </div>

            <div>
              <h4>Transparencia:</h4>
              <p>
                Mantenemos procesos claros y comunicación abierta para que
                siempre tengas control y confianza en el avance.
              </p>
            </div>
          </div>

          <div className={styles.valuesBottom}>
            <div>
              <h4>Calidad:</h4>
              <p>
                Ejecutamos con altos estándares técnicos, entregando resultados
                confiables y duraderos.
              </p>
            </div>

            <div>
              <h4>Orientación al resultado:</h4>
              <p>
                Trabajamos con plazos más cortos que la media del mercado.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}