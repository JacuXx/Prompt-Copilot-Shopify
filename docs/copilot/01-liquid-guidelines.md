# Guías de Desarrollo Liquid para Shopify

## Principios Fundamentales

### 1. Prioridad de Liquid sobre JavaScript
- **SIEMPRE** usar Liquid para condicionantes y lógica de presentación
- Maximizar el uso de Liquid para renderizado del lado del servidor
- JavaScript solo para casos excepcionales donde Liquid no sea suficiente

### 2. Uso de Variables Liquid
- Utilizar `assign` para crear variables cuando sea necesario
- Mantener la lógica organizada con variables descriptivas
- Ejemplo:
```liquid
{% assign show_discount = product.compare_at_price > product.price %}
{% assign discount_percentage = product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price | round %}
```

### 3. Condicionantes en Liquid
- Usar estructuras condicionales complejas en Liquid
- Evitar JavaScript para mostrar/ocultar elementos
- Ejemplo:
```liquid
{% if product.available %}
  {% if product.compare_at_price > product.price %}
    <span class="sale-badge">{{ discount_percentage }}% OFF</span>
  {% endif %}
{% else %}
  <span class="sold-out-badge">Agotado</span>
{% endif %}
```

### 4. Loops y Iteraciones
- Usar `for` loops de Liquid para repetir elementos
- Implementar paginación y límites en Liquid
- Ejemplo:
```liquid
{% for product in collection.products limit: 8 %}
  {% assign product_index = forloop.index %}
  <!-- Contenido del producto -->
{% endfor %}
```

## Mejores Prácticas

### Variables de Estado
```liquid
{% assign is_mobile = false %}
{% assign is_desktop = true %}
{% assign has_variants = product.variants.size > 1 %}
{% assign is_on_sale = product.compare_at_price > product.price %}
```

### Condicionantes Complejas
```liquid
{% assign show_element = false %}
{% if settings.enable_feature and product.available %}
  {% if product.type == 'featured' or product.tags contains 'special' %}
    {% assign show_element = true %}
  {% endif %}
{% endif %}

{% if show_element %}
  <!-- Renderizar elemento -->
{% endif %}
```
