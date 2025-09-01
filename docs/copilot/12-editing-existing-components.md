# Guía para Editar Secciones y Snippets Existentes

## 🔍 Análisis de Contexto OBLIGATORIO

### ANTES de cualquier modificación:

#### 1. **Análisis Completo del Archivo**
```liquid
{% comment %}
ANÁLISIS REQUERIDO ANTES DE EDITAR:
- Leer TODO el archivo desde línea 1 hasta el final
- Identificar estructura actual (HTML, CSS, JS, Schema)
- Mapear variables Liquid existentes
- Revisar dependencias con otros snippets
- Identificar patrones de nomenclatura utilizados
{% endcomment %}
```

#### 2. **Identificar Componentes Existentes**
- **Variables Liquid**: `{% assign %}` y configuraciones actuales
- **Estructura HTML**: Clases CSS y data attributes usados
- **JavaScript**: Funciones y event listeners existentes
- **Schema**: Settings y blocks ya configurados
- **Snippets relacionados**: `{% render %}` calls existentes

#### 3. **Mantener Consistencia**
- **Nomenclatura**: Seguir patrones de nombres existentes
- **Estructura**: Respetar organización actual del código
- **Estilos**: Mantener metodología CSS establecida
- **Funcionalidad**: Preservar comportamientos existentes

## 📝 Prompts Optimizados para Edición

### Estructura de Prompt para Edición
```
Edita [ARCHIVO EXISTENTE] para [MODIFICACIÓN ESPECÍFICA], manteniendo:
- Toda la estructura y funcionalidad actual
- Patrones de nomenclatura existentes
- Compatibilidad con el resto del código
- Schema y configuraciones actuales
```

### Templates de Prompts Efectivos

#### Para Agregar Funcionalidad
```
Edita la sección [nombre-seccion.liquid] para agregar [nueva funcionalidad], 
mantén toda la estructura actual, variables existentes y agrega solo lo necesario 
para [funcionalidad específica]
```

**Ejemplos:**
- `Edita product-grid.liquid para agregar filtros por precio, mantén carrusel actual y variables`
- `Edita hero-banner.liquid para incluir video background, preserva overlay text y botones`
- `Edita testimonials.liquid para agregar rating stars, mantén carrusel y personalización`

#### Para Modificar Estilos
```
Edita [archivo] para modificar [aspecto visual específico], 
preserva media queries actuales y mejora solo [elemento específico]
```

**Ejemplos:**
- `Edita product-card snippet para mejorar hover effects, mantén estructura de precio y badges`
- `Edita navigation.liquid para cambiar mobile menu, preserva desktop layout actual`
- `Edita footer.liquid para actualizar responsive grid, mantén contenido y enlaces actuales`

#### Para Optimizar Performance
```
Optimiza [archivo] para [mejora específica], 
mantén toda la funcionalidad actual y mejora solo [aspecto técnico]
```

**Ejemplos:**
- `Optimiza product-recommendations.liquid para lazy loading, mantén carrusel y configuraciones`
- `Optimiza cart-drawer.js para mejor performance, preserva toda la funcionalidad AJAX actual`
- `Optimiza hero-section para Core Web Vitals, mantén animaciones y responsive design`

#### Para Agregar Personalización
```
Agrega opciones de personalización a [archivo] para [configuración específica], 
mantén schema actual y agrega nuevas opciones sin romper las existentes
```

**Ejemplos:**
- `Agrega opciones de color a product-grid.liquid, mantén configuraciones de layout actuales`
- `Incluye configuración de animaciones en testimonials.liquid, preserva todas las opciones existentes`
- `Añade selector de estilos de botón en hero-banner, mantén configuración de contenido actual`

## 🛠️ Metodología de Edición

### Paso 1: Lectura Completa
```liquid
{% comment %}
CHECKPOINT 1: ANÁLISIS COMPLETO
✓ Archivo leído completamente
✓ Variables identificadas
✓ Estructura mapeada
✓ Dependencias revisadas
✓ Patrones de código identificados
{% endcomment %}
```

### Paso 2: Identificación de Puntos de Inserción
```liquid
{% comment %}
CHECKPOINT 2: PUNTOS DE MODIFICACIÓN
✓ Ubicación exacta para nuevos elementos
✓ Variables que se pueden reutilizar
✓ Sections del schema que se pueden extender
✓ CSS classes que se pueden aprovechar
✓ JavaScript functions que se pueden usar
{% endcomment %}
```

### Paso 3: Implementación Conservadora
```liquid
{% comment %}
CHECKPOINT 3: MODIFICACIÓN SEGURA
✓ Solo cambios mínimos necesarios
✓ Preservación de funcionalidad existente
✓ Uso de patrones establecidos
✓ Extensión, no reemplazo
✓ Testing de compatibilidad
{% endcomment %}
```

## 📋 Ejemplos Prácticos

### Caso 1: Agregar Quick View a Product Grid Existente

#### ❌ Prompt Incorrecto
```
Agrega quick view al product grid
```

#### ✅ Prompt Correcto
```
Edita la sección product-grid.liquid para agregar funcionalidad de quick view modal, 
mantén el carrusel actual, variables de configuración existentes, y estructura de 
product-card snippet. Agrega solo el modal y el JavaScript necesario sin modificar 
el layout grid actual.
```

