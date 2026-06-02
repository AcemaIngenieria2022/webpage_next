/**
 * Datos detallados de posts de blog por slug
 * 
 * @typedef {Object} BlogPostDetail
 * @property {string} title - Título del post
 * @property {string} slug - Identificador único (URL-friendly)
 * @property {string} image - Imagen principal del post
 * @property {string} content - Contenido HTML del post
 * @property {string} excerpt - Resumen corto del post
 * @property {string} author - Autor del post
 * @property {string} date - Fecha de publicación (ISO format)
 * @property {string[]} tags - Tags del post
 */

export const blogPostsDetailsData = {
  'alta-media-baja-tension': {
    // title: '¿Qué es la alta, media y baja tensión?',
    slug: 'alta-media-baja-tension',
    excerpt: 'Descubre los niveles de tensión eléctrica, sus diferencias y aplicaciones en Colombia.',
    tags: ['Educación', 'Energía Eléctrica', 'Tensión', 'Redes Eléctricas'],
    content: `
      <div class="badge-title">¿Qué es la alta, media y baja tensión?</div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; margin: 40px 0;">
        <div>
          <p class="intro-text">
            Es un concepto esencial para entender cómo fluye la corriente a través de los circuitos y cómo suministramos energía a nuestros dispositivos eléctricos.
          </p>

          <p class="intro-text">
            Es la diferencia de <strong>potencial eléctrico</strong> entre dos puntos, también se conoce como voltaje. El potencial se refiere a la fuerza que impulsa el movimiento de los electrones a través de un circuito.
          </p>

          <p class="intro-text">
            En otras palabras, es la energía por unidad de carga. La Unidad de medida estándar para la tensión es el <strong>Voltio (V)</strong>. En función de esta hablaremos de alta, media y baja tensión.
          </p>
        </div>
        <div style="background-color: #f0f0f0; border-radius: 12px; overflow: hidden; min-height: 300px;">
          <img src="/images/blog/queesalta.webp" alt="Transformador eléctrico" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </div>

      

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; margin: 40px 0;">
        <div style="background-color: #f0f0f0; border-radius: 12px; overflow: hidden; min-height: 300px;">
          <img src="/images/blog/slug/slug-blog-img2.webp" alt="Torre de transmisión" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div>
          <h2 class="section-title">Ejemplos prácticos de alta, media y baja tensión:</h2>

          <div class="examples-box">
            <ul>
              <li><strong>Carga de un teléfono móvil:</strong> al cargar un teléfono en el cargador a la batería del dispositivo móvil se aplica una tensión relativamente baja desde el cargador a la batería del dispositivo. Esto ilustra cómo la baja tensión es suficiente para suministrar energía a dispositivos pequeños y portátiles.</li>
              
              <li><strong>Funcionamiento de una nevera:</strong> una nevera opera a una tensión de 110-120 V. Esta tensión es suficiente para alimentar el motor del compresor y mantener sistemas de refrigeración que mantienen el congelador a temperaturas adecuadas en electrodomésticos comunes.</li>
              
              <li><strong>Transmisión de energía a larga distancia:</strong> las torres de transmisión eléctrica que vemos a lo largo de las carreteras transportan energía a larga distancia a suministrar electricidad a comunidades distantes de los controles eléctricos.</li>
            </ul>
          </div>
          
        </div>
        <div class="centered-highlight" style="text-align: center; margin: 25px auto 40px; max-width: 760px;">
       
      </div>
      </div>

    `,
  },

  'acema-alegria-ninos': {
    title: 'ACEMA Ingeniería comparte alegría con los niños',
    slug: 'acema-alegria-ninos',
    image: '/images/projects/finished/solycielo.webp',
    excerpt: 'Nuestra responsabilidad social y compromiso con las comunidades.',
    author: 'ACEMA Ingeniería',
    date: '2024-02-10',
    tags: ['RSE', 'Comunidad', 'Responsabilidad Social'],
    content: `
      <h2>Un Compromiso con las Comunidades</h2>
      <p>
        En ACEMA Ingeniería creemos que el éxito empresarial debe ir acompañado de responsabilidad social. 
        Por eso, regularmente participamos en iniciativas que impacten positivamente en nuestras comunidades.
      </p>

      <h2>Actividades de Impacto Social</h2>
      <p>
        Nuestro equipo se dedica a llevar sonrisas y oportunidades a los niños de las regiones donde operamos. 
        Desde talleres educativos hasta jornadas de esparcimiento, buscamos contribuir al desarrollo integral de las futuras generaciones.
      </p>

      <h2>Valores de ACEMA</h2>
      <ul>
        <li>Compromiso con el desarrollo sostenible</li>
        <li>Responsabilidad ambiental y social</li>
        <li>Educación y capacitación comunitaria</li>
        <li>Apoyo a programas de bienestar infantil</li>
      </ul>

      <p>
        Seguiremos trabajando para que la energía que distribuimos también ilumine oportunidades para todos.
      </p>
    `,
  },
};

/**
 * Obtiene todos los slugs de posts de blog
 * @returns {string[]} Array de slugs
 */
export function getAllBlogSlugs() {
  return Object.keys(blogPostsDetailsData);
}

/**
 * Obtiene los detalles de un post de blog por slug
 * @param {string} slug - El identificador del post
 * @returns {Object|null} Datos del post o null si no existe
 */
export function getBlogPostBySlug(slug) {
  return blogPostsDetailsData[slug] || null;
}
