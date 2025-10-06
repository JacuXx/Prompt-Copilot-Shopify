# Guía de Metafields en Shopify Liquid

## 🏷️ Fundamentos de Metafields

### Qué son los Metafields
Los metafields son campos personalizados que permiten almacenar información adicional en objetos de Shopify (productos, colecciones, clientes, pedidos, etc.).

### Estructura de Metafields
```liquid
<!-- Estructura básica -->
{{ objeto.metafields.namespace.key }}

<!-- Ejemplos -->
{{ product.metafields.custom.material }}
{{ collection.metafields.seo.meta_description }}
{{ customer.metafields.loyalty.points }}
```

## 🎯 Acceso a Metafields por Contexto

### 1. **Dentro del Contexto del Objeto**

#### En Product Templates o Secciones de Producto
```liquid
<!-- Acceso directo cuando estamos en contexto de producto -->
{{ product.metafields.custom.material }}
{{ product.metafields.specifications.weight }}
{{ product.metafields.seo.meta_title }}
{{ product.metafields.reviews.average_rating }}
```

#### En Collection Templates o Secciones de Colección
```liquid
<!-- Acceso directo cuando estamos en contexto de colección -->
{{ collection.metafields.custom.banner_image }}
{{ collection.metafields.seo.meta_description }}
{{ collection.metafields.settings.products_per_page }}
```

### 2. **Fuera del Contexto del Objeto**

#### Acceder a Metafields de Producto desde Snippets/Secciones Globales
```liquid
<!-- ❌ INCORRECTO: No funciona fuera del contexto de producto -->
{{ metafields.custom.material }}

<!-- ✅ CORRECTO: Pasar el objeto como parámetro -->
{% render 'product-card', product: product %}

<!-- En el snippet product-card.liquid -->
{{ product.metafields.custom.material }}
{{ product.metafields.specifications.weight }}
```

#### Acceder a Metafields por ID de Producto
```liquid
<!-- Cuando necesitas acceder a metafields de un producto específico -->
{% assign specific_product = all_products['handle-del-producto'] %}
{{ specific_product.metafields.custom.material }}

<!-- O por ID si lo tienes -->
{% assign product_by_id = shop.products[product_id] %}
{{ product_by_id.metafields.custom.material }}
```

### 3. **Uso en Snippets con Parámetros**

#### ✅ Forma Correcta de Pasar Objetos a Snippets
```liquid
<!-- En la sección principal -->
{% for product in collection.products %}
  {% render 'product-card-with-metafields', 
     product: product,
     show_material: true,
     show_specifications: true %}
{% endfor %}

<!-- En snippets/product-card-with-metafields.liquid -->
{% comment %}
  Snippet: Product Card con Metafields
  Parámetros:
  - product: objeto producto (requerido)
  - show_material: mostrar material (boolean)
  - show_specifications: mostrar especificaciones (boolean)
{% endcomment %}

<div class="product-card" data-product-id="{{ product.id }}">
  <h3>{{ product.title }}</h3>
  
  {% if show_material and product.metafields.custom.material != blank %}
    <p class="product-material">
      Material: {{ product.metafields.custom.material }}
    </p>
  {% endif %}
  
  {% if show_specifications and product.metafields.specifications != blank %}
    <div class="product-specs">
      {% if product.metafields.specifications.weight != blank %}
        <span>Peso: {{ product.metafields.specifications.weight }}</span>
      {% endif %}
      {% if product.metafields.specifications.dimensions != blank %}
        <span>Dimensiones: {{ product.metafields.specifications.dimensions }}</span>
      {% endif %}
    </div>
  {% endif %}
</div>
```

## 🗂️ Tipos de Metafields y Acceso

### Metafields de Texto
```liquid
<!-- Text metafields -->
{{ product.metafields.custom.care_instructions }}
{{ product.metafields.descriptions.short_description }}

<!-- Rich text metafields -->
{{ product.metafields.content.detailed_description }}
```

