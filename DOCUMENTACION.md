
# DOCUMENTACIÓN DEL PROYECTO

## Resumen

- **Nombre del proyecto**: Webpage
- **Descripción**: Sitio web corporativo construido con Next.js (app router). Incluye páginas públicas (inicio, servicios, proyectos, blog, contacto), componentes reutilizables, APIs internas para contacto y PQRS, y utilidades para procesamiento multimedia.
- **Versión**: 0.1.0 (actualizar manualmente según releases)

## Propósito y alcance

Este repositorio contiene la aplicación frontend y parte de la lógica backend ligera (endpoints API) necesaria para: mostrar contenidos, recibir formularios de contacto/PQRS, procesar miniaturas de video y conectarse a una base de datos para persistencia cuando sea necesario.

## Tecnologías principales

- **Framework**: Next.js 16 (App Router)
- **Librería UI**: React 19
- **Animaciones**: framer-motion, motion, aos
- **Correo**: nodemailer
- **Bases de datos**: mysql2 (MySQL) y pg (Postgres) - el adaptador se gestiona desde `src/lib/db.js`
- **Procesamiento multimedia**: fluent-ffmpeg, ffmpeg-static
- **Utilidades**: react-icons
- **Dev**: eslint, eslint-config-next

## Arquitectura técnica (resumen)

- La aplicación usa el App Router de Next.js: las rutas y páginas están en `src/app`.
- Se combinan componentes de servidor (Server Components) y componentes cliente (Client Components) según necesidad. Los componentes que usan hooks de estado, efectos o interactividad del navegador están marcados como `use client`.
- Las APIs ligeras se implementan en `src/app/api/*` como routes de Next.js (serverless/http handlers). Estas rutas delegan en la capa de servicios ubicada en `src/lib`.
- La persistencia (cuando se usa) se realiza mediante clientes de base de datos (`mysql2` o `pg`) centralizados en `src/lib/db.js`.
- El envío de correos se abstrae en `src/lib/mailer.js` usando `nodemailer` y variables de entorno.
- Procesos pesados (p. ej. generación de miniaturas) se ejecutan desde `scripts/` para evitar bloquear peticiones HTTP.

## Estructura detallada de carpetas y archivos

- `public/`
  - Imágenes y recursos estáticos servidos directamente. Contiene subcarpetas por sección (about, blog, projects, services, etc.).

- `src/app/`
  - Punto de entrada del App Router. Contiene:
    - `layout.js`: layout global (cabecera/pie)
    - `globals.css`: estilos globales
    - `page.js`: página principal
    - Carpetas por ruta: `about/`, `blog/`, `contact/`, `projects/`, `services/`, `pqrs/`, etc.
    - `api/`: endpoints como `contact/route.js` y `pqrs/route.js`.

- `src/components/`
  - Componentes reutilizables organizados por dominio:
    - `layout/` (Navbar, Footer)
    - `home/` (Hero, About, Projects, Clients, Values)
    - `projects/` (ProjectDetail, ProjectMiniCarousel)
    - `shared/` (Card, ContactForm, PqrForm, Toggle, WhatsAppButton, PopupAlert, PrivacyPolicy)
    - `blog/` (BlogCard)

  - Recomendación: para entender un componente concreto, abrir su carpeta y revisar `.jsx`/`.module.css` correspondientes.

- `src/lib/`
  - Lógica de servicios y utilidades:
    - `mailer.js`: envía correos (contacto, PQRS). Requiere configuración SMTP.
    - `db.js`: abstracción de conexión a base de datos. Determina cliente por `DB_CLIENT`.
    - `contactService.js`, `pqrsService.js`: lógica de negocio para formularios y persistencia.
    - `inputUtils.js`, `mailer.js`: helpers para validación y envío.

- `src/data/`
  - Datos estáticos y fixtures usados por las páginas (posts de blog, listados de proyectos, contenido de servicios). No sustituye una base de datos, pero facilita desarrollo local.

- `scripts/`
  - `generate-thumbnail.js`: script para generar miniaturas de vídeo usando `fluent-ffmpeg`. Ejecutar de forma manual o integrarlo en pipelines.

- `types/`
  - `index.d.ts`: definiciones TypeScript (si se usan) para mejorar autocompletado.

- `webpage/package.json`
  - Contiene metadatos y scripts del proyecto. Ver sección de dependencias abajo.

## Componentes clave y responsabilidades

- `Navbar` (en `src/components/layout/Navbar/`): navegación principal, enlaces a secciones, manejo de estado responsive.
- `Footer` (en `src/components/layout/Footer/`): links legales, contacto, redes.
- `Hero` (en `src/components/home/Hero/`): bloque visual principal en la home con llamadas a la acción.
- `Projects` / `ProjectDetail` (en `src/components/projects/` y `src/app/projects`): listados, filtros y detalle con carrusel de imágenes.
- `ContactForm` / `PqrForm` (en `src/components/shared/`): validación client-side, envío a endpoint `api/contact` o `api/pqrs`.
- `BlogCard` (en `src/components/blog/BlogCard`): resumen de artículos con link al `src/app/blog/[slug]/`.

