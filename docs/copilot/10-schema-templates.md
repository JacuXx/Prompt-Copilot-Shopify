# Schema Templates y Configuraciones

## 🎛️ Templates de Schema Avanzados

### Schema Base Completo

```json
{
  "name": "Mi Sección",
  "tag": "section",
  "class": "custom-section",
  "settings": [
    {
      "type": "header",
      "content": "📝 Contenido"
    },
    {
      "type": "text",
      "id": "section_id",
      "label": "ID Personalizado"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Título"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Descripción"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Imagen"
    },
    {
      "type": "text",
      "id": "image_alt",
      "label": "Alt Text"
    },
    
    {
      "type": "header",
      "content": "🎨 Estilos"
    },
    {
      "type": "select",
      "id": "layout_style",
      "label": "Layout",
      "options": [
        { "value": "default", "label": "Por defecto" },
        { "value": "centered", "label": "Centrado" },
        { "value": "split", "label": "Dividido" },
        { "value": "overlay", "label": "Superpuesto" }
      ]
    },
    {
      "type": "select",
      "id": "color_scheme",
      "label": "Esquema Color",
      "options": [
        { "value": "primary", "label": "Primario" },
        { "value": "secondary", "label": "Secundario" },
        { "value": "accent", "label": "Acento" },
        { "value": "neutral", "label": "Neutral" },
        { "value": "custom", "label": "Personalizado" }
      ]
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Color Fondo"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Color Texto"
    },
    
    {
      "type": "header",
      "content": "📐 Espaciado"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 120,
      "step": 4,
      "unit": "px",
      "label": "Espaciado Superior",
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 120,
      "step": 4,
      "unit": "px",
      "label": "Espaciado Inferior",
      "default": 40
    },
    {
      "type": "range",
      "id": "container_width",
      "min": 1000,
      "max": 1400,
      "step": 50,
      "unit": "px",
      "label": "Ancho Máximo",
      "default": 1200
    },
    
    {
      "type": "header",
      "content": "📱 Responsive"
    },
    {
      "type": "range",
      "id": "columns_desktop",
      "min": 1,
      "max": 6,
      "step": 1,
      "label": "Columnas Desktop",
      "default": 4
    },
    {
      "type": "range",
      "id": "columns_tablet",
      "min": 1,
      "max": 4,
      "step": 1,
      "label": "Columnas Tablet",
      "default": 3
    },
    {
      "type": "range",
      "id": "columns_mobile",
      "min": 1,
      "max": 2,
      "step": 1,
      "label": "Columnas Móvil",
      "default": 1
    },
    
    {
      "type": "header",
      "content": "⚙️ Configuración"
    },
    {
      "type": "checkbox",
      "id": "enable_lazy_loading",
      "label": "Lazy Loading",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "enable_animations",
      "label": "Animaciones",
      "default": true
    },
    {
      "type": "select",
      "id": "animation_speed",
      "label": "Velocidad Animación",
      "options": [
        { "value": "slow", "label": "Lenta" },
        { "value": "normal", "label": "Normal" },
        { "value": "fast", "label": "Rápida" }
      ]
    }
  ],
  "blocks": [
    {
      "type": "item",
      "name": "Elemento",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Título"
        },
        {
          "type": "richtext",
          "id": "content",
          "label": "Contenido"
        },
        {
          "type": "image_picker",
          "id": "image",
          "label": "Imagen"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Enlace"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Sección Base",
      "blocks": [
        {
          "type": "item"
        },
        {
          "type": "item"
        }
      ]
    }
  ]
}
```

## 🎨 Schema Templates Específicos

### Template para Botones