### Metafields de Número
```liquid
<!-- Number metafields -->
{{ product.metafields.specifications.weight }}
{{ product.metafields.inventory.reorder_point }}

<!-- Con formateo -->
{{ product.metafields.specifications.weight | round: 2 }}kg
```

### Metafields de Imagen
```liquid
<!-- Single file metafields -->
{% if product.metafields.images.lifestyle_image != blank %}
  <img src="{{ product.metafields.images.lifestyle_image | img_url: '800x' }}" 
       alt="{{ product.metafields.images.lifestyle_image.alt | default: product.title }}">
{% endif %}

<!-- List of files metafields -->
{% if product.metafields.gallery.additional_images != blank %}
  {% for image in product.metafields.gallery.additional_images.value %}
    <img src="{{ image | img_url: '400x' }}" alt="{{ image.alt }}">
  {% endfor %}
{% endif %}
```

### Metafields de Lista
```liquid
<!-- List metafields -->
{% if product.metafields.features.key_features != blank %}
  <ul class="product-features">
    {% for feature in product.metafields.features.key_features.value %}
      <li>{{ feature }}</li>
    {% endfor %}
  </ul>
{% endif %}
```

### Metafields de Producto/Colección Referencia
```liquid
<!-- Product reference metafields -->
{% if product.metafields.related.complementary_product != blank %}
  {% assign related_product = product.metafields.related.complementary_product %}
  <div class="related-product">
    <h4>Producto Complementario:</h4>
    <a href="{{ related_product.url }}">{{ related_product.title }}</a>
    <p>{{ related_product.price | money }}</p>
  </div>
{% endif %}

<!-- List of product references -->
{% if product.metafields.related.bundle_products != blank %}
  <div class="bundle-products">
    {% for bundle_product in product.metafields.related.bundle_products.value %}
      {% render 'product-card-mini', product: bundle_product %}
    {% endfor %}
  </div>
{% endif %}
```

### Metafields JSON
```liquid
<!-- JSON metafields -->
{% if product.metafields.technical.specifications != blank %}
  {% assign specs = product.metafields.technical.specifications.value %}
  <div class="technical-specs">
    <p>CPU: {{ specs.cpu }}</p>
    <p>RAM: {{ specs.ram }}</p>
    <p>Storage: {{ specs.storage }}</p>
  </div>
{% endif %}
```

## 🔄 Patrones Comunes de Uso

### 1. **Snippet de Producto con Metafields Condicionales**
```liquid
<!-- snippets/product-info-enhanced.liquid -->
{% comment %}
  Snippet: Información de Producto Mejorada
  Parámetros:
  - product: objeto producto (requerido)
  - show_metafields: array de metafields a mostrar (opcional)
{% endcomment %}

<div class="product-info-enhanced">
  <!-- Información básica -->
  <h2>{{ product.title }}</h2>
  <p>{{ product.price | money }}</p>
  
  <!-- Metafields condicionales -->
  {% if show_metafields contains 'material' and product.metafields.custom.material != blank %}
    <div class="product-material">
      <strong>Material:</strong> {{ product.metafields.custom.material }}
    </div>
  {% endif %}
  
  {% if show_metafields contains 'care' and product.metafields.custom.care_instructions != blank %}
    <div class="care-instructions">
      <strong>Cuidados:</strong> {{ product.metafields.custom.care_instructions }}
    </div>
  {% endif %}
  
  {% if show_metafields contains 'origin' and product.metafields.custom.country_of_origin != blank %}
    <div class="origin">
      <strong>Origen:</strong> {{ product.metafields.custom.country_of_origin }}
    </div>
  {% endif %}
</div>

<!-- Uso del snippet -->
{% render 'product-info-enhanced', 
   product: product, 
   show_metafields: 'material,care,origin' | split: ',' %}
```