## Flujo de datos y fetch strategies

- Páginas que requieren SEO y contenido indexable deben usar Server Components y fetch en servidor.
- Interacciones en cliente (formularios, toggles, carruseles) usan Client Components con `fetch` a `/api/*` o llamadas a servicios internos.
- Recomendación: mantener la lógica de negocio fuera de los handlers API y delegar en `src/lib/*` para facilitar testing.

## Variables de entorno (recomendadas)

Crear un archivo `.env` en desarrollo (nunca versionarlo). Ejemplo mínimo para `.env.example`:

```bash
DB_CLIENT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=usuario
DB_PASS=contraseña
DB_DATABASE=nombre_db

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=usuario_smtp
SMTP_PASS=secret
SMTP_SECURE=false

NEXT_PUBLIC_WHATSAPP_NUMBER=+573001234567
```

## Dependencias (extraídas de `package.json`)

- `next` 16.2.4
- `react` 19.2.4
- `framer-motion`, `motion` — animaciones
- `aos` — scroll animations
- `react-icons` — iconos
- `nodemailer` — correo
- `mysql2` y `pg` — clientes DB
- `fluent-ffmpeg` + `ffmpeg-static` — procesamiento multimedia

## Scripts útiles

```bash
npm install
npm run dev   # desarrollo
npm run build # construir
npm run start # producción
npm run lint  # linting
```

## Despliegue (resumen rápido)

1. Establecer variables de entorno en el proveedor (Vercel, Netlify, servidor propio).
2. Instalar dependencias y ejecutar `npm run build`.
3. Comprobar endpoints `api/contact` y `api/pqrs` con variables configuradas.
4. Si se usan miniaturas en producción, asegurar que `ffmpeg` esté disponible o que `ffmpeg-static` sea compatible con la plataforma.

## Problemas conocidos y recomendaciones de mitigación

- Procesado de video: `ffmpeg-static` no siempre cubre todas las plataformas—probar en el entorno objetivo.
- Envío de correos: proveedores como Gmail requieren `app password` o configuración OAuth2. Manejar retries y logging.
- Parámetros de conexión DB: validar timeouts y pool sizes para evitar fugas de conexiones.
- Rutas y generación de contenido: revisar usos de `use client` y `use server` para evitar errores en build/SSR.

## Buenas prácticas y mejoras sugeridas

- Añadir `.env.example` (automático) — ya sugerido en el documento.
- Integrar tests automáticos: Jest + React Testing Library para componentes; Playwright para e2e.
- Añadir CI (Github Actions) con pasos: install, lint, build, test.
- Implementar sistema de migraciones (Prisma/Knex) si se usa DB relacional en producción.
- Externalizar assets pesados a un bucket (S3/Cloud Storage) y configurar CDN.
- Implementar manejo de errores centralizado y tracking (Sentry).

## Cómo contribuir

- Clonar repositorio y crear branch por feature/fix.
- Mantener commits pequeños y descriptivos.
- Ejecutar `npm run lint` antes de abrir PR.

## Archivos y referencias clave

- `package.json` — dependencias y scripts
- `src/app` — rutas y páginas (App Router)
- `src/components` — componentes UI
- `src/lib/mailer.js` — implementación de envío de correos
- `src/lib/db.js` — conexión a base de datos
- `scripts/generate-thumbnail.js` — procesado de video

---

> Nota: este documento es exhaustivo pero genérico; revisar cada sección y complementar con ejemplos concretos (variables de entorno reales, estructura de la base de datos, y ejemplos de requests/responses) según avance el desarrollo.

## Sección técnica para desarrolladores

Esta sección está dirigida a programadores que van a desarrollar, extender o desplegar la aplicación. Contiene convenciones, ejemplos de código, endpoints, y comandos útiles.

### Convenciones del código

- Estructura: seguir la convención `src/app` para rutas (App Router) y `src/components` por dominio.
- Server vs Client Components: usar `use client` únicamente en componentes que requieran estado/efectos del navegador.
- CSS Modules: cada componente con estilos locales usa `*.module.css` para evitar colisiones.
- Nombres: componentes React en PascalCase, hooks en useCamelCase, utilitarios en camelCase.

### Endpoints API (ejemplos)

- `POST /api/contact` — recibe formulario de contacto
  - Body (JSON):
    ```json
    {
      "name": "Nombre",
      "email": "correo@ejemplo.com",
      "message": "Mensaje"
    }
    ```
  - Comportamiento esperado: validar input, enviar correo via `src/lib/mailer.js`, opcionalmente persistir en DB via `src/lib/contactService.js`.

- `POST /api/pqrs` — recibe PQRS
  - Body (JSON): similar a contact, con campos adicionales (`type`, `attachments`)
  - Comportamiento: validar, persistir y enviar notificación.

