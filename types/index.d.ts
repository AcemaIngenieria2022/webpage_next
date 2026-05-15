/**
 * @file index.d.ts
 * @description Definiciones de tipos TypeScript para ACEMA Ingeniería - Página Web Corporativa
 * @version 1.0.0
 * @author ACEMA Ingeniería S.A.S.
 * @license MIT
 */

// ============================================================================
// TIPOS DE COMPONENTES
// ============================================================================

/**
 * Propiedades base para todos los componentes React
 */
interface BaseComponentProps {
  /** Clase CSS personalizada */
  className?: string;
  /** Identificador único del componente */
  id?: string;
  /** Atributos de datos adicionales */
  dataAttributes?: Record<string, string>;
  /** Función de callback de error */
  onError?: (error: Error) => void;
}

/**
 * Propiedades del componente Navbar
 */
interface NavbarProps extends BaseComponentProps {
  /** Ocultar logo en responsive */
  hideLogoOnMobile?: boolean;
  /** Callback al hacer clic en un elemento del menú */
  onMenuItemClick?: (itemId: string) => void;
  /** Estado del menú móvil */
  isMenuOpen?: boolean;
  /** Etiquetas personalizadas del menú */
  menuLabels?: Record<string, string>;
}

/**
 * Estado del Navbar
 */
interface NavbarState {
  /** Menú móvil abierto */
  isOpen: boolean;
  /** Dropdown visible */
  showDropdown: boolean;
  /** Scroll actual de la página */
  scrollPosition: number;
}

/**
 * Propiedades del componente Banner
 */
interface BannerProps extends BaseComponentProps {
  /** Altura del banner en píxeles */
  height?: number | string;
  /** Imagen de fondo */
  backgroundImage?: string;
  /** Velocidad del efecto paralax (0-1) */
  parallaxSpeed?: number;
  /** Permitir animación al cargar */
  enableAnimation?: boolean;
}

/**
 * Propiedades del componente Nosotros (About)
 */
interface NosotrosProps extends BaseComponentProps {
  /** Descripción de la empresa */
  description?: string;
  /** Años de experiencia */
  yearsOfExperience?: number;
  /** Número de empleados */
  employeeCount?: number;
  /** URL de la imagen corporativa */
  corporateImageUrl?: string;
}

/**
 * Propiedades del componente Valores
 */
interface ValoresProps extends BaseComponentProps {
  /** Array de valores corporativos */
  values?: CoreValue[];
  /** Permitir que se expandan los valores */
  expandable?: boolean;
}

/**
 * Definición de un valor corporativo
 */
interface CoreValue {
  /** ID único del valor */
  id: string;
  /** Nombre del valor */
  name: string;
  /** Descripción del valor */
  description: string;
  /** Ícono asociado (nombre o ruta) */
  icon?: string;
  /** Color de acento */
  accentColor?: string;
}

/**
 * Propiedades del componente Proyectos
 */
interface ProyectosProps extends BaseComponentProps {
  /** Array de proyectos a mostrar */
  projects?: Project[];
  /** Número máximo de proyectos visibles */
  maxVisible?: number;
  /** Habilitar paginación */
  pagination?: boolean;
  /** Callback al seleccionar un proyecto */
  onSelectProject?: (project: Project) => void;
}

/**
 * Definición de un proyecto
 */
interface Project {
  /** ID único del proyecto */
  id: string;
  /** Nombre del proyecto */
  name: string;
  /** Descripción corta */
  shortDescription: string;
  /** Descripción detallada */
  fullDescription?: string;
  /** Imagen del proyecto */
  imageUrl: string;
  /** Imágenes adicionales del proyecto */
  galleryImages?: string[];
  /** Cliente asociado */
  client?: string;
  /** Fecha de finalización */
  completionDate?: Date;
  /** Tecnologías utilizadas */
  technologies?: string[];
  /** Categoría del proyecto */
  category: ProjectCategory;
  /** Estado del proyecto */
  status: ProjectStatus;
  /** URL del proyecto (si está público) */
  projectUrl?: string;
}

/**
 * Categorías de proyectos disponibles
 */
type ProjectCategory = 
  | 'solar' 
  | 'energias-renovables' 
  | 'infraestructura' 
  | 'consultoría' 
  | 'otro';

/**
 * Estados posibles de un proyecto
 */
type ProjectStatus = 
  | 'completado' 
  | 'en-progreso' 
  | 'en-planificacion' 
  | 'cancelado';

/**
 * Propiedades del componente Asesoria
 */
interface AsesoriaProps extends BaseComponentProps {
  /** Tipo de asesoría */
  type?: 'consulta' | 'presupuesto' | 'otro';
  /** Callback al enviar formulario */
  onSubmit?: (data: ConsultationRequest) => void | Promise<void>;
  /** Email de destino */
  destinationEmail?: string;
}

/**
 * Datos de solicitud de asesoría
 */