### 2. **Grid de Productos con Metafields**
```liquid
<!-- En una sección que muestra productos -->
<div class="products-grid">
  {% for product in collection.products %}
    <div class="product-item">
      <!-- Imagen del producto -->
      <img src="{{ product.featured_image | img_url: '400x' }}" alt="{{ product.title }}">
      
      <!-- Información básica -->
      <h3>{{ product.title }}</h3>
      <p>{{ product.price | money }}</p>
      
      <!-- Metafields específicos -->
      {% if product.metafields.custom.material != blank %}
        <span class="material-badge">{{ product.metafields.custom.material }}</span>
      {% endif %}
      
      {% if product.metafields.custom.eco_friendly == true %}
        <span class="eco-badge">Eco-Friendly</span>
      {% endif %}
      
      <!-- Rating desde metafields -->
      {% if product.metafields.reviews.average_rating != blank %}
        <div class="rating">
          {% assign rating = product.metafields.reviews.average_rating %}
          {% render 'star-rating', rating: rating %}
        </div>
      {% endif %}
    </div>
  {% endfor %}
</div>
```

### 3. **Metafields en Formularios de Schema**
```liquid
<!-- Schema para configurar qué metafields mostrar -->
{% schema %}
{
  "name": "Producto con Metafields",
  "settings": [
    {
      "type": "product",
      "id": "featured_product",
      "label": "Producto Destacado"
    },
    {
      "type": "checkbox",
      "id": "show_material",
      "label": "Mostrar Material",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_specifications",
      "label": "Mostrar Especificaciones",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "show_care_instructions",
      "label": "Mostrar Instrucciones de Cuidado",
      "default": false
    }
  ]
}
{% endschema %}

<!-- Uso en la sección -->
{% assign featured_product = all_products[section.settings.featured_product] %}

{% if featured_product != blank %}
  <div class="featured-product-metafields">
    <h2>{{ featured_product.title }}</h2>
    
    {% if section.settings.show_material and featured_product.metafields.custom.material != blank %}
      <p><strong>Material:</strong> {{ featured_product.metafields.custom.material }}</p>
    {% endif %}
    
    {% if section.settings.show_specifications and featured_product.metafields.specifications != blank %}
      <div class="specifications">
        <h4>Especificaciones:</h4>
        {% for spec in featured_product.metafields.specifications %}
          <p>{{ spec[0] }}: {{ spec[1] }}</p>
        {% endfor %}
      </div>
    {% endif %}
  </div>
{% endif %}
```

## ⚠️ IMPORTANTE: Validaciones y Seguridad

### 1. **Siempre Validar Existencia de Metafields**
```liquid
<!-- ❌ INCORRECTO: Puede mostrar valores vacíos -->
<p>Material: {{ product.metafields.custom.material }}</p>

<!-- ✅ CORRECTO: Validar antes de mostrar -->
{% if product.metafields.custom.material != blank %}
  <p>Material: {{ product.metafields.custom.material }}</p>
{% endif %}
```

### 2. **Manejo de Metafields de Lista**
```liquid
<!-- ✅ CORRECTO: Validar que sea lista y tenga elementos -->
{% if product.metafields.features.list != blank and product.metafields.features.list.value.size > 0 %}
  <ul>
    {% for item in product.metafields.features.list.value %}
      <li>{{ item }}</li>
    {% endfor %}
  </ul>
{% endif %}
```

### 3. **Fallbacks para Metafields**
```liquid
<!-- Con fallback -->
{% assign product_material = product.metafields.custom.material | default: 'Material no especificado' %}
<p>Material: {{ product_material }}</p>

<!-- O condicional con fallback -->
<p>Material: 
  {% if product.metafields.custom.material != blank %}
    {{ product.metafields.custom.material }}
  {% else %}
    No especificado
  {% endif %}
</p>
```

## 🎨 Casos de Uso Avanzados