Ejemplo curl para tests locales:

```bash
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"t@t.com","message":"hola"}'
```

### `src/lib/mailer.js` — uso y ejemplo

Resumen: exporta una función `sendMail({to, subject, html, text})` que usa `nodemailer`.

Ejemplo de implementación (simplificado):

```js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

export async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({ from: process.env.SMTP_USER, to, subject, html, text });
}
```

Notas: manejar errores y reintentos; en producción usar colas para envío masivo.

### `src/lib/db.js` — conexión a DB (patrón recomendado)

Patrón: exportar un pool/cliente singleton y funciones helper para queries.

Ejemplo (mysql2):

```js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_SIZE || 10)
});

export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
```

Si se usa `pg`, crear un adaptador similar y exportar la misma API (por ejemplo `query(sql, params)`) para mantener el código independiente del motor.

### Procesamiento multimedia (`scripts/generate-thumbnail.js`)

- Uso típico:
  - Entrada: ruta del video
  - Salida: miniatura JPG/WEBP

Ejemplo rápido de ffmpeg via `fluent-ffmpeg`:

```js
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

ffmpeg(inputPath)
  .screenshots({ count: 1, folder: outDir, filename: 'thumb-%s.jpg', size: '1280x720' })
  .on('end', () => console.log('thumbnail generated'));
```

Considerar ejecutar esto en un worker o job queue para no bloquear requests.

### Testing y calidad

- Añadir Jest + React Testing Library para componentes. Configuración mínima:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

- Añadir checks en CI: `npm run lint`, `npm test`, `npm run build`.

### Debugging y logging

- Logging: usar `console` en desarrollo; en producción integrar `pino` o `winston` y enviar a agregador.
- Errores: centralizar manejo de errores en los endpoints API y devolver códigos HTTP adecuados (400, 422, 500).

### CI/CD (ejemplo GitHub Actions)

