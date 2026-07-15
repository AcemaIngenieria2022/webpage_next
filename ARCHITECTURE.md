# Arquitectura del Proyecto - ACEMA Ingeniería

**Versión:** 1.0.0  
**Última actualización:** Mayo 2024  
**Autor:** ACEMA Ingeniería S.A.S.

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura de Directorios](#estructura-de-directorios)
4. [Arquitectura de Componentes](#arquitectura-de-componentes)
5. [Flujo de Datos](#flujo-de-datos)
6. [Patrones de Diseño](#patrones-de-diseño)
7. [Convenciones de Código](#convenciones-de-código)
8. [Configuración del Proyecto](#configuración-del-proyecto)
9. [Deployment](#deployment)
10. [Mejoras Futuras](#mejoras-futuras)

---

## 📖 Descripción General

**ACEMA Ingeniería** es una página web corporativa moderna construida con tecnologías de punta, diseñada para presentar servicios de ingeniería especializada en soluciones solares y energías renovables.

### Objetivos del Proyecto

- ✅ Presentar servicios y proyectos de la empresa
- ✅ Capturar consultas y solicitudes de asesoría
- ✅ Mejorar presencia digital y SEO
- ✅ Experiencia responsiva y optimizada
- ✅ Rendimiento superior (Lighthouse 90+)

### Características Principales

- 🎨 Diseño moderno y responsivo
- ⚡ Renderizado optimizado con React 19
- 🎬 Animaciones fluidas con Framer Motion
- 🎯 SEO optimizado
- ♿ Accesibilidad WCAG 2.1
- 📱 Mobile-first approach
- 🚀 Compilador de React para mejor rendimiento

---

## 🛠️ Stack Tecnológico

### Frontend Framework
- **Next.js 16.2.4** - Framework React con SSR/SSG
- **React 19.2.4** - Librería de UI
- **React DOM 19.2.4** - Manipulación del DOM

### Styling
- **Tailwind CSS 4** - Framework de CSS utilitarios
- **CSS Modules** - Estilos encapsulados por componente
- **PostCSS 4** - Procesamiento de CSS

### Animaciones & Motion
- **Framer Motion 12.38.0** - Librería de animaciones avanzadas

### Desarrollo
- **ESLint 9** - Linting y análisis de código
- **Babel Plugin React Compiler** - Compilación optimizada de React
- **Node.js 18+** - Runtime de JavaScript

### Herramientas
- **npm** - Gestor de paquetes
- **Git** - Control de versiones

---

## 📁 Estructura de Directorios

```
webpage/
├── src/
│   ├── app/
│   │   ├── layout.js              # Layout raíz con metadatos globales
│   │   ├── page.js                # Página principal (home)
│   │   ├── not-found.js           # Página 404 personalizada
│   │   ├── globals.css            # Estilos globales
│   │   └── not-found.module.css   # Estilos del 404
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx         # Componente de navegación
│   │   │   └── Navbar.module.css  # Estilos del Navbar
│   │   │
│   │   ├── Banner/
│   │   │   ├── Banner.jsx         # Componente banner principal
│   │   │   └── Banner.module.css  # Estilos del Banner
│   │   │
│   │   ├── Nosotros.jsx           # Sección "Acerca de"
│   │   ├── Valores.jsx            # Sección de valores corporativos
│   │   ├── Proyectos.jsx          # Galería de proyectos
│   │   ├── Asesoria.jsx           # Formulario de asesoría
│   │   ├── Clientes.jsx           # Carrusel de clientes
│   │   ├── Footer.jsx             # Pie de página
│   │   │
│   │   ├── ErrorContent/
│   │   │   ├── ErrorContent.jsx   # Contenido de errores
│   │   │   └── ErrorContent.module.css
│   │
│   └── utils/                      # Utilidades y helpers (futuro)
│       ├── hooks/                 # Hooks personalizados
│       ├── helpers/               # Funciones auxiliares
│       └── constants/             # Constantes globales
│
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   └── Hero/             # Imágenes del banner
│   │   ├── icons/                # Iconos SVG
│   │   └── fonts/                # Fuentes personalizadas
│
├── types/
│   └── index.d.ts               # Definiciones TypeScript (este archivo)
│
├── .next/                         # Build de Next.js (gitignored)
├── node_modules/                  # Dependencias (gitignored)
│
├── jsconfig.json                  # Configuración de JS
├── next.config.mjs                # Configuración de Next.js
├── postcss.config.mjs             # Configuración de PostCSS
├── tailwind.config.js             # Configuración de Tailwind
├── eslint.config.mjs              # Configuración de ESLint
│
├── package.json                   # Dependencias del proyecto
├── package-lock.json              # Lock de dependencias
│
├── README.md                       # Documentación básica
├── ARCHITECTURE.md                # Este archivo
├── LIBRARIES.md                   # Documentación de librerías
├── AGENTS.md                      # Configuración de agentes (Next.js)
├── CLAUDE.md                      # Referencia a AGENTS.md
│
└── .gitignore                     # Archivos ignorados por Git
```

---

## 🏗️ Arquitectura de Componentes

### Hierarquía de Componentes

```
RootLayout
├── Navbar
│   ├── Logo
│   ├── MenuItems
│   └── MobileMenu
│
└── Page (Home)
    ├── Banner
    │   └── CTA Button
    │
    ├── Nosotros
    │   └── About Content
    │
    ├── Valores
    │   └── Value Cards[]
    │
    ├── Proyectos
    │   └── Project Grid[]
    │
    ├── Clientes
    │   └── Client Carousel
    │
    ├── Asesoria
    │   └── Consultation Form
    │
    └── Footer
        └── Footer Content
```

### Convenciones de Componentes

#### 1. Componentes de Presentación (Presentational)
- Enfocados solo en la UI
- Sin lógica de negocio compleja
- Reutilizables
- Ejemplo: `Banner.jsx`, `Valores.jsx`

#### 2. Componentes Inteligentes (Container)
- Manejan estado local
- Integran hooks de React
- Orquestan componentes hijos
- Ejemplo: `Navbar.jsx` (usa `useState`, `useEffect`, `useRef`)

#### 3. Componentes de Página
- Rutas principales de Next.js
- Manejan la lógica específica de página
- Ejemplo: `page.js`, `not-found.js`

---

## 🔄 Flujo de Datos

### Flujo de Navegación

```
Usuario → Navbar (Router) → Page Component → Sub-components → Rendered View
```

### Comunicación entre Componentes

#### Props Drilling
```javascript
RootLayout → Page → Navbar → MenuItem → Action Handler
```

#### Estado Global (Futuro)
Se recomienda usar **React Context API** para:
- Tema global
- Información de usuario
- Notificaciones globales

#### Estado Local
Cada componente mantiene su propio estado con `useState`:

```javascript
const [isOpen, setIsOpen] = useState(false);      // Navbar
const [showDropdown, setShowDropdown] = useState(false);  // Navbar dropdown
```

---

## 🎨 Patrones de Diseño

### 1. Component Composition
Construcción de UIs complejas a partir de componentes simples:
```javascript
<RootLayout>
  <Navbar />
  <Banner />
  <Nosotros />
  {/* ... más componentes */}
</RootLayout>
```

### 2. Hooks Pattern
Uso de React Hooks para lógica reutilizable:
- `useState`: Manejo de estado local
- `useEffect`: Efectos secundarios
- `useRef`: Referencias a elementos DOM
- `useContext`: Acceso a contexto global

### 3. Responsive Design
- **Mobile-First**: Primero se diseña para móvil
- **CSS Modules**: Encapsulación de estilos
- **Tailwind CSS**: Clases utilitarias

### 4. Performance Optimization
- **React Compiler**: Optimización automática
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Lazy loading de componentes

---

## 📝 Convenciones de Código

### Nomenclatura

#### Componentes
```javascript
// ✅ PascalCase para componentes
const Navbar = () => { }
const Banner = () => { }
const ConsultationForm = () => { }

// ❌ No usar camelCase
const navbar = () => { }  // Incorrecto
```

#### Variables y Funciones
```javascript
// ✅ camelCase para variables y funciones
const [isOpen, setIsOpen] = useState(false);
const handleMenuClick = () => { };
const calculateTotal = () => { };

// ❌ No usar PascalCase
const [IsOpen, SetIsOpen] = useState(false);  // Incorrecto
```

#### Constantes
```javascript
// ✅ UPPER_SNAKE_CASE para constantes
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT = 5000;
const MENU_ITEMS = ['Inicio', 'Servicios', 'Proyectos'];

// ❌ No usar camelCase
const apiBaseUrl = 'https://api.example.com';  // Incorrecto
```

#### CSS Classes
```javascript
// ✅ kebab-case en CSS
.navbar-container { }
.menu-item-active { }
.section-heading { }

// ❌ No usar camelCase
.navbarContainer { }  // Incorrecto
```

### Estructura de Componentes

```javascript
'use client';  // Si es componente cliente

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ComponentName.module.css';

/**
 * Descripción del componente
 * @param {ComponentNameProps} props - Propiedades del componente
 * @returns {React.ReactElement}
 */
const ComponentName = ({ prop1, prop2 = defaultValue }) => {
  // 1. State declarations
  const [state, setState] = useState(initialValue);
  
  // 2. Refs
  const containerRef = useRef(null);
  
  // 3. Effects
  useEffect(() => {
    // Setup logic
    return () => {
      // Cleanup logic
    };
  }, []);
  
  // 4. Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // 5. Render logic
  return (
    <div className={styles.container}>
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### Documentación

```javascript
/**
 * Componente de navegación principal
 * 
 * Características:
 * - Menú responsivo con versión móvil
 * - Dropdown para submenús
 * - Cierre automático en resize
 * 
 * @component
 * @example
 * return (
 *   <Navbar 
 *     hideLogoOnMobile={true} 
 *     onMenuItemClick={handleMenuClick} 
 *   />
 * )
 * 
 * @param {NavbarProps} props - Propiedades del componente
 * @returns {React.ReactElement} El componente renderizado
 */
const Navbar = (props) => { }
```

---

## ⚙️ Configuración del Proyecto

### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,  // Habilita compilador de React para mejor rendimiento
};
export default nextConfig;
```

### jsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // Alias para importes: @/components/Navbar
    }
  }
}
```

### Alias de Importes
```javascript
// ✅ Usar alias (más limpio)
import Navbar from '@/components/Navbar/Navbar';
import styles from '@/components/Navbar/Navbar.module.css';

// ❌ Evitar rutas relativas largas
import Navbar from '../../../../components/Navbar/Navbar';
```

---

## 🚀 Deployment

### Opciones de Hosting

#### 1. Vercel (Recomendado)
- Optimizado para Next.js
- Deployment automático con git
- CDN global
- Análisis de rendimiento

```bash
npm install -g vercel
vercel
```

#### 2. Netlify
```bash
npm run build
# Deploy la carpeta .next
```

#### 3. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Variables de Entorno
Crear archivo `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
API_SECRET_KEY=your_secret_key
```

---

## 🔮 Mejoras Futuras

### Corto Plazo (1-3 meses)
- [ ] Integración con formulario de contacto (email)
- [ ] Blog o news section
- [ ] Carrusel de testimonios
- [ ] Galería con lightbox
- [ ] Buscar proyectos por categoría

### Mediano Plazo (3-6 meses)
- [ ] Sistema de comentarios
- [ ] Integración con CMS (Contentful, Strapi)
- [ ] E-commerce para servicios
- [ ] Portal de clientes
- [ ] Chat en vivo

### Largo Plazo (6+ meses)
- [ ] Multi-idioma (i18n)
- [ ] PWA capabilities
- [ ] Machine Learning para recomendaciones
- [ ] API GraphQL
- [ ] Base de datos en la nube (MongoDB, PostgreSQL)

---

## 📊 Métricas de Rendimiento

### Objetivo de Lighthouse
- ✅ Performance: 90+
- ✅ Accessibility: 95+
- ✅ Best Practices: 95+
- ✅ SEO: 100

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

---

## 🤝 Contribución

### Rama de Desarrollo
```bash
git checkout -b feature/nueva-funcionalidad
git commit -m "feat: descripción clara"
git push origin feature/nueva-funcionalidad
```

### Estándares de Commit
```
feat: Añade nueva funcionalidad
fix: Corrige un bug
docs: Documentación
style: Cambios de formato
refactor: Refactorización de código
test: Añade tests
chore: Cambios en dependencias
```

---

## 📞 Contacto y Soporte

- **Sitio Web:** https://acemaingenieria.com
- **Email:** info@acemaingenieria.com
- **Teléfono:** [+57 XXX XXXX XXX]
- **LinkedIn:** [Perfil empresarial]

---

**Última actualización:** Mayo 2024  
**Versión:** 1.0.0  
**Licencia:** MIT