### 1. **Producto Bundle con Metafields**
```liquid
<!-- snippets/product-bundle.liquid -->
{% comment %}
  Snippet: Bundle de Productos
  Usa metafields para definir productos relacionados
{% endcomment %}

{% if product.metafields.bundle.products != blank %}
  <div class="product-bundle">
    <h3>Compra el conjunto completo</h3>
    
    <div class="bundle-products">
      <!-- Producto principal -->
      <div class="bundle-item main-product">
        <img src="{{ product.featured_image | img_url: '200x' }}" alt="{{ product.title }}">
        <h4>{{ product.title }}</h4>
        <p>{{ product.price | money }}</p>
      </div>
      
      <!-- Productos del bundle desde metafields -->
      {% for bundle_product_handle in product.metafields.bundle.products.value %}
        {% assign bundle_product = all_products[bundle_product_handle] %}
        {% if bundle_product != blank %}
          <div class="bundle-item">
            <img src="{{ bundle_product.featured_image | img_url: '200x' }}" alt="{{ bundle_product.title }}">
            <h4>{{ bundle_product.title }}</h4>
            <p>{{ bundle_product.price | money }}</p>
          </div>
        {% endif %}
      {% endfor %}
    </div>
    
    <!-- Precio total del bundle -->
    {% assign bundle_discount = product.metafields.bundle.discount_percentage | default: 0 %}
    {% if bundle_discount > 0 %}
      <div class="bundle-savings">
        <p>Ahorra {{ bundle_discount }}% comprando el conjunto</p>
      </div>
    {% endif %}
  </div>
{% endif %}
```

### 2. **Filtros Basados en Metafields**
```liquid
<!-- Sección de productos con filtros por metafields -->
<div class="product-filters">
  <!-- Filtro por material -->
  <select class="material-filter">
    <option value="">Todos los materiales</option>
    {% assign materials = collection.products | map: 'metafields.custom.material' | compact | uniq %}
    {% for material in materials %}
      <option value="{{ material | handleize }}">{{ material }}</option>
    {% endfor %}
  </select>
  
  <!-- Filtro por origen -->
  <select class="origin-filter">
    <option value="">Todos los países</option>
    {% assign origins = collection.products | map: 'metafields.custom.country_of_origin' | compact | uniq %}
    {% for origin in origins %}
      <option value="{{ origin | handleize }}">{{ origin }}</option>
    {% endfor %}
  </select>
</div>
```

## 📋 Checklist para Metafields

### Al Usar Metafields en Snippets
- [ ] Paso el objeto completo (product, collection, etc.) como parámetro
- [ ] Valido que el metafield no esté vacío antes de usarlo
- [ ] Uso fallbacks apropiados para valores faltantes
- [ ] Documento qué metafields requiere el snippet
- [ ] Considero diferentes tipos de metafields (texto, número, lista, etc.)

### Al Acceder Fuera del Contexto
- [ ] Uso `all_products[handle]` para acceder por handle
- [ ] Paso objetos como parámetros a snippets
- [ ] No asumo que el objeto está disponible globalmente
- [ ] Valido que el objeto existe antes de acceder a sus metafields

### Para Performance
- [ ] Evito loops innecesarios sobre metafields
- [ ] Asigno metafields complejos a variables cuando los uso múltiples veces
- [ ] Uso metafields específicos en lugar de iterar sobre todos

## 🚀 Mejores Prácticas

### 1. **Nomenclatura Consistente**
```liquid
<!-- Usar namespaces descriptivos -->
{{ product.metafields.specifications.weight }}  <!-- ✅ Claro -->
{{ product.metafields.custom.weight }}          <!-- ❌ Genérico -->
```

### 2. **Documentación en Snippets**
```liquid
{% comment %}
  METAFIELDS REQUERIDOS:
  - product.metafields.custom.material (text)
  - product.metafields.specifications.weight (number)
  - product.metafields.features.list (list)
  
  METAFIELDS OPCIONALES:
  - product.metafields.custom.care_instructions (text)
  - product.metafields.images.lifestyle (file)
{% endcomment %}
```

### 3. **Configuración Schema para Metafields**
```json
{
  "type": "checkbox",
  "id": "show_material_metafield",
  "label": "Mostrar Material (requiere metafield custom.material)",
  "default": false,
  "info": "El producto debe tener configurado el metafield custom.material"
}
```
# Guía de Metafields en Shopify Liquid

