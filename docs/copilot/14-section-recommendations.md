# Recomendaciones de Secciones por GitHub Copilot

## 🎯 Configuración para Análisis de Secciones

### Prompt Base para Recomendaciones
```
Analiza [imagen/descripción] y recomienda la sección de Shopify más adecuada. 
Considera:
- Propósito funcional del elemento
- Ubicación típica en la página
- Tipo de contenido que mostrará
- Interactividad requerida
- Responsive design necesario

Proporciona:
1. Tipo de sección recomendada
2. Nombre sugerido para la sección
3. Bloques principales que debería incluir
4. Configuraciones de schema esenciales
5. Consideraciones técnicas específicas
```

## 📊 Matriz de Recomendaciones por Tipo de Contenido

### 1. **Contenido Hero/Banner**
#### Características Visuales:
- Imagen/video de fondo grande
- Texto superpuesto prominente
- Call-to-action principal
- Ocupa el viewport completo o mayoría

#### Recomendación:
```
SECCIÓN: Hero Banner
NOMBRE: hero-banner.liquid
BLOQUES: text_overlay, cta_button, background_media
PRIORIDAD: Alta (primera impresión)
```

### 2. **Grid de Productos**
#### Características Visuales:
- Múltiples productos en cuadrícula
- Imágenes de productos uniformes
- Información básica (precio, título)
- Navegación/filtros opcionales

#### Recomendación:
```
SECCIÓN: Product Grid
NOMBRE: product-grid.liquid
BLOQUES: product_card, filter_bar, pagination
PRIORIDAD: Alta (conversión)
```

### 3. **Testimonios/Reviews**
#### Características Visuales:
- Fotos de clientes o avatars
- Textos de testimonios
- Calificaciones (estrellas)
- Posible carrusel/slider

#### Recomendación:
```
SECCIÓN: Testimonials
NOMBRE: testimonials.liquid
BLOQUES: testimonial_card, rating_stars, customer_info
PRIORIDAD: Media (confianza)
```

### 4. **Información de Marca/Empresa**
#### Características Visuales:
- Texto descriptivo extenso
- Imágenes institucionales
- Stats/números importantes
- Layout en columnas

#### Recomendación:
```
SECCIÓN: About Us
NOMBRE: about-section.liquid
BLOQUES: text_content, image_gallery, stats_counter
PRIORIDAD: Baja (informativa)
```

### 5. **Características/Features**
#### Características Visuales:
- Iconos o imágenes pequeñas
- Títulos y descripciones cortas
- Layout en grid 2-4 columnas
- Enfoque en beneficios

#### Recomendación:
```
SECCIÓN: Features
NOMBRE: features-section.liquid
BLOQUES: feature_item, icon_selector, benefit_text
PRIORIDAD: Media (persuasión)
```

### 6. **FAQ/Preguntas Frecuentes**
#### Características Visuales:
- Lista de preguntas expandibles
- Acordeón/collapsible design
- Texto organizado jerárquicamente
- Búsqueda opcional

#### Recomendación:
```
SECCIÓN: FAQ
NOMBRE: faq-section.liquid
BLOQUES: faq_item, search_bar, category_filter
PRIORIDAD: Baja (soporte)
```

### 7. **Galería de Imágenes**
#### Características Visuales:
- Múltiples imágenes organizadas
- Posible lightbox/modal
- Grid o masonry layout
- Navegación por categorías

#### Recomendación:
```
SECCIÓN: Image Gallery
NOMBRE: image-gallery.liquid
BLOQUES: gallery_item, lightbox_modal, category_tab
PRIORIDAD: Media (visual)
```

### 8. **Contacto/Formulario**
#### Características Visuales:
- Campos de formulario
- Información de contacto
- Mapa opcional
- Layout en columnas

#### Recomendación:
```
SECCIÓN: Contact Form
NOMBRE: contact-section.liquid
BLOQUES: form_fields, contact_info, map_embed
PRIORIDAD: Media (conversión)
```

### 9. **Newsletter/Suscripción**
#### Características Visuales:
- Campo de email prominente
- Mensaje persuasivo
- Botón call-to-action
- Posible incentivo/descuento

#### Recomendación:
```
SECCIÓN: Newsletter
NOMBRE: newsletter-section.liquid
BLOQUES: email_input, incentive_text, cta_button
PRIORIDAD: Alta (captura leads)
```

### 10. **Blog/Artículos**
#### Características Visuales:
- Cards de artículos
- Imágenes destacadas
- Metadata (fecha, autor)
- Categorías/tags

#### Recomendación:
```
SECCIÓN: Blog Grid
NOMBRE: blog-section.liquid
BLOQUES: article_card, category_filter, read_more
PRIORIDAD: Baja (contenido)
```