Archivo de ejemplo `.github/workflows/ci.yml` (resumen):

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: {node-version: '20'}
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test
```

### Recomendaciones de seguridad

- No subir `.env` ni credenciales al repositorio.
- Validar y sanitizar inputs antes de ejecutar queries (usar prepared statements).
- Configurar rate-limiting en endpoints sensibles (contact, pqrs).

### Ejemplo rápido de flujo local para desarrolladores

1. Copiar `.env.example` a `.env` y completar valores.
2. Instalar dependencias:

```bash
npm ci
npm run dev
```

3. Probar endpoints con `curl` o Postman.

---

He dejado esta sección técnica bastante práctica; dime si quieres ejemplos adicionales (migrations, schema SQL, pruebas e2e concretas o plantillas de CI más completas) y los añado.

## DOCUMENTACIÓN OFICIAL DEL PROYECTO

### Sistema Web Corporativo | Next.js

1. RESUMEN EJECUTIVO

Campo | Valor
:--- | :---
Nombre del proyecto | Webpage Corporate Platform
Versión actual | 0.1.0
Estado | En desarrollo activo
Tipo de aplicación | Aplicación web híbrida (SSR + CSR)
Arquitectura | Monorepo (Next.js App Router)
Última actualización | [Fecha de actualización]
Mantenido por | [Nombre del equipo/empresa]

Descripción general:

Plataforma web corporativa de alto rendimiento construida con Next.js 16 (App Router). Implementa una arquitectura moderna que combina componentes de servidor para SEO y rendimiento, con componentes cliente para interactividad avanzada. Incluye un sistema completo de gestión de contenidos estáticos, formularios de contacto y PQRS (Peticiones, Quejas, Reclamos y Sugerencias), APIs internas RESTful, procesamiento multimedia automatizado y capa de persistencia configurable para múltiples motores de base de datos.

Valor de negocio:

- Presencia digital profesional con tiempos de carga optimizados
- Canal de comunicación bidireccional con clientes a través de formularios validados
- Capacidad de procesamiento de assets multimedia sin dependencia de servicios externos
- Escalabilidad horizontal gracias a la arquitectura serverless-ready

2. PROPÓSITO Y ALCANCE

2.1 Objetivos del proyecto

Funcionales:

- Proveer una interfaz web institucional con navegación intuitiva (inicio, servicios, proyectos, blog, contacto)
- Gestionar la recepción y almacenamiento de formularios de contacto y PQRS
- Procesar y optimizar recursos multimedia (miniaturas de video)
- Mantener contenido indexable para motores de búsqueda (SEO)

Técnicos:

- Implementar una arquitectura basada en componentes reutilizables
- Proveer una capa de abstracción para bases de datos (MySQL/PostgreSQL)
- Establecer un sistema de envío de correos transaccionales
- Asegurar tiempos de respuesta <200ms para páginas estáticas

No funcionales:

- Cumplir con estándares WCAG 2.1 AA de accesibilidad
- Obtener puntuación >90 en Lighthouse (Performance, SEO, Best Practices)
- Mantener cobertura de código >70% en módulos críticos
 - Soporte para navegadores: Chrome (2 últimas versiones), Firefox, Safari, Edge

2.2 Fuera de alcance (actualmente)

- Autenticación de usuarios y sistema de roles
- Panel de administración completo
- Comercio electrónico o pasarelas de pago
- Aplicación móvil nativa
- API pública para terceros

3. TECNOLOGÍAS Y STACK TÉCNICO

3.1 Core del framework

Tecnología | Versión | Propósito
:--- | :---: | :---
Next.js | 16.2.4 | Framework principal (App Router)
React | 19.2.4 | Biblioteca UI
Node.js | 20.x (LTS) | Entorno de ejecución

3.2 UI/UX y animaciones

Librería | Versión | Uso específico
:--- | :---: | :---
framer-motion | Última | Animaciones avanzadas, transiciones entre páginas
motion | Última | Wrapper de framer-motion para React 19
aos (Animate on Scroll) | Última | Animaciones al hacer scroll
react-icons | Última | Iconografía vectorial
CSS Modules | - | Estilos encapsulados por componente

3.3 Comunicación y persistencia

Tecnología | Versión | Propósito
:--- | :---: | :---
nodemailer | Última | Envío de correos electrónicos (SMTP)
mysql2 | Última | Cliente MySQL con promesas
pg | Última | Cliente PostgreSQL nativo

3.4 Procesamiento multimedia

Librería | Versión | Función
:--- | :---: | :---
fluent-ffmpeg | Última | Wrapper para operaciones FFmpeg
ffmpeg-static | Última | Binario estático de FFmpeg multiplataforma

3.5 Desarrollo y calidad

Herramienta | Versión | Uso
:--- | :---: | :---
ESLint | 9.x | Análisis estático de código
eslint-config-next | Última | Configuración específica para Next.js

3.6 Versionado de dependencias

Todas las dependencias se gestionan mediante `package.json` con bloqueo de versiones mediante `package-lock.json`. Se recomienda no actualizar versiones mayores sin pruebas exhaustivas.

4. ARQUITECTURA TÉCNICA (DETALLE)

4.1 Diagrama de arquitectura (conceptual)

text
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                      │
└─────────────────┬───────────────────────────────────────────┘
                  │ HTTPS
┌─────────────────▼───────────────────────────────────────────┐
│                   Next.js App Router                         │
│  ┌──────────────┬──────────────┬──────────────────────┐    │
│  │ Server Comps │ Client Comps │ API Routes (serverless)│    │
│  └──────┬───────┴──────┬───────┴──────────┬───────────┘    │
└─────────┼──────────────┼──────────────────┼─────────────────┘
          │              │                  │
          ▼              ▼                  ▼
    ┌──────────┐  ┌────────────┐    ┌──────────────┐
    │ Datos    │  │ Servicios  │    │ Procesamiento│
    │estáticos │  │ internos   │    │ multimedia   │
    │(JSON)    │  │(lib/*)     │    │ (scripts/)   │
    └──────────┘  └─────┬──────┘    └──────┬───────┘
                        │                  │
                        ▼                  │
                ┌──────────────┐           │
                │ Base de datos│           │
                │ MySQL/PgSQL  │           │
                └──────────────┘           │
                                           ▼
                                  ┌────────────────┐
                                  │ FFmpeg (thumb- │
                                  │ nails)         │
                                  └────────────────┘

4.2 Patrones de diseño implementados

Patrón | Implementación | Ubicación
:--- | :--- | :---
Component Composition | Composición de componentes anidados | src/components/
Service Layer | Lógica de negocio aislada de controladores | src/lib/*Service.js
Repository Pattern | Abstracción de acceso a datos | src/lib/db.js
Factory Method | Selección dinámica de cliente DB | db.js según DB_CLIENT
Singleton | Pool de conexiones a base de datos | src/lib/db.js

4.3 Server vs Client Components

Tipo | Casos de uso | Ejemplos en el proyecto
:--- | :--- | :---
Server Component | Contenido estático, SEO crítico, datos iniciales | Layout principal, páginas de blog, listado de proyectos
Client Component | Formularios interactivos, hooks (useState, useEffect), eventos del navegador | Navbar (estado móvil), ContactForm, PqrForm, carruseles

Regla de oro: Por defecto, un componente es de servidor. Solo se añade `use client` cuando es estrictamente necesario.

5. ESTRUCTURA DETALLADA DE ARCHIVOS

text/
├── public/                         # Archivos estáticos (servidos en raíz)
│   ├── about/                      # Imágenes de la sección "Nosotros"
│   ├── blog/                       # Thumbnails y recursos de artículos
│   ├── projects/                   # Galerías de proyectos
│   ├── services/                   # Iconografía de servicios
│   └── favicon.ico                 # Favicon del sitio
│
├── src/
│   ├── app/                        # App Router de Next.js
│   │   ├── layout.js               # Layout raíz (header, footer, metadatos)
│   │   ├── globals.css             # Estilos globales (Tailwind/resets)
│   │   ├── page.js                 # Home page
│   │   ├── about/                  # Ruta /about
│   │   │   └── page.js
│   │   ├── blog/                   # Ruta /blog
│   │   │   ├── page.js             # Listado de artículos
│   │   │   └── [slug]/             # Ruta dinámica /blog/:slug
│   │   │       └── page.js
│   │   ├── contact/                # Ruta /contact
│   │   │   └── page.js
│   │   ├── projects/               # Ruta /projects
│   │   │   ├── page.js             # Listado de proyectos
│   │   │   └── [id]/               # Detalle dinámico
│   │   │       └── page.js
│   │   ├── services/               # Ruta /services
│   │   │   └── page.js
│   │   ├── pqrs/                   # Ruta /pqrs
│   │   │   └── page.js
│   │   └── api/                    # Endpoints internos
│   │       ├── contact/            # POST /api/contact
│   │       │   └── route.js
│   │       └── pqrs/               # POST /api/pqrs
│   │           └── route.js
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── layout/                 # Componentes estructurales
│   │   │   ├── Navbar/             # Barra de navegación
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.module.css
│   │   │   └── Footer/             # Pie de página
│   │   │       ├── Footer.jsx
│   │   │       └── Footer.module.css
│   │   ├── home/                   # Secciones de la página principal
│   │   │   ├── Hero/               # Bloque principal
│   │   │   ├── About/              # Resumen de la empresa
│   │   │   ├── Projects/           # Proyectos destacados
│   │   │   ├── Clients/            # Testimonios o marcas
│   │   │   └── Values/             # Valores corporativos
│   │   ├── projects/               # Componentes específicos de proyectos
│   │   │   ├── ProjectDetail/      # Vista detallada
│   │   │   └── ProjectMiniCarousel/ # Carrusel compacto
│   │   ├── shared/                 # Componentes transversales
│   │   │   ├── Card/               # Tarjeta genérica
│   │   │   ├── ContactForm/        # Formulario de contacto
│   │   │   ├── PqrForm/            # Formulario PQRS
│   │   │   ├── Toggle/             # Interruptor UI
│   │   │   ├── WhatsAppButton/     # Botón flotante de WhatsApp
│   │   │   ├── PopupAlert/         # Alertas modales
│   │   │   └── PrivacyPolicy/      # Aviso de privacidad (modal/enlace)
│   │   └── blog/                   # Componentes del blog
│   │       └── BlogCard/           # Tarjeta de resumen de artículo
│   │
│   ├── lib/                        # Lógica de negocio y utilidades
│   │   ├── db.js                   # Abstracción de conexión a BD (MySQL/Postgres)
│   │   ├── mailer.js               # Configuración y envío de correos (nodemailer)
│   │   ├── contactService.js       # Lógica de negocio para contacto
│   │   ├── pqrsService.js          # Lógica de negocio para PQRS
│   │   └── inputUtils.js           # Validación/sanitización de entradas
│   │
│   ├── data/                       # Datos estáticos (fixtures)
│   │   ├── blogPosts.json          # Artículos precargados
│   │   ├── projects.json           # Catálogo de proyectos
│   │   └── services.json           # Información de servicios
│   │
│   └── types/                      # Definiciones TypeScript (opcional)
│       └── index.d.ts              # Tipos globales
│
├── scripts/                        # Utilidades de línea de comandos
│   └── generate-thumbnail.js       # Generador de miniaturas de video
│
├── .env.example                    # Plantilla de variables de entorno
├── .gitignore                      # Archivos ignorados por Git
├── eslint.config.mjs               # Configuración de ESLint
├── next.config.mjs                 # Configuración de Next.js
├── package.json                    # Manifiesto de dependencias y scripts
├── package-lock.json               # Bloqueo de versiones exactas
└── README.md                       # Documentación resumida (punto de entrada)

5.1 Convenciones de nomenclatura

Tipo | Convención | Ejemplo
:--- | :--- | :---
Componentes React | PascalCase | ContactForm.jsx
Hooks personalizados | useCamelCase | useWindowSize.js
Utilidades/helpers | camelCase | formatDate.js
Módulos CSS | [nombre].module.css | Navbar.module.css
Archivos de rutas (App Router) | page.js, layout.js | -
Endpoints API | route.js | api/contact/route.js
Constantes | MAYÚSCULAS_SNAKE | MAX_RETRY_ATTEMPTS

6. COMPONENTES CLAVE Y RESPONSABILIDADES

6.1 Componentes estructurales

Componente | Ruta | Responsabilidad | Dependencias críticas
:--- | :--- | :--- | :---
Navbar | src/components/layout/Navbar/ | Navegación principal, menú responsive, resaltado de ruta activa | usePathname (Next.js), estado local
Footer | src/components/layout/Footer/ | Enlaces legales, información de contacto, redes sociales | Ninguna significativa

6.2 Componentes de página principal

Componente | Ruta | Función
:--- | :--- | :---
Hero | src/components/home/Hero/ | CTA principal, título y subtítulo, botones de acción
About | src/components/home/About/ | Resumen de la empresa, valores diferenciales
Projects | src/components/home/Projects/ | Vista previa de proyectos destacados
Clients | src/components/home/Clients/ | Logos/testimonios de clientes
Values | src/components/home/Values/ | Pilares corporativos

6.3 Componentes de formularios (críticos para negocio)

Componente | Validaciones | Endpoint asociado | Persistencia
:--- | :--- | :--- | :---
ContactForm | email, required fields, longitud mínima | POST /api/contact | Correo + BD (opcional)
PqrForm | tipo de PQRS, campos específicos, adjuntos (futuro) | POST /api/pqrs | Correo + BD obligatoria

6.4 Flujo de datos típico (formulario)

text
Usuario completa formulario
       │
       ▼ (Client Component)
Validación en cliente (react-hook-form o similar)
       │
       ▼ (fetch)
Endpoint API (/api/contact)
       │
       ▼ (Server-side)
┌──────────────────────────────────────────┐
│ 1. Sanitización y validación secundaria  │
│ 2. Delegación a contactService.js        │
│ 3. Inserción en BD (si aplica)           │
│ 4. Envío de correo vía mailer.js         │
│ 5. Retorno de respuesta JSON              │
└──────────────────────────────────────────┘
       │
       ▼
Notificación al usuario (PopupAlert)

7. ENDPOINTS API Y CONTRATOS

7.1 POST /api/contact

Propósito: Recepción de mensajes del formulario de contacto.

Request:

http
POST /api/contact HTTP/1.1
Content-Type: application/json

{
  "name": "Ana Martínez",
  "email": "ana.martinez@empresa.com",
  "message": "Estoy interesada en sus servicios de consultoría."
}

Validaciones:

- name: string, 2-100 caracteres, no vacío
- email: formato email válido (RFC 5322), máximo 254 caracteres
- message: string, 10-5000 caracteres

Response (success - 200):

json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "ticketId": "CTK-20250215-001"
}

Response (error - 400):

json
{
  "success": false,
  "error": "Datos inválidos",
  "details": ["El email no tiene un formato válido"]
}

Códigos de estado:

- 200: Éxito
- 400: Error de validación
- 429: Demasiadas solicitudes (rate limiting)
- 500: Error interno del servidor

7.2 POST /api/pqrs

Propósito: Gestión de Peticiones, Quejas, Reclamos y Sugerencias.

Request adicional:

json
{
  "type": "claim",  // 'petition', 'complaint', 'claim', 'suggestion'
  "orderNumber": "ORD-12345",  // opcional, obligatorio si type='claim'
  "attachments": []  // futuro: URL de archivos subidos
}

Comportamiento: Mismo flujo que contacto, pero con persistencia obligatoria en BD y etiquetado por tipo.

8. VARIABLES DE ENTORNO

8.1 Plantilla completa (.env.example)

```bash
# ============================================
# CONFIGURACIÓN DE BASE DE DATOS
# ============================================
# Opciones: 'mysql' o 'postgres'
DB_CLIENT=mysql

