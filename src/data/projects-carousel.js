/**
 * Datos del carrusel de imágenes por proyecto
 * Cada proyecto puede tener múltiples imágenes para mostrar en un carrusel
 * 
 * @typedef {Object} ProjectCarousel
 * @property {string} slug - Slug único del proyecto (debe coincidir con projectsData)
 * @property {Array<Object>} images - Array de imágenes del proyecto
 * @property {string} images[].src - Ruta de la imagen
 * @property {string} images[].alt - Texto alternativo de la imagen
 */

export const projectsCarouselData = {
  'la-rubiela': {
    slug: 'la-rubiela',
    images: [
      {
        src: '/images/projects/carousel/rubiela/rubiela1.webp',
        alt: 'Granja solar La Rubiela - Vista 1'
      },
      {
        src: '/images/projects/carousel/rubiela/rubiela2.webp',
        alt: 'Granja solar La Rubiela - Vista 2'
      },
      {
        src: '/images/projects/carousel/rubiela/rubiela3.webp',
        alt: 'Granja solar La Rubiela - Vista 3'
      },
      {
        src: '/images/projects/carousel/rubiela/rubiela4.webp',
        alt: 'Granja solar La Rubiela - Vista 4'
      },
      {
        src: '/images/projects/carousel/rubiela/rubiela5.webp',
        alt: 'Granja solar La Rubiela - Vista 5'
      },
      {
        src: '/images/projects/carousel/rubiela/rubiela6.webp',
        alt: 'Granja solar La Rubiela - Vista 6'
      },
      {
        src: '/images/projects/carousel/rubiela/rubiela7.webp',
        alt: 'Granja solar La Rubiela - Vista 7'
      },
      {
        src: '/images/projects/carousel/rubiela/rubiela8.webp',
        alt: 'Granja solar La Rubiela - Vista 8'
      }
    ]
  },
  'san-pelayo': {
    slug: 'san-pelayo',
    images: [
      {
        src: '/images/projects/carousel/pelayo/pelayo1.webp',
        alt: 'Proyecto San Pelayo - Vista 1'
      },
      {
        src: '/images/projects/carousel/pelayo/pelayo2.webp',
        alt: 'Proyecto San Pelayo - Vista 2'
      },
      {
        src: '/images/projects/carousel/pelayo/pelayo3.webp',
        alt: 'Proyecto San Pelayo - Vista 3'
      },
      {
        src: '/images/projects/carousel/pelayo/pelayo3.webp',
        alt: 'Proyecto San Pelayo - Vista 3'
      },
      {
        src: '/images/projects/carousel/pelayo/pelayo3.webp',
        alt: 'Proyecto San Pelayo - Vista 3'
      },
    ]
  },
  'inti-i-y-ii': {
    slug: 'inti-i-y-ii',
    images: [
      {
        src: '/images/projects/carousel/inti/inti1.webp',
        alt: 'Proyecto Inti I y II - Vista 1'
      },
      {
        src: '/images/projects/carousel/inti/inti2.webp',
        alt: 'Proyecto Inti I y II - Vista 2'
      },
      {
        src: '/images/projects/carousel/inti/inti3.webp',
        alt: 'Proyecto Inti I y II - Vista 3'
      },
      {
        src: '/images/projects/carousel/inti/inti4.webp',
        alt: 'Proyecto Inti I y II - Vista 4'
      },
      {
        src: '/images/projects/carousel/inti/inti5.webp',
        alt: 'Proyecto Inti I y II - Vista 5'
      },
      {
        src: '/images/projects/carousel/inti/inti6.webp',
        alt: 'Proyecto Inti I y II - Vista 6'
      },
      {
        src: '/images/projects/carousel/inti/inti7.webp',
        alt: 'Proyecto Inti I y II - Vista 7'
      },
      {
        src: '/images/projects/carousel/inti/inti8.webp',
        alt: 'Proyecto Inti I y II - Vista 8'
      },
      {
        src: '/images/projects/carousel/inti/inti9.webp',
        alt: 'Proyecto Inti I y II - Vista 9'
      },
      {
        src: '/images/projects/carousel/inti/inti10.webp',
        alt: 'Proyecto Inti I y II - Vista 10'
      }
    ]
  },
  'piedras-i-y-ii': {
    slug: 'piedras-i-y-ii',
    images: [
      {
        src: '/images/projects/carousel/piedras/piedras1.webp',
        alt: 'Proyecto Piedras I y II - Vista 1'
      },
      {
        src: '/images/projects/carousel/piedras/piedras2.webp',
        alt: 'Proyecto Piedras I y II - Vista 2'
      },
      {
        src: '/images/projects/carousel/piedras/piedras3.webp',
        alt: 'Proyecto Piedras I y II - Vista 3'
      },
      {
        src: '/images/projects/carousel/piedras/piedras4.webp',
        alt: 'Proyecto Piedras I y II - Vista 4'
      },
      {
        src: '/images/projects/carousel/piedras/piedras5.webp',
        alt: 'Proyecto Piedras I y II - Vista 5'
      },
      {
        src: '/images/projects/carousel/piedras/piedras6.webp',
        alt: 'Proyecto Piedras I y II - Vista 6'
      },
      {
        src: '/images/projects/carousel/piedras/piedras7.webp',
        alt: 'Proyecto Piedras I y II - Vista 7'
      },
      {
        src: '/images/projects/carousel/piedras/piedras8.webp',
        alt: 'Proyecto Piedras I y II - Vista 8'
      },
      {
        src: '/images/projects/carousel/piedras/piedras9.webp',
        alt: 'Proyecto Piedras I y II - Vista 9'
      }
    ]
  },
  'semillas-i-y-ii': {
    slug: 'semillas-i-y-ii',
    images: [
      {
        src: '/images/projects/carousel/semillas/semillas1.webp',
        alt: 'Proyecto Semillas I y II - Vista 1'
      },
      {
        src: '/images/projects/carousel/semillas/semillas2.webp',
        alt: 'Proyecto Semillas I y II - Vista 2'
      },
      {
        src: '/images/projects/carousel/semillas/semillas3.webp',
        alt: 'Proyecto Semillas I y II - Vista 3'
      }
    ]
  },
  'valledupar': {
    slug: 'valledupar',
    images: [
      {
        src: '/images/projects/carousel/valledupar/valledupar1.webp',
        alt: 'Proyecto Valledupar - Vista 1'
      },
      {
        src: '/images/projects/carousel/valledupar/valledupar2.webp',
        alt: 'Proyecto Valledupar - Vista 2'
      },
      {
        src: '/images/projects/carousel/valledupar/valledupar3.webp',
        alt: 'Proyecto Valledupar - Vista 3'
      }
    ]
  },
  'emperatriz-i-y-ii': {
    slug: 'emperatriz-i-y-ii',
    images: [
      {
        src: '/images/projects/carousel/emperatriz/emperatriz1.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 1'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz2.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 2'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz3.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 3'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz4.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 4'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz5.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 5'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz6.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 6'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz7.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 7'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz8.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 8'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz9.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 9'
      },
      {
        src: '/images/projects/carousel/emperatriz/emperatriz10.webp',
        alt: 'Proyecto Emperatriz I y II - Vista 10'
      }
    ]
  },
  'coralito-y-golondrina': {
    slug: 'coralito-y-golondrina',
    images: [
      {
        src: '/images/projects/carousel/coralito/coralito1.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 1'
      },
      {
        src: '/images/projects/carousel/coralito/coralito2.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 2'
      },
      {
        src: '/images/projects/carousel/coralito/coralito3.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 3'
      },
      {
        src: '/images/projects/carousel/coralito/coralito4.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 4'
      },
      {
        src: '/images/projects/carousel/coralito/coralito5.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 5'
      },
      {
        src: '/images/projects/carousel/coralito/coralito6.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 6'
      },
      {
        src: '/images/projects/carousel/coralito/coralito7.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 7'
      },
      {
        src: '/images/projects/carousel/coralito/coralito8.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 8'
      },
      {
        src: '/images/projects/carousel/coralito/coralito9.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 9'
      },
      {
        src: '/images/projects/carousel/coralito/coralito10.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 10'
      },
      {
        src: '/images/projects/carousel/coralito/coralito11.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 11'
      },
      {
        src: '/images/projects/carousel/coralito/coralito12.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 12'
      },
      {
        src: '/images/projects/carousel/coralito/coralito13.webp',
        alt: 'Proyecto Coralito y Golondrina - Vista 13'
      }
    ]
  },
  'puerto-libertador': {
    slug: 'puerto-libertador',
    images: [
      {
        src: '/images/projects/carousel/libertador/libertador1.webp',
        alt: 'Proyecto Puerto Libertador - Vista 1'
      },
      {
        src: '/images/projects/carousel/libertador/libertador2.webp',
        alt: 'Proyecto Puerto Libertador - Vista 2'
      },
      {
        src: '/images/projects/carousel/libertador/libertador3.webp',
        alt: 'Proyecto Puerto Libertador - Vista 3'
      }
    ]
  },
  'lorica-1-8': {
    slug: 'lorica-1-8',
    images: [
      {
        src: '/images/projects/carousel/lorica/lorica1.webp',
        alt: 'Proyecto Lorica 1-8 - Vista 1'
      },
      {
        src: '/images/projects/carousel/lorica/lorica2.webp',
        alt: 'Proyecto Lorica 1-8 - Vista 2'
      },
      {
        src: '/images/projects/carousel/lorica/lorica3.webp',
        alt: 'Proyecto Lorica 1-8 - Vista 3'
      }
    ]
  },
  'granjas-solares-san-onofre-i-ii-y-iii': {
    slug: 'granjas-solares-san-onofre-i-ii-y-iii',
    images: [
      {
        src: '/images/projects/carousel/onofre/onofre1.webp',
        alt: 'Proyecto Granjas Solares San Onofre I, II y III - Vista 1'
      },
      {
        src: '/images/projects/carousel/onofre/onofre2.webp',
        alt: 'Proyecto Granjas Solares San Onofre I, II y III - Vista 2'
      },
      {
        src: '/images/projects/carousel/onofre/onofre3.webp',
        alt: 'Proyecto Granjas Solares San Onofre I, II y III - Vista 3'
      },
      {
        src: '/images/projects/carousel/onofre/onofre4.webp',
        alt: 'Proyecto Granjas Solares San Onofre I, II y III - Vista 4'
      },
      {
        src: '/images/projects/carousel/onofre/onofre5.webp',
        alt: 'Proyecto Granjas Solares San Onofre I, II y III - Vista 5'
      },
      {
        src: '/images/projects/carousel/onofre/onofre6.webp',
        alt: 'Proyecto Granjas Solares San Onofre I, II y III - Vista 6'
      }
    ]
  },
  'tierra-alta-i-y-ii': {
    slug: 'tierra-alta-i-y-ii',
    images: [
      {
        src: '/images/projects/carousel/tierraalta/tierraalta1.webp',
        alt: 'Proyecto Tierra Alta I y II - Vista 1'
      },
      {
        src: '/images/projects/carousel/tierraalta/tierraalta2.webp',
        alt: 'Proyecto Tierra Alta I y II - Vista 2'
      },
      {
        src: '/images/projects/carousel/tierraalta/tierraalta3.webp',
        alt: 'Proyecto Tierra Alta I y II - Vista 3'
      }
    ]
  },
  'cementera': {
    slug: 'cementera',
    images: [
      {
        src: '/images/projects/carousel/cementera/cementera1.webp',
        alt: 'Proyecto Cementera - Vista 1'
      },
      {
        src: '/images/projects/carousel/cementera/cementera2.webp',
        alt: 'Proyecto Cementera - Vista 2'
      },
      {
        src: '/images/projects/carousel/cementera/cementera3.webp',
        alt: 'Proyecto Cementera - Vista 3'
      }
    ]
  },
  'laureles-1-4': {
    slug: 'laureles-1-4',
    images: [
      {
        src: '/images/projects/carousel/laureles/laureles1.webp',
        alt: 'Proyecto Laureles 1-4 - Vista 1'
      },
      {
        src: '/images/projects/carousel/laureles/laureles2.webp',
        alt: 'Proyecto Laureles 1-4 - Vista 2'
      },
      {
        src: '/images/projects/carousel/laureles/laureles3.webp',
        alt: 'Proyecto Laureles 1-4 - Vista 3'
      }
    ]
  },
  'mirla-i-y-ii': {
    slug: 'mirla-i-y-ii',
    images: [
      {
        src: '/images/projects/carousel/mirla/mirla1.webp',
        alt: 'Proyecto Mirla I y II - Vista 1'
      },
      {
        src: '/images/projects/carousel/mirla/mirla2.webp',
        alt: 'Proyecto Mirla I y II - Vista 2'
      },
      {
        src: '/images/projects/carousel/mirla/mirla3.webp',
        alt: 'Proyecto Mirla I y II - Vista 3'
      }
    ]
  }
};

/**
 * Función para obtener las imágenes del carrusel de un proyecto específico
 * @param {string} slug - Slug del proyecto
 * @returns {Array<Object>|null} Array de imágenes o null si no existe
 */
export function getCarouselImagesBySlug(slug) {
  return projectsCarouselData[slug]?.images || null;
}
