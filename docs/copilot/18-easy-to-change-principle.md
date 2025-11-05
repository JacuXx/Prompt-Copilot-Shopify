# Principio "Easy to Change" en Shopify

## 🎯 REGLA FUNDAMENTAL: Todo Debe Ser Editable Desde el Customizer

### Principio Core
**NUNCA hardcodear textos, imágenes, colores o configuraciones en el código.**  
Todo contenido visible debe ser editable desde el Theme Customizer sin tocar código.

## ⛔ PROHIBIDO: Contenido Hardcodeado

### ❌ NUNCA hagas esto:
```liquid
<h2>Nuestros Productos Destacados</h2>

<p>Descubre nuestra colección exclusiva de productos premium</p>

<img src="banner-promo.jpg" alt="Promoción">

<div style="background-color: #FF5733;">
  <span style="color: white;">¡Oferta especial!</span>
</div>
```

### ✅ SIEMPRE haz esto:
```liquid
{% liquid
  assign section_heading = section.settings.heading
  assign section_description = section.settings.description
  assign banner_image = section.settings.banner_image
  assign background_color = section.settings.background_color
  assign text_color = section.settings.text_color
  assign promotion_text = section.settings.promotion_text
%}

{% if section_heading != blank %}
  <h2>{{ section_heading }}</h2>
{% endif %}

{% if section_description != blank %}
  <p>{{ section_description }}</p>
{% endif %}

{% if banner_image != blank %}
  <img src="{{ banner_image | image_url: width: 1200 }}" alt="{{ banner_image.alt }}">
{% endif %}

<div style="background-color: {{ background_color }};">
  {% if promotion_text != blank %}
    <span style="color: {{ text_color }};">{{ promotion_text }}</span>
  {% endif %}
</div>
```

## 📋 Checklist "Easy to Change"

### Antes de crear CUALQUIER sección o snippet:
- [ ] ¿Todos los textos son editables desde settings?
- [ ] ¿Todas las imágenes vienen de settings de imagen?
- [ ] ¿Los colores están en settings tipo color?
- [ ] ¿Los tamaños/espaciados están en settings tipo range?
- [ ] ¿Las opciones de mostrar/ocultar son checkboxes?
- [ ] ¿Los enlaces son editables (url + texto)?
- [ ] ¿Los iconos/SVG pueden cambiarse?
- [ ] ¿El contenido HTML rico usa richtext?

## 🎨 Tipos de Settings para Diferentes Contenidos

### 1. Textos Simples → `type: "text"`
```json
{
  "type": "text",
  "id": "heading",
  "label": "Título de la sección",
  "default": "Nuestros Productos"
}
```

### 2. Textos Largos → `type: "textarea"`
```json
{
  "type": "textarea",
  "id": "description",
  "label": "Descripción",
  "default": "Descubre nuestra colección exclusiva"
}
```

### 3. Contenido HTML Rico → `type: "richtext"`
```json
{
  "type": "richtext",
  "id": "content",
  "label": "Contenido de la sección",
  "default": "<p>Texto con <strong>negritas</strong> y <em>cursivas</em></p>"
}
```

### 4. Imágenes → `type: "image_picker"`
```json
{
  "type": "image_picker",
  "id": "banner_image",
  "label": "Imagen del banner"
}
```

### 5. Colores → `type: "color"`
```json
{
  "type": "color",
  "id": "background_color",
  "label": "Color de fondo",
  "default": "#ffffff"
}
```

### 6. Tamaños/Rangos → `type: "range"`
```json
{
  "type": "range",
  "id": "image_width",
  "label": "Ancho de imagen (%)",
  "min": 30,
  "max": 100,
  "step": 5,
  "unit": "%",
  "default": 100
}
```

### 7. Opciones de Selección → `type: "select"`
```json
{
  "type": "select",
  "id": "text_alignment",
  "label": "Alineación del texto",
  "options": [
    { "value": "left", "label": "Izquierda" },
    { "value": "center", "label": "Centro" },
    { "value": "right", "label": "Derecha" }
  ],
  "default": "center"
}
```

### 8. Mostrar/Ocultar → `type: "checkbox"`
```json
{
  "type": "checkbox",
  "id": "show_description",
  "label": "Mostrar descripción",
  "default": true
}
```

### 9. Enlaces → `type: "url"`
```json
{
  "type": "url",
  "id": "button_link",
  "label": "Enlace del botón"
}
```

