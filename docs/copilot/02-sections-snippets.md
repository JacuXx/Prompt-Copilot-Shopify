# Guía de Secciones y Snippets

## Creación de Bloques mediante Snippets

### Principio Fundamental
- **SIEMPRE** crear bloques reutilizables mediante snippets
- Un snippet por funcionalidad específica
- Mantener la modularidad y reutilización

### Estructura de Snippets
```liquid
<!-- snippets/product-card.liquid -->
{% comment %}
  Snippet: Product Card
  Parámetros:
  - product: objeto producto
  - show_vendor: mostrar marca (boolean)
  - card_style: estilo de tarjeta (string)
{% endcomment %}

{% assign product_url = product.url | within: collection %}
{% assign on_sale = product.compare_at_price > product.price %}

<div class="product-card product-card--{{ card_style | default: 'standard' }}">
  <!-- Contenido del snippet -->
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

### Archivo de Sección Completo
```liquid
<!-- sections/custom-section.liquid -->

{% comment %} LIQUID LOGIC {% endcomment %}
{% assign items_per_row = section.settings.items_per_row | default: 3 %}
{% assign show_arrows = section.settings.show_arrows %}

{% comment %} HTML STRUCTURE {% endcomment %}
<section class="custom-section" data-section-id="{{ section.id }}">
  {% for block in section.blocks %}
    {% render 'custom-block', block: block %}
  {% endfor %}
</section>

{% comment %} CSS STYLES {% endcomment %}
<style>
  .custom-section {
    /* Estilos base */
  }
  
  /* Desktop */
  @media screen and (min-width: 1024px) {
    .custom-section {
      /* Estilos desktop */
    }
  }
  
  /* Tablet */
  @media screen and (max-width: 1023px) and (min-width: 768px) {
    .custom-section {
      /* Estilos tablet */
    }
  }
  
  /* Mobile */
  @media screen and (max-width: 767px) {
    .custom-section {
      /* Estilos mobile */
    }
  }
</style>

{% comment %} JAVASCRIPT (solo si es necesario) {% endcomment %}
<script>
  // JavaScript mínimo y optimizado
</script>

{% comment %} SCHEMA {% endcomment %}
{% schema %}
{
  "name": "Sección Personalizada",
  "settings": [...],
  "blocks": [...],
  "presets": [...]
}
{% endschema %}
```