## 🏷️ Fundamentos de Metafields

### Qué son los Metafields
Los metafields son campos personalizados que permiten almacenar información adicional en objetos de Shopify (productos, colecciones, clientes, pedidos, etc.).

### Estructura de Metafields
```liquid
<!-- Estructura básica -->
{{ objeto.metafields.namespace.key }}

<!-- Ejemplos -->
{{ product.metafields.custom.material }}
{{ collection.metafields.seo.meta_description }}
{{ customer.metafields.loyalty.points }}
```

## 🎯 Acceso a Metafields por Contexto

### 1. **Dentro del Contexto del Objeto**

#### En Product Templates o Secciones de Producto
```liquid
<!-- Acceso directo cuando estamos en contexto de producto -->
{{ product.metafields.custom.material }}
{{ product.metafields.specifications.weight }}
{{ product.metafields.seo.meta_title }}
{{ product.metafields.reviews.average_rating }}
```

#### En Collection Templates o Secciones de Colección
```liquid
<!-- Acceso directo cuando estamos en contexto de colección -->
{{ collection.metafields.custom.banner_image }}
{{ collection.metafields.seo.meta_description }}
{{ collection.metafields.settings.products_per_page }}
```

### 2. **Fuera del Contexto del Objeto**

#### Acceder a Metafields de Producto desde Snippets/Secciones Globales
```liquid
<!-- ❌ INCORRECTO: No funciona fuera del contexto de producto -->
{{ metafields.custom.material }}

<!-- ✅ CORRECTO: Pasar el objeto como parámetro -->
{% render 'product-card', product: product %}

<!-- En el snippet product-card.liquid -->
{{ product.metafields.custom.material }}
{{ product.metafields.specifications.weight }}
```

#### Acceder a Metafields por ID de Producto
```liquid
<!-- Cuando necesitas acceder a metafields de un producto específico -->
{% assign specific_product = all_products['handle-del-producto'] %}
{{ specific_product.metafields.custom.material }}

<!-- O por ID si lo tienes -->
{% assign product_by_id = shop.products[product_id] %}
{{ product_by_id.metafields.custom.material }}
```

### 3. **Uso en Snippets con Parámetros**

#### ✅ Forma Correcta de Pasar Objetos a Snippets
```liquid
<!-- En la sección principal -->
{% for product in collection.products %}
  {% render 'product-card-with-metafields', 
     product: product,
     show_material: true,
     show_specifications: true %}
{% endfor %}

<!-- En snippets/product-card-with-metafields.liquid -->
{% comment %}
  Snippet: Product Card con Metafields
  Parámetros:
  - product: objeto producto (requerido)
  - show_material: mostrar material (boolean)
  - show_specifications: mostrar especificaciones (boolean)
{% endcomment %}

<div class="product-card" data-product-id="{{ product.id }}">
  <h3>{{ product.title }}</h3>
  
  {% if show_material and product.metafields.custom.material != blank %}
    <p class="product-material">
      Material: {{ product.metafields.custom.material }}
    </p>
  {% endif %}
  
  {% if show_specifications and product.metafields.specifications != blank %}
    <div class="product-specs">
      {% if product.metafields.specifications.weight != blank %}
        <span>Peso: {{ product.metafields.specifications.weight }}</span>
      {% endif %}
      {% if product.metafields.specifications.dimensions != blank %}
        <span>Dimensiones: {{ product.metafields.specifications.dimensions }}</span>
      {% endif %}
    </div>
  {% endif %}
</div>
```

## 🗂️ Tipos de Metafields y Acceso

### Metafields de Texto
```liquid
<!-- Text metafields -->
{{ product.metafields.custom.care_instructions }}
{{ product.metafields.descriptions.short_description }}

<!-- Rich text metafields -->
{{ product.metafields.content.detailed_description }}
```