### 10. Productos → `type: "product"`
```json
{
  "type": "product",
  "id": "featured_product",
  "label": "Producto destacado"
}
```

### 11. Colecciones → `type: "collection"`
```json
{
  "type": "collection",
  "id": "featured_collection",
  "label": "Colección destacada"
}
```

## 🏗️ Ejemplo Completo: Sección "Easy to Change"

```liquid
{% liquid
  assign heading = section.settings.heading
  assign subheading = section.settings.subheading
  assign description = section.settings.description
  assign show_button = section.settings.show_button
  assign button_text = section.settings.button_text
  assign button_link = section.settings.button_link
  assign background_color = section.settings.background_color
  assign text_color = section.settings.text_color
  assign heading_size = section.settings.heading_size
  assign content_alignment = section.settings.content_alignment
  assign section_spacing = section.settings.section_spacing
  assign image = section.settings.image
  assign image_position = section.settings.image_position
%}

<section 
  class="custom-section custom-section--spacing-{{ section_spacing }}" 
  style="background-color: {{ background_color }}; color: {{ text_color }};"
>
  <div class="custom-section__container">
    <div class="custom-section__content custom-section__content--align-{{ content_alignment }}">
      {% if heading != blank %}
        <h2 class="custom-section__heading custom-section__heading--size-{{ heading_size }}">
          {{ heading }}
        </h2>
      {% endif %}
      
      {% if subheading != blank %}
        <p class="custom-section__subheading">{{ subheading }}</p>
      {% endif %}
      
      {% if description != blank %}
        <div class="custom-section__description">
          {{ description }}
        </div>
      {% endif %}
      
      {% if show_button and button_text != blank %}
        <a href="{{ button_link }}" class="custom-section__button">
          {{ button_text }}
        </a>
      {% endif %}
    </div>
    
    {% if image != blank %}
      <div class="custom-section__image custom-section__image--{{ image_position }}">
        <img 
          src="{{ image | image_url: width: 800 }}" 
          alt="{{ image.alt | escape }}"
          loading="lazy"
        >
      </div>
    {% endif %}
  </div>
</section>

<style>
  .custom-section--spacing-small { padding: 20px 0; }
  .custom-section--spacing-medium { padding: 40px 0; }
  .custom-section--spacing-large { padding: 60px 0; }
  
  .custom-section__content--align-left { text-align: left; }
  .custom-section__content--align-center { text-align: center; }
  .custom-section__content--align-right { text-align: right; }
  
  .custom-section__heading--size-small { font-size: 24px; }
  .custom-section__heading--size-medium { font-size: 32px; }
  .custom-section__heading--size-large { font-size: 48px; }
  
  .custom-section__image--left { order: -1; }
  .custom-section__image--right { order: 1; }
</style>

{% schema %}
{
  "name": "Sección Personalizable",
  "settings": [
    {
      "type": "header",
      "content": "Contenido"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Título principal",
      "default": "Bienvenido a nuestra tienda"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subtítulo"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Descripción",
      "default": "<p>Descubre nuestra colección exclusiva</p>"
    },
    {
      "type": "header",
      "content": "Botón"
    },
    {
      "type": "checkbox",
      "id": "show_button",
      "label": "Mostrar botón",
      "default": true
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Texto del botón",
      "default": "Ver productos"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Enlace del botón"
    },
    {
      "type": "header",
      "content": "Imagen"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Imagen de la sección"
    },
    {
      "type": "select",
      "id": "image_position",
      "label": "Posición de la imagen",
      "options": [
        { "value": "left", "label": "Izquierda" },
        { "value": "right", "label": "Derecha" }
      ],
      "default": "right"
    },
    {
      "type": "header",
      "content": "Diseño"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Color de fondo",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Color del texto",
      "default": "#000000"
    },
    {
      "type": "select",
      "id": "heading_size",
      "label": "Tamaño del título",
      "options": [
        { "value": "small", "label": "Pequeño" },
        { "value": "medium", "label": "Mediano" },
        { "value": "large", "label": "Grande" }
      ],
      "default": "medium"
    },
    {
      "type": "select",
      "id": "content_alignment",
      "label": "Alineación del contenido",
      "options": [
        { "value": "left", "label": "Izquierda" },
        { "value": "center", "label": "Centro" },
        { "value": "right", "label": "Derecha" }
      ],
      "default": "center"
    },
    {
      "type": "select",
      "id": "section_spacing",
      "label": "Espaciado de sección",
      "options": [
        { "value": "small", "label": "Pequeño" },
        { "value": "medium", "label": "Mediano" },
        { "value": "large", "label": "Grande" }
      ],
      "default": "medium"
    }
  ],
  "presets": [
    {
      "name": "Sección Personalizable"
    }
  ]
}
{% endschema %}
```

