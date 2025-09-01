# 📊 SEO y Accesibilidad en Secciones de Shopify

## 🎯 Principios Fundamentales

### Jerarquía de Encabezados
La correcta estructura de encabezados es crucial para SEO y accesibilidad. Sigue estas reglas estrictas:

#### ❌ Errores Comunes
```liquid
<!-- NUNCA usar H1 en secciones -->
<h1>{{ section.settings.title }}</h1>

<!-- NUNCA saltar niveles de encabezado -->
<h2>Título Principal</h2>
<h4>Subtítulo</h4> <!-- Salta H3 -->
```

#### ✅ Estructura Correcta
```liquid
<!-- Título de sección siempre H2 -->
<h2 class="section-title">{{ section.settings.title }}</h2>

<!-- Productos renderizados siempre H3 -->
{% for product in collection.products %}
  <h3 class="product-title">{{ product.title }}</h3>
{% endfor %}

<!-- Subsecciones en H3, detalles en H4 -->
<h3 class="subsection-title">Características</h3>
<h4 class="feature-title">Detalle específico</h4>
```

## 🏗️ Reglas de Estructura HTML

### 1. Jerarquía de Encabezados Obligatoria

```liquid
{% comment %} === ESTRUCTURA SEO CORRECTA === {% endcomment %}

<!-- Título principal de la sección - SIEMPRE H2 -->
{% if section.settings.section_title != blank %}
  <h2 class="section-heading">{{ section.settings.section_title }}</h2>
{% endif %}

<!-- Subtítulos de categorías - H3 -->
{% if section.settings.category_title != blank %}
  <h3 class="category-heading">{{ section.settings.category_title }}</h3>
{% endif %}

<!-- Títulos de productos - SIEMPRE H3 -->
{% for product in section.settings.featured_products %}
  <article class="product-card">
    <h3 class="product-title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>
    <!-- Contenido del producto -->
  </article>
{% endfor %}

<!-- Detalles específicos - H4 -->
<h4 class="detail-heading">Especificaciones Técnicas</h4>
```

### 2. Énfasis de Texto Semántico

#### ✅ Uso Correcto de Énfasis
```liquid
<!-- Para importancia semántica usar STRONG -->
<p>Este producto tiene <strong>garantía de por vida</strong> incluida.</p>

<!-- Para énfasis visual usar SPAN con clases -->
<p>Disponible en <span class="text-highlight">colores exclusivos</span>.</p>

<!-- Para texto destacado usar MARK -->
<p>Oferta especial: <mark>50% de descuento</mark> esta semana.</p>

<!-- Para texto enfatizado usar EM -->
<p>Perfecto para <em>uso profesional</em> y personal.</p>
```

#### ❌ Evitar Estas Prácticas
```liquid
<!-- NO usar div para énfasis -->
<div class="bold-text">Texto importante</div>

<!-- NO usar styling inline -->
<span style="font-weight: bold;">Texto</span>

<!-- NO usar h tags para styling -->
<h3 class="small-text">Texto que no es encabezado</h3>
```

### 3. Textos Siempre Editables

#### ✅ Schema con Textarea para HTML
```json
{
  "type": "richtext",
  "id": "section_description",
  "label": "Descripción de la Sección",
  "info": "Puedes usar HTML: <strong>, <em>, <a>, <br>"
},
{
  "type": "richtext", 
  "id": "product_description",
  "label": "Descripción del Producto",
  "info": "Acepta HTML para formato personalizado"
},
{
  "type": "textarea",
  "id": "custom_html",
  "label": "HTML Personalizado",
  "info": "Código HTML avanzado para personalización completa"
}
```

