import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../service.module.css';
import { construccionFeatures } from '@/data/construccion-features';
import ProjectMiniCarousel from '@/components/shared/ProjectMiniCarousel/ProjectMiniCarousel';
import { getCarouselImagesBySlug } from '@/data/projects-carousel';

export async function generateMetadata({ params }) {
  const resolved = await params;
  const feature = construccionFeatures.find((f) => f.slug === resolved.slug);
  if (!feature) return { title: 'No encontrado' };
  return {
    title: `${feature.title} - ACEMA Ingeniería`,
    description: feature.description,
  };
}

export default async function FeaturePage({ params }) {
  const { slug } = await params;
  const feature = construccionFeatures.find((f) => f.slug === slug);

  if (!feature) return notFound();

  const isScada = slug === 'sistemas-scada-ppc' || slug === 'estaciones-meteorologicas';
  const isEstaciones = slug === 'estaciones-meteorologicas';

  return (
    <main className={`${styles.servicePage} ${isScada ? styles.scadaPage : ''}`}>
      <div className={styles.bannerBox} style={{ minHeight: 280 }}>
        <Image src="/images/services/banner/construccion-granjas.webp" alt="Construcción de granjas" fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} priority />
        <Image src="/images/services/banner/contruccion-movil.png" alt="Construcción de granjas" fill className={styles.bannerImgMobile} sizes="100vw" quality={70} priority />
      </div>

      <section className={styles.featuresSection}>
        <div className={styles.content}>
          <h1>{feature.title}</h1>
          <p className={styles.lead}>{feature.description}</p>
          {/* Custom two-column content for SCADA/PPC page */}
          {slug === 'sistemas-scada-ppc' && (
            <div className={styles.twoColumn} style={{ marginTop: 18 }}>
              <div className={styles.leftCol}>
                <p>
                  En Acema Ingeniería desarrollamos la ingeniería, dimensionamiento, suministro, configuración,
                  montaje, pruebas y puesta en servicio de sistemas SCADA y PPC (Power Plant Controller) para
                  granjas solares.
                </p>

                <p>
                  Nuestras soluciones garantizan el control, supervisión y comunicación eficiente entre los
                  equipos de campo y los centros de operación, cumpliendo con los más altos estándares del
                  sector energético.
                </p>
                <h2 className={styles.scadaIncludeTitle}>Incluye</h2>
                <ul>
                  
                  <li>Sistemas SCADA con cumplimiento del CNO 1612.</li>
                  <li>Sistemas PPC para granjas solares bajo la CREG 148.</li>
                  <li>Creación de modelos de planta y configuración de interfaces con XM.</li>
                  <li>Interfaz de comunicaciones con el operador de red.</li>
                  <li>Integración de inversores y centros de transformación al sistema SCADA.</li>
                </ul>
              </div>

              <div className={styles.rightCol}>
                <div className={styles.infoBox}>
                  <h4 className={styles.infoTitle}>Beneficios de los sistemas SCADA y PPC para granjas solares</h4>
                  {
                    (() => {
                      const benefits = [
                        'Control total de la operación: gestione en tiempo real cada componente de la planta solar desde una única plataforma.',
                        'Optimización del rendimiento: los sistemas PPC regulan la generación y el despacho energético para maximizar la eficiencia.',
                        'Cumplimiento normativo: desarrollamos soluciones alineadas con los requerimientos de la CREG 148 y el CNO 1612.',
                        'Interconexión confiable: establecemos comunicación segura y estable con XM y los operadores de red.',
                        'Supervisión inteligente: integramos inversores, centros de transformación y sistemas de medición en un entorno SCADA robusto.',
                        'Soporte técnico especializado: acompañamiento en todas las fases del proyecto, desde el diseño hasta la puesta en servicio.'
                      ];

                      return (
                        <ul className={styles.infoList}>
                          {benefits.map((b) => {
                            const parts = b.split(':');
                            if (parts.length > 1) {
                              const head = parts.shift();
                              const rest = parts.join(':');
                              return (
                                <li key={b}>
                                  <span className={styles.infoHead}>{head}:</span> {rest}
                                </li>
                              );
                            }
                            return <li key={b}>{b}</li>;
                          })}
                        </ul>
                      );
                    })()
                  }
                </div>
              </div>
            </div>
          )}

          {/* Custom content for Estaciones meteorológicas */}
          {isEstaciones && (
            <div className={styles.twoColumn} style={{ marginTop: 18 }}>
              <div className={styles.leftCol}>
                <div className={styles.infoBox}>
                  <h4 className={styles.infoTitle}>Estaciones meteorológicas</h4>
                  <p><span className={styles.infoHead}>Toma de decisiones precisas:</span> datos en tiempo real que permiten ajustar la operación y maximizar la generación solar.</p>

                  <p><span className={styles.infoHead}>Cumplimiento normativo garantizado:</span> todas nuestras soluciones cumplen con los requerimientos del CNO 1612, 1689 y 1813.</p>

                  <p><span className={styles.infoHead}>Optimización del rendimiento energético:</span> el monitoreo constante mejora la eficiencia del sistema y reduce pérdidas por factores climáticos.</p>

                  <p><span className={styles.infoHead}>Integración completa:</span> los sistemas se comunican con plataformas SCADA y reportan automáticamente a XM, asegurando trazabilidad total.</p>

                  <p><span className={styles.infoHead}>Tecnología confiable:</span> utilizamos sensores e instrumentación de alta precisión diseñados para condiciones extremas.</p>

                  <p><span className={styles.infoHead}>Soporte especializado:</span> acompañamiento técnico durante la instalación, calibración y mantenimiento.</p>
                </div>
              </div>

              <div className={styles.rightCol}>
                <div>
                  <p>En Acema Ingeniería ofrecemos soluciones integrales para la adquisición y análisis de variables meteorológicas esenciales en proyectos de energía solar.</p>

                  <p>Medimos parámetros como radiación solar, velocidad y dirección del viento, temperatura y humedad, garantizando datos precisos para una gestión eficiente y un control óptimo del sistema.</p>

                  <p>Nuestras soluciones incluyen:</p>
                  <ul className={styles.infoList}>
                    <li>Estaciones meteorológicas para reporte conforme al CNO 1612.</li>
                    <li>Instrumentación según los estándares CNO 1689 y 1813.</li>
                    <li>Integración directa con el sistema SCADA y reporte automático a XM.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Carousel específico para Estaciones meteorológicas */}
          {isEstaciones && (
            <div className={styles.miniCarouselWrap}>
              <ProjectMiniCarousel images={[
                '/images/services/banner/banner-estaciones/banner1.webp',
                '/images/services/banner/banner-estaciones/banner2.webp',
                '/images/services/banner/banner-estaciones/banner3.webp',
                '/images/services/banner/banner-estaciones/banner4.webp',
                '/images/services/banner/banner-estaciones/banner5.webp',
                '/images/services/banner/banner-estaciones/banner6.webp'
              ]} />
            </div>
          )}

          {
            (() => {
              const sections = feature.sections || [];
              const stagesIndex = sections.findIndex((s) => s.stages);
              const before = stagesIndex >= 0 ? sections.slice(0, stagesIndex) : sections;
              const after = stagesIndex >= 0 ? sections.slice(stagesIndex + 1) : [];

              return (
                <>
                  {before.filter(s => s.heading !== 'Qué entregamos').map((sec) => (
                    <div key={sec.heading} style={{ marginTop: 20 }}>
                      <h3>{sec.heading}</h3>
                      {sec.description ? <p>{sec.description}</p> : null}
                      <ul>
                        {sec.content?.map((c) => {
                          const parts = c.split(':');
                          if (parts.length > 1) {
                            const head = parts.shift();
                            const rest = parts.join(':');
                            return (
                              <li key={c} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                <span className={styles.beforeColon}>{head}:</span> {rest}
                              </li>
                            );
                          }
                          return (
                            <li key={c} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{c}</li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}

                  {/* close content here so stages band can be full-width */}
                </>
              );
            })()
          }
        </div>

        {/* Full-width stages band outside the centered .content */}
        {(() => {
          const sections = feature.sections || [];
          const stagesIndex = sections.findIndex((s) => s.stages);
          if (stagesIndex < 0) return null;
          return (
            <div className={styles.stagesFullWidth}>
              <div className={styles.stagesSectionInner}>
                <div className={styles.stagesGrid}>
                  {sections[stagesIndex].stages.map((s) => (
                    <div key={s.title} className={styles.stageCard}>
                      <h4>{s.title}</h4>
                      <p>{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        <div className={styles.content}>
          {(() => {
            const sections = feature.sections || [];
            const stagesIndex = sections.findIndex((s) => s.stages);
            const after = stagesIndex >= 0 ? sections.slice(stagesIndex + 1) : [];
            return (
              <>
                {after.filter(s => s.heading !== 'Qué entregamos').map((sec) => (
                  <div key={sec.heading} style={{ marginTop: 20 }}>
                    <h3>{sec.heading}</h3>
                    {sec.description ? <p>{sec.description}</p> : null}

                      {sec.content ? (
                      <ul>
                        {sec.content.map((c) => {
                          const parts = c.split(':');
                          if (parts.length > 1) {
                            const head = parts.shift();
                            const rest = parts.join(':');
                            return (
                              <li key={c} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                <span className={styles.beforeColon}>{head}:</span> {rest}
                              </li>
                            );
                          }
                          return (
                            <li key={c} style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{c}</li>
                          );
                        })}
                      </ul>
                    ) : null}

                    {sec.heading === 'Beneficios' && !isScada && (
                      <div className={styles.ctaWrap}>
                        <Link href="/contact" className={`${styles.ctaButton} ${styles.ctaGranjas}`}>
                          Hacemos realidad tus proyectos
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </>
            );
          })()}
        </div>

        {/* CTA (same as in ProjectDetail) before the mini carousel */}
        {!isScada && (
          <>
            <div className={styles.ctaWrap}>
              <Link href="/contact" className={`${styles.ctaButton} ${styles.ctaGranjas}`}>
                Hacemos realidad tus proyectos
              </Link>
            </div>

            {/* Mini carousel: use example project images */}
            <div className={styles.miniCarouselWrap}>
              <ProjectMiniCarousel images={getCarouselImagesBySlug('la-rubiela') || []} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
