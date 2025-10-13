# Sección de Participantes - ICPC Landing

## 🎯 Descripción

La sección de **PARTICIPANTES** es una implementación completa y moderna que muestra todos los equipos competidores del ICPC con filtros interactivos, **animaciones GSAP avanzadas con scroll triggers** y un diseño creativo e inmersivo.

## ✨ Características

### 1. **Estadísticas Animadas con Scroll Reveals**
- Contadores animados que cuentan desde 0 hasta el valor final
- Animación de entrada con 3D flip (rotateX -90° → 0°)
- **Efecto floating continuo** en cada card de estadística
- **Rotación sutil** basada en scroll (parallax)
- **Pulse effect** en los números al contar (escala en múltiplos de 10)
- 4 métricas principales: Universidades, Equipos, Participantes, Punteo Promedio
- Animaciones activadas al hacer scroll a la sección

### 2. **Sistema de Filtros con Animaciones Creativas**
- **Filtro por Universidad**: Chips con colores personalizados
  - UNIS: Azul oscuro (#0C4A6E / #0EA5E9)
  - USAC: Rojo oscuro (#7C2D12 / #EF4444)
  - UVG: Verde oscuro (#065F46 / #10B981)
  - Landívar: Azul (#1E3A8A / #3B82F6)
- **Animación de filtros**: Cascade effect con rotateX
- **Botones con elastic effect**: Aparecen uno por uno al hacer scroll
- **Ordenamiento**: Por puntuación o alfabético
- Transiciones suaves entre estados

### 3. **Grid de Equipos con Animaciones Avanzadas**
- **Diseño responsivo** (1, 2 o 3 columnas)
- **Animación de entrada única**:
  - Entrada en 3D con rotateY y rotateX
  - Dirección alterna por fila (zigzag effect)
  - Staggered timing personalizado
- **Efecto Parallax** continuo al hacer scroll
- **Hover effects mejorados**:
  - Scale 1.08 + translate -12px
  - Rotación 3D sutil (rotateY: 3°, rotateX: -3°)
  - Shadow dinámica aumentada
  - **Avatares se animan** individualmente al hover
- Cards con:
  - Header con gradient del color de la universidad
  - Badge de puntuación
  - Avatares animados de miembros del equipo
  - Descripción del equipo
  - Indicador de "click para detalles"

### 4. **Top 5 Ranking con Efectos Especiales**
- **Título animado**: Slide desde la izquierda con skewX
- **Header con scale reveal**: Aparece desde arriba (scaleY)
- **Animaciones especiales para Top 3**:
  - **Podium effect** con elastic easing
  - **Glow pulsante** para el 1er lugar (oro)
  - Rotación inicial diferente por posición
- **Filas 4-5**: Entrada alterna (izquierda/derecha) con rotateY
- **Parallax effect** individual por fila
- **Hover effect**: Scale + slide hacia la derecha con shadow
- Medallas visuales (🥇🥈🥉) para los primeros 3 lugares

### 5. **Dialog de Detalles con Animaciones de Entrada**
- **Backdrop animado**: Fade-in suave con GSAP
- **Content con 3D entrance**:
  - Scale 0.8 → 1
  - Translate Y: 50px → 0
  - RotateX: -15° → 0°
  - Back easing para efecto elástico
- **Secciones internas animadas**:
  - Stagger effect en cada sección (Stats, Members, Info)
  - Fade-in + slide-up progresivo
- Modal con información completa del equipo
- Header con gradient animado de universidad
- Estadísticas: Ranking, Integrantes, Puntaje
- Lista completa de miembros con roles
- Badge especial para coaches
- Cerrar con ESC, X o click en backdrop (con fade-out animado)

### 6. **Background Animado Mejorado**
- **Canvas con partículas**:
  - 60 partículas con movimiento suave
  - **Efecto pulse**: Tamaño y opacidad oscilante
  - **Glow effect** con shadowBlur
  - **Conexiones entre partículas** cercanas (< 150px)
  - Fade-in suave del canvas al cargar
- Colores del tema del proyecto
- Movimiento orgánico y continuo

### 7. **Título Principal con Split Text Animation**
- **Cada letra animada individualmente**:
  - Entrada desde abajo (Y: 100px)
  - Rotación 3D (rotateX: -90° → 0°)
  - **Stagger desde el centro** hacia los lados
  - Back easing para efecto elástico
- Efecto muy llamativo y creativo

### 8. **Kicker con 3D Effect**
- Slide desde la izquierda con:
  - TranslateX: -100px → 0
  - RotateY: -45° → 0°
  - Fade-in suave

---

## 🎨 Animaciones GSAP Implementadas

### Scroll Trigger Animations (activadas al hacer scroll):

#### 1. **Título Principal**
- Split text character animation
- Cada letra: Y: 100, rotateX: -90 → Y: 0, rotateX: 0
- Stagger from center
- Duration: 0.8s con back.out(1.7)

#### 2. **Kicker**
- X: -100, rotateY: -45 → X: 0, rotateY: 0
- Duration: 1s

#### 3. **Filtros**
- Cascade effect en secciones: Y: 50, scale: 0.9, rotateX: -20
- Botones con elastic effect
- Stagger: 0.15s entre secciones, 0.05s entre botones

#### 4. **Stats Cards**
- Entrada: 3D flip (rotateX: -90 → 0) + scale: 0.5 → 1
- Floating continuo (Y: -10, yoyo, duration: 2s+)
- Rotación sutil en scroll (scrub: 2)
- Contadores con pulse cada 10 números

#### 5. **Ranking**
- Título: Slide + skewX
- Header: ScaleY reveal
- Top 3: Elastic bounce con rotación
- **1er lugar**: Glow pulsante continuo
- Filas 4-5: Entrada alterna con rotateY
- Parallax por fila
- Hover: Scale + translateX con shadow

#### 6. **Grid de Equipos**
- Entrada 3D con dirección alterna:
  - Y: 100, X: ±100, rotateY: ±45, rotateX: -20
  - Scale: 0.7 → 1
  - Duration: 1s con power3.out
- Parallax continuo (Y: -20)
- Hover mejorado:
  - Scale: 1.08, Y: -12
  - RotateY: 3°, rotateX: -3°
  - Avatares con animación individual

#### 7. **Dialog**
- Backdrop: Fade-in controlado
- Content: Scale + Y + rotateX con back.out(1.7)
- Secciones internas: Stagger 0.1s
- Cierre con fade-out

#### 8. **Background**
- Canvas fade-in: 2s
- Partículas con pulse continuo
- Conexiones dinámicas entre partículas
- Glow effect con shadowBlur

---

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── sections/
│   │   ├── ParticipantsSection.tsx    # Componente principal con animaciones avanzadas
│   │   ├── ParticipantsStats.tsx      # Estadísticas con floating + pulse
│   │   └── TeamRanking.tsx            # Top 5 con podium effect
│   └── ui/
│       ├── dialog.tsx                 # Dialog con GSAP animations
│       ├── badge.tsx                  # Badge component
│       └── animated-background.tsx    # Canvas mejorado con conexiones
├── data/
│   └── teams.ts                       # Datos de equipos (12 equipos)
├── types/
│   └── participants.ts                # Tipos y colores de universidades
├── lib/
│   └── participants.utils.ts         # Utilidades
└── config/
    └── participants.config.ts         # Configuraciones

public/
└── images/
    └── participants/
        └── placeholder-[1-48].jpg     # Imágenes placeholder
```

---

## 🎯 Colores de Universidades

```css
UNIS:      #0C4A6E → #0EA5E9  (Azul oscuro)
USAC:      #7C2D12 → #EF4444  (Rojo oscuro)
UVG:       #065F46 → #10B981  (Verde oscuro)
Landívar:  #1E3A8A → #3B82F6  (Azul)
```

---

## 🚀 Uso

El componente ya está integrado en la página principal:

```tsx
import ParticipantsSection from "@/components/sections/ParticipantsSection";

// En page.tsx
<ParticipantsSection />
```

---

## 🎨 Características de Animación por Componente

### ParticipantsSection
- Split text animation en título
- 3D entrance para filtros
- Grid con entrada zigzag
- Parallax continuo
- Hover con 3D rotation

### ParticipantsStats
- 3D flip entrance
- Floating continuo
- Rotation on scroll
- Counter pulse effect

### TeamRanking
- Podium animation para top 3
- Glow effect en 1er lugar
- Parallax por fila
- Hover scale + slide

### Dialog
- GSAP controlled animations
- Backdrop fade
- Content 3D entrance
- Stagger en secciones internas

### AnimatedBackground
- Partículas con pulse
- Conexiones dinámicas
- Glow effects
- Fade-in inicial

---

## 📝 Personalización

### Agregar más equipos:
Edita `/src/data/teams.ts` y agrega nuevos objetos al array `TEAMS`.

### Cambiar colores de universidad:
Modifica `/src/types/participants.ts` en el objeto `UNIVERSITY_COLORS`.

### Ajustar animaciones:
Los parámetros de GSAP están en `/src/config/participants.config.ts`.

### Modificar velocidades:
```typescript
// En config/participants.config.ts
animations: {
  entryDuration: 0.6,
  staggerDelay: 0.05,
  hoverDuration: 0.3,
  counterDuration: 2,
}
```

---

## 🌟 Metodología de Diseño

- ✅ Tipografía: Nunito Sans (body) + Roboto Mono (headings)
- ✅ Colores coherentes con el tema del proyecto
- ✅ **Animaciones GSAP con scroll triggers avanzados**
- ✅ **Efectos 3D creativos** (rotateX, rotateY, perspective)
- ✅ **Parallax y floating effects**
- ✅ Componentes reutilizables
- ✅ Diseño responsivo mobile-first
- ✅ Dark mode compatible
- ✅ Accesibilidad (keyboard navigation)

---

## 🔥 Efectos Especiales Implementados

1. **Split Text Animation**: Cada letra del título animada individualmente
2. **3D Transforms**: RotateX, rotateY, rotateZ para profundidad
3. **Parallax Scrolling**: Movimiento continuo basado en scroll
4. **Floating Effect**: Animación yoyo infinita en stats
5. **Elastic Easing**: Back.out y elastic.out para efectos elásticos
6. **Pulse Effect**: Scale en números al contar
7. **Glow Effect**: Shadow pulsante en 1er lugar
8. **Stagger Animations**: Timing escalonado en todos los elementos
9. **Particle Connections**: Líneas dinámicas entre partículas cercanas
10. **3D Hover**: Rotación 3D en hover de cards

---

## 🔧 Tecnologías Utilizadas

- Next.js 15
- React 19
- TypeScript
- **GSAP 3.13 + ScrollTrigger**
- Tailwind CSS v4
- Canvas API (para background)

---

**Diseñado con animaciones de scroll creativas y efectos 3D** ✨

## 🎨 Diseño y Animaciones

### Animaciones GSAP Implementadas:

1. **Entrada de sección**
   - Título con scale y fade-in
   - Kicker con slide-up
   - Filtros con delay progresivo

2. **Cards**
   - Entrada staggered con rotateX
   - Hover con scale y translate
   - Transiciones suaves entre filtros

3. **Estadísticas**
   - Contadores numéricos animados
   - Cards con back.out easing
   - Scroll trigger activado

4. **Dialog**
   - Fade-in con zoom
   - Backdrop blur
   - Cerrar con ESC o click fuera

### Paleta de Colores:

```css
/* Universidades */
UNIS:      primary: #0C4A6E, secondary: #0EA5E9
USAC: primary: #7C2D12, secondary: #EF4444
UVG:     primary: #065F46, secondary: #10B981
Landivar:     primary: #1E3A8A, secondary: #3B82F6

/* Gradientes del tema */
from-primary via-secondary to-tertiary
```

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── sections/
│   │   ├── ParticipantsSection.tsx    # Componente principal
│   │   └── ParticipantsStats.tsx      # Estadísticas animadas
│   └── ui/
│       ├── dialog.tsx                 # Dialog component
│       └── badge.tsx                  # Badge component
├── data/
│   └── teams.ts                       # Datos de equipos (12 equipos)
└── types/
    └── participants.ts                # Tipos TypeScript

public/
└── images/
    └── participants/
        └── placeholder-[1-48].jpg     # Imágenes placeholder
```

## 🏫 Datos de Equipos

### Universidades Participantes: DUMMY INFORMATION 
- **UVG**: 3 equipos (Code Warriors, Binary Ninjas, Algorithm Masters)
- **Landívar**: 3 equipos (Red Dragons, Crimson Coders, Phoenix Programmers)
- **UNIS**: 3 equipos (Green Giants, Emerald Knights, Forest Coders)
- **USAC**: 3 equipos (Blue Thunder, Sapphire Squad, Azure Algorithms)

Total: **12 equipos**, **36 competidores**, **12 coaches**

### Estructura de Datos:

```typescript
type Team = {
  id: string;
  name: string;
  university: University;
  score: number;
  members: TeamMember[];
  description?: string;
};

type TeamMember = {
  name: string;
  role: "Competidor" | "Coach";
  image: string;
};
```

## 🎯 Funcionalidades Interactivas

1. **Filtrado dinámico**: Click en chips de universidad
2. **Ordenamiento**: Toggle entre score y alfabético
3. **Ver detalles**: Click en cualquier card
4. **Cerrar dialog**: ESC, X o click en backdrop
5. **Animaciones hover**: Efecto en todas las cards

## 🚀 Uso

El componente ya está integrado en la página principal:

```tsx
import ParticipantsSection from "@/components/sections/ParticipantsSection";

// En page.tsx
<ParticipantsSection />
```

## 📝 Personalización

### Agregar más equipos:

Edita `/src/data/teams.ts` y agrega nuevos objetos al array `TEAMS`.

### Cambiar colores de universidad:

Modifica `/src/types/participants.ts` en el objeto `UNIVERSITY_COLORS`.

### Ajustar animaciones:

Los parámetros de GSAP están en `/src/components/sections/ParticipantsSection.tsx` y `ParticipantsStats.tsx`.

## 🎨 Metodología de Diseño

El diseño sigue la metodología del proyecto:
- ✅ Tipografía: Nunito Sans (body) + Roboto Mono (headings)
- ✅ Colores coherentes con el tema del proyecto
- ✅ Animaciones GSAP para transiciones suaves
- ✅ Componentes reutilizables (Dialog, Badge)
- ✅ Diseño responsivo mobile-first
- ✅ Dark mode compatible
- ✅ Accesibilidad (keyboard navigation en dialog)

## 🌟 Características Destacadas

1. **Creatividad**: Gradientes dinámicos por universidad
2. **Performance**: Animaciones optimizadas con GSAP
3. **UX**: Filtros intuitivos y feedback visual inmediato
4. **Accesibilidad**: Dialog manejable con teclado
5. **Responsividad**: Funciona en todos los tamaños de pantalla

## 🔧 Tecnologías Utilizadas

- Next.js 15
- React 19
- TypeScript
- GSAP + ScrollTrigger
- Tailwind CSS v4
- Radix UI (Dialog base)

---

**Nota**: Las imágenes son placeholders SVG. Reemplázalas con fotos reales de los participantes cuando estén disponibles.