# Configuración MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=webpage_user
DB_PASS=SecurePassword123!
DB_DATABASE=webpage_db

# Configuración PostgreSQL (si DB_CLIENT=postgres)
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=webpage_user
# DB_PASS=SecurePassword123!
# DB_DATABASE=webpage_db

# Pool de conexiones (opcional)
DB_POOL_SIZE=10
DB_CONNECTION_TIMEOUT=30000

# ============================================
# CONFIGURACIÓN SMTP (CORREO)
# ============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=no-reply@tudominio.com
SMTP_PASS=tu_app_password_generated
SMTP_SECURE=false       # true para puerto 465, false para 587
SMTP_FROM="Webpage Corporativo <no-reply@tudominio.com>"

# ============================================
# WHATSAPP BUSINESS (BOTÓN FLOTANTE)
# ============================================
NEXT_PUBLIC_WHATSAPP_NUMBER=+573001234567
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola,%20me%20gustaría%20recibir%20información

# ============================================
# CONFIGURACIÓN DE RENDIMIENTO
# ============================================
NEXT_PUBLIC_API_TIMEOUT_MS=5000
NEXT_PUBLIC_REVALIDATE_SECONDS=3600

# ============================================
# SEGURIDAD
# ============================================
RATE_LIMIT_WINDOW_MS=900000      # 15 minutos
RATE_LIMIT_MAX_REQUESTS=100      # por IP
```

8.2 Variables requeridas vs opcionales

Variable | Requerida | Por defecto | Entorno
:--- | :---: | :--- | :---
DB_CLIENT | Sí | - | Todas
DB_HOST | Sí | - | Producción
SMTP_HOST | No | (correos deshabilitados) | -
NEXT_PUBLIC_WHATSAPP_NUMBER | No | - | Todas

9. SCRIPTS Y COMANDOS

9.1 Scripts de desarrollo

Comando | Descripción | Uso típico
:--- | :--- | :---
npm run dev | Inicia servidor de desarrollo con hot reload | Desarrollo local
npm run build | Genera build de producción optimizado | Antes de deploy
npm start | Ejecuta build en modo producción | Servidor dedicado
npm run lint | Ejecuta ESLint en todo el código | CI/pre-commit hooks
npm run lint:fix | Corrige automáticamente errores de lint | Desarrollo

9.2 Scripts personalizados

Comando | Descripción | Implementación
:--- | :--- | :---
npm run thumbnail -- --input video.mp4 | Genera miniatura de videos | scripts/generate-thumbnail.js

Ejemplo de generación de thumbnail:

```bash
node scripts/generate-thumbnail.js --input public/videos/promo.mp4 --output public/thumbnails/promo.jpg --size 1280x720
```

9.3 Comandos de utilidad (recomendados)

```bash
# Análisis de bundle
npm run analyze