### Metafields de Número
```liquid
<!-- Number metafields -->
{{ product.metafields.specifications.weight }}
{{ product.metafields.inventory.reorder_point }}

<!-- Con formateo -->
{{ product.metafields.specifications.weight | round: 2 }}kg
```

### Metafields de Imagen
```liquid
<!-- Single file metafields -->
{% if product.metafields.images.lifestyle_image != blank %}
  <img src="{{ product.metafields.images.lifestyle_image | img_url: '800x' }}" 
       alt="{{ product.metafields.images.lifestyle_image.alt | default: product.title }}">
{% endif %}

<!-- List of files metafields -->
{% if product.metafields.gallery.additional_images != blank %}
  {% for image in product.metafields.gallery.additional_images.value %}
    <img src="{{ image | img_url: '400x' }}" alt="{{ image.alt }}">
  {% endfor %}
{% endif %}
```

### Metafields de Lista
```liquid
<!-- List metafields -->
{% if product.metafields.features.key_features != blank %}
  <ul class="product-features">
    {% for feature in product.metafields.features.key_features.value %}
      <li>{{ feature }}</li>
    {% endfor %}
  </ul>
{% endif %}
```

### Metafields de Producto/Colección Referencia
```liquid
<!-- Product reference metafields -->
{% if product.metafields.related.complementary_product != blank %}
  {% assign related_product = product.metafields.related.complementary_product %}
  <div class="related-product">
    <h4>Producto Complementario:</h4>
    <a href="{{ related_product.url }}">{{ related_product.title }}</a>
    <p>{{ related_product.price | money }}</p>
  </div>
{% endif %}

<!-- List of product references -->
{% if product.metafields.related.bundle_products != blank %}
  <div class="bundle-products">
    {% for bundle_product in product.metafields.related.bundle_products.value %}
      {% render 'product-card-mini', product: bundle_product %}
    {% endfor %}
  </div>
{% endif %}
```

### Metafields JSON
```liquid
<!-- JSON metafields -->
{% if product.metafields.technical.specifications != blank %}
  {% assign specs = product.metafields.technical.specifications.value %}
  <div class="technical-specs">
    <p>CPU: {{ specs.cpu }}</p>
    <p>RAM: {{ specs.ram }}</p>
    <p>Storage: {{ specs.storage }}</p>
  </div>
{% endif %}
```

## 🔄 Patrones Comunes de Uso

### 1. **Snippet de Producto con Metafields Condicionales**
```liquid
<!-- snippets/product-info-enhanced.liquid -->
{% comment %}
  Snippet: Información de Producto Mejorada
  Parámetros:
  - product: objeto producto (requerido)
  - show_metafields: array de metafields a mostrar (opcional)
{% endcomment %}

<div class="product-info-enhanced">
  <!-- Información básica -->
  <h2>{{ product.title }}</h2>
  <p>{{ product.price | money }}</p>
  
  <!-- Metafields condicionales -->
  {% if show_metafields contains 'material' and product.metafields.custom.material != blank %}
    <div class="product-material">
      <strong>Material:</strong> {{ product.metafields.custom.material }}
    </div>
  {% endif %}
  
  {% if show_metafields contains 'care' and product.metafields.custom.care_instructions != blank %}
    <div class="care-instructions">
      <strong>Cuidados:</strong> {{ product.metafields.custom.care_instructions }}
    </div>
  {% endif %}
  
  {% if show_metafields contains 'origin' and product.metafields.custom.country_of_origin != blank %}
    <div class="origin">
      <strong>Origen:</strong> {{ product.metafields.custom.country_of_origin }}
    </div>
  {% endif %}
</div>

<!-- Uso del snippet -->
{% render 'product-info-enhanced', 
   product: product, 
   show_metafields: 'material,care,origin' | split: ',' %}
```

