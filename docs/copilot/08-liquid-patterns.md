# Patrones y Antipatrones de Liquid

## 🚨 IMPORTANTE: CSS y Configuraciones Dinámicas

### ⚠️ Patrón Crítico: Verificar CSS Antes de Implementar Configuraciones

#### ✅ Correcto: Verificación de CSS Existente
```liquid
{% comment %}
VERIFICACIÓN OBLIGATORIA ANTES DE IMPLEMENTAR:
1. ¿Existe CSS para .product-title en este archivo?
2. ¿Hay reglas en theme.css que afecten títulos de producto?
3. ¿Existen !important declarations?
4. ¿Mi CSS dinámico tendrá suficiente especificidad?
{% endcomment %}

{% assign title_size_class = 'title-' | append: section.settings.title_size %}

<h2 class="product-title {{ title_size_class }}" 
    style="color: {{ section.settings.title_color }};">
  {{ product.title }}
</h2>

<style>
/* Verificado: existe .product-title { font-size: 16px !important; } en theme.css */
/* Solución: usar especificidad mayor */
.custom-product .product-title.title-small {
  font-size: 14px !important;
}
.custom-product .product-title.title-large {
  font-size: 24px !important;
}
</style>
```

#### ❌ Incorrecto: Sin Verificar CSS Existente
```liquid
<!-- Configuración que NO funcionará -->
<h2 class="product-title" style="font-size: {{ section.settings.title_size }}px;">
  {{ product.title }}
</h2>

<!-- Este CSS será ignorado si existe .product-title { font-size: 16px !important; } -->
<style>
.product-title {
  font-size: {{ section.settings.title_size }}px; /* No se aplicará */
}
</style>
```

### 🚫 **CRÍTICO: Reglas de Comentarios**

#### ❌ Incorrecto: Comentarios Dentro de Tags
```liquid
{% liquid
  {% comment %} Esto ROMPE el código {% endcomment %}
  assign total = 0
%}

{% unless product %}
  {% comment %} Esto TAMBIÉN rompe {% endcomment %}
  {% assign product = section.settings.product %}
{% endunless %}
```

#### ✅ Correcto: Código Autoexplicativo con Comentarios Mínimos
```liquid
{% comment %} Política de negocio: descuentos automáticos solo para usuarios registrados {% endcomment %}
{% liquid
  assign cart_total_amount = 0
  assign automatic_discount_amount = 0
%}

{% comment %} Fallback requerido por configuración de tema {% endcomment %}
{% unless featured_product %}
  {% assign featured_product = section.settings.product %}
{% endunless %}

{% comment %} Código autoexplicativo - NO necesita comentarios {% endcomment %}
{% liquid
  assign product_title = featured_product.title
  assign product_current_price = featured_product.price | money
  assign product_original_price = featured_product.compare_at_price | money
%}
```

## 🎯 Patrones Recomendados (DO)

### 1. Asignación de Variables Complejas

#### ✅ Correcto
```liquid
{% assign product_available = product.available %}
{% assign has_variants = product.variants.size > 1 %}
{% assign on_sale = product.compare_at_price > product.price %}
{% assign discount_percentage = product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price | round %}

{% if product_available and on_sale %}
  <span class="sale-badge">{{ discount_percentage }}% OFF</span>
{% endif %}
```

#### ❌ Incorrecto
```liquid
{% if product.available and product.compare_at_price > product.price %}
  <span class="sale-badge">{{ product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price | round }}% OFF</span>
{% endif %}
```

### 2. Condicionantes Anidadas Organizadas

#### ✅ Correcto
```liquid
{% assign show_product = false %}
{% assign product_conditions_met = false %}

{% if product.available %}
  {% if product.tags contains 'featured' or collection.handle == 'sale' %}
    {% assign product_conditions_met = true %}
  {% endif %}
{% endif %}

{% if product_conditions_met and section.settings.show_products %}
  {% assign show_product = true %}
{% endif %}

{% if show_product %}
  {% render 'product-card', product: product %}
{% endif %}
```