# Generación de types (si se añade TypeScript)
npm run type-check

# Limpieza de caché de Next.js
rm -rf .next
```

10. MANUAL DE DESPLIEGUE

10.1 Requisitos previos del entorno de producción

- Node.js: 20.x LTS o superior
- Base de datos: MySQL 8.0+ o PostgreSQL 14+
- Memoria RAM mínima: 512 MB (1 GB recomendado)
- Espacio en disco: 1 GB + assets multimedia
- FFmpeg: Disponible en $PATH o mediante ffmpeg-static

10.2 Despliegue en Vercel (recomendado)

Pasos:

1. Conectar repositorio de GitHub/GitLab/Bitbucket a Vercel
2. Configurar variables de entorno desde el panel de Vercel
3. Definir comando de build: `npm run build`
4. Definir directorio de salida: `.next`

Opcional: Configurar funciones serverless para rutas API con mayor timeout

Configuración vercel.json (recomendada):

```json
{
  "functions": {
    "src/app/api/**/*.js": {
      "maxDuration": 10,
      "memory": 1024
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

10.3 Despliegue en servidor propio (Node.js)

Requisitos adicionales:

- PM2 o systemd para gestión de procesos
- Nginx como reverse proxy (recomendado)

Pasos rápidos:

```bash
# En el servidor
git clone [repo]
cd webpage
npm ci --only=production
npm run build
npm start

# Con PM2
pm2 start npm --name "webpage" -- start
pm2 save
pm2 startup
```

Configuración de Nginx (fragmento):

```nginx
server {
    listen 80;
    server_name tudominio.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

10.4 Checklist pre-despliegue

- Todas las variables de entorno configuradas en el proveedor
- Migraciones de base de datos ejecutadas (si aplica)
- Pruebas de endpoints API realizadas (curl o Postman)
- Certificado SSL configurado (HTTPS obligatorio para producción)
- ffmpeg disponible y testeado (si se generan thumbnails)
- Logs configurados (Sentry, Datadog, o archivos locales)
- Backup de base de datos programado

11. SEGURIDAD Y BUENAS PRÁCTICAS

11.1 Medidas implementadas

Área | Medida | Implementación
:--- | :--- | :---
Inyección SQL | Prepared statements | db.js usa pool.execute() (mysql2)
XSS | Escape automático | React escapa contenido por defecto
CSRF | SameSite cookies | Configurar en Next.js (opcional)
Rate limiting | Límite por IP | Middleware personalizado (sugerido)
Validación | Doble validación (cliente + servidor) | inputUtils.js
Headers seguridad | Helmet-like | next.config.js (custom headers)

11.2 Recomendaciones adicionales (no implementadas)

- Helmet middleware: Añadir cabeceras CSP, HSTS, etc.
- Sanitización HTML: Usar DOMPurify si se renderiza HTML de terceros
- JWT para APIs internas: Si se exponen endpoints a terceros
- Auditoría de dependencias: npm audit en CI

11.3 Manejo de secretos

- NUNCA versionar .env o archivos con credenciales
- Usar secretos de proveedor (Vercel Secrets, GitHub Secrets)
- Rotar credenciales periódicamente (cada 90 días)
- Usar cuentas de servicio con permisos mínimos necesarios

12. SOLUCIÓN DE PROBLEMAS COMUNES (TROUBLESHOOTING)

12.1 Error: ffmpeg not found

Síntoma: Script generate-thumbnail.js falla con error "ffmpeg: command not found"

Causa: ffmpeg-static no encuentra el binario o no es compatible con la plataforma.

Solución:

```bash
# Instalar FFmpeg a nivel de sistema
# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# macOS
brew install ffmpeg

# Verificar
ffmpeg -version
```

12.2 Error: Connection timeout en base de datos

Síntoma: Endpoints API tardan más de 30 segundos y responden con error 500.

Causa: Pool de conexiones agotado o red interna lenta.

Solución:

- Aumentar DB_POOL_SIZE (ejemplo: 20 para producción media)
- Verificar que la base de datos acepte conexiones desde la IP del servidor
- Añadir índice a tablas de consulta frecuente (ej: email en tabla contactos)

12.3 Error: Nodemailer: Invalid login

Síntoma: Los formularios se envían pero no llegan los correos.

Causa: Credenciales SMTP incorrectas o falta de permisos (Gmail requiere App Password).

Solución (Gmail):

- Activar verificación en dos pasos en la cuenta de Google
- Generar Contraseña de Aplicación (App Password)
- Usar esa contraseña en SMTP_PASS

12.4 Problemas de rendimiento en build

Síntoma: npm run build toma más de 5 minutos o falla por falta de memoria.

Solución:

```bash
# Incrementar memoria límite para Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# O deshabilitar optimizaciones pesadas (next.config.mjs)
experimental: {
  optimizeCss: false  // temporalmente
}
```

13. TESTING Y GARANTÍA DE CALIDAD

13.1 Estrategia de testing (recomendada, no implementada)

Nivel | Herramienta | Cobertura objetivo | Prioridad
:--- | :--- | :---: | :---
Unitario | Jest + React Testing Library | 80% (core libs) | Alta
Integración | Jest + supertest | 60% (APIs) | Media
E2E | Playwright / Cypress | Flujos críticos (contacto) | Alta
A11y | axe-core / Lighthouse | WCAG 2.1 AA | Media

13.2 Ejemplo de test unitario (recomendado)

```javascript
// src/lib/__tests__/inputUtils.test.js
import { validateEmail, sanitizeInput } from '../inputUtils';

describe('inputUtils', () => {
  test('validateEmail rejects invalid formats', () => {
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('usuario@dominio.com')).toBe(true);
  });

  test('sanitizeInput removes HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>Hola'))
      .toBe('Hola');
  });
});
```

13.3 Integración continua (GitHub Actions)

Ver sección 14.2 para ejemplo de pipeline CI.

14. CI/CD Y PIPELINES

14.1 Flujo de trabajo recomendado

text
Developer → feature branch → PR → CI checks → Merge to main → Deploy to staging → QA → Deploy to production

14.2 Ejemplo de GitHub Actions (.github/workflows/ci.yml)

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check (if TypeScript)
        run: npx tsc --noEmit
        continue-on-error: true
      
      - name: Build
        run: npm run build
        env:
          DB_CLIENT: ${{ secrets.DB_CLIENT }}
          # Otras variables mínimas para build
      
      - name: Run unit tests
        run: npm test
        env:
          CI: true
```