#### ✅ Implementación en Liquid
```liquid
<!-- Usar richtext para contenido editable -->
{% if section.settings.section_description != blank %}
  <div class="section-description">
    {{ section.settings.section_description }}
  </div>
{% endif %}

<!-- Textarea para HTML personalizado -->
{% if section.settings.custom_html != blank %}
  <div class="custom-content">
    {{ section.settings.custom_html }}
  </div>
{% endif %}

<!-- Siempre permitir HTML en descripciones de productos -->
{% for product in section.settings.products %}
  <div class="product-item">
    <h3 class="product-title">{{ product.title }}</h3>
    {% if product.description != blank %}
      <div class="product-description">
        {{ product.description | truncatewords: 50 }}
      </div>
    {% endif %}
  </div>
{% endfor %}
```

## 🚫 Prohibiciones Estrictas de SEO

### 1. Sin Texto Oculto o Invisible

#### ❌ NUNCA Hacer Esto
```liquid
<!-- Texto oculto - PENALIZACIÓN SEO -->
<div style="display: none;">Palabras clave spam</div>
<span style="color: transparent;">Texto invisible</span>
<p style="font-size: 0;">Contenido oculto</p>
<div class="sr-only">Texto solo para lectores</div> <!-- Solo si es para accesibilidad -->

<!-- Texto blanco sobre fondo blanco -->
<span style="color: white; background: white;">Texto invisible</span>
```

#### ✅ Alternativas Correctas
```liquid
<!-- Para contenido auxiliar usar atributos semánticos -->
<img src="product.jpg" alt="Descripción completa del producto">

<!-- Para información adicional usar elementos colapsables -->
<details class="product-specs">
  <summary>Ver especificaciones técnicas</summary>
  <div class="specs-content">
    {{ product.metafields.specs.details }}
  </div>
</details>

<!-- Para texto de accesibilidad usar correctamente -->
<span class="visually-hidden">Para lectores de pantalla</span>
```

### 2. CSS Semánticamente Correcto

#### ✅ Clases Accesibles
```css
/* Clase para contenido visualmente oculto pero accesible */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Énfasis visual sin comprometer SEO */
.text-highlight {
  color: var(--accent-color);
  font-weight: 600;
}

.text-emphasis {
  background: linear-gradient(120deg, transparent 0%, transparent 70%, var(--highlight-color) 70%);
  padding: 0 4px;
}
```

## 📋 Template de Sección SEO-Optimizada

