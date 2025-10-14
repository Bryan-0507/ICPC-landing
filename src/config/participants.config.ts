/**
 * Configuración de la sección de Participantes
 * 
 * Este archivo contiene las configuraciones y constantes
 * utilizadas en la sección de participantes del ICPC.
 */

export const PARTICIPANTS_CONFIG = {
  // Número de equipos a mostrar en el ranking
  TOP_TEAMS_COUNT: 5,

  // Configuración de animaciones GSAP
  animations: {
    // Duración de las animaciones de entrada (segundos)
    entryDuration: 0.6,
    // Delay entre cards en el stagger (segundos)
    staggerDelay: 0.05,
    // Delay para animaciones de hover
    hoverDuration: 0.3,
    // Duración de los contadores
    counterDuration: 2,
  },

  // Configuración del grid
  grid: {
    // Breakpoints para columnas
    // mobile: 1 columna
    // tablet (md): 2 columnas
    // desktop (lg): 3 columnas
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
    // Gap entre cards (Tailwind spacing)
    gap: 6,
  },

  // Configuración del background animado
  background: {
    // Número de partículas
    particleCount: 50,
    // Opacidad del canvas
    opacity: 0.3,
    // Colores de las partículas (basados en el tema)
    colors: ["#5459ab", "#52357b", "#648db3"],
  },

  // Mensajes de UI
  messages: {
    emptyState: "No se encontraron equipos",
    clickForDetails: "Click para ver detalles →",
  },
} as const;

/**
 * Configuración de los filtros disponibles
 */
export const FILTER_OPTIONS = {
  universities: ["all", "UVG", "Landívar", "UNIS", "USAC"] as const,
  sortBy: ["score", "alphabetical"] as const,
} as const;

/**
 * Etiquetas de UI para los filtros
 */
export const FILTER_LABELS = {
  filterByUniversity: "Filtrar por Universidad",
  sortBy: "Ordenar por",
  all: "Todas",
  score: "Puntuación",
  alphabetical: "Alfabético",
} as const;

/**
 * Configuración del Dialog
 */
export const DIALOG_CONFIG = {
  maxWidth: "3xl",
  // Tiempo de animación del dialog
  animationDuration: 200,
} as const;