#### ❌ Incorrecto
```liquid
{% if product.available %}
  {% if product.tags contains 'featured' or collection.handle == 'sale' %}
    {% if section.settings.show_products %}
      {% render 'product-card', product: product %}
    {% endif %}
  {% endif %}
{% endif %}
```

### 3. Loops Optimizados

#### ✅ Correcto
```liquid
{% assign products_to_show = section.settings.products_limit | default: 8 %}
{% assign products_collection = collections[section.settings.collection] %}

{% if products_collection.products.size > 0 %}
  <div class="products-grid">
    {% for product in products_collection.products limit: products_to_show %}
      {% assign product_index = forloop.index %}
      {% assign is_last_item = forloop.last %}
      
      <div class="product-item" data-index="{{ product_index }}">
        {% render 'product-card', 
           product: product, 
           index: product_index,
           is_last: is_last_item %}
      </div>
    {% endfor %}
  </div>
{% else %}
  <p class="no-products-message">{{ section.settings.empty_state_text | default: 'No hay productos para mostrar' }}</p>
{% endif %}
```

#### ❌ Incorrecto
```liquid
<div class="products-grid">
  {% for product in collections[section.settings.collection].products limit: section.settings.products_limit %}
    <div class="product-item">
      {% render 'product-card', product: product %}
    </div>
  {% endfor %}
</div>
```

### 4. Manejo de Estados y Fallbacks

#### ✅ Correcto
```liquid
{% assign section_title = section.settings.title %}
{% assign section_description = section.settings.description %}
{% assign has_content = false %}

{% if section_title != blank or section_description != blank %}
  {% assign has_content = true %}
{% endif %}

{% if has_content %}
  <div class="section-header">
    {% if section_title != blank %}
      <h2 class="section-title">{{ section_title }}</h2>
    {% endif %}
    {% if section_description != blank %}
      <div class="section-description">{{ section_description }}</div>
    {% endif %}
  </div>
{% endif %}
```

#### ❌ Incorrecto
```liquid
<div class="section-header">
  <h2 class="section-title">{{ section.settings.title }}</h2>
  <div class="section-description">{{ section.settings.description }}</div>
</div>
```

### 5. Variables de Configuración

#### ✅ Correcto
```liquid
{% comment %} Configuración de sección {% endcomment %}
{% assign container_class = 'page-width' %}
{% assign grid_columns_desktop = section.settings.columns_desktop | default: 4 %}
{% assign grid_columns_tablet = grid_columns_desktop | at_most: 3 %}
{% assign grid_columns_mobile = grid_columns_desktop | at_most: 2 %}
{% assign spacing_class = 'spacing-' | append: section.settings.spacing | default: 'spacing-medium' %}

{% comment %} Estados de contenido {% endcomment %}
{% assign has_header = section.settings.title != blank or section.settings.description != blank %}
{% assign has_blocks = section.blocks.size > 0 %}
{% assign show_section = has_header or has_blocks %}

{% comment %} Variables de estilo {% endcomment %}
{% assign section_bg = section.settings.background_color | default: 'transparent' %}
{% assign text_alignment = section.settings.text_align | default: 'center' %}
```

## 🚫 Antipatrones (DON'T)

### 1. Lógica Compleja en Templates

#### ❌ Evitar
```liquid
<div class="price">
  {% if product.compare_at_price > product.price %}
    <span class="sale-price">{{ product.price | money }}</span>
    <span class="original-price">{{ product.compare_at_price | money }}</span>
    <span class="discount">{{ product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price | round }}% OFF</span>
  {% else %}
    <span class="regular-price">{{ product.price | money }}</span>
  {% endif %}
</div>
```

#### ✅ Refactorizar a
```liquid
{% assign on_sale = product.compare_at_price > product.price %}
{% assign sale_price = product.price | money %}
{% assign original_price = product.compare_at_price | money %}
{% assign discount_percentage = product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price | round %}

<div class="price">
  {% if on_sale %}
    <span class="sale-price">{{ sale_price }}</span>
    <span class="original-price">{{ original_price }}</span>
    <span class="discount">{{ discount_percentage }}% OFF</span>
  {% else %}
    <span class="regular-price">{{ sale_price }}</span>
  {% endif %}
</div>
```