### Caso 2: Mejorar Responsive de Hero Section

#### ❌ Prompt Incorrecto
```
Haz responsive el hero section
```

#### ✅ Prompt Correcto
```
Edita hero-banner.liquid para mejorar responsive design en tablet y mobile, 
mantén toda la estructura de overlay, botones CTA actuales, configuraciones de 
schema existentes, y optimiza solo los media queries sin cambiar la funcionalidad 
de video background actual.
```

### Caso 3: Optimizar Cart Drawer Performance

#### ❌ Prompt Incorrecto
```
Optimiza el cart drawer
```

#### ✅ Prompt Correcto
```
Optimiza cart-drawer.liquid y cart-drawer.js para mejor performance, mantén toda 
la funcionalidad AJAX actual, animaciones de apertura/cierre, updates dinámicos 
de precio, y mejora solo la carga inicial y rendering sin cambiar la UX existente.
```

## 🎯 Reglas de Oro para Edición

### 1. **Preservar Siempre**
- ✅ Funcionalidad existente
- ✅ Variables y configuraciones
- ✅ Nombres de clases CSS
- ✅ Estructura de schema
- ✅ Compatibilidad con snippets

### 2. **Extender, No Reemplazar**
- ✅ Agregar nuevas variables sin eliminar
- ✅ Ampliar schema sin romper opciones actuales
- ✅ Añadir CSS classes sin modificar existentes
- ✅ Incluir JavaScript sin afectar funciones actuales

### 3. **Mantener Patrones**
- ✅ Nomenclatura de variables consistente
- ✅ Estructura de HTML igual
- ✅ Metodología CSS establecida
- ✅ Organización de código actual

### 4. **Testing de Compatibilidad**
- ✅ Verificar que no se rompa funcionalidad existente
- ✅ Probar en diferentes dispositivos
- ✅ Validar schema sin errores
- ✅ Confirmar performance no degradada

## 🔧 Templates por Tipo de Edición

### Agregar Nueva Funcionalidad
```liquid
{% comment %} NUEVA FUNCIONALIDAD {% endcomment %}
{% comment %} Variables existentes preservadas {% endcomment %}
{% assign existing_var = section.settings.existing_config %}

{% comment %} Nuevas variables para funcionalidad {% endcomment %}
{% assign new_feature_enabled = section.settings.enable_new_feature | default: false %}

{% comment %} HTML existente intacto {% endcomment %}
<div class="existing-structure">
  <!-- Contenido original preservado -->
  
  {% comment %} Nueva funcionalidad agregada {% endcomment %}
  {% if new_feature_enabled %}
    <div class="new-feature-wrapper">
      <!-- Nueva funcionalidad aquí -->
    </div>
  {% endif %}
</div>
```

### Modificar Estilos Existentes
```css
/* Estilos existentes preservados */
.existing-component {
  /* Propiedades originales mantenidas */
  display: flex;
  gap: 20px;
  
  /* Nuevas mejoras agregadas */
  transition: all 0.3s ease;
  transform: translateZ(0); /* Optimización performance */
}

/* Nuevos estilos para funcionalidad agregada */
.existing-component__new-element {
  /* Nuevos estilos siguiendo nomenclatura existente */
}
```

### Extender Schema Existente
```json
{
  "name": "Sección Existente",
  "settings": [
    {
      "type": "header",
      "content": "Configuración Original"
    },
    // ... settings existentes preservados ...
    
    {
      "type": "header",
      "content": "Nueva Funcionalidad"
    },
    {
      "type": "checkbox",
      "id": "enable_new_feature",
      "label": "Habilitar Nueva Funcionalidad"
    }
  ]
}
```

## 🚨 Señales de Alerta

### ⚠️ Evitar Estos Cambios
- Eliminar variables existentes
- Cambiar nombres de clases CSS establecidas
- Modificar estructura base de HTML
- Remover configuraciones de schema
- Alterar JavaScript functions existentes

### ✅ Cambios Seguros
- Agregar nuevas variables con defaults
- Incluir clases CSS adicionales
- Extender HTML con nuevos elementos
- Ampliar schema con nuevas opciones
- Añadir JavaScript functions complementarias

## 📊 Checklist de Edición

### Antes de Empezar
- [ ] He leído todo el archivo completo
- [ ] Identifiqué todas las variables existentes
- [ ] Mapeé la estructura actual
- [ ] Revisé dependencias con otros archivos
- [ ] Entendí los patrones de nomenclatura

### Durante la Edición
- [ ] Solo agrego código, no elimino existente
- [ ] Sigo patrones de nomenclatura establecidos
- [ ] Extiendo schema sin romper opciones actuales
- [ ] Mantengo estructura y organización actual
- [ ] Agrego comentarios explicativos para nuevas funciones

### Después de la Edición
- [ ] Verifico que funcionalidad existente no se rompió
- [ ] Confirmo que nuevas features funcionan correctamente
- [ ] Valido responsive design en todos los dispositivos
- [ ] Pruebo configuraciones de schema nuevas y existentes
- [ ] Documento cambios realizados en commits
