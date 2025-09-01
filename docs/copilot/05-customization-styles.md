# Guía de Personalización y Estilos

## 🚨 CRÍTICO: Verificación de CSS Antes de Personalizar

### ⚠️ ANTES de implementar cualquier configuración de estilo:

#### 1. **Revisar CSS Existente OBLIGATORIAMENTE**
```liquid
{% comment %}
VERIFICACIÓN CRÍTICA:
- ¿Existe CSS actual para este elemento en el archivo?
- ¿Hay estilos en assets/theme.css que afecten este componente?
- ¿Existen reglas con !important que bloqueen nuevos estilos?
- ¿Las configuraciones de schema funcionarán con CSS existente?
{% endcomment %}
```

#### 2. **Problema Común: Configuraciones que No Funcionan**
```css
/* EJEMPLO: Si existe esto en el tema */
.section-title h2 {
  font-size: 18px !important;
  color: #333 !important;
}

/* Tus configuraciones de schema NO funcionarán */
.custom-title {
  font-size: {{ section.settings.title_size }}px; /* Ignorado */
  color: {{ section.settings.title_color }};     /* Ignorado */
}

/* SOLUCIÓN: Usar especificidad mayor */
.custom-section .section-title h2 {
  font-size: {{ section.settings.title_size }}px !important;
  color: {{ section.settings.title_color }} !important;
}
```

#### 3. **Template de Verificación CSS**
```
ANTES de agregar configuraciones de [estilo específico], verificar:
1. ¿Existen reglas CSS actuales para [selector]?
2. ¿Hay !important declarations que bloqueen personalizaciones?
3. ¿El CSS generado tendrá suficiente especificidad?
4. Si hay conflictos, usar selectores más específicos o !important.
```

## Personalización Completa

### Principio Fundamental
- **TODO** debe ser personalizable a través del schema
- Textos, imágenes, colores, estilos de botones, bordes, etc.
- Crear opciones organizadas y lógicas para el usuario

### Schema Completo de Personalización

```json
{
  "name": "Sección Personalizable",
  "settings": [
    {
      "type": "header",
      "content": "Contenido"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Título",
      "default": "Título de ejemplo"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Descripción"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Imagen principal"
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Texto del botón",
      "default": "Ver más"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Enlace del botón"
    },
    
    {
      "type": "header",
      "content": "Estilo del Título"
    },
    {
      "type": "color",
      "id": "title_color",
      "label": "Color del título",
      "default": "#000000"
    },
    {
      "type": "select",
      "id": "title_size",
      "label": "Tamaño del título",
      "options": [
        { "value": "small", "label": "Pequeño" },
        { "value": "medium", "label": "Mediano" },
        { "value": "large", "label": "Grande" },
        { "value": "xlarge", "label": "Extra Grande" }
      ],
      "default": "medium"
    },
    {
      "type": "checkbox",
      "id": "title_bold",
      "label": "Título en negrita",
      "default": true
    },
    {
      "type": "select",
      "id": "title_alignment",
      "label": "Alineación del título",
      "options": [
        { "value": "left", "label": "Izquierda" },
        { "value": "center", "label": "Centro" },
        { "value": "right", "label": "Derecha" }
      ],
      "default": "center"
    },
    
    {
      "type": "header",
      "content": "Estilo del Texto"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Color del texto",
      "default": "#666666"
    },
    {
      "type": "select",
      "id": "text_size",
      "label": "Tamaño del texto",
      "options": [
        { "value": "small", "label": "Pequeño" },
        { "value": "medium", "label": "Mediano" },
        { "value": "large", "label": "Grande" }
      ],
      "default": "medium"
    },
    
    {
      "type": "header",
      "content": "Estilo del Botón"
    },
    {
      "type": "select",
      "id": "button_style",
      "label": "Estilo del botón",
      "options": [
        { "value": "primary", "label": "Primario" },
        { "value": "secondary", "label": "Secundario" },
        { "value": "outline", "label": "Contorno" },
        { "value": "link", "label": "Enlace" }
      ],
      "default": "primary"
    },
    {
      "type": "color",
      "id": "button_bg_color",
      "label": "Color de fondo del botón",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "button_text_color",
      "label": "Color del texto del botón",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "button_border_color",
      "label": "Color del borde del botón",
      "default": "#000000"
    },
    {
      "type": "range",
      "id": "button_border_width",
      "min": 0,
      "max": 5,
      "step": 1,
      "unit": "px",
      "label": "Grosor del borde",
      "default": 1
    },
    {
      "type": "range",
      "id": "button_border_radius",
      "min": 0,
      "max": 50,
      "step": 1,
      "unit": "px",
      "label": "Radio del borde",
      "default": 4
    },
    {
      "type": "select",
      "id": "button_size",
      "label": "Tamaño del botón",
      "options": [
        { "value": "small", "label": "Pequeño" },
        { "value": "medium", "label": "Mediano" },
        { "value": "large", "label": "Grande" }
      ],
      "default": "medium"
    },
    
    {
      "type": "header",
      "content": "Espaciado y Layout"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Espaciado superior",
      "default": 40
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Espaciado inferior",
      "default": 40
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Color de fondo",
      "default": "#ffffff"
    },
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Imagen de fondo"
    }
  ]
}
```

## 🔍 Ejemplo Práctico: Configuración de Tamaño de Texto

### ❌ Problema Común: La Configuración No Funciona