interface ConsultationRequest {
  /** Nombre del solicitante */
  name: string;
  /** Email del solicitante */
  email: string;
  /** Teléfono de contacto */
  phone: string;
  /** Empresa */
  company?: string;
  /** Asunto de la consulta */
  subject: string;
  /** Mensaje detallado */
  message: string;
  /** Fecha de la solicitud */
  submittedAt: Date;
  /** Estado de la solicitud */
  status?: 'nuevo' | 'leido' | 'respondido' | 'cerrado';
}

/**
 * Propiedades del componente Clientes
 */
interface ClientesProps extends BaseComponentProps {
  /** Array de clientes */
  clients?: Client[];
  /** Cantidad de clientes a mostrar */
  itemsPerPage?: number;
  /** Habilitar carrusel automático */
  autoScroll?: boolean;
  /** Velocidad del carrusel (ms) */
  autoScrollSpeed?: number;
}

/**
 * Definición de un cliente
 */
interface Client {
  /** ID único del cliente */
  id: string;
  /** Nombre de la empresa cliente */
  companyName: string;
  /** Logo del cliente */
  logoUrl: string;
  /** URL del sitio web */
  websiteUrl?: string;
  /** Descripción de la relación comercial */
  description?: string;
  /** Proyectos realizados con este cliente */
  projects?: string[];
  /** Testimonial del cliente */
  testimonial?: string;
}

/**
 * Propiedades del componente Footer
 */
interface FooterProps extends BaseComponentProps {
  /** Año de inicio de la empresa */
  foundingYear?: number;
  /** Información de contacto */
  contactInfo?: ContactInfo;
  /** Enlaces a redes sociales */
  socialLinks?: SocialLink[];
  /** Incluir suscripción a newsletter */
  showNewsletter?: boolean;
}

/**
 * Información de contacto
 */
