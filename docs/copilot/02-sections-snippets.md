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
