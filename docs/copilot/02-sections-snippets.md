# Guía de Secciones y Snippets

## Creación de Bloques mediante Snippets

### Principio Fundamental
- **SIEMPRE** crear bloques reutilizables mediante snippets
- Un snippet por funcionalidad específica
- Mantener la modularidad y reutilización

### Estructura de Snippets (SIN COMENTARIOS INNECESARIOS)
```liquid
{% liquid
  assign product_url = product.url | within: collection
  assign is_on_sale = product.compare_at_price > product.price
  assign card_style_class = card_style | default: 'standard'
%}

<div class="product-card product-card--{{ card_style_class }}">
  <a href="{{ product_url }}" class="product-card__link">
    <img src="{{ product.featured_image | image_url: width: 300 }}" alt="{{ product.title }}">
    <h3 class="product-card__title">{{ product.title }}</h3>
    <p class="product-card__price">{{ product.price | money }}</p>
  </a>
</div>
```

### Uso de Bloques Anidados
- Verificar si el tema soporta bloques anidados antes de implementar
- Usar la nueva funcionalidad cuando esté disponible

```liquid
<!-- En schema de sección -->
{
  "blocks": [
    {
      "type": "nested_block",
      "name": "Bloque Principal",
      "settings": [...],
      "blocks": [
        {
          "type": "child_block",
          "name": "Bloque Hijo",
          "settings": [...]
        }
      ]
    }
  ]
}
```

## ⚠️ IMPORTANTE: Verificación de CSS Existente

### Antes de Editar Snippets o Secciones
Siempre revisar si ya existen estilos CSS que puedan interferir:

#### 1. **En el Archivo Actual**
- Buscar `<style>` tags existentes
- Identificar clases CSS ya definidas
- Verificar si hay reglas que afecten el elemento a modificar

#### 2. **En Assets del Tema**
- **theme.css**: Estilos globales
- **section-*.css**: Estilos específicos de sección
- **component-*.css**: Estilos de componentes

#### 3. **Ejemplo de Conflicto Común**
```css
/* Si existe en el tema */
.product-title { font-size: 16px !important; }

/* Nuevo CSS para configuración de tamaño */
.custom-product-title { font-size: 24px; } /* No funcionará */

/* SOLUCIÓN */
.product-card .custom-product-title { 
  font-size: 24px !important; 
}
```

#### 4. **Prompt Template con Verificación CSS**
```
Edita [archivo] para agregar [funcionalidad]. ANTES de agregar CSS nuevo, 
revisa si existen estilos para [elemento específico] en este archivo o en 
assets que puedan interferir. Si hay conflictos, usa especificidad adecuada 
o !important para sobrescribir.
```

## Organización de Archivos

### Estructura Recomendada
- **Secciones**: Un archivo por sección con todo integrado
- **Snippets**: Archivos modulares para reutilización
- **Assets**: CSS y JS cuando sea absolutamente necesario

### Archivo de Sección Completo (SIN COMENTARIOS)
```liquid
{% liquid
  assign items_per_row = section.settings.items_per_row | default: 3
  assign show_navigation_arrows = section.settings.show_arrows
  assign section_heading = section.settings.heading
%}

<section class="custom-section" data-section-id="{{ section.id }}">
  {% if section_heading != blank %}
    <h2 class="custom-section__heading">{{ section_heading }}</h2>
  {% endif %}
  
  <div class="custom-section__grid custom-section__grid--{{ items_per_row }}-columns">
    {% for block in section.blocks %}
      {% render 'custom-block', block: block %}
    {% endfor %}
  </div>
</section>

<style>
  .custom-section {
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .custom-section__heading {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .custom-section__grid {
    display: grid;
    gap: 20px;
  }
  
  @media screen and (min-width: 1024px) {
    .custom-section {
      padding: 60px 40px;
    }
    
    .custom-section__grid--3-columns {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media screen and (max-width: 1023px) and (min-width: 768px) {
    .custom-section__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media screen and (max-width: 767px) {
    .custom-section__grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  (function() {
    'use strict';
    
    const sectionElement = document.querySelector('[data-section-id="{{ section.id }}"]');
    
    function initializeSection() {
      console.log('Sección inicializada:', '{{ section.id }}');
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeSection);
    } else {
      initializeSection();
    }
  })();
</script>

{% schema %}
{
  "name": "Sección Personalizada",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Título de la sección",
      "default": "Nuestra Colección"
    },
    {
      "type": "range",
      "id": "items_per_row",
      "label": "Items por fila",
      "min": 2,
      "max": 4,
      "step": 1,
      "default": 3
    },
    {
      "type": "checkbox",
      "id": "show_arrows",
      "label": "Mostrar flechas de navegación",
      "default": true
    }
  ],
  "blocks": [
    {
      "type": "custom_block",
      "name": "Bloque personalizado",
      "settings": []
    }
  ],
  "presets": [
    {
      "name": "Sección Personalizada"
    }
  ]
}
{% endschema %}
}
{% endschema %}
```
