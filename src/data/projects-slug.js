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
      "En Montería (Córdoba) se levanta La Rubiela, una granja solar de 1,25MWp que impulsa la transición energética y el desarrollo sostenible en la región. Este proyecto fortalece la generación distribuida y la independencia energética de las comunidades.\n\nAcema Ingeniería participó en la construcción e interconexión, asegurando calidad, seguridad y eficiencia en cada etapa. La Rubiela es hoy una fuente constante de energía limpia y un ejemplo del aporte de la ingeniería colombiana al desarrollo sostenible.",
    heroImage: "/images/projects/finished/Rubiela.webp",
    videoUrl: "https://youtu.be/0lVPaEloYVM",
    specs: [
      {
        label: "Ubicación",
        value: "Montería, Córdoba, Colombia",
      },
      {
        label: "Generación estimada",
        value: "1,83GWh/año",
      },
      {
        label: "CO₂",
        value: "500 toneladas reducidas",
      },
    ],
    textfooter: "Nuestro equipo instaló el transformador principal, configuró sistemas de protección y ejecutó pruebas de aceptación para garantizar una integración segura y estable a la red. Cada componente, estructuras, conexiones y control fue implementado con rigor técnico, respaldado por la experiencia de Acema en más de 250 MW ejecutados en el país. ",
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
      "La Granja Solar San Pelayo representa el avance de la energía renovable en Córdoba, donde distintos proyectos fotovoltaicos impulsan la generación distribuida y fortalecen la sostenibilidad regional.\n\nEn este proyecto, Acema aportó ingeniería detallada y la elaboración de especificaciones técnicas, además del suministro y ensamblaje de tableros, centros de transformación, protecciones y otros equipos. Asimismo, realizó el montaje y las pruebas especializadas (inyecciones, VLF y SAT), y se encargó de la puesta en servicio e interconexión, cumpliendo con los requisitos establecidos por el operador.",
 
    videoUrl: "https://www.youtube.com/watch?v=1YIEjJ8IyFQ",
    specs: [
      {
        label: "Ubicación",
        value: "San Pelayo, Córdoba, Colombia",
      },
      {
        label: "Generación estimada",
        value: "2,04GWh/año",
      },
       
      {
        label: "CO₂",
        value: "501 toneladas reducidas",
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
      "En La Apartada (Córdoba) se inauguró la granja solar INTI I y II, un proyecto fotovoltaico que refuerza la transición energética en la región y aporta capacidad al Sistema Interconectado Nacional.\n\nEl proyecto abarca un área de 20 hectáreas, con obras civiles, montaje de estructuras, instalación de módulos, inversores, tableros y un centro de transformación para inyección segura de energía. Su puesta en marcha incluyó pruebas de aceptación, configuración de protecciones y coordinación con el operador de red las cuales Acema se hizo cargo, brindando un impecable servicio eléctrico.",
    heroImage: "/images/projects/finished/inti.webp",
    videoUrl: "https://www.youtube.com/watch?v=5eV4gI00wgU",
 
     textfooter: "El proyecto abarca un área de 20 hectáreas, con obras civiles, montaje de estructuras, instalación de módulos, inversores, tableros y un centro de transformación para inyección segura de energía. Su puesta en marcha incluyó pruebas de aceptación, configuración de protecciones y coordinación con el operador de red.",
    gallery: ["/images/projects/finished/inti.webp"],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  "piedras-i-y-ii": {
    title: "Granja Solar Piedras I y II",
    slug: "piedras-i-y-ii",
    status: "finalizados",
    description:
      "Las granjas solares Piedra I y II, con una capacidad conjunta de 2,75MWp, desarrolladas y construidas para Erco Energía, ya se encuentran energizadas, consolidándose como proyectos de alto impacto dentro del modelo de generación distribuida en Colombia. \n\n Acema Ingeniería estuvo a cargo del desarrollo integral del proyecto, desde la ingeniería y construcción hasta la energización y puesta en servicio.",
    heroImage: "/images/projects/finished/piedras.webp",
    videoUrl: "https://www.youtube.com/watch?v=ZIl9fwrawJU",
    specs: [
      {
        label: "Ubicación",
        value: "Sampués (Sucre), Colombia",
      },
      {
        label: "Generación estimada",
        value: "4,02GWh/año",
      },
      {
        label: "CO₂",
        value: "502 toneladas reducidas",
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
      "En Acema Ingeniería seguimos impulsando la transición energética del país con la construcción de varias granjas solares para Suncolombia. Entre ellas se destacan Semillas I y II, con una capacidad conjunta de 2,5MWp y una generación estimada de 3,65GWh/año",
    heroImage: "/images/projects/finished/semillas.webp",
    videoUrl: "https://www.youtube.com/watch?v=ilSGYjWafGM",
    specs: [
      {
        label: "Ubicación",
        value: "Montería, Córdoba, Colombia",
      },
      {
        label: "Generación estimada",
        value: "3,65GWh/año",
      },
      {
        label: "CO₂",
        value: "504 toneladas reducidas",
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
      "En Acema Ingeniería seguimos impulsando la transición energética del país con la construcción de varias granjas solares, entre ellas se destaca Valledupar, un GD realizada con el fin de poder aportar a un futuro más sostenible.",
    heroImage: "/images/projects/finished/valledupar.webp",
    videoUrl: "https://www.youtube.com/watch?v=inZovQXV3VQ",
    specs: [
      {
        label: "Ubicación",
        value: "Valledupar, Cesar, Colombia",
      },
      {
        label: "Capacidad instalada",
        value: "1,436 MWp",
      },
      {
        label: "CO₂",
        value: "8566,623 toneladas reducidas",
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
      "En el Parque Solar Salamina de 19,9 MW, Acema Ingeniería participó en el desarrollo de infraestructura clave para la operación del proyecto. La compañía realizó el diseño e instalación de la subestación tipo pórtico en media tensión de 34,5 kV, incluyendo iluminación, apantallamiento, cuarto de control y estación meteorológica. \n\n Adicionalmente, ejecutó el diseño e instalación del sistema SCADA, mediante el suministro en modalidad EPC del sistema SCADA y PPC, permitiendo el monitoreo y control eficiente de la planta. Con estas soluciones, Acema Ingeniería contribuye al desarrollo de proyectos solares que impulsan una energía más limpia y sostenible. ",
    heroImage: "/images/projects/finished/salamina.webp",
  },

  urra: {
    title: "Granja Solar Urrá",
    slug: "urra",
    status: "finalizados",
    description:
      "En la Granja Solar Urrá de 19,9 MW, Acema Ingeniería participó en actividades clave para la puesta en operación y conexión del proyecto al sistema eléctrico. \n\nDentro del alcance, se realizaron pruebas eléctricas y de automatización, el suministro en modalidad EPC del retrofit del tren de celdas en la hidroeléctrica Urrá para el punto de conexión del parque, así como el comisionamiento y puesta en servicio de la granja solar. Adicionalmente, se ejecutó el alcance eléctrico del proyecto y la conexión del parque solar. \n\n El proyecto cuenta con una capacidad instalada de 1,4364 MWp y contribuye a la reducción aproximada de 9.279,86 toneladas de CO₂, aportando al desarrollo de una matriz energética más limpia y sostenible",
    heroImage: "/images/projects/finished/urra.webp",
    location: "Urrá, Córdoba",
    year: 2022,
  },

  "sol-y-cielo": {
    title: "Granja Solar Sol y Cielo",
    slug: "sol-y-cielo",
    status: "finalizados",
    description:
      "En el Parque Solar Sol y Cielo de 9,9 MW, Acema Ingeniería participó en el desarrollo de actividades clave para la infraestructura eléctrica y la puesta en operación del proyecto. \n\nDentro del alcance, la compañía realizó el suministro, montaje y puesta en servicio de la ampliación de la subestación, así como el comisionamiento de la interfaz entre la granja solar y el operador de red, permitiendo su operación comercial. \n\nAdicionalmente, se llevaron a cabo pruebas a los centros de transformación y el montaje del centro de control, contribuyendo al correcto funcionamiento y monitoreo del parque solar. Con estas soluciones, Acema Ingeniería continúa aportando al desarrollo de proyectos que fortalecen la generación de energía solar en el país.",
    heroImage: "/images/projects/bannerproject/sol.webp",
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
        label: "CO₂",
        value: "1.716 toneladas reducidas",
      },
    ],
    location: "Córdoba, Colombia",
    year: 2022,
  },

  "emperatriz-i-y-ii": {
    title: "Granja Solar Emperatriz I y II",
    slug: "emperatriz-i-y-ii",
    status: "finalizados",
    description:
      "En Acema Ingeniería seguimos impulsando la transición energética del país mediante la construcción de diversas granjas solares, entre las que destacan Emperatriz I y II, centrales diseñadas para conectar y beneficiar a las comunidades.",
    heroImage: "/images/projects/finished/emperatriz.webp",
    videoUrl: "https://www.youtube.com/watch?v=ilSGYjWafGM",
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
        label: "CO₂",
        value: "17,164 toneladas reducidas",
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
      "En Acema Ingeniería seguimos impulsando la transición energética del país mediante la construcción de granjas solares como Coralito y Golondrina, proyectos diseñados para fortalecer el desarrollo local y acercar una energía más limpia a las comunidades y hogares.",
    heroImage: "/images/projects/finished/coralito.webp",
    videoUrl: "https://www.youtube.com/watch?v=ilSGYjWafGM",
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
        label: "CO₂",
        value: "17,164 toneladas reducidas",
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
    videoUrl: "https://www.youtube.com/watch?v=ilSGYjWafGM",
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
    videoUrl: "https://www.youtube.com/watch?v=ilSGYjWafGM",
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

  "granjas-solares-san-onofre-i-ii-y-iii": {
    title: "Granjas Solares San Onofre I, II y III",
    slug: "granjas-solares-san-onofre-i-ii-y-iii",
    status: "finalizados",
    description:
      "Las Granjas Solares San Onofre I, II y III representan un importante avance para la generación de energía renovable en Colombia, fortaleciendo la infraestructura energética del país mediante tres proyectos de generación distribuida que hoy aportan energía limpia y sostenible. En estos proyectos, Acema Ingeniería fue responsable del desarrollo de la ingeniería detallada, la elaboración de especificaciones técnicas y el suministro y ensamblaje de tableros, centros de transformación, sistemas de protección y demás equipos eléctricos. Además, ejecutó el montaje electromecánico, las pruebas especializadas, así como la puesta en servicio e interconexión de las tres plantas, garantizando el cumplimiento de los requisitos técnicos del operador de red y permitiendo su exitosa energización.",
    heroImage: "/images/projects/developing/sanonofre.webp",
    videoUrl: "https://www.youtube.com/watch?v=BBotymwcKM4",
    specs: [
      {
        label: "Ubicación",
        value: "San Onofre, Sucre, Colombia",
      },
      {
        label: "Generación estimada",
        value: "6,03 GWh/año",
      },
      {
        label: "CO₂",
        value: "26.765 toneladas reducidas al año",
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