```liquid
{% comment %}
  Sección optimizada para SEO
  - H2 para título principal
  - H3 para productos
  - Texto editable con HTML
  - Sin contenido oculto
{% endcomment %}

{% comment %} === VARIABLES Y CONFIGURACIÓN === {% endcomment %}
{% assign section_id = section.id %}
{% assign has_title = section.settings.section_title != blank %}
{% assign has_description = section.settings.section_description != blank %}

{% comment %} === ESTRUCTURA SEMÁNTICA === {% endcomment %}
<section class="seo-section" id="section-{{ section_id }}" aria-labelledby="heading-{{ section_id }}">
  <div class="page-width">
    
    {% comment %} Título principal - SIEMPRE H2 {% endcomment %}
    {% if has_title %}
      <header class="section-header">
        <h2 id="heading-{{ section_id }}" class="section-title">
          {{ section.settings.section_title }}
        </h2>
        
        {% if has_description %}
          <div class="section-description">
            {{ section.settings.section_description }}
          </div>
        {% endif %}
      </header>
    {% endif %}

    {% comment %} Contenido principal {% endcomment %}
    <div class="section-content">
      
      {% comment %} Grid de productos - Títulos en H3 {% endcomment %}
      {% if section.settings.featured_products.size > 0 %}
        <div class="products-grid" role="region" aria-label="Productos destacados">
          {% for product in section.settings.featured_products %}
            <article class="product-card">
              {% comment %} Título del producto - SIEMPRE H3 {% endcomment %}
              <h3 class="product-title">
                <a href="{{ product.url }}" class="product-link">
                  {{ product.title }}
                </a>
              </h3>
              
              {% comment %} Imagen con alt descriptivo {% endcomment %}
              {% if product.featured_image %}
                <div class="product-image">
                  <img 
                    src="{{ product.featured_image | img_url: '400x400' }}"
                    alt="{{ product.featured_image.alt | default: product.title }}"
                    loading="lazy"
                    width="400"
                    height="400"
                  >
                </div>
              {% endif %}
              
              {% comment %} Descripción editable {% endcomment %}
              {% if product.description != blank %}
                <div class="product-description">
                  {{ product.description | truncatewords: 30 }}
                </div>
              {% endif %}
              
              {% comment %} Precio con semántica {% endcomment %}
              <div class="product-price" role="region" aria-label="Precio">
                <span class="price">
                  <span class="visually-hidden">Precio: </span>
                  {{ product.price | money }}
                </span>
                {% if product.compare_at_price > product.price %}
                  <span class="compare-price">
                    <span class="visually-hidden">Precio original: </span>
                    {{ product.compare_at_price | money }}
                  </span>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
      {% endif %}

      {% comment %} Contenido HTML personalizable {% endcomment %}
      {% if section.settings.custom_content != blank %}
        <div class="custom-content">
          {{ section.settings.custom_content }}
        </div>
      {% endif %}

    </div>
  </div>
</section>

{% comment %} === SCHEMA OPTIMIZADO === {% endcomment %}
{% schema %}
{
  "name": "Sección SEO Optimizada",
  "settings": [
    {
      "type": "text",
      "id": "section_title",
      "label": "Título de la Sección (H2)",
      "info": "Se renderiza como H2 para SEO correcto"
    },
    {
      "type": "richtext",
      "id": "section_description",
      "label": "Descripción",
      "info": "Acepta HTML: <strong>, <em>, <a>, <br>, <span>"
    },
    {
      "type": "product_list",
      "id": "featured_products",
      "label": "Productos Destacados",
      "info": "Títulos se renderizan como H3",
      "limit": 8
    },
    {
      "type": "textarea",
      "id": "custom_content",
      "label": "Contenido HTML Personalizado",
      "info": "Permite HTML completo para personalización avanzada"
    },
    {
      "type": "header",
      "content": "Configuración de Estilo"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Color de Fondo"
    },
    {
      "type": "range",
      "id": "section_padding",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Espaciado de Sección",
      "default": 40
    }
  ],
  "presets": [
    {
      "name": "Sección SEO Optimizada"
    }
  ]
}
{% endschema %}
```

## ✅ Checklist de SEO para Secciones

### Antes de Publicar - Verificar:

#### Estructura HTML
- [ ] ¿El título principal usa H2?
- [ ] ¿Los títulos de productos usan H3?
- [ ] ¿No hay saltos en la jerarquía de encabezados?
- [ ] ¿No se usa H1 en ninguna parte de la sección?

#### Contenido
- [ ] ¿Todo el texto es editable desde el personalizador?
- [ ] ¿Se usan textarea/richtext para permitir HTML?
- [ ] ¿No hay texto oculto o invisible?
- [ ] ¿Las imágenes tienen alt text descriptivo?

#### Semántica
- [ ] ¿Se usa `<strong>` para importancia, no para estilo?
- [ ] ¿Se usa `<span>` con clases para énfasis visual?
- [ ] ¿Los enlaces tienen texto descriptivo?
- [ ] ¿Se usan los elementos HTML correctos semánticamente?

#### Accesibilidad
- [ ] ¿Los colores tienen suficiente contraste?
- [ ] ¿Se puede navegar con teclado?
- [ ] ¿Los lectores de pantalla pueden interpretar el contenido?
- [ ] ¿Se usan atributos ARIA cuando es necesario?

## 🎯 Prompts para GitHub Copilot

Usa estos prompts para generar código SEO-optimizado:

```
"Crear sección de productos con títulos H3 y estructura SEO correcta"

"Generar schema con richtext para permitir HTML en descripciones"

"Revisar este código para cumplir reglas de SEO y accesibilidad"

"Crear grid de productos con semántica correcta y sin texto oculto"

"Optimizar esta sección siguiendo las reglas de jerarquía de encabezados"
```

GitHub Copilot está configurado para seguir automáticamente estas reglas cuando genere código para secciones de Shopify.
