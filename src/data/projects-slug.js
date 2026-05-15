/**
 * Datos detallados de proyectos por slug
 * @typedef {Object} ProjectDetail
 * @property {string} title - Título completo del proyecto
 * @property {string} slug - Identificador único (URL-friendly)
 * @property {string} status - Estado del proyecto (finalizados|desarrollo)
 * @property {string} description - Descripción extendida del proyecto
 * @property {string} heroImage - Imagen principal del proyecto
 * @property {string} [videoUrl] - URL embebible del video (YouTube)
 * @property {Array<{label: string, value: string}>} specs - Especificaciones técnicas
 * @property {string[]} gallery - Array de imágenes de la galería
 * @property {string} [location] - Ubicación del proyecto
 * @property {string} [year] - Año de finalización/inicio
 */

export const projectsDetailsData = {
  "la-rubiela": {
    title: "Granja Solar La Rubiela",
    slug: "la-rubiela",
    status: "finalizados",
    description:
      "En Montería (Córdoba) se levanta La Rubiela, una granja solar de 1,25MWp que impulsa la transición energética y el desarrollo sostenible en la región. Este proyecto fortalece la generación distribuida y la independencia energética de las comunidades.\n\nAcema Ingeniería participó en la construcción e interconexión, asegurando calidad, seguridad y eficiencia en cada etapa. La Rubiela es hoy una fuente constante de energía limpia y un ejemplo del aporte de la ingeniería colombiana al desarrollo sostenible",
    heroImage: "/images/projects/finished/Rubiela.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación:",
        value: "Montería, Córdoba, Colombia",
      },
      {
        label: "Generación estimada:",
        value: "1,83GWh/año",
      },
      {
        label: "CO₂:",
        value: "500 toneladas reducidas",
      },
    ],
    textfooter: "Nuestro equipo instaló el transformador principal, configuró sistemas de protección y ejecutó pruebas de aceptación para garantizar una integración segura y estable a la red. Cada componente —estructuras, conexiones y control— fue implementado con rigor técnico, respaldado por la experiencia de Acema en más de 250 MW ejecutados en el país. ",
    gallery: ["/images/projects/finished/Rubiela.webp"],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  "san-pelayo": {
    title: "Granja Solar San Pelayo",
    slug: "san-pelayo",
    status: "finalizados",
    heroImage: "/images/projects/finished/pelayo.webp",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
 
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/pelayo.webp"],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  "inti-i-y-ii": {
    title: "Granja Solar Inti I y II",
    slug: "inti-i-y-ii",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/finished/inti.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/inti.webp"],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  "piedras-i-y-ii": {
    title: "Granja Solar Piedras I y II",
    slug: "piedras-i-y-ii",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/finished/piedras.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/piedras.webp"],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  "semillas-i-y-ii": {
    title: "Granja Solar Semillas I y II",
    slug: "semillas-i-y-ii",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/finished/semillas.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/semillas.webp"],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  valledupar: {
    title: "Granja Solar Valledupar",
    slug: "valledupar",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/finished/valledupar.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Cesar, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/valledupar.webp"],
    location: "Valledupar, Cesar",
    year: 2022,
  },

  salamina: {
    title: "Granja Solar Salamina",
    slug: "salamina",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/finished/salamina.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Caldas, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/salamina.webp"],
    location: "Salamina, Caldas",
    year: 2022,
  },

  urra: {
    title: "Granja Solar Urrá",
    slug: "urra",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/finished/urra.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/urra.webp"],
    location: "Urrá, Córdoba",
    year: 2022,
  },

  "sol-y-cielo": {
    title: "Granja Solar Sol y Cielo",
    slug: "sol-y-cielo",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/bannerproject/sol.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/bannerproject/sol.webp"],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  "emperatriz-i-y-ii": {
    title: "Granja Solar Emperatriz I y II",
    slug: "emperatriz-i-y-ii",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/finished/emperatriz.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Montería, Córdoba, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/emperatriz.webp"],
    location: "Montería, Córdoba",
    year: 2022,
  },

  "coralito-y-golondrina": {
    title: "Granja Solar Coralito y Golondrina",
    slug: "coralito-y-golondrina",
    status: "finalizados",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/finished/coralito.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Instalada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ reducidas",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/finished/coralito.webp"],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  // --- EN DESARROLLO ---
  "puerto-libertador": {
    title: "Granja Solar Puerto Libertador",
    slug: "puerto-libertador",
    status: "desarrollo",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/developing/libertador.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Proyectada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ a reducir",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/developing/libertador.webp"],
    location: "Puerto Libertador, Córdoba",
    year: 2024,
  },

  "lorica-1-8": {
    title: "Granja Solar Lorica 1 - 8",
    slug: "lorica-1-8",
    status: "desarrollo",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/developing/lorica.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Proyectada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ a reducir",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/developing/lorica.webp"],
    location: "Lorica, Córdoba",
    year: 2024,
  },

  "san-onofre-i-ii-y-iii": {
    title: "Granja Solar San Onofre I, II y III",
    slug: "san-onofre-i-ii-y-iii",
    status: "desarrollo",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/developing/sanonofre.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Sucre, Colombia",
      },
      {
        label: "Capacidad Proyectada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ a reducir",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/developing/sanonofre.webp"],
    location: "San Onofre, Sucre",
    year: 2024,
  },

  "tierra-alta-i-y-ii": {
    title: "Granja Solar Tierra Alta I y II",
    slug: "tierra-alta-i-y-ii",
    status: "desarrollo",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/developing/tierraalta.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Proyectada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ a reducir",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/developing/tierraalta.webp"],
    location: "Tierra Alta, Córdoba",
    year: 2024,
  },

  cementera: {
    title: "Granja Solar Cementera",
    slug: "cementera",
    status: "desarrollo",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/developing/cementera.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Proyectada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ a reducir",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/developing/cementera.webp"],
    location: "Córdoba, Colombia",
    year: 2024,
  },

  "laureles-1-4": {
    title: "Granja Solar Laureles 1 - 4",
    slug: "laureles-1-4",
    status: "desarrollo",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/developing/laureles.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba, Colombia",
      },
      {
        label: "Capacidad Proyectada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ a reducir",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/developing/laureles.webp"],
    location: "Córdoba, Colombia",
    year: 2024,
  },

  "mirla-i-y-ii": {
    title: "Granja Solar Mirla I y II",
    slug: "mirla-i-y-ii",
    status: "desarrollo",
    description:
      "En Acema ingeniería ejecutamos impulsiando la transición energética del país mediante la construcción de diversas granjas solares distribuidas para conectar y beneficiarse a nivel local.",
    heroImage: "/images/projects/developing/mirla.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: [
      {
        label: "Ubicación",
        value: "Córdoba",
      },
      {
        label: "Capacidad Proyectada",
        value: "2.662 MWp",
      },
      {
        label: "CO₂ a reducir",
        value: "1.716 toneladas/año",
      },
    ],
    gallery: ["/images/projects/developing/mirla.webp"],
    location: "Córdoba, Colombia",
    year: 2024,
  },
};

/**
 * Obtener detalles de un proyecto por slug
 * @param {string} slug - Slug del proyecto
 * @returns {ProjectDetail|null} Datos del proyecto o null si no existe
 */
export function getProjectBySlug(slug) {
  return projectsDetailsData[slug] || null;
}

/**
 * Obtener todos los slugs de proyectos (para static generation)
 * @returns {string[]} Array de slugs disponibles
 */
export function getAllProjectSlugs() {
  return Object.keys(projectsDetailsData);
}
