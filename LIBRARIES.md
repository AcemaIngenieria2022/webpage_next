# Documentación de Librerías - ACEMA Ingeniería

**Versión:** 1.0.0  
**Última actualización:** Mayo 2024

---

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Dependencias de Producción](#dependencias-de-producción)
3. [Dependencias de Desarrollo](#dependencias-de-desarrollo)
4. [Compatibilidad y Versiones](#compatibilidad-y-versiones)
5. [Guías de Uso](#guías-de-uso)
6. [Troubleshooting](#troubleshooting)
7. [Actualizaciones de Seguridad](#actualizaciones-de-seguridad)
8. [Alternativas y Comparativas](#alternativas-y-comparativas)

---

## 📊 Resumen Ejecutivo

| Librería | Versión | Propósito | Tamaño |
|----------|---------|----------|--------|
| **Next.js** | 16.2.4 | Framework SSR/SSG | ~6.2 MB |
| **React** | 19.2.4 | Librería de UI | ~3.1 MB |
| **React DOM** | 19.2.4 | Manipulación DOM | ~1.8 MB |
| **Framer Motion** | 12.38.0 | Animaciones avanzadas | ~0.4 MB |
| **Tailwind CSS** | 4 | Framework CSS | ~0.3 MB |

**Tamaño Total (Build Optimizado):** ~40-60 KB gzipped

---

## 📦 Dependencias de Producción

### 1. **Next.js** 16.2.4
**Página Oficial:** https://nextjs.org/

#### Descripción
Framework React que permite construir aplicaciones web modernas con:
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes
- Optimización automática de imágenes
- Prefetching inteligente

#### Características Utilizadas

```javascript
// Layout y Metadata
import { metadata } from 'next';

// Image Optimization
import Image from 'next/image';

// Componentes del lado del cliente
'use client';

// Routing
import Link from 'next/link';
```

#### Ventajas
✅ Excelente rendimiento  
✅ SEO optimizado  
✅ Desarrollo rápido  
✅ Comunidad grande  
✅ Hosted en Vercel  

#### Configuración
Ver `next.config.mjs`:
```javascript
const nextConfig = {
  reactCompiler: true,  // Compilador de React habilitado
};
```

#### Documentación Importante
- [Getting Started](https://nextjs.org/docs/getting-started)
- [App Router](https://nextjs.org/docs/app)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Performance](https://nextjs.org/docs/app/building-your-application/optimizing/overview)

---

### 2. **React** 19.2.4
**Página Oficial:** https://react.dev/

#### Descripción
Librería de JavaScript para construir interfaces de usuario con componentes reutilizables y declarativos.

#### Versión 19 - Cambios Principales

**Nuevas Características:**
- React Compiler (compilación automática)
- Mejor soporte para suspense
- Nuevas APIs de formularios
- Mejoras de rendimiento

#### Hooks Principales Utilizados

```javascript
// Estado local
import { useState } from 'react';
const [state, setState] = useState(initialValue);

// Efectos secundarios
import { useEffect } from 'react';
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  };
}, [dependencies]);

// Referencias
import { useRef } from 'react';
const ref = useRef(null);

// Contexto
import { useContext } from 'react';
const value = useContext(MyContext);
```

#### API de Context (Futura)

```javascript
import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  return (
    <AppContext.Provider value={/* ... */}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
```

#### Documentación Importante
- [React 19 Upgrade Guide](https://react.dev/blog/2024/12/19/react-19)
- [Hooks](https://react.dev/reference/react/hooks)
- [Context API](https://react.dev/reference/react/createContext)

---

### 3. **React DOM** 19.2.4
**Página Oficial:** https://react.dev/reference/react-dom

#### Descripción
Paquete que proporciona métodos específicos del DOM para React.

#### Métodos Principales

```javascript
import { createRoot } from 'react-dom/client';

// Crear raíz de React (automático en Next.js)
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

#### Características
- Renderizado de componentes en el DOM
- Portales (renderizar fuera del árbol DOM)
- Event Handling
- Hydration en SSR

#### Documentación Importante
- [React DOM](https://react.dev/reference/react-dom)
- [createRoot](https://react.dev/reference/react-dom/client/createRoot)

---

### 4. **Framer Motion** 12.38.0
**Página Oficial:** https://www.framer.com/motion/

#### Descripción
Librería de animaciones declarativa para React que simplifica crear animaciones fluidas y complejas.

#### Características Principales

**a) Animaciones Básicas**
```javascript
import { motion } from 'framer-motion';

export const AnimatedDiv = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    Contenido animado
  </motion.div>
);
```

**b) Variantes**
```javascript
const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, y: 20 }
};

<motion.div
  initial="hidden"
  animate="visible"
  exit="exit"
  variants={variants}
/>
```

**c) Gestos**
```javascript
<motion.div
  onHoverStart={() => setIsHovered(true)}
  onHoverEnd={() => setIsHovered(false)}
  onClick={() => handleClick()}
>
  Hover para animar
</motion.div>
```

**d) Animaciones en Scroll**
```javascript
import { useScroll, useTransform } from 'framer-motion';

const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

<motion.div style={{ opacity }}>
  Anima según scroll
</motion.div>
```

#### Propiedades Comunes

```typescript
interface MotionProps {
  // Animación inicial
  initial?: TargetAndTransition | VariantLabel | boolean;
  
  // Estado animado
  animate?: TargetAndTransition | VariantLabels;
  
  // Transición de salida
  exit?: TargetAndTransition | VariantLabel;
  
  // Configuración de transición
  transition?: Transition;
  
  // Variantes predefinidas
  variants?: Variants;
  
  // Listeners de eventos
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}
```

#### Uso en Proyecto
```javascript
// Banner con entrada suave
<motion.h1
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  Título del Banner
</motion.h1>

// Botón con hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  Click aquí
</motion.button>

// Card con reveal
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  Proyecto
</motion.div>
```

#### Ventajas
✅ Declarativo y fácil de usar  
✅ Excelente rendimiento (GPU accelerated)  
✅ TypeScript completo  
✅ Comunidad activa  
✅ Documentación excelente  

#### Documentación Importante
- [Quick Start](https://www.framer.com/motion/introduction/)
- [Animation](https://www.framer.com/motion/animation/)
- [Gestures](https://www.framer.com/motion/gestures/)
- [Scroll Animations](https://www.framer.com/motion/scroll-animations/)

---

## 🛠️ Dependencias de Desarrollo

### 1. **Tailwind CSS** 4
**Página Oficial:** https://tailwindcss.com/

#### Descripción
Framework de CSS utilitario que permite construir diseños modernos sin escribir CSS personalizado.

#### Características

```jsx
// Clases utilitarias
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Color de fondo, texto y espaciado
</div>

// Responsive
<div className="text-sm md:text-base lg:text-lg">
  Texto responsivo
</div>

// Hover states
<button className="bg-blue-500 hover:bg-blue-600 transition">
  Botón con hover
</button>

// Dark mode
<div className="bg-white dark:bg-gray-900">
  Modo claro y oscuro
</div>
```

#### Ventajas
✅ Desarrollo rápido  
✅ Clases predefinidas  
✅ Personalizable  
✅ Bajo peso en producción  
✅ Comunidad grande  

#### Configuración
Ver `tailwind.config.js` (generado automáticamente)

#### Documentación Importante
- [Installation](https://tailwindcss.com/docs/installation)
- [Utility-First](https://tailwindcss.com/docs/utility-first)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Plugins](https://tailwindcss.com/docs/plugins)

---

### 2. **@tailwindcss/postcss** 4
**Página Oficial:** https://tailwindcss.com/docs/installation

#### Descripción
Plugin de PostCSS que procesa y compila Tailwind CSS.

#### Archivo de Configuración
`postcss.config.mjs`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

#### Uso en CSS
```css
@import "tailwindcss";

/* Componentes personalizados */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600;
  }
}

/* Utilidades personalizadas */
@layer utilities {
  .text-shadow-md {
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
```

---

### 3. **PostCSS** 4
**Página Oficial:** https://postcss.org/

#### Descripción
Herramienta para transformar CSS con plugins de JavaScript.

#### Plugins Utilizados
- `@tailwindcss/postcss` - Procesa Tailwind
- Autoprefixer - Añade prefijos de navegador

#### Archivo de Configuración
`postcss.config.mjs`

---

### 4. **ESLint** 9
**Página Oficial:** https://eslint.org/

#### Descripción
Herramienta de linting que analiza código JavaScript/JSX para encontrar problemas de calidad y estilo.

#### Reglas Configuradas
Ver `eslint.config.mjs`

#### Comandos
```bash
# Verificar código
npm run lint

# Reparar automáticamente
npm run lint -- --fix
```

#### Reglas Comunes
```javascript
// ❌ Variable sin usar
const unused = 5;

// ❌ Comparación con ===
if (value == null) { }

// ❌ No declarar let/const
variable = 5;

// ✅ Correcto
const USED_VARIABLE = 5;
if (value === null) { }
let variable = 5;
```

#### Documentación Importante
- [Getting Started](https://eslint.org/docs/latest/getting-started)
- [Rules](https://eslint.org/docs/latest/rules/)
- [Configuration](https://eslint.org/docs/latest/use/configure)

---

### 5. **eslint-config-next** 16.2.4
**Página Oficial:** https://nextjs.org/

#### Descripción
Configuración de ESLint optimizada para proyectos Next.js.

#### Incluye Reglas Para
- Optimización de imágenes
- Next.js best practices
- React best practices
- Accesibilidad

---

### 6. **babel-plugin-react-compiler** 1.0.0
**Página Oficial:** https://react.dev/learn/react-compiler

#### Descripción
Compilador de React que optimiza automáticamente los componentes para mejor rendimiento.

#### Beneficios
✅ Memoización automática  
✅ Renders optimizados  
✅ Menos re-renders innecesarios  
✅ Sin cambios de código requeridos  

#### Activación
Se activa automáticamente en `next.config.mjs`:
```javascript
const nextConfig = {
  reactCompiler: true,  // ← Habilitado
};
```

---

## 🔄 Compatibilidad y Versiones

### Node.js
```bash
# Versión requerida
node >= 18.17

# Verificar versión
node --version
```

### Compatibilidad de Navegadores

| Navegador | Versión Mínima | Soporte |
|-----------|---|---|
| Chrome | 90+ | ✅ Completo |
| Firefox | 88+ | ✅ Completo |
| Safari | 14+ | ✅ Completo |
| Edge | 90+ | ✅ Completo |
| IE 11 | N/A | ❌ No soportado |

### Matriz de Versiones
```
Next.js 16.2.4
├── React 19.2.4
├── React DOM 19.2.4
├── Tailwind CSS 4
└── Framer Motion 12.38.0
```

---

## 📚 Guías de Uso

### 1. Instalación del Proyecto

```bash
# Clonar repositorio
git clone <repository-url>
cd webpage

# Instalar dependencias
npm install

# Verificar instalación
npm list
```

### 2. Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# Acceder a http://localhost:3000
```

### 3. Build para Producción

```bash
# Compilar proyecto
npm run build

# Verificar build
npm run start
```

### 4. Análisis de Código

```bash
# Ejecutar linting
npm run lint

# Reparar problemas automáticamente
npm run lint -- --fix
```

### 5. Actualizar Librerías

```bash
# Ver actualizaciones disponibles
npm outdated

# Actualizar librería específica
npm update framer-motion

# Actualizar todas
npm update
```

---

## 🔧 Troubleshooting

### Problema: Puerto 3000 en uso
```bash
# Solución 1: Usar puerto diferente
npm run dev -- -p 3001

# Solución 2: Matar proceso
# En Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problema: Módulos no encontrados
```bash
# Limpiar cache
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

### Problema: TypeScript errors en JSX
```javascript
// Asegurar que el archivo usa extension .jsx
// O agregar // @ts-check al inicio del archivo

// O usar interfaz explícita
import { ReactElement } from 'react';

const Component = (): ReactElement => {
  return <div>Hello</div>;
};
```

### Problema: Estilos no aplicándose
```javascript
// Verificar importación correcta
import styles from './Component.module.css';

// Usar styles.className (no strings)
<div className={styles.myClass}>  // ✅ Correcto
<div className="myClass">         // ❌ Incorrecto
```

### Problema: Framer Motion no anima
```javascript
// Asegurar que el componente está marcado como cliente
'use client';

import { motion } from 'framer-motion';

// Los elementos deben usar motion.*
<motion.div>     // ✅ Correcto
<div>            // ❌ No animará
```

---

## 🔐 Actualizaciones de Seguridad

### Verificar Vulnerabilidades
```bash
npm audit
```

### Reparar Automáticamente
```bash
npm audit fix
```

### Actualizar Librerías Críticas
```bash
npm update react react-dom next
```

### Seguir Actualizaciones
- **npm**: https://www.npmjs.com/advisories
- **GitHub**: Habilitar Dependabot alerts

---

## 🎯 Alternativas y Comparativas

### Frontend Framework Alternatives

| Framework | Ventajas | Desventajas | Caso de Uso |
|-----------|----------|-------------|-----------|
| **Next.js** | SSR, SEO, hosting fácil | Curva de aprendizaje | Web corporativa ✅ |
| Gatsby | Estático rápido, GraphQL | Menos flexible | Blogs, sitios estáticos |
| Remix | Full-stack, manejo de datos | Comunidad pequeña | Apps complejas |
| Vite + React | Rápido, ligero | Sin SSR | SPAs modernas |

### Alternativas a Framer Motion

| Librería | Ventajas | Desventajas |
|----------|----------|-------------|
| **Framer Motion** | Declarativo, fácil | Más peso | ✅ Elegida |
| React Spring | Física real, fluido | Sintaxis compleja |
| Animate.css | Ligero, simple | Menos control |
| GSAP | Poderoso, profesional | Costo de licencia |

### Alternativas a Tailwind CSS

| Framework | Ventajas | Desventajas |
|-----------|----------|-------------|
| **Tailwind CSS** | Rápido, bajo peso | Muchas clases | ✅ Elegida |
| Bootstrap | Componentes listos | Peso grande |
| CSS Modules | Encapsulado | Más código manual |
| Styled Components | JS-in-CSS, dinámico | Complejidad |

---

## 📖 Recursos Adicionales

### Documentación Oficial
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Tutoriales
- [Next.js Course](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)
- [Tailwind UI](https://tailwindui.com/)

### Comunidad
- [Next.js Discord](https://discord.gg/nextjs)
- [React Community](https://react.dev/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

## 📝 Changelog

### v1.0.0 (Mayo 2024)
- ✅ Setup inicial con Next.js 16.2.4
- ✅ React 19.2.4 con compilador
- ✅ Tailwind CSS 4
- ✅ Framer Motion 12.38.0
- ✅ Navbar responsivo
- ✅ Banner con animaciones
- ✅ Estructura de componentes

### Próximas Versiones
- [ ] v1.1.0: Formulario de contacto funcional
- [ ] v1.2.0: Blog section
- [ ] v1.3.0: Carrito de compras
- [ ] v2.0.0: Multi-idioma

---

**Última actualización:** Mayo 2024  
**Versión:** 1.0.0  
**Licencia:** MIT  
**Mantenedor:** ACEMA Ingeniería S.A.S.