### 2. **Grid de Productos con Metafields**
```liquid
<!-- En una sección que muestra productos -->
<div class="products-grid">
  {% for product in collection.products %}
    <div class="product-item">
      <!-- Imagen del producto -->
      <img src="{{ product.featured_image | img_url: '400x' }}" alt="{{ product.title }}">
      
      <!-- Información básica -->
      <h3>{{ product.title }}</h3>
      <p>{{ product.price | money }}</p>
      
      <!-- Metafields específicos -->
      {% if product.metafields.custom.material != blank %}
        <span class="material-badge">{{ product.metafields.custom.material }}</span>
      {% endif %}
      
      {% if product.metafields.custom.eco_friendly == true %}
        <span class="eco-badge">Eco-Friendly</span>
      {% endif %}
      
      <!-- Rating desde metafields -->
      {% if product.metafields.reviews.average_rating != blank %}
        <div class="rating">
          {% assign rating = product.metafields.reviews.average_rating %}
          {% render 'star-rating', rating: rating %}
        </div>
      {% endif %}
    </div>
  {% endfor %}
</div>
```

### 3. **Metafields en Formularios de Schema**
```liquid
<!-- Schema para configurar qué metafields mostrar -->
{% schema %}
{
  "name": "Producto con Metafields",
  "settings": [
    {
      "type": "product",
      "id": "featured_product",
      "label": "Producto Destacado"
    },
    {
      "type": "checkbox",
      "id": "show_material",
      "label": "Mostrar Material",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_specifications",
      "label": "Mostrar Especificaciones",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "show_care_instructions",
      "label": "Mostrar Instrucciones de Cuidado",
      "default": false
    }
  ]
}
{% endschema %}

<!-- Uso en la sección -->
{% assign featured_product = all_products[section.settings.featured_product] %}

{% if featured_product != blank %}
  <div class="featured-product-metafields">
    <h2>{{ featured_product.title }}</h2>
    
    {% if section.settings.show_material and featured_product.metafields.custom.material != blank %}
      <p><strong>Material:</strong> {{ featured_product.metafields.custom.material }}</p>
    {% endif %}
    
    {% if section.settings.show_specifications and featured_product.metafields.specifications != blank %}
      <div class="specifications">
        <h4>Especificaciones:</h4>
        {% for spec in featured_product.metafields.specifications %}
          <p>{{ spec[0] }}: {{ spec[1] }}</p>
        {% endfor %}
      </div>
    {% endif %}
  </div>
{% endif %}
```

## ⚠️ IMPORTANTE: Validaciones y Seguridad

### 1. **Siempre Validar Existencia de Metafields**
```liquid
<!-- ❌ INCORRECTO: Puede mostrar valores vacíos -->
<p>Material: {{ product.metafields.custom.material }}</p>

<!-- ✅ CORRECTO: Validar antes de mostrar -->
{% if product.metafields.custom.material != blank %}
  <p>Material: {{ product.metafields.custom.material }}</p>
{% endif %}
```

### 2. **Manejo de Metafields de Lista**
```liquid
<!-- ✅ CORRECTO: Validar que sea lista y tenga elementos -->
{% if product.metafields.features.list != blank and product.metafields.features.list.value.size > 0 %}
  <ul>
    {% for item in product.metafields.features.list.value %}
      <li>{{ item }}</li>
    {% endfor %}
  </ul>
{% endif %}
```

### 3. **Fallbacks para Metafields**
```liquid
<!-- Con fallback -->
{% assign product_material = product.metafields.custom.material | default: 'Material no especificado' %}
<p>Material: {{ product_material }}</p>

<!-- O condicional con fallback -->
<p>Material: 
  {% if product.metafields.custom.material != blank %}
    {{ product.metafields.custom.material }}
  {% else %}
    No especificado
  {% endif %}
</p>
```

## 🎨 Casos de Uso Avanzados