## 🔍 Prompt Templates Específicos

### Para Análisis de Imagen
```
Analiza esta imagen y recomienda la sección de Shopify más adecuada:

IMAGEN: [descripción detallada o imagen adjunta]

Identifica:
1. Elementos visuales principales
2. Tipo de contenido mostrado
3. Propósito funcional aparente
4. Ubicación probable en página web
5. Nivel de interactividad requerido

Recomienda:
- Tipo de sección específico
- Nombre de archivo sugerido
- Bloques principales necesarios
- 3-5 configuraciones de schema esenciales
- Consideraciones técnicas (responsive, performance, etc.)
```

### Para Análisis de Descripción
```
Basándote en esta descripción, recomienda la sección de Shopify más adecuada:

DESCRIPCIÓN: "[descripción funcional del elemento]"

Analiza:
1. Funcionalidad requerida
2. Tipo de contenido a mostrar
3. Interacciones de usuario necesarias
4. Ubicación estratégica en la página
5. Prioridad de conversión

Proporciona:
- Sección recomendada con justificación
- Estructura de bloques sugerida
- Schema settings prioritarios
- Consideraciones UX específicas
- Alternative sections si aplica
```

### Para Casos Complejos/Híbridos
```
Esta sección combina múltiples funcionalidades. Analiza y recomienda:

FUNCIONALIDADES: [lista de características]

Evalúa:
1. Funcionalidad principal vs secundaria
2. Posibilidad de separar en múltiples secciones
3. Complejidad técnica requerida
4. Impacto en performance
5. Mantenibilidad del código

Recomienda:
- Sección única vs múltiples secciones
- Estructura modular con snippets
- Priorización de features
- Fases de implementación
- Alternativas más simples
```

## 📋 Checklist de Análisis

### Al Analizar Contenido Visual
- [ ] Identifiqué el elemento visual dominante
- [ ] Determiné el propósito funcional principal
- [ ] Evalué el nivel de interactividad necesario
- [ ] Consideré la ubicación típica en página web
- [ ] Analicé requerimientos responsive
- [ ] Estimé complejidad de implementación

### Al Hacer Recomendación
- [ ] Especifiqué tipo de sección exacto
- [ ] Sugerí nombre de archivo descriptivo
- [ ] Listé bloques principales necesarios
- [ ] Identifiqué configuraciones schema críticas
- [ ] Mencioné consideraciones técnicas importantes
- [ ] Proporcioné alternativas si es relevante

## 🎨 Ejemplos Prácticos

### Ejemplo 1: Imagen de Hero con Video
**Análisis Visual:**
- Video de fondo en bucle
- Texto superpuesto centrado
- Botón CTA prominente
- Overlay oscuro sobre video

**Recomendación:**
```
SECCIÓN: Hero Video Banner
ARCHIVO: hero-video.liquid
BLOQUES: 
- video_background (settings: video_url, autoplay, loop)
- text_overlay (settings: title, subtitle, alignment)
- cta_button (settings: text, link, style)
- overlay_settings (settings: opacity, color)

SCHEMA CRÍTICO:
- Video URL (mp4 backup)
- Overlay opacity (0-100%)
- Mobile fallback image
- Autoplay toggle
- Text positioning controls
```

### Ejemplo 2: Grid de Productos con Filtros
**Análisis Visual:**
- 3-4 productos por fila
- Filtros laterales o superiores
- Quick view buttons
- Pagination inferior

**Recomendación:**
```
SECCIÓN: Filterable Product Grid
ARCHIVO: product-grid-filterable.liquid
BLOQUES:
- filter_bar (settings: filter_types, layout, position)
- product_card (settings: image_ratio, info_display, hover_effects)
- pagination (settings: products_per_page, style, ajax_load)

SCHEMA CRÍTICO:
- Collection selector
- Products per row (desktop/tablet/mobile)
- Filter options toggle
- Quick view enable/disable
- Ajax loading toggle
```

## 🚀 Mejores Prácticas para Recomendaciones

### 1. **Ser Específico en la Recomendación**
- ✅ "Hero Video Banner con overlay text"
- ❌ "Sección hero"

### 2. **Considerar Context de Ubicación**
- Above the fold = Hero/Banner
- Middle page = Features/Testimonials
- Bottom page = Newsletter/Contact

### 3. **Evaluar Complejidad vs Beneficio**
- Funcionalidad simple = Implementación directa
- Funcionalidad compleja = Dividir en fases

### 4. **Pensar en Mantenimiento**
- ¿Será fácil de actualizar?
- ¿El cliente podrá manejarlo?
- ¿Es escalable?

### 5. **Considerar Performance**
- Imágenes pesadas = lazy loading
- Videos = optimización necesaria
- Animaciones = CSS vs JavaScript