```liquid
<!-- Schema configurado correctamente -->
{
  "type": "select",
  "id": "title_size",
  "label": "Tamaño del título",
  "options": [
    { "value": "small", "label": "Pequeño" },
    { "value": "large", "label": "Grande" }
  ]
}

<!-- CSS que NO funciona por conflicto existente -->
<style>
.custom-title {
  font-size: {% if section.settings.title_size == 'large' %}32px{% else %}16px{% endif %};
}
</style>

<!-- PERO el título sigue igual porque existe esto en el tema: -->
<!-- En assets/theme.css -->
.section h2 { font-size: 18px !important; }
```

### ✅ Solución: Verificar y Sobrescribir CSS Existente

```liquid
<!-- PASO 1: Verificar CSS existente ANTES de crear configuración -->
{% comment %}
VERIFICACIÓN REALIZADA:
- Encontrado en theme.css: .section h2 { font-size: 18px !important; }
- Necesito usar especificidad mayor para sobrescribir
{% endcomment %}

<!-- PASO 2: CSS con especificidad adecuada -->
<style>
.custom-section .custom-title {
  font-size: {% if section.settings.title_size == 'large' %}32px{% else %}16px{% endif %} !important;
}

/* O usar selector aún más específico */
#shopify-section-{{ section.id }} .custom-title {
  font-size: {% if section.settings.title_size == 'large' %}32px{% else %}16px{% endif %} !important;
}
</style>
```

### 📋 Checklist para Configuraciones de Estilo

#### Antes de Crear la Configuración
- [ ] Busqué estilos existentes para este elemento en el archivo actual
- [ ] Revisé assets/theme.css para reglas que afecten este elemento
- [ ] Identifiqué si hay `!important` declarations existentes
- [ ] Verifiqué la especificidad necesaria para sobrescribir

#### Al Implementar la Configuración
- [ ] Uso selectores con especificidad suficiente
- [ ] Agrego `!important` cuando sea necesario para conflictos
- [ ] Pruebo que la configuración realmente cambie el elemento
- [ ] Verifico que funcione en responsive (mobile, tablet, desktop)

### CSS Responsivo Completo

```css
.custom-section {
  padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;
  background-color: {{ section.settings.background_color }};
  {% if section.settings.background_image %}
    background-image: url('{{ section.settings.background_image | img_url: '1920x' }}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  {% endif %}
}

.custom-section__title {
  color: {{ section.settings.title_color }};
  text-align: {{ section.settings.title_alignment }};
  {% if section.settings.title_bold %}font-weight: bold;{% endif %}
  margin-bottom: 20px;
}

.custom-section__title--small { font-size: 24px; line-height: 1.2; }
.custom-section__title--medium { font-size: 32px; line-height: 1.2; }
.custom-section__title--large { font-size: 40px; line-height: 1.1; }
.custom-section__title--xlarge { font-size: 48px; line-height: 1.1; }

.custom-section__text {
  color: {{ section.settings.text_color }};
  margin-bottom: 30px;
}

.custom-section__text--small { font-size: 14px; line-height: 1.5; }
.custom-section__text--medium { font-size: 16px; line-height: 1.6; }
.custom-section__text--large { font-size: 18px; line-height: 1.6; }

.custom-section__button {
  display: inline-block;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  cursor: pointer;
  border: {{ section.settings.button_border_width }}px solid {{ section.settings.button_border_color }};
  border-radius: {{ section.settings.button_border_radius }}px;
  background-color: {{ section.settings.button_bg_color }};
  color: {{ section.settings.button_text_color }};
}

.custom-section__button--small {
  padding: 8px 16px;
  font-size: 14px;
}

.custom-section__button--medium {
  padding: 12px 24px;
  font-size: 16px;
}

.custom-section__button--large {
  padding: 16px 32px;
  font-size: 18px;
}

.custom-section__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Media Queries Globales */

/* Desktop (1024px+) */
@media screen and (min-width: 1024px) {
  .custom-section {
    padding: {{ section.settings.padding_top | times: 1.2 }}px 0 {{ section.settings.padding_bottom | times: 1.2 }}px;
  }
  
  .custom-section__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

/* Tablet (768px - 1023px) */
@media screen and (max-width: 1023px) and (min-width: 768px) {
  .custom-section__title--xlarge { font-size: 36px; }
  .custom-section__title--large { font-size: 32px; }
  .custom-section__title--medium { font-size: 28px; }
  
  .custom-section__container {
    padding: 0 40px;
  }
}

/* Mobile (hasta 767px) */
@media screen and (max-width: 767px) {
  .custom-section {
    padding: {{ section.settings.padding_top | times: 0.7 }}px 0 {{ section.settings.padding_bottom | times: 0.7 }}px;
  }
  
  .custom-section__title {
    text-align: center;
  }
  
  .custom-section__title--xlarge { font-size: 28px; }
  .custom-section__title--large { font-size: 26px; }
  .custom-section__title--medium { font-size: 24px; }
  .custom-section__title--small { font-size: 20px; }
  
  .custom-section__text {
    text-align: center;
  }
  
  .custom-section__button {
    width: 100%;
    display: block;
  }
  
  .custom-section__container {
    padding: 0 20px;
  }
}
```

### Variables Liquid para Estilos

```liquid
{% assign title_class = 'custom-section__title custom-section__title--' | append: section.settings.title_size %}
{% assign text_class = 'custom-section__text custom-section__text--' | append: section.settings.text_size %}
{% assign button_class = 'custom-section__button custom-section__button--' | append: section.settings.button_size | append: ' custom-section__button--' | append: section.settings.button_style %}

<h2 class="{{ title_class }}">{{ section.settings.title }}</h2>
<div class="{{ text_class }}">{{ section.settings.description }}</div>
<a href="{{ section.settings.button_link }}" class="{{ button_class }}">
  {{ section.settings.button_text }}
</a>
```