## 🎨 Casos Especiales: Contenido Complejo

### Bloques Repetibles para Listas Editables
```liquid
{% for block in section.blocks %}
  {% liquid
    assign block_icon = block.settings.icon
    assign block_title = block.settings.title
    assign block_description = block.settings.description
  %}
  
  <div class="feature-item">
    {% if block_icon != blank %}
      <img src="{{ block_icon | image_url: width: 80 }}" alt="{{ block_title }}">
    {% endif %}
    
    {% if block_title != blank %}
      <h3>{{ block_title }}</h3>
    {% endif %}
    
    {% if block_description != blank %}
      <p>{{ block_description }}</p>
    {% endif %}
  </div>
{% endfor %}
```

```json
{
  "blocks": [
    {
      "type": "feature",
      "name": "Característica",
      "settings": [
        {
          "type": "image_picker",
          "id": "icon",
          "label": "Icono"
        },
        {
          "type": "text",
          "id": "title",
          "label": "Título",
          "default": "Característica"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Descripción"
        }
      ]
    }
  ]
}
```

### Contenido Condicional Completamente Editable
```liquid
{% liquid
  assign show_promo_banner = section.settings.show_promo_banner
  assign promo_text = section.settings.promo_text
  assign promo_background = section.settings.promo_background
  assign promo_text_color = section.settings.promo_text_color
  assign show_countdown = section.settings.show_countdown
  assign countdown_date = section.settings.countdown_date
%}

{% if show_promo_banner %}
  <div class="promo-banner" style="background-color: {{ promo_background }}; color: {{ promo_text_color }};">
    {% if promo_text != blank %}
      <p>{{ promo_text }}</p>
    {% endif %}
    
    {% if show_countdown and countdown_date != blank %}
      <div class="countdown" data-date="{{ countdown_date }}"></div>
    {% endif %}
  </div>
{% endif %}
```

## 🔧 Settings Avanzados

### Configuración de Tipografía
```json
{
  "type": "font_picker",
  "id": "heading_font",
  "label": "Fuente de títulos",
  "default": "assistant_n4"
}
```

### Video de Fondo
```json
{
  "type": "video",
  "id": "background_video",
  "label": "Video de fondo"
}
```

### Artículos del Blog
```json
{
  "type": "blog",
  "id": "featured_blog",
  "label": "Blog destacado"
}
```

### Páginas
```json
{
  "type": "page",
  "id": "custom_page",
  "label": "Página personalizada"
}
```

## 📱 Configuraciones Responsive Editables

```liquid
{% liquid
  assign mobile_image = section.settings.mobile_image
  assign desktop_image = section.settings.desktop_image
  assign mobile_text_size = section.settings.mobile_text_size
  assign desktop_text_size = section.settings.desktop_text_size
%}

<picture class="responsive-image">
  {% if mobile_image != blank %}
    <source media="(max-width: 767px)" srcset="{{ mobile_image | image_url: width: 800 }}">
  {% endif %}
  
  {% if desktop_image != blank %}
    <source media="(min-width: 768px)" srcset="{{ desktop_image | image_url: width: 1600 }}">
    <img src="{{ desktop_image | image_url: width: 1600 }}" alt="{{ desktop_image.alt }}">
  {% endif %}
</picture>

<style>
  @media screen and (max-width: 767px) {
    .responsive-text {
      font-size: {{ mobile_text_size }}px;
    }
  }
  
  @media screen and (min-width: 768px) {
    .responsive-text {
      font-size: {{ desktop_text_size }}px;
    }
  }
</style>
```

```json
{
  "settings": [
    {
      "type": "header",
      "content": "Imágenes Responsive"
    },
    {
      "type": "image_picker",
      "id": "mobile_image",
      "label": "Imagen para móvil"
    },
    {
      "type": "image_picker",
      "id": "desktop_image",
      "label": "Imagen para escritorio"
    },
    {
      "type": "header",
      "content": "Tamaños de Texto"
    },
    {
      "type": "range",
      "id": "mobile_text_size",
      "label": "Tamaño de texto móvil",
      "min": 14,
      "max": 24,
      "step": 1,
      "unit": "px",
      "default": 16
    },
    {
      "type": "range",
      "id": "desktop_text_size",
      "label": "Tamaño de texto escritorio",
      "min": 16,
      "max": 32,
      "step": 1,
      "unit": "px",
      "default": 20
    }
  ]
}
```