```json
{
  "type": "header",
  "content": "🔘 Botón"
},
{
  "type": "text",
  "id": "button_text",
  "label": "Texto Botón"
},
{
  "type": "url",
  "id": "button_link",
  "label": "Enlace"
},
{
  "type": "select",
  "id": "button_style",
  "label": "Estilo",
  "options": [
    { "value": "primary", "label": "Primario" },
    { "value": "secondary", "label": "Secundario" },
    { "value": "outline", "label": "Contorno" },
    { "value": "text", "label": "Solo texto" },
    { "value": "link", "label": "Enlace" }
  ]
},
{
  "type": "select",
  "id": "button_size",
  "label": "Tamaño",
  "options": [
    { "value": "small", "label": "Pequeño" },
    { "value": "medium", "label": "Mediano" },
    { "value": "large", "label": "Grande" },
    { "value": "full", "label": "Completo" }
  ]
},
{
  "type": "color",
  "id": "button_bg_color",
  "label": "Color Fondo"
},
{
  "type": "color",
  "id": "button_text_color",
  "label": "Color Texto"
},
{
  "type": "color",
  "id": "button_border_color",
  "label": "Color Borde"
},
{
  "type": "range",
  "id": "button_border_radius",
  "min": 0,
  "max": 50,
  "step": 1,
  "unit": "px",
  "label": "Radio Borde",
  "default": 4
},
{
  "type": "checkbox",
  "id": "button_hover_effect",
  "label": "Efecto Hover",
  "default": true
}
```

### Template para Tipografía

```json
{
  "type": "header",
  "content": "✏️ Tipografía"
},
{
  "type": "select",
  "id": "heading_size",
  "label": "Tamaño Título",
  "options": [
    { "value": "h1", "label": "H1" },
    { "value": "h2", "label": "H2" },
    { "value": "h3", "label": "H3" },
    { "value": "h4", "label": "H4" }
  ]
},
{
  "type": "select",
  "id": "text_alignment",
  "label": "Alineación",
  "options": [
    { "value": "left", "label": "Izquierda" },
    { "value": "center", "label": "Centro" },
    { "value": "right", "label": "Derecha" },
    { "value": "justify", "label": "Justificado" }
  ]
},
{
  "type": "checkbox",
  "id": "heading_bold",
  "label": "Título Negrita",
  "default": true
},
{
  "type": "checkbox",
  "id": "text_uppercase",
  "label": "Mayúsculas"
},
{
  "type": "range",
  "id": "letter_spacing",
  "min": -2,
  "max": 5,
  "step": 0.5,
  "unit": "px",
  "label": "Espaciado Letras"
}
```

### Template para Carruseles

```json
{
  "type": "header",
  "content": "🎠 Carrusel"
},
{
  "type": "checkbox",
  "id": "enable_carousel",
  "label": "Habilitar Carrusel",
  "default": true
},
{
  "type": "checkbox",
  "id": "autoplay",
  "label": "Autoplay"
},
{
  "type": "range",
  "id": "autoplay_speed",
  "min": 2,
  "max": 10,
  "step": 1,
  "unit": "s",
  "label": "Velocidad Autoplay",
  "default": 5
},
{
  "type": "checkbox",
  "id": "show_arrows",
  "label": "Mostrar Flechas",
  "default": true
},
{
  "type": "checkbox",
  "id": "show_dots",
  "label": "Mostrar Dots",
  "default": true
},
{
  "type": "checkbox",
  "id": "infinite_loop",
  "label": "Loop Infinito",
  "default": true
},
{
  "type": "select",
  "id": "transition_effect",
  "label": "Efecto",
  "options": [
    { "value": "slide", "label": "Deslizar" },
    { "value": "fade", "label": "Desvanecer" },
    { "value": "cube", "label": "Cubo" },
    { "value": "flip", "label": "Voltear" }
  ]
}
```

## 🔧 Patrones de Schema Avanzados

### Conditional Settings

```json
{
  "type": "checkbox",
  "id": "enable_custom_colors",
  "label": "Colores Personalizados"
},
{
  "type": "color",
  "id": "custom_bg_color",
  "label": "Color Fondo Custom"
},
{
  "type": "color",
  "id": "custom_text_color",
  "label": "Color Texto Custom"
}
```

