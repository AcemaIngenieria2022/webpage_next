# Plan de mejora extendido — Optimización completa de la app

Fecha: 2026-06-12

Objetivo: Proveer un roadmap completo y priorizado con acciones concretas para optimizar el rendimiento, la experiencia UX y la infraestructura del proyecto a corto, medio y largo plazo.

---

## Prioridad Alta (1-2 semanas)
Acciones que entregan el mayor impacto con esfuerzo moderado.

1) Medición y observabilidad
- Ejecutar Lighthouse (móvil y desktop) y WebPageTest en las páginas clave: home, proyectos (slugs), servicios, blog.
- Añadir Lighthouse CI en CI para detectar regresiones.
- Instrumentar TTFB/LCP/CLS con RUM (Google Analytics, Vercel Analytics o Google PageSpeed Insights API) si aplica.

2) Imágenes y formatos modernos
- Migrar componentes críticos a `next/image` (hero, carousels, cards, project detail). Esto habilita auto-resize, AVIF/WebP y optimización.
- Implementar thumbnails y versiones servidas por CDN.

3) Caching y CDN
- Configurar CDN global (Vercel/Cloudflare/AWS CloudFront) y reglas de cache para `/public`, assets estáticos y rutas con SSG.
- Añadir `Cache-Control` en headers: assets versionados => `max-age=31536000, immutable`.

4) Pre-rendering
- Migrar rutas de contenido a SSG o ISR según frecuencia de cambio. Evitar SSR para páginas que pueden ser estáticas.

5) Evitar layout shift
- Reservar espacio para imágenes y componentes con `aspect-ratio` o `min-height`.
- Auditar CLS con Lighthouse y arreglar fuentes/layout que provoquen shifts.

---
## Prioridad Media (2-6 semanas)
Mejoras que requieren cambios de arquitectura o análisis.

1) Optimizar JS y bundling
- Instalar `@next/bundle-analyzer`, generar reportes y eliminar dependencias grandes del cliente.
- Code-splitting: `next/dynamic` para componentes pesados.
- Reemplazar librerías grandes por alternativas más pequeñas donde sea posible (p.ej. lodash => módulos puntuales).

2) Fonts y CSS
- Migrar a `next/font` o self-host con `preload` y `font-display: swap`.
- Extraer CSS crítico (inline) para LCP.
- Minimizar CSS global y eliminar estilos no usados.

3) Optimización de imágenes avanzada
- Usar un servicio de imágenes o Edge Functions para entregar diferentes calidades según conexión (client hint).
- Generar y servir AVIF donde sea posible.

4) Infraestructura y transport
- Habilitar Brotli en servidor/CDN y HTTPS/2 o HTTP/3.
- Revisar tiempos TTFB en el hosting (cold starts, funciones serverless). Considerar aumentar memoria o warm-up si usan serverless.

---
## Prioridad Baja / Largo plazo (1-3 meses)
Iniciativas de mayor alcance, programas de mejora continua.

1) Edge rendering y funciones
- Mover rutas que necesitan baja latencia a Edge Functions (Vercel Edge, Cloudflare Workers) para reducir TTFB.
- Considerar usar middleware en edge para redirecciones y pequeños prerender caches.

2) Critical rendering path y optimizaciones avanzadas
- Implementar HTTP/2 server push con cuidado (preload ya suele ser suficiente).
- Aplicar Server Components de React para reducir JS enviado al cliente cuando sea apropiado.

3) Observabilidad y pruebas de rendimiento automatizadas
- Pipeline de pruebas de rendimiento (Lighthouse CI + WebPageTest) que bloquee PRs con degradación.
- Alertas de regresión de rendimiento.

4) Programa de mejora continua
- Priorizar las páginas con peor rendimiento y trabajar por sprints.
- Baseline mensual, medir y comunicar progreso.

---

## Checklist técnico (acciones concretas y comandos)
- Lighthouse:
```bash
npm install -g @lhci/cli
npx lhci autorun
```
- Bundle analyzer:
```bash
npm install --save-dev @next/bundle-analyzer
# Añadir en next.config.mjs y correr script analyze
```
- Reemplazar `<img>` por `next/image`:
  - Importar `import Image from 'next/image'` y usar `<Image src={src} width={w} height={h} alt="..." />`.
- Headers de cache (ejemplo Vercel `vercel.json`):
```json
{
  "routes": [
    { "src": "/_next/static/(.*)", "headers": { "cache-control": "public, max-age=31536000, immutable" } }
  ]
}
```

---

## Métricas objetivo (KPIs)
- LCP móvil < 2.5s
- CLS < 0.1
- TTFB < 600ms en páginas cacheadas
- Tamaño JS por página < 200KB gzipped (aplicar objetivo según caso)

---

Si quieres, puedo:
- Ejecutar `npx lhci autorun` ahora y adjuntar el informe.
- Añadir `@next/bundle-analyzer` y crear el script `analyze` en `package.json`.
- Empezar a migrar el carousel `ProjectMiniCarousel` a `next/image`.