interface ContactInfo {
  /** Dirección física */
  address: string;
  /** Teléfono principal */
  phone: string;
  /** Email principal */
  email: string;
  /** Horario de atención */
  businessHours?: string;
  /** Ubicación geográfica (lat, lng) */
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Enlaces a redes sociales
 */
interface SocialLink {
  /** Red social */
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube';
  /** URL del perfil */
  url: string;
  /** Ícono personalizado */
  icon?: string;
}

/**
 * Propiedades del componente ErrorContent
 */
interface ErrorContentProps extends BaseComponentProps {
  /** Código de error */
  errorCode: number;
  /** Mensaje de error */
  message?: string;
  /** Descripción detallada */
  description?: string;
  /** URL para redirigir */
  redirectUrl?: string;
  /** Etiqueta del botón de redirección */
  redirectLabel?: string;
}

/**
 * Propiedades del componente Banner
 */
interface BannerComponentProps extends BaseComponentProps {
  /** Título principal del banner */
  title?: string;
  /** Subtítulo o descripción */
  subtitle?: string;
  /** URL de fondo */
  backgroundUrl?: string;
  /** Contenido HTML personalizado */
  content?: React.ReactNode;
  /** Altura mínima */
  minHeight?: string | number;
}

// ============================================================================
// TIPOS DE LAYOUT
// ============================================================================

/**
 * Metadatos de página
 */
interface PageMetadata {
  /** Título de la página */
  title: string;
  /** Descripción SEO */
  description: string;
  /** Palabras clave */
  keywords?: string[];
  /** Open Graph image */
  ogImage?: string;
  /** URL canónica */
  canonical?: string;
}

/**
 * Propiedades del layout raíz
 */
interface RootLayoutProps {
  /** Contenido de la página */
  children: React.ReactNode;
  /** Metadatos personalizados */
  metadata?: PageMetadata;
}

// ============================================================================
// TIPOS DE UTILIDADES
// ============================================================================

/**
 * Respuesta genérica de API
 */
interface ApiResponse<T> {
  /** Éxito de la operación */
  success: boolean;
  /** Datos de la respuesta */
  data?: T;
  /** Mensaje de error */
  error?: string;
  /** Código de error */
  errorCode?: string;
  /** Timestamp de la respuesta */
  timestamp: Date;
}

/**
 * Parámetros de paginación
 */
interface PaginationParams {
  /** Número de página */
  page: number;
  /** Items por página */
  pageSize: number;
  /** Campo de ordenamiento */
  sortBy?: string;
  /** Dirección del ordenamiento */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Respuesta paginada
 */
interface PaginatedResponse<T> {
  /** Items de la página actual */
  items: T[];
  /** Página actual */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
  /** Total de items */
  totalItems: number;
  /** Si hay página siguiente */
  hasNextPage: boolean;
  /** Si hay página anterior */
  hasPreviousPage: boolean;
}

/**
 * Configuración de tema
 */
interface ThemeConfig {
  /** Modo de tema */
  mode: 'light' | 'dark' | 'system';
  /** Color primario */
  primaryColor: string;
  /** Color secundario */
  secondaryColor: string;
  /** Color de acento */
  accentColor: string;
}

/**
 * Notificación del sistema
 */
interface Notification {
  /** ID único */
  id: string;
  /** Tipo de notificación */
  type: 'success' | 'error' | 'warning' | 'info';
  /** Mensaje */
  message: string;
  /** Duración en ms (0 = persistente) */
  duration?: number;
  /** Acción asociada */
  action?: {
    label: string;
    callback: () => void;
  };
}

// ============================================================================
// TIPOS DE CONTEXTO
// ============================================================================

/**
 * Contexto global de la aplicación
 */
interface AppContextType {
  /** Tema actual */
  theme: ThemeConfig;
  /** Cambiar tema */
  setTheme: (theme: Partial<ThemeConfig>) => void;
  /** Mostrar notificación */
  showNotification: (notification: Notification) => void;
  /** Información de usuario (si aplica) */
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

// ============================================================================
// TIPOS DE CONFIGURACIÓN
// ============================================================================

/**
 * Configuración general de la aplicación
 */
interface AppConfig {
  /** Nombre de la aplicación */
  appName: string;
  /** Versión de la aplicación */
  version: string;
  /** Ambiente */
  environment: 'development' | 'staging' | 'production';
  /** URL base de la aplicación */
  baseUrl: string;
  /** Configuración de API */
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  /** Configuración de analytics */
  analytics?: {
    enabled: boolean;
    trackingId?: string;
  };
  /** Configuración de redes sociales */
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
}

// ============================================================================
// TIPOS DE HOOKS PERSONALIZADOS
// ============================================================================

/**
 * Resultado del hook useNavigation
 */
interface UseNavigationReturn {
  /** Ruta actual */
  currentPath: string;
  /** Ir a una ruta */
  goTo: (path: string) => void;
  /** Volver atrás */
  goBack: () => void;
  /** Ir adelante */
  goForward: () => void;
}

/**
 * Resultado del hook useScrollPosition
 */
interface UseScrollPositionReturn {
  /** Posición actual del scroll */
  scrollPosition: number;
  /** Scroll en porcentaje */
  scrollPercentage: number;
  /** Si está en la parte superior */
  isTop: boolean;
  /** Si está en la parte inferior */
  isBottom: boolean;
}

/**
 * Resultado del hook useResponsive
 */
interface UseResponsiveReturn {
  /** Es dispositivo móvil */
  isMobile: boolean;
  /** Es tablet */
  isTablet: boolean;
  /** Es desktop */
  isDesktop: boolean;
  /** Ancho actual de la ventana */
  width: number;
  /** Alto actual de la ventana */
  height: number;
}

// ============================================================================
// TIPOS DE MÓDULOS DE ESTILO
// ============================================================================

/**
 * Módulo de estilos del Navbar
 */
interface NavbarStyles {
  navbar: string;
  navbarContainer: string;
  logo: string;
  menuItems: string;
  menuItem: string;
  active: string;
  dropdown: string;
  dropdownItem: string;
  hamburger: string;
  hamburgerLine: string;
}

/**
 * Módulo de estilos del Banner
 */
interface BannerStyles {
  banner: string;
  bannerContent: string;
  bannerTitle: string;
  bannerSubtitle: string;
  cta: string;
}

/**
 * Módulo de estilos del ErrorContent
 */
interface ErrorContentStyles {
  errorContainer: string;
  errorCode: string;
  errorMessage: string;
  errorDescription: string;
  ctaButton: string;
}

// ============================================================================
// TIPOS DE FRAMER MOTION
// ============================================================================

/**
 * Configuración de animación
 */
interface AnimationConfig {
  /** Duración de la animación (ms) */
  duration: number;
  /** Función de easing */
  easing?: 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
  /** Retraso inicial (ms) */
  delay?: number;
  /** Repeticiones */
  repeat?: number;
  /** Tipo de repetición */
  repeatType?: 'loop' | 'reverse' | 'mirror';
}

/**
 * Variantes de animación
 */
interface AnimationVariants {
  [key: string]: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
    transition?: AnimationConfig;
  };
}

// ============================================================================
// EXPORTAR TIPOS
// ============================================================================

export type {
  // Componentes
  BaseComponentProps,
  NavbarProps,
  NavbarState,
  BannerProps,
  NosotrosProps,
  ValoresProps,
  CoreValue,
  ProyectosProps,
  Project,
  ProjectCategory,
  ProjectStatus,
  AsesoriaProps,
  ConsultationRequest,
  ClientesProps,
  Client,
  FooterProps,
  ContactInfo,
  SocialLink,
  ErrorContentProps,
  BannerComponentProps,
  // Layout
  PageMetadata,
  RootLayoutProps,
  // Utilidades
  ApiResponse,
  PaginationParams,
  PaginatedResponse,
  ThemeConfig,
  Notification,
  // Contexto
  AppContextType,
  // Configuración
  AppConfig,
  // Hooks
  UseNavigationReturn,
  UseScrollPositionReturn,
  UseResponsiveReturn,
  // Estilos
  NavbarStyles,
  BannerStyles,
  ErrorContentStyles,
  // Animaciones
  AnimationConfig,
  AnimationVariants,
};
