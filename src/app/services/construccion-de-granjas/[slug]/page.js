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

  return (
    <main className={styles.servicePage}>
      <div className={styles.bannerBox} style={{ minHeight: 280 }}>
        <Image src="/images/services/banner/construccion-granjas.webp" alt="Construcción de granjas" fill className={styles.bannerImgDesktop} sizes="(max-width: 900px) 100vw, 1600px" quality={80} priority />
        <Image src="/images/services/banner/contruccion-movil.png" alt="Construcción de granjas" fill className={styles.bannerImgMobile} sizes="100vw" quality={70} priority />
      </div>

      <section className={styles.featuresSection}>
        <div className={styles.content}>
          <h1>{feature.title}</h1>
          <p className={styles.lead}>{feature.description}</p>

          {
            (() => {
              const sections = feature.sections || [];
              const stagesIndex = sections.findIndex((s) => s.stages);
              const before = stagesIndex >= 0 ? sections.slice(0, stagesIndex) : sections;
              const after = stagesIndex >= 0 ? sections.slice(stagesIndex + 1) : [];

              return (
                <>
                  {before.map((sec) => (
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
                {after.map((sec) => (
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

                    {sec.heading === 'Beneficios' && (
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
        <div className={styles.ctaWrap}>
          <Link href="/contact" className={`${styles.ctaButton} ${styles.ctaGranjas}`}>
            Hacemos realidad tus proyectos
          </Link>
        </div>

        {/* Mini carousel: use example project images */}
        <div className={styles.miniCarouselWrap}>
          <ProjectMiniCarousel images={getCarouselImagesBySlug('la-rubiela') || []} />
        </div>
      </section>
    </main>
  );
}