### Liquid para Conditional Settings

```liquid
{% if section.settings.enable_custom_colors %}
  {% assign bg_color = section.settings.custom_bg_color | default: '#ffffff' %}
  {% assign text_color = section.settings.custom_text_color | default: '#000000' %}
{% else %}
  {% assign bg_color = settings.colors_background | default: '#ffffff' %}
  {% assign text_color = settings.colors_text | default: '#000000' %}
{% endif %}
```

### Settings Groups

```json
{
  "type": "header",
  "content": "🎨 Colores"
},
{
  "type": "color",
  "id": "primary_color",
  "label": "Primario"
},
{
  "type": "color",
  "id": "secondary_color",
  "label": "Secundario"
},
{
  "type": "header",
  "content": "🎨 Estados"
},
{
  "type": "color",
  "id": "hover_color",
  "label": "Hover"
},
{
  "type": "color",
  "id": "active_color",
  "label": "Activo"
}
```

## 📋 Schema Validation y Best Practices

### Validaciones Recomendadas

```json
{
  "type": "range",
  "id": "items_per_row",
  "min": 1,
  "max": 6,
  "step": 1,
  "label": "Items por Fila",
  "default": 3
},
{
  "type": "text",
  "id": "custom_css_class",
  "label": "Clase CSS",
  "placeholder": "mi-clase"
},
{
  "type": "textarea",
  "id": "custom_css",
  "label": "CSS Custom",
  "placeholder": ".mi-clase { color: red; }"
}
```

### Mejores Prácticas de Schema

#### ✅ Hacer
- **Nombres cortos**: "Título" en lugar de "Título de la sección"
- **Headers concisos**: "🎨 Estilos" en lugar de "🎨 Configuración de Estilos"
- **Defaults solo importantes**: Solo en ranges, checkboxes críticos
- **Sin defaults vacíos**: No usar `default: ""` o `default: "#"`

#### ❌ Evitar
- Nombres largos y descriptivos en exceso
- Info texts en todos los campos
- Defaults en colores sin valor específico
- Defaults en texto que deberían estar vacíos

### Templates Optimizados

#### Schema Mínimo Efectivo
```json
{
  "name": "Mi Sección",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Título"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Fondo"
    },
    {
      "type": "range",
      "id": "padding",
      "min": 0,
      "max": 100,
      "step": 5,
      "label": "Espaciado",
      "default": 40
    }
  ]
}
```
```

### Defaults Inteligentes

```liquid
{% comment %} Defaults usando fallbacks {% endcomment %}
{% assign section_bg = section.settings.background_color | default: settings.colors_background | default: '#ffffff' %}
{% assign section_text = section.settings.text_color | default: settings.colors_text | default: '#000000' %}
{% assign items_per_row = section.settings.items_per_row | default: 3 %}
{% assign mobile_items = items_per_row | at_most: 2 %}
{% assign tablet_items = items_per_row | at_most: 3 %}

{% comment %} Validación de strings vacíos {% endcomment %}
{% assign section_title = section.settings.title %}
{% if section_title == blank %}
  {% assign section_title = 'Título por defecto' %}
{% endif %}

{% comment %} Manejo de booleanos {% endcomment %}
{% assign show_arrows = section.settings.show_arrows | default: true %}
{% assign enable_autoplay = section.settings.autoplay | default: false %}
```

## 🎯 Reglas de Oro para Schemas

1. **Nombres cortos** - Máximo 2-3 palabras
2. **Headers con emojis** - Fácil identificación visual  
3. **Defaults solo necesarios** - Range, checkbox críticos
4. **Sin defaults vacíos** - Dejar campos text, color sin default
5. **Fallbacks en Liquid** - Usar `| default:` para manejar valores vacíos
6. **Validación en código** - No en schema con info extensos