15. PREGUNTAS FRECUENTES (FAQ)

15.1 ¿Cómo añado una nueva página?

- Crear carpeta en src/app/[nueva-ruta]
- Añadir page.js con el contenido
- Si requiere datos dinámicos, usar generateStaticParams si es posible
- Actualizar la navegación en Navbar.jsx

15.2 ¿Cómo cambio el color principal del tema?

- Editar variables CSS en src/app/globals.css:

```css
:root {
  --primary-color: #1a56db;  /* Cambiar aquí */
  --secondary-color: #7e3af2;
}
```

15.3 ¿Cómo añado un nuevo campo al formulario de contacto?

- Actualizar ContactForm.jsx (componente cliente)
- Actualizar validaciones en inputUtils.js
- Modificar contactService.js para manejar el nuevo campo
- Actualizar el endpoint (si la BD requiere migración)

15.4 ¿El proyecto soporta i18n (múltiples idiomas)?

- Actualmente no, pero se puede añadir usando next-intl o next-i18next. Se aceptan contribuciones.

16. MANTENIMIENTO Y HOJA DE RUTA

16.1 Tareas de mantenimiento periódico

Frecuencia | Tarea | Responsable
:--- | :--- | :---
Diario | Monitoreo de logs de error | DevOps
Semanal | Revisión de dependencias obsoletas (npm outdated) | Desarrollador
Mensual | Auditoría de seguridad (npm audit) | Security Lead
Trimestral | Rotación de secretos | DevOps
Anual | Actualización de Node.js LTS | Arquitecto

16.2 Hoja de ruta (próximas versiones)

v0.2.0 (Q2 2025):
- Sistema de autenticación (NextAuth.js)
- Panel de administración básico
- Test unitarios (Jest)

v0.3.0 (Q3 2025):
- Migración a TypeScript (opcional)
- Caché Redis para API
- Dashboard de analíticas

v1.0.0 (Q4 2025):
- API pública documentada (Swagger)
- Soporte multi-tenant
- 100% pruebas E2E

17. REFERENCIAS Y RECURSOS EXTERNOS

17.1 Documentación oficial

- Next.js App Router
- React 19 Docs
- Nodemailer SMTP
- Fluent-ffmpeg API

17.2 Enlaces útiles del proyecto


