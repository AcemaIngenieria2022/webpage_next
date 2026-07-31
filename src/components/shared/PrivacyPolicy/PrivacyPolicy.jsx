"use client";

import React, { useEffect } from "react";
import styles from "./PrivacyPolicy.module.css";

const policyPdfUrl = "/pdf/POLITICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS .pdf";

const PrivacyPolicy = ({ onLearnMore }) => {
  useEffect(() => {
    const nodes = document.querySelectorAll(`.${styles.reveal}`);

    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <header className={`${styles.header} ${styles.reveal}`} style={{ transitionDelay: '0ms' }}>
          <h1 className={styles.mainTitle}>
            POLÍTICA DE PRIVACIDAD Y
            <br />
            TRATAMIENTO DE DATOS PERSONALES
          </h1>

          <h2 className={styles.sectionTitle}>Resumen</h2>

          <p className={styles.description}>
            Acema Ingeniería S.A.S, en adelante &quot;la Compañía&quot;, pone a
            disposición del público en general la presente Política de
            Privacidad y Tratamiento de Datos Personales, en cumplimiento de lo
            dispuesto en la Ley 1581 de 2012, el Decreto 1377 de 2013 y el
            Decreto Único Reglamentario 1074 de 2015, normas que regulan la
            protección de datos personales y el derecho fundamental de Habeas
            Data en Colombia.
          </p>

          <p className={styles.description}>
            El presente documento tiene por objeto informar a los titulares de
            la información, usuarios, clientes, colaboradores, proveedores y
            candidatos a empleo acerca de las finalidades para las cuales la
            Compañía recolecta, almacena, usa y trata sus datos personales, los
            derechos que les asisten en calidad de titulares, y los
            procedimientos dispuestos para su ejercicio.
          </p>

          <p className={styles.description}>
            Acema Ingeniería S.A.S se reserva el derecho de modificar la
            presente Política en cualquier momento, con el fin de ajustarla a
            cambios normativos o a necesidades propias de su operación. Toda
            modificación será publicada oportunamente en este mismo espacio,
            indicando su fecha de entrada en vigencia.
          </p>
        </header>

        <section className={`${styles.purposesCard} ${styles.reveal}`} style={{ transitionDelay: '120ms' }}>
          <h3 className={styles.cardHeader}>Qué datos recolectamos:</h3>
          <p className={styles.description}>
            Acema Ingeniería S.A.S podrá recolectar y tratar datos personales de
            los siguientes grupos de titulares:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Clientes:</strong> nombre, apellidos, correo electrónico,
              teléfono, dirección, información de pago, entre otros.
            </li>
            <li className={styles.listItem}>
              <strong>Colaboradores:</strong> nombre, apellidos, número de
              identificación, dirección, datos bancarios, información laboral,
              entre otros.
            </li>
            <li className={styles.listItem}>
              <strong>Proveedores:</strong> nombre, apellidos, información de
              contacto, datos bancarios, entre otros.
            </li>
            <li className={styles.listItem}>
              <strong>Candidatos a empleo:</strong> nombre, apellidos,
              currículum, experiencia laboral, etc.
            </li>
          </ul>
        </section>

        <p className={`${styles.description} ${styles.reveal}`} style={{ transitionDelay: '220ms' }}>
          Por datos personales entiéndase también las imágenes, grabaciones y/o
          sonidos captados por las cámaras de videovigilancia situadas en
          nuestras instalaciones.
        </p>

        <p className={`${styles.description} ${styles.reveal}`} style={{ transitionDelay: '280ms' }}>
          <strong>Sobre menores de edad:</strong>{" "}Acema Ingeniería S.A.S no
          recolecta ni trata de forma directa datos personales de menores de
          edad con fines comerciales o de prestación de servicios. Más detalles
          en la sección &quot;Menores de edad&quot; más adelante.
        </p>

        <section className={`${styles.purposesCard} ${styles.reveal}`} style={{ transitionDelay: '340ms' }}>
          <h3 className={styles.cardHeader}>Para qué los usamos:</h3>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Ejecución de contratos:</strong> gestión de relaciones
              comerciales y laborales con clientes, proveedores y empleados.
            </li>
            <li className={styles.listItem}>
              <strong>Cumplimiento de obligaciones legales:</strong>
              requerimientos fiscales, laborales y de seguridad social.
            </li>
            <li className={styles.listItem}>
              <strong>Gestión de servicios:</strong> ofrecer nuestros productos
              y atender a clientes y usuarios de manera eficiente.
            </li>
            <li className={styles.listItem}>
              <strong>Gestión de talento humano:</strong> procesos de selección,
              contratación, beneficios, pago de salarios y prestaciones
              sociales.
            </li>
            <li className={styles.listItem}>
              <strong>Comunicaciones comerciales y promocionales:</strong> solo
              cuando el titular haya otorgado su consentimiento para ello.
            </li>
            <li className={styles.listItem}>
              <strong>Mejora de nuestros procesos:</strong> encuestas de
              satisfacción, análisis de tendencias y comportamientos.
            </li>
            <li className={styles.listItem}>
              <strong>Control de acceso a nuestras instalaciones</strong> y
              registro de horarios mediante registro biométrico (dato sensible
              según el artículo 6 de la Ley 1581 de 2012).
            </li>
            <li className={styles.listItem}>
              Atención de requerimientos judiciales o administrativos, y
              determinación de obligaciones pendientes frente a deudores, cuando
              aplique.
            </li>
          </ul>
        </section>

        <div className={`${styles.detailsContainer} ${styles.reveal}`} style={{ transitionDelay: '420ms' }}>
          <section className={`${styles.infoBlock} ${styles.reveal}`} style={{ transitionDelay: '460ms' }}>
            <h3 className={styles.blockTitle}>Sus derechos como titular:</h3>
            <p className={styles.textSmall}>
              Como titular de datos personales, usted tiene derecho a:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Acceso:</strong> conocer los datos personales que están
                siendo tratados.
              </li>
              <li className={styles.listItem}>
                <strong>Rectificación:</strong> solicitar la corrección de datos
                inexactos o incompletos.
              </li>
              <li className={styles.listItem}>
                <strong>Supresión:</strong> solicitar la eliminación de sus
                datos cuando ya no sean necesarios.
              </li>
              <li className={styles.listItem}>
                <strong>Oposición:</strong> oponerse al tratamiento de sus datos
                por motivos relacionados con su situación particular.
              </li>
              <li className={styles.listItem}>
                <strong>Portabilidad:</strong> recibir sus datos en un formato
                estructurado, de uso común y lectura mecánica.
              </li>
              <li className={styles.listItem}>
                <strong>Revocación del consentimiento:</strong> retirar su
                autorización en cualquier momento.
              </li>
              <li className={styles.listItem}>
                <strong>Solicitar prueba</strong> de la autorización otorgada
                para el tratamiento de sus datos.
              </li>
              <li className={styles.listItem}>
                <strong>Ser informado</strong>, previa solicitud, sobre el uso
                que se ha dado a sus datos.
              </li>
              <li className={styles.listItem}>
                <strong>Presentar quejas</strong> ante la Superintendencia de
                Industria y Comercio por infracciones a la Ley de Protección de
                Datos Personales.
              </li>
            </ul>

            <div className={styles.contactCard}>
              <p className={styles.textSmall}>
                Esta empresa no venderá, cederá ni distribuirá su información
                personal sin su consentimiento, a menos que lo requiera un juez
                con una orden judicial.
              </p>

              <p className={styles.textSmall}>
                Para ejercer cualquiera de sus derechos, envíe una solicitud
                especificando el derecho que desea ejercer, junto con la
                documentación que acredite su identidad, a través de:
              </p>

              <p className={styles.textSmall}>
                <strong>Correo:</strong>{" "}
                <span className={styles.link}>
                  comunicaciones.corporativas@acemaingenieria.com
                </span>
              </p>

              <p className={styles.textSmall}>
                <strong>Dirección:</strong> Calle 48A #81A 30, Barrio Calasanz,
                Medellín – Antioquia.
              </p>

              <p className={styles.textSmall}>
                Su solicitud debe contener la descripción de los hechos, sus
                datos de contacto y, si aplica, los documentos que quiera hacer
                valer.
              </p>

              <p className={styles.requestAttention}>
                Atenderemos su solicitud en un plazo máximo de 15 días hábiles
                contados desde la fecha de recibo.
              </p>
            </div>
          </section>

          <section className={`${styles.infoBlock} ${styles.reveal}`} style={{ transitionDelay: '560ms' }}>
            <h3 className={styles.blockTitle}>Conservación de datos</h3>

            <p className={styles.textSmall}>
              Conservamos su información personal únicamente durante el tiempo
              necesario para cumplir con la finalidad del tratamiento:
            </p>

            <div className={styles.retentionTableWrapper}>
              <table className={styles.retentionTable}>
                <thead>
                  <tr>
                    <th className={styles.retentionHeaderCell}>
                      Tipo de titular / datos
                    </th>
                    <th className={styles.retentionHeaderCell}>
                      Plazo de conservación
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.retentionRow}>
                    <td className={styles.retentionCell}>
                      <strong>Colaboradores:</strong> historia laboral, nómina y
                      aportes a seguridad social.
                    </td>
                    <td className={styles.retentionCell}>
                      Durante la vigencia del vínculo laboral y posterior a su
                      terminación. Los aportes a seguridad social se conservan
                      de forma indefinida.
                    </td>
                  </tr>
                  <tr className={styles.retentionRow}>
                    <td className={styles.retentionCell}>
                      <strong>Candidatos no seleccionados:</strong> hojas de
                      vida.
                    </td>
                    <td className={styles.retentionCell}>
                      1 año desde la finalización del proceso de selección,
                      salvo autorización para futuras convocatorias.
                    </td>
                  </tr>
                  <tr className={styles.retentionRow}>
                    <td className={styles.retentionCell}>
                      <strong>Clientes y proveedores:</strong> información
                      contractual, contable y tributaria.
                    </td>
                    <td className={styles.retentionCell}>
                      10 años desde el cierre del ejercicio o el último
                      documento/comprobante.
                    </td>
                  </tr>
                  <tr className={styles.retentionRow}>
                    <td className={styles.retentionCell}>
                      <strong>Familiares menores de edad de colaboradores:</strong>
                      mientras subsista el beneficio, afiliación o trámite que
                      motivó la recolección.
                    </td>
                    <td className={styles.retentionCell}>
                      Mientras subsista el beneficio, afiliación o trámite que
                      motivó la recolección.
                    </td>
                  </tr>
                  <tr className={styles.retentionRow}>
                    <td className={styles.retentionCell}>
                      <strong>Videovigilancia:</strong> imágenes y grabaciones.
                    </td>
                    <td className={styles.retentionCell}>
                      30 días calendario, salvo que se requieran como prueba en
                      una investigación o proceso judicial.
                    </td>
                  </tr>
                  <tr className={styles.retentionRow}>
                    <td className={styles.retentionCell}>
                      <strong>Datos de contacto para comunicaciones
                      comerciales:</strong>
                    </td>
                    <td className={styles.retentionCell}>
                      Hasta que el titular revoque la autorización otorgada.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={`${styles.infoBlock} ${styles.reveal}`} style={{ transitionDelay: '660ms' }}>
            <h3 className={styles.blockTitle}>Cookies</h3>

            <p className={styles.textSmall}>
              Una cookie es un archivo que se envía con la finalidad de
              solicitar permiso para ser almacenado en su computadora. Se crea
              al aceptar el archivo y sirve para tener información sobre el
              tráfico web, facilitar futuras visitas y brindar un servicio más
              personalizado.
            </p>

            <p className={styles.textSmall}>
              Utilizamos cookies para identificar las páginas que se visitan y
              su frecuencia, únicamente con fines de análisis estadístico. Usted
              puede aceptar o rechazar el uso de cookies desde la configuración
              de su navegador y eliminarlas en cualquier momento. Si las
              rechaza, es posible que no pueda utilizar algunos de nuestros
              servicios.
            </p>
          </section>

          <section className={`${styles.infoBlock} ${styles.reveal}`} style={{ transitionDelay: '760ms' }}>
            <h3 className={styles.blockTitle}>Enlaces a terceros</h3>

            <p className={styles.textSmall}>
              Este sitio web puede contener enlaces a otros sitios que podrían
              ser de su interés. Una vez que usted da clic en estos enlaces y
              abandona nuestra página, ya no tenemos control sobre el sitio al
              que es redirigido y no somos responsables de los términos, la
              privacidad ni la protección de sus datos en esos otros sitios.
              Dichos sitios están sujetos a sus propias políticas de privacidad,
              por lo que le recomendamos consultarlas.
            </p>
          </section>

          <section className={`${styles.infoBlock} ${styles.reveal}`} style={{ transitionDelay: '860ms' }}>
            <h3 className={styles.blockTitle}>Transferencia de datos</h3>

            <p className={styles.textSmall}>
              Acema Ingeniería S.A.S podrá transferir datos personales a
              entidades dentro y fuera del país cuando sea necesario para
              cumplir con sus obligaciones contractuales, operativas o legales,
              garantizando siempre que el tratamiento se realice bajo los mismos
              estándares de protección y seguridad.
            </p>
          </section>

          <section className={`${styles.infoBlock} ${styles.reveal}`} style={{ transitionDelay: '960ms' }}>
            <h3 className={styles.blockTitle}>Menores de edad</h3>

            <p className={styles.textSmall}>
              Acema Ingeniería S.A.S no recolecta ni trata de forma directa
              datos personales de menores de edad con fines comerciales o de
              prestación de servicios. En el marco de la gestión del área de
              talento humano, podrán tratarse datos de hijos o familiares
              menores de edad de los colaboradores, únicamente para:
            </p>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                Gestión de beneficios extralegales asociados al núcleo familiar
                del colaborador.
              </li>
              <li className={styles.listItem}>
                Registro ante entidades de seguridad social (EPS, cajas de
                compensación).
              </li>
              <li className={styles.listItem}>
                Atención de requerimientos legales o judiciales.
              </li>
            </ul>

            <p className={styles.textSmall}>
              En estos casos, el tratamiento requiere autorización del padre,
              madre o representante legal del menor, se limita a los datos
              estrictamente necesarios, no se comparte con terceros salvo
              obligación legal, y se aplican medidas de seguridad reforzadas. En
              ningún caso se recolectan datos sensibles de menores sin
              autorización expresa de su representante legal.
            </p>
          </section>

          <section className={`${styles.infoBlock} ${styles.reveal}`} style={{ transitionDelay: '1060ms' }}>
            <h3 className={styles.blockTitle}>Seguridad de la información</h3>

            <p className={styles.textSmall}>
              Implementamos medidas técnicas, físicas y organizativas para
              proteger sus datos frente a accesos no autorizados, pérdida,
              alteración o destrucción, incluyendo cifrado en la transmisión y
              almacenamiento, control de acceso para personal autorizado, y
              evaluación y monitoreo constante de nuestros sistemas de
              seguridad.
            </p>
          </section>

          <section className={`${styles.infoBlock} ${styles.reveal}`} style={{ transitionDelay: '1160ms' }}>
            <h3 className={styles.blockTitle}>Vigencia y actualizaciones</h3>

            <p className={styles.textSmall}>
              Esta política está vigente desde abril de 2025 y se conservará
              mientras se mantenga la finalidad del tratamiento en cada base de
              datos. Acema Ingeniería S.A.S podrá modificar esta política para
              reflejar cambios normativos u operativos; cualquier actualización
              será publicada en esta página con su nueva fecha de vigencia.
            </p>
          </section>
        </div>

        <footer className={`${styles.actionFooter} ${styles.reveal}`} style={{ transitionDelay: '1260ms' }}>
          <p className={styles.ctaText}>
            Consulte el documento completo de nuestra política de tratamiento de
            datos personales.
          </p>

          <a
            className={styles.ctaButton}
            href={policyPdfUrl}
            download
          >
            Conoce más
          </a>
        </footer>
      </div>
    </section>
  );
};

export default PrivacyPolicy;