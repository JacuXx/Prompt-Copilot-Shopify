# Prompts Optimizados para GitHub Copilot

## 🚀 Comandos Rápidos y Eficientes

### Estructura de Prompts Recomendada

Para obtener resultados óptimos de GitHub Copilot, usar esta estructura:

```
[TIPO] + [FUNCIONALIDAD] + [ESTILO] + [PERSONALIZACIÓN]
```

### 📝 Templates de Prompts

#### Para Secciones Completas
```
Crea una sección de [TIPO] con [FUNCIONALIDAD ESPECÍFICA], estilo [TEMA], completamente personalizable, responsive, usando Liquid para toda la lógica, con schema completo
```

**Ejemplos efectivos:**
- `Crea una sección de productos destacados con carrusel, estilo moderno, completamente personalizable`
- `Genera una sección hero con video background, texto superpuesto, botón CTA personalizable`
- `Desarrolla una sección de testimonios con grid responsive, avatars, rating stars personalizables`

#### Para Snippets Específicos
```
Desarrolla un snippet de [COMPONENTE] que [FUNCIÓN], reutilizable, con parámetros [LISTA DE PARÁMETROS]
```

**Ejemplos efectivos:**
- `Desarrolla un snippet de tarjeta de producto que muestre precio, descuento, badges, reutilizable`
- `Crea un snippet de botón personalizable que soporte múltiples estilos, tamaños, con loading state`
- `Genera un snippet de rating stars que reciba calificación numérica, personalizable en color`

#### Para Funcionalidades AJAX
```
Implementa [FUNCIÓN AJAX] que [ACCIÓN], analiza el tema actual, optimizado, con manejo de errores
```

**Ejemplos efectivos:**
- `Implementa agregar al carrito con AJAX que muestre feedback visual, analiza el tema actual`
- `Desarrolla quick view de producto con AJAX que abra modal, carga datos dinámicamente`
- `Crea filtros de colección con AJAX que actualice productos sin recargar página`

### ⚡ Palabras Clave Mágicas

#### Para Recomendaciones Inteligentes
- `recomienda la sección más adecuada` - Analiza contenido y sugiere tipo de sección
- `analiza esta imagen y sugiere` - Evaluación visual para recomendación
- `qué sección necesito para` - Orientación basada en funcionalidad
- `evalúa y recomienda estructura` - Análisis completo con alternativas

#### Para Optimización
- `completamente personalizable` - Genera schema completo
- `responsive` - Incluye media queries para todos los dispositivos
- `analiza el tema actual` - Revisa componentes existentes antes de generar
- `optimizado` - Aplica mejores prácticas de performance
- `reutilizable` - Crea componentes modulares

#### Para Estilo
- `moderno` - Design contemporáneo con gradientes y sombras
- `minimalista` - Design limpio con espacios amplios
- `elegante` - Tipografía sofisticada y colores neutros
- `colorido` - Paleta vibrante y elementos llamativos
- `profesional` - Design corporativo y formal

#### Para Funcionalidad
- `interactivo` - Incluye hover effects y animaciones
- `dinámico` - Contenido que cambia según condiciones
- `adaptable` - Se ajusta al contenido disponible
- `configurable` - Múltiples opciones de personalización

### 🎯 Prompts por Categoría

#### 🔍 **NUEVO: Análisis y Recomendaciones**
```liquid
{% comment %}
PROMPTS PARA ANÁLISIS INTELIGENTE:

• "Analiza esta imagen/descripción y recomienda la sección de Shopify más adecuada con justificación técnica"
• "Evalúa este mockup y sugiere estructura de bloques, schema settings y consideraciones responsive"
• "Revisa esta funcionalidad y recomienda si usar sección única o dividir en componentes modulares"
• "Analiza el propósito de este elemento y sugiere ubicación óptima en la página con priorización"
{% endcomment %}
```

#### E-commerce Específico
```liquid
{% comment %}
PROMPTS EFECTIVOS PARA E-COMMERCE:

• "Crea una sección de productos relacionados con carrusel, badges de descuento, completamente personalizable"
• "Desarrolla una galería de productos con filtros por categoría, usando Liquid, responsive"
• "Genera una sección de colección featured con grid personalizable, lazy loading de imágenes"
• "Implementa un product quick view con AJAX, galería de imágenes, selector de variantes"
{% endcomment %}
```

#### Layout y Navegación
```liquid
{% comment %}
PROMPTS PARA LAYOUT:

• "Crea un header sticky con mega menu, carrito dropdown, búsqueda predictiva"
• "Desarrolla un footer multi-columna con enlaces, newsletter signup, redes sociales"
• "Genera breadcrumbs dinámicos que sigan la navegación del usuario"
• "Implementa un sidebar filtros que funcione con AJAX, colapsable en mobile"
{% endcomment %}
```

#### Contenido y Marketing
```liquid
{% comment %}
PROMPTS PARA CONTENIDO:

• "Crea una sección de blog grid con featured post, categorías, lectura estimada"
• "Desarrolla un banner promocional con countdown timer, completamente personalizable"
• "Genera una sección de FAQ con acordeón, búsqueda integrada, categorías"
• "Implementa testimonios con carrusel automático, rating visual, filtros por rating"
{% endcomment %}
```

### 🚫 Evitar Estos Prompts

#### Prompts Ineficientes
- ❌ `Crea algo para productos` (muy vago)
- ❌ `Hazme una sección` (sin contexto)
- ❌ `Genera código` (sin especificaciones)
- ❌ `Como el de la competencia` (sin referencias claras)

#### Prompts Que Generan Problemas
- ❌ `Con mucho JavaScript` (va contra nuestras prácticas)
- ❌ `Simple y básico` (genera código poco personalizable)
- ❌ `Sin CSS` (no incluye estilos necesarios)
- ❌ `Como Bootstrap` (no sigue patrones de Shopify)

### 📊 Estructura de Prompt Avanzada

#### Prompt Completo Optimal
```
Crea una [TIPO DE SECCIÓN] de [FUNCIONALIDAD PRINCIPAL] que incluya:

Funcionalidades:
- [Lista de funcionalidades específicas]
- [Interacciones requeridas]
- [Casos de uso especiales]

Personalización:
- [Elementos personalizables]
- [Opciones de estilo]
- [Configuraciones de comportamiento]

Técnico:
- Usar Liquid para toda la lógica
- Responsive (desktop, tablet, mobile)
- Schema completo con todas las opciones
- [Requerimientos técnicos específicos]
```

#### Ejemplo de Prompt Completo
```
Crea una sección de productos destacados que incluya:

Funcionalidades:
- Carrusel con navigation arrows y dots
- Filtros por categoría con tabs
- Quick add to cart con feedback visual
- Badges de descuento automáticos

Personalización:
- Colores de fondo, texto y botones
- Número de productos por fila
- Activar/desactivar autoplay
- Personalizar textos y etiquetas

Técnico:
- Usar Liquid para mostrar/ocultar elementos
- Responsive con breakpoints estándar
- Analizar carruseles existentes del tema
- Schema organizado por categorías
```

### ⏱️ Optimización de Tiempos

#### Prompts de Una Sola Iteración
Para evitar múltiples correcciones, incluir desde el inicio:

1. **Contexto completo**: Tipo de sección, funcionalidad, estilo
2. **Requerimientos técnicos**: Liquid first, responsive, personalizable
3. **Casos edge**: Qué pasa si no hay contenido, errores, etc.

## 🧠 **NUEVO: Prompts de Análisis Inteligente**

### Análisis Visual (con imagen)
```
Analiza esta imagen de [tipo de contenido] y recomienda:

1. Tipo de sección Shopify más adecuado
2. Nombre de archivo sugerido (.liquid)
3. Bloques principales necesarios
4. 5 configuraciones de schema prioritarias
5. Consideraciones responsive específicas
6. Estimación de complejidad de implementación

Elementos visibles en imagen: [describir elementos clave]
Propósito funcional: [objetivo de la sección]
Ubicación en página: [above fold, middle, bottom]
```

### Análisis Funcional (con descripción)
```
Necesito crear una sección que [descripción funcional detallada].

Analiza y recomienda:
- ¿Sección única o múltiples componentes?
- Estructura de bloques más eficiente
- Schema settings esenciales vs opcionales
- Consideraciones técnicas (performance, SEO, accesibilidad)
- Alternativas más simples si existe complejidad alta
- Priorización de features para implementación por fases

Context adicional: [ubicación, audiencia, objetivo de conversión]
```

### Análisis Comparativo
```
Tengo estas opciones de diseño [describir variantes].

Evalúa y recomienda:
1. Cuál opción es más eficiente de implementar
2. Qué opción tendrá mejor performance
3. Cuál será más fácil de mantener
4. Consideraciones UX para cada opción
5. Recomendación final con justificación técnica

Considera: experiencia de usuario, tiempo de desarrollo, mantenibilidad
```

### Casos Complejos/Híbridos
```
Esta sección combina [lista de funcionalidades múltiples].

Analiza complejidad y recomienda estrategia:
- ¿Separar en múltiples secciones más simples?
- ¿Usar sección única con snippets modulares?
- ¿Qué funcionalidad priorizar como principal?
- ¿Fases de implementación sugeridas?
- ¿Alternativas que mantengan 80% de valor con 50% de complejidad?

Objetivo: mantener funcionalidad clave minimizando complejidad técnica
```

## 📊 Ejemplos Prácticos de Uso

### Ejemplo 1: Análisis de Hero Section
```
PROMPT: "Analiza esta imagen de hero section con video background, texto superpuesto y CTA button. Recomienda implementación completa."

RESPUESTA ESPERADA:
- Sección: Hero Video Banner
- Archivo: hero-video.liquid  
- Bloques: video_background, text_overlay, cta_button
- Schema: video_url, fallback_image, text_content, button_settings, overlay_opacity
- Responsive: Video solo desktop, imagen en mobile
- Complejidad: Media (requiere fallbacks y optimización)
```

### Ejemplo 2: Grid de Productos Complejo
```
PROMPT: "Necesito mostrar productos con filtros, quick view, infinite scroll y comparar productos. ¿Sección única o dividir?"

RESPUESTA ESPERADA:
- Recomendación: Dividir en componentes modulares
- Sección base: product-grid.liquid
- Snippets: filter-bar.liquid, quick-view-modal.liquid, product-compare.liquid
- Implementación por fases: 1) Grid básico, 2) Filtros, 3) Quick view, 4) Compare
- Justificación: Mantenibilidad y testing individual
```
4. **Integración**: Cómo debe integrarse con el tema existente

#### Prompts Modulares
Para proyectos grandes, dividir en módulos específicos:

```
1. "Crea el snippet base de product-card con estructura HTML y Liquid básico"
2. "Agrega personalización completa al snippet product-card con schema detallado"
3. "Implementa la sección que usa el snippet product-card en formato carrusel"
4. "Añade funcionalidades AJAX al carrusel de productos para filtros dinámicos"
```
# Prompts Optimizados para GitHub Copilot

## 🚀 Comandos Rápidos y Eficientes

### Estructura de Prompts Recomendada

Para obtener resultados óptimos de GitHub Copilot, usar esta estructura:

```
[TIPO] + [FUNCIONALIDAD] + [ESTILO] + [PERSONALIZACIÓN]
```

### 📝 Templates de Prompts

#### Para Secciones Completas
```
Crea una sección de [TIPO] con [FUNCIONALIDAD ESPECÍFICA], estilo [TEMA], completamente personalizable, responsive, usando Liquid para toda la lógica, con schema completo
```

**Ejemplos efectivos:**
- `Crea una sección de productos destacados con carrusel, estilo moderno, completamente personalizable`
- `Genera una sección hero con video background, texto superpuesto, botón CTA personalizable`
- `Desarrolla una sección de testimonios con grid responsive, avatars, rating stars personalizables`

#### Para Snippets Específicos
```
Desarrolla un snippet de [COMPONENTE] que [FUNCIÓN], reutilizable, con parámetros [LISTA DE PARÁMETROS]
```

**Ejemplos efectivos:**
- `Desarrolla un snippet de tarjeta de producto que muestre precio, descuento, badges, reutilizable`
- `Crea un snippet de botón personalizable que soporte múltiples estilos, tamaños, con loading state`
- `Genera un snippet de rating stars que reciba calificación numérica, personalizable en color`

#### Para Funcionalidades AJAX
```
Implementa [FUNCIÓN AJAX] que [ACCIÓN], analiza el tema actual, optimizado, con manejo de errores
```

**Ejemplos efectivos:**
- `Implementa agregar al carrito con AJAX que muestre feedback visual, analiza el tema actual`
- `Desarrolla quick view de producto con AJAX que abra modal, carga datos dinámicamente`
- `Crea filtros de colección con AJAX que actualice productos sin recargar página`

### ⚡ Palabras Clave Mágicas

#### Para Recomendaciones Inteligentes
- `recomienda la sección más adecuada` - Analiza contenido y sugiere tipo de sección
- `analiza esta imagen y sugiere` - Evaluación visual para recomendación
- `qué sección necesito para` - Orientación basada en funcionalidad
- `evalúa y recomienda estructura` - Análisis completo con alternativas

#### Para Optimización
- `completamente personalizable` - Genera schema completo
- `responsive` - Incluye media queries para todos los dispositivos
- `analiza el tema actual` - Revisa componentes existentes antes de generar
- `optimizado` - Aplica mejores prácticas de performance
- `reutilizable` - Crea componentes modulares

#### Para Estilo
- `moderno` - Design contemporáneo con gradientes y sombras
- `minimalista` - Design limpio con espacios amplios
- `elegante` - Tipografía sofisticada y colores neutros
- `colorido` - Paleta vibrante y elementos llamativos
- `profesional` - Design corporativo y formal

#### Para Funcionalidad
- `interactivo` - Incluye hover effects y animaciones
- `dinámico` - Contenido que cambia según condiciones
- `adaptable` - Se ajusta al contenido disponible
- `configurable` - Múltiples opciones de personalización

### 🎯 Prompts por Categoría

#### 🔍 **NUEVO: Análisis y Recomendaciones**
```liquid
{% comment %}
PROMPTS PARA ANÁLISIS INTELIGENTE:

• "Analiza esta imagen/descripción y recomienda la sección de Shopify más adecuada con justificación técnica"
• "Evalúa este mockup y sugiere estructura de bloques, schema settings y consideraciones responsive"
• "Revisa esta funcionalidad y recomienda si usar sección única o dividir en componentes modulares"
• "Analiza el propósito de este elemento y sugiere ubicación óptima en la página con priorización"
{% endcomment %}
```

#### E-commerce Específico
```liquid
{% comment %}
PROMPTS EFECTIVOS PARA E-COMMERCE:

• "Crea una sección de productos relacionados con carrusel, badges de descuento, completamente personalizable"
• "Desarrolla una galería de productos con filtros por categoría, usando Liquid, responsive"
• "Genera una sección de colección featured con grid personalizable, lazy loading de imágenes"
• "Implementa un product quick view con AJAX, galería de imágenes, selector de variantes"
{% endcomment %}
```

#### Layout y Navegación
```liquid
{% comment %}
PROMPTS PARA LAYOUT:

• "Crea un header sticky con mega menu, carrito dropdown, búsqueda predictiva"
• "Desarrolla un footer multi-columna con enlaces, newsletter signup, redes sociales"
• "Genera breadcrumbs dinámicos que sigan la navegación del usuario"
• "Implementa un sidebar filtros que funcione con AJAX, colapsable en mobile"
{% endcomment %}
```

#### Contenido y Marketing
```liquid
{% comment %}
PROMPTS PARA CONTENIDO:

• "Crea una sección de blog grid con featured post, categorías, lectura estimada"
• "Desarrolla un banner promocional con countdown timer, completamente personalizable"
• "Genera una sección de FAQ con acordeón, búsqueda integrada, categorías"
• "Implementa testimonios con carrusel automático, rating visual, filtros por rating"
{% endcomment %}
```

### 🚫 Evitar Estos Prompts

#### Prompts Ineficientes
- ❌ `Crea algo para productos` (muy vago)
- ❌ `Hazme una sección` (sin contexto)
- ❌ `Genera código` (sin especificaciones)
- ❌ `Como el de la competencia` (sin referencias claras)

#### Prompts Que Generan Problemas
- ❌ `Con mucho JavaScript` (va contra nuestras prácticas)
- ❌ `Simple y básico` (genera código poco personalizable)
- ❌ `Sin CSS` (no incluye estilos necesarios)
- ❌ `Como Bootstrap` (no sigue patrones de Shopify)

### 📊 Estructura de Prompt Avanzada

#### Prompt Completo Optimal
```
Crea una [TIPO DE SECCIÓN] de [FUNCIONALIDAD PRINCIPAL] que incluya:

Funcionalidades:
- [Lista de funcionalidades específicas]
- [Interacciones requeridas]
- [Casos de uso especiales]

Personalización:
- [Elementos personalizables]
- [Opciones de estilo]
- [Configuraciones de comportamiento]

Técnico:
- Usar Liquid para toda la lógica
- Responsive (desktop, tablet, mobile)
- Schema completo con todas las opciones
- [Requerimientos técnicos específicos]
```

#### Ejemplo de Prompt Completo
```
Crea una sección de productos destacados que incluya:

Funcionalidades:
- Carrusel con navigation arrows y dots
- Filtros por categoría con tabs
- Quick add to cart con feedback visual
- Badges de descuento automáticos

Personalización:
- Colores de fondo, texto y botones
- Número de productos por fila
- Activar/desactivar autoplay
- Personalizar textos y etiquetas

Técnico:
- Usar Liquid para mostrar/ocultar elementos
- Responsive con breakpoints estándar
- Analizar carruseles existentes del tema
- Schema organizado por categorías
```

### ⏱️ Optimización de Tiempos

#### Prompts de Una Sola Iteración
Para evitar múltiples correcciones, incluir desde el inicio:

1. **Contexto completo**: Tipo de sección, funcionalidad, estilo
2. **Requerimientos técnicos**: Liquid first, responsive, personalizable
3. **Casos edge**: Qué pasa si no hay contenido, errores, etc.

## 🧠 **NUEVO: Prompts de Análisis Inteligente**

### Análisis Visual (con imagen)
```
Analiza esta imagen de [tipo de contenido] y recomienda:

1. Tipo de sección Shopify más adecuado
2. Nombre de archivo sugerido (.liquid)
3. Bloques principales necesarios
4. 5 configuraciones de schema prioritarias
5. Consideraciones responsive específicas
6. Estimación de complejidad de implementación

Elementos visibles en imagen: [describir elementos clave]
Propósito funcional: [objetivo de la sección]
Ubicación en página: [above fold, middle, bottom]
```

### Análisis Funcional (con descripción)
```
Necesito crear una sección que [descripción funcional detallada].

Analiza y recomienda:
- ¿Sección única o múltiples componentes?
- Estructura de bloques más eficiente
- Schema settings esenciales vs opcionales
- Consideraciones técnicas (performance, SEO, accesibilidad)
- Alternativas más simples si existe complejidad alta
- Priorización de features para implementación por fases

Context adicional: [ubicación, audiencia, objetivo de conversión]
```

### Análisis Comparativo
```
Tengo estas opciones de diseño [describir variantes].

Evalúa y recomienda:
1. Cuál opción es más eficiente de implementar
2. Qué opción tendrá mejor performance
3. Cuál será más fácil de mantener
4. Consideraciones UX para cada opción
5. Recomendación final con justificación técnica

Considera: experiencia de usuario, tiempo de desarrollo, mantenibilidad
```

### Casos Complejos/Híbridos
```
Esta sección combina [lista de funcionalidades múltiples].

Analiza complejidad y recomienda estrategia:
- ¿Separar en múltiples secciones más simples?
- ¿Usar sección única con snippets modulares?
- ¿Qué funcionalidad priorizar como principal?
- ¿Fases de implementación sugeridas?
- ¿Alternativas que mantengan 80% de valor con 50% de complejidad?

Objetivo: mantener funcionalidad clave minimizando complejidad técnica
```

## 📊 Ejemplos Prácticos de Uso

### Ejemplo 1: Análisis de Hero Section
```
PROMPT: "Analiza esta imagen de hero section con video background, texto superpuesto y CTA button. Recomienda implementación completa."

RESPUESTA ESPERADA:
- Sección: Hero Video Banner
- Archivo: hero-video.liquid  
- Bloques: video_background, text_overlay, cta_button
- Schema: video_url, fallback_image, text_content, button_settings, overlay_opacity
- Responsive: Video solo desktop, imagen en mobile
- Complejidad: Media (requiere fallbacks y optimización)
```

### Ejemplo 2: Grid de Productos Complejo
```
PROMPT: "Necesito mostrar productos con filtros, quick view, infinite scroll y comparar productos. ¿Sección única o dividir?"

RESPUESTA ESPERADA:
- Recomendación: Dividir en componentes modulares
- Sección base: product-grid.liquid
- Snippets: filter-bar.liquid, quick-view-modal.liquid, product-compare.liquid
- Implementación por fases: 1) Grid básico, 2) Filtros, 3) Quick view, 4) Compare
- Justificación: Mantenibilidad y testing individual
```
4. **Integración**: Cómo debe integrarse con el tema existente

#### Prompts Modulares
Para proyectos grandes, dividir en módulos específicos:

```
1. "Crea el snippet base de product-card con estructura HTML y Liquid básico"
2. "Agrega personalización completa al snippet product-card con schema detallado"
3. "Implementa la sección que usa el snippet product-card en formato carrusel"
4. "Añade funcionalidades AJAX al carrusel de productos para filtros dinámicos"
```