## ✅ Validación "Easy to Change"

### Antes de entregar una sección, verifica:

1. **Textos**
   - [ ] Todos los títulos son editables
   - [ ] Todas las descripciones son editables
   - [ ] Textos de botones son editables
   - [ ] Textos de badges/etiquetas son editables

2. **Imágenes**
   - [ ] Todas las imágenes vienen de image_picker
   - [ ] Los alt text están disponibles
   - [ ] Hay opciones responsive cuando sea necesario

3. **Colores**
   - [ ] Colores de fondo editables
   - [ ] Colores de texto editables
   - [ ] Colores de botones editables
   - [ ] Colores de overlays editables

4. **Layout**
   - [ ] Espaciados son configurables
   - [ ] Alineaciones son seleccionables
   - [ ] Tamaños son ajustables con range
   - [ ] Posiciones son seleccionables

5. **Funcionalidad**
   - [ ] Opciones de mostrar/ocultar disponibles
   - [ ] Enlaces son editables
   - [ ] Opciones de estilo son seleccionables
   - [ ] Comportamientos son configurables

## 🎯 Patrones Comunes

### Patrón: Hero Banner Editable
```json
{
  "settings": [
    {
      "type": "text",
      "id": "headline",
      "label": "Título principal",
      "default": "Bienvenido"
    },
    {
      "type": "textarea",
      "id": "subheadline",
      "label": "Subtítulo"
    },
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Imagen de fondo"
    },
    {
      "type": "range",
      "id": "overlay_opacity",
      "label": "Opacidad del overlay",
      "min": 0,
      "max": 100,
      "step": 10,
      "unit": "%",
      "default": 30
    },
    {
      "type": "color",
      "id": "overlay_color",
      "label": "Color del overlay",
      "default": "#000000"
    },
    {
      "type": "select",
      "id": "content_position",
      "label": "Posición del contenido",
      "options": [
        { "value": "top-left", "label": "Superior Izquierda" },
        { "value": "top-center", "label": "Superior Centro" },
        { "value": "center", "label": "Centro" },
        { "value": "bottom-center", "label": "Inferior Centro" }
      ],
      "default": "center"
    }
  ]
}
```

### Patrón: Grid de Productos Configurable
```json
{
  "settings": [
    {
      "type": "collection",
      "id": "collection",
      "label": "Colección a mostrar"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "label": "Productos a mostrar",
      "min": 2,
      "max": 12,
      "step": 1,
      "default": 4
    },
    {
      "type": "range",
      "id": "columns_desktop",
      "label": "Columnas en escritorio",
      "min": 2,
      "max": 5,
      "step": 1,
      "default": 4
    },
    {
      "type": "range",
      "id": "columns_mobile",
      "label": "Columnas en móvil",
      "min": 1,
      "max": 2,
      "step": 1,
      "default": 1
    },
    {
      "type": "checkbox",
      "id": "show_vendor",
      "label": "Mostrar marca",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "show_description",
      "label": "Mostrar descripción",
      "default": true
    }
  ]
}
```

## 🚀 Resumen de Reglas

1. **NUNCA hardcodear contenido** → Siempre usar settings
2. **Todo texto debe ser editable** → text, textarea o richtext
3. **Toda imagen debe ser configurable** → image_picker
4. **Todos los colores deben ser ajustables** → color
5. **Opciones de diseño deben ser seleccionables** → select, range, checkbox
6. **Usar valores por defecto sensatos** → default en todos los settings
7. **Agrupar settings relacionados** → usar headers para organizar
8. **Dar nombres descriptivos** → labels claros y en español
9. **Proveer opciones útiles** → opciones que realmente se usen
10. **Pensar en el usuario final** → ¿puede editarlo sin código?

## 💡 Prompt Ejemplo para Crear Secciones

```
Crea una sección de [descripción] siguiendo el principio Easy to Change:
- Todos los textos editables desde el customizer
- Todas las imágenes configurables
- Colores personalizables
- Opciones de layout seleccionables
- Sin contenido hardcodeado
- Valores por defecto apropiados
- Settings organizados con headers
```

**El objetivo final: Un cliente sin conocimientos técnicos puede personalizar completamente la tienda desde el Theme Customizer.**