### 1. **Producto Bundle con Metafields**
```liquid
<!-- snippets/product-bundle.liquid -->
{% comment %}
  Snippet: Bundle de Productos
  Usa metafields para definir productos relacionados
{% endcomment %}

{% if product.metafields.bundle.products != blank %}
  <div class="product-bundle">
    <h3>Compra el conjunto completo</h3>
    
    <div class="bundle-products">
      <!-- Producto principal -->
      <div class="bundle-item main-product">
        <img src="{{ product.featured_image | img_url: '200x' }}" alt="{{ product.title }}">
        <h4>{{ product.title }}</h4>
        <p>{{ product.price | money }}</p>
      </div>
      
      <!-- Productos del bundle desde metafields -->
      {% for bundle_product_handle in product.metafields.bundle.products.value %}
        {% assign bundle_product = all_products[bundle_product_handle] %}
        {% if bundle_product != blank %}
          <div class="bundle-item">
            <img src="{{ bundle_product.featured_image | img_url: '200x' }}" alt="{{ bundle_product.title }}">
            <h4>{{ bundle_product.title }}</h4>
            <p>{{ bundle_product.price | money }}</p>
          </div>
        {% endif %}
      {% endfor %}
    </div>
    
    <!-- Precio total del bundle -->
    {% assign bundle_discount = product.metafields.bundle.discount_percentage | default: 0 %}
    {% if bundle_discount > 0 %}
      <div class="bundle-savings">
        <p>Ahorra {{ bundle_discount }}% comprando el conjunto</p>
      </div>
    {% endif %}
  </div>
{% endif %}
```

### 2. **Filtros Basados en Metafields**
```liquid
<!-- Sección de productos con filtros por metafields -->
<div class="product-filters">
  <!-- Filtro por material -->
  <select class="material-filter">
    <option value="">Todos los materiales</option>
    {% assign materials = collection.products | map: 'metafields.custom.material' | compact | uniq %}
    {% for material in materials %}
      <option value="{{ material | handleize }}">{{ material }}</option>
    {% endfor %}
  </select>
  
  <!-- Filtro por origen -->
  <select class="origin-filter">
    <option value="">Todos los países</option>
    {% assign origins = collection.products | map: 'metafields.custom.country_of_origin' | compact | uniq %}
    {% for origin in origins %}
      <option value="{{ origin | handleize }}">{{ origin }}</option>
    {% endfor %}
  </select>
</div>
```

## 📋 Checklist para Metafields

### Al Usar Metafields en Snippets
- [ ] Paso el objeto completo (product, collection, etc.) como parámetro
- [ ] Valido que el metafield no esté vacío antes de usarlo
- [ ] Uso fallbacks apropiados para valores faltantes
- [ ] Documento qué metafields requiere el snippet
- [ ] Considero diferentes tipos de metafields (texto, número, lista, etc.)

### Al Acceder Fuera del Contexto
- [ ] Uso `all_products[handle]` para acceder por handle
- [ ] Paso objetos como parámetros a snippets
- [ ] No asumo que el objeto está disponible globalmente
- [ ] Valido que el objeto existe antes de acceder a sus metafields

### Para Performance
- [ ] Evito loops innecesarios sobre metafields
- [ ] Asigno metafields complejos a variables cuando los uso múltiples veces
- [ ] Uso metafields específicos en lugar de iterar sobre todos

## 🚀 Mejores Prácticas

### 1. **Nomenclatura Consistente**
```liquid
<!-- Usar namespaces descriptivos -->
{{ product.metafields.specifications.weight }}  <!-- ✅ Claro -->
{{ product.metafields.custom.weight }}          <!-- ❌ Genérico -->
```

### 2. **Documentación en Snippets**
```liquid
{% comment %}
  METAFIELDS REQUERIDOS:
  - product.metafields.custom.material (text)
  - product.metafields.specifications.weight (number)
  - product.metafields.features.list (list)
  
  METAFIELDS OPCIONALES:
  - product.metafields.custom.care_instructions (text)
  - product.metafields.images.lifestyle (file)
{% endcomment %}
```

### 3. **Configuración Schema para Metafields**
```json
{
  "type": "checkbox",
  "id": "show_material_metafield",
  "label": "Mostrar Material (requiere metafield custom.material)",
  "default": false,
  "info": "El producto debe tener configurado el metafield custom.material"
}
```