### 2. Condicionantes JavaScript en Lugar de Liquid

#### ❌ Evitar
```javascript
// No hacer esto en JavaScript
if (product.available) {
  document.querySelector('.product-form').style.display = 'block';
} else {
  document.querySelector('.sold-out-message').style.display = 'block';
}
```

#### ✅ Hacer en Liquid
```liquid
{% if product.available %}
  <form class="product-form">
    <!-- Formulario de producto -->
  </form>
{% else %}
  <div class="sold-out-message">
    <p>{{ 'products.product.sold_out' | t }}</p>
  </div>
{% endif %}
```

### 3. Repetición de Código

#### ❌ Evitar
```liquid
{% for product in collection.products %}
  <div class="product-card">
    <img src="{{ product.featured_image | img_url: '300x300' }}" alt="{{ product.title }}">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
  </div>
{% endfor %}

<!-- Más adelante en otro lugar -->
{% for product in collections.featured.products %}
  <div class="product-card">
    <img src="{{ product.featured_image | img_url: '300x300' }}" alt="{{ product.title }}">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
  </div>
{% endfor %}
```

#### ✅ Crear Snippet
```liquid
<!-- snippets/product-card.liquid -->
<div class="product-card">
  <img src="{{ product.featured_image | img_url: '300x300' }}" alt="{{ product.title }}">
  <h3>{{ product.title }}</h3>
  <p>{{ product.price | money }}</p>
</div>

<!-- Usar en templates -->
{% for product in collection.products %}
  {% render 'product-card', product: product %}
{% endfor %}
```

### 4. Filtros Complejos Inline

#### ❌ Evitar
```liquid
{{ article.created_at | date: '%B %d, %Y' | capitalize | replace: 'January', 'Enero' | replace: 'February', 'Febrero' }}
```

#### ✅ Usar Variables
```liquid
{% assign article_date = article.created_at | date: '%B %d, %Y' %}
{% assign localized_date = article_date | replace: 'January', 'Enero' | replace: 'February', 'Febrero' %}
{{ localized_date }}
```

## 📊 Métricas de Calidad

### Variables por Sección
- **Óptimo**: 5-15 variables bien organizadas
- **Aceptable**: 3-20 variables
- **Problemático**: >25 variables o <3 variables

### Anidación de Condicionantes
- **Óptimo**: Máximo 3 niveles de anidación
- **Aceptable**: 4 niveles con buena organización
- **Problemático**: >4 niveles

### Longitud de Loops
- **Óptimo**: <50 líneas de código dentro del loop
- **Aceptable**: 50-100 líneas
- **Problemático**: >100 líneas (refactorizar a snippet)

## 🛠️ Refactoring Patterns

### De Condicionantes Complejas a Variables
```liquid
{% comment %} Antes {% endcomment %}
{% if product.available and product.compare_at_price > product.price and product.tags contains 'sale' %}

{% comment %} Después {% endcomment %}
{% assign is_available = product.available %}
{% assign on_sale = product.compare_at_price > product.price %}
{% assign is_sale_item = product.tags contains 'sale' %}
{% assign show_sale_badge = is_available and on_sale and is_sale_item %}

{% if show_sale_badge %}
```

### De Lógica Repetida a Snippets
```liquid
{% comment %} Antes: código repetido {% endcomment %}
<div class="testimonial">
  <div class="rating">
    {% for i in (1..5) %}
      {% if i <= testimonial.rating %}★{% else %}☆{% endif %}
    {% endfor %}
  </div>
  <p>{{ testimonial.content }}</p>
  <cite>{{ testimonial.author }}</cite>
</div>

{% comment %} Después: snippet reutilizable {% endcomment %}
{% render 'testimonial-card', testimonial: testimonial %}
```
