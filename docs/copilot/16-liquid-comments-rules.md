# Reglas de Comentarios en Liquid

## 🚫 CRÍTICO: Dónde NO se pueden usar comentarios

### ❌ **NUNCA comentar dentro de tags `{% liquid %}`**

#### Incorrecto - ROMPERÁ el código:
```liquid
{% liquid
  {% comment %} Esto NO funciona {% endcomment %}
  unless product
    assign product = section.settings.product
  endunless
  
  {% comment %} Esto TAMPOCO funciona {% endcomment %}
  if block.settings.title == blank
    continue
  endif
%}
```

#### ❌ **NUNCA comentar dentro de tags individuales `{% %}`**
```liquid
{% comment %} Esto NO funciona {% endcomment %}
{% unless product %}
  {% comment %} Esto tampoco {% endcomment %}
  {% assign product = section.settings.product %}
{% endunless %}
```

### ✅ **CORRECTO: Dónde SÍ se pueden usar comentarios**

#### Fuera de los tags de Liquid:
```liquid
{% comment %} 
  Verificamos si existe un producto asignado
  Si no existe, tomamos el producto de la configuración de sección
{% endcomment %}
{% liquid
  unless product
    assign product = section.settings.product
  endunless
  if block.settings.title == blank or product.description == blank
    continue
  endif
%}

{% comment %} 
  Ahora procesamos la información del producto
{% endcomment %}
<div class="product-info">
  {{ product.title }}
</div>
```

## 🎯 **Reglas Fundamentales de Comentarios**

### 1. **Tags `{% liquid %}` - Sin comentarios internos**
```liquid
{% comment %} 
  BLOQUE LIQUID: Procesamiento de variables de producto
  - Asigna producto desde settings si no existe
  - Valida que tengamos título y descripción
  - Sale del loop si falta información
{% endcomment %}
{% liquid
  unless product
    assign product = section.settings.product
  endunless
  
  if block.settings.title == blank or product.description == blank
    continue
  endif
  
  assign product_price = product.price | money
  assign product_compare_price = product.compare_at_price | money
%}
```

### 2. **Tags individuales - Comentarios externos**
```liquid
{% comment %} Verificar si hay producto disponible {% endcomment %}
{% unless product %}
  {% comment %} Asignar producto desde configuración {% endcomment %}
  {% assign product = section.settings.product %}
{% endunless %}

{% comment %} Validar información requerida {% endcomment %}
{% if block.settings.title == blank or product.description == blank %}
  {% continue %}
{% endif %}
```

### 3. **HTML con Liquid - Comentarios mixtos**
```liquid
{% comment %} 
  Sección de información de producto
  Muestra título, precio y descripción si están disponibles
{% endcomment %}
<div class="product-section">
  {% comment %} Título del producto {% endcomment %}
  {% if product.title != blank %}
    <h2>{{ product.title }}</h2>
  {% endif %}
  
  <!-- Este es un comentario HTML normal -->
  {% comment %} Precio del producto con validación {% endcomment %}
  {% if product.price %}
    <p class="price">{{ product.price | money }}</p>
  {% endif %}
</div>
```

## 📝 **Estrategias de Documentación**

### 1. **Comentarios de Bloque Antes del Código**
```liquid
{% comment %} 
  PROCESAMIENTO DE VARIANTES:
  1. Obtiene todas las variantes del producto
  2. Filtra por disponibilidad
  3. Ordena por precio de menor a mayor
  4. Asigna la variante más barata disponible
{% endcomment %}
{% liquid
  assign available_variants = product.variants | where: 'available', true
  assign sorted_variants = available_variants | sort: 'price'
  assign cheapest_variant = sorted_variants | first
%}
```

### 2. **Comentarios Sección por Sección**
```liquid
{% comment %} === CONFIGURACIÓN INICIAL === {% endcomment %}
{% liquid
  assign show_vendor = section.settings.show_vendor
  assign show_type = section.settings.show_type
  assign image_ratio = section.settings.image_ratio
%}

{% comment %} === VALIDACIÓN DE PRODUCTO === {% endcomment %}
{% liquid
  unless product
    assign product = all_products[section.settings.product_handle]
  endunless
  
  if product == blank
    break
  endif
%}

{% comment %} === CÁLCULOS DE PRECIO === {% endcomment %}
{% liquid
  assign has_discount = false
  if product.compare_at_price > product.price
    assign has_discount = true
    assign savings = product.compare_at_price | minus: product.price
    assign savings_percentage = savings | times: 100 | divided_by: product.compare_at_price | round
  endif
%}
```

### 3. **Documentación de Parámetros**
```liquid
{% comment %}
  SNIPPET: Product Card Enhanced
  
  PARÁMETROS REQUERIDOS:
  - product: Objeto producto de Shopify
  - card_style: string ('default', 'minimal', 'detailed')
  
  PARÁMETROS OPCIONALES:
  - show_vendor: boolean (default: false)
  - show_description: boolean (default: true)
  - image_ratio: string ('square', 'portrait', 'landscape')
  
  METAFIELDS UTILIZADOS:
  - product.metafields.custom.material
  - product.metafields.custom.care_instructions
{% endcomment %}
{% liquid
  assign card_style = card_style | default: 'default'
  assign show_vendor = show_vendor | default: false
  assign show_description = show_description | default: true
  assign image_ratio = image_ratio | default: 'square'
%}
```

## ⚠️ **Errores Comunes y Soluciones**

### Error 1: Comentarios dentro de `{% liquid %}`
```liquid
❌ INCORRECTO:
{% liquid
  {% comment %} Esto rompe el código {% endcomment %}
  assign total = 0
%}

✅ CORRECTO:
{% comment %} Inicializar total en cero {% endcomment %}
{% liquid
  assign total = 0
%}
```

### Error 2: Comentarios anidados
```liquid
❌ INCORRECTO:
{% comment %} 
  Esto es un comentario
  {% comment %} Y esto otro {% endcomment %}
{% endcomment %}

✅ CORRECTO:
{% comment %} 
  Esto es un comentario principal
  - Punto 1: Primera funcionalidad
  - Punto 2: Segunda funcionalidad
{% endcomment %}
```

### Error 3: Comentarios en loops complejos
```liquid
❌ INCORRECTO:
{% for product in collection.products %}
  {% liquid
    {% comment %} Proceso cada producto {% endcomment %}
    assign product_title = product.title
  %}
{% endfor %}

✅ CORRECTO:
{% comment %} Procesar todos los productos de la colección {% endcomment %}
{% for product in collection.products %}
  {% liquid
    assign product_title = product.title
    assign product_handle = product.handle
  %}
  
  {% comment %} Renderizar tarjeta de producto {% endcomment %}
  {% render 'product-card', product: product %}
{% endfor %}
```

## 🎨 **Patrones Recomendados**

### 1. **Estructura de Comentarios por Secciones**
```liquid
{% comment %}
===========================================
SECCIÓN: Hero Product Banner
PROPÓSITO: Mostrar producto destacado con información completa
ACTUALIZADO: {{ 'now' | date: '%Y-%m-%d' }}
===========================================
{% endcomment %}

{% comment %} --- CONFIGURACIÓN INICIAL --- {% endcomment %}
{% liquid
  assign featured_product = all_products[section.settings.product]
  assign layout = section.settings.layout
  assign show_price = section.settings.show_price
%}

{% comment %} --- VALIDACIONES --- {% endcomment %}
{% liquid
  if featured_product == blank
    assign featured_product = collections.all.products.first
  endif
  
  unless featured_product
    break
  endunless
%}

{% comment %} --- CÁLCULOS DE DATOS --- {% endcomment %}
{% liquid
  assign product_images = featured_product.images
  assign first_variant = featured_product.selected_or_first_available_variant
  assign product_form_id = 'product-form-' | append: section.id
%}
```

### 2. **Comentarios para Lógica Compleja**
```liquid
{% comment %}
  LÓGICA COMPLEJA: Determinar estado de inventario
  - Si es tracking de inventario: mostrar cantidad exacta
  - Si no es tracking: mostrar "En stock" o "Agotado"
  - Si permite backorder: mostrar "Disponible bajo pedido"
{% endcomment %}
{% liquid
  assign inventory_message = ''
  
  if first_variant.inventory_management == 'shopify'
    if first_variant.inventory_quantity > 0
      assign inventory_message = first_variant.inventory_quantity | append: ' disponibles'
    elsif first_variant.inventory_policy == 'continue'
      assign inventory_message = 'Disponible bajo pedido'
    else
      assign inventory_message = 'Agotado'
    endif
  else
    if first_variant.available
      assign inventory_message = 'En stock'
    else
      assign inventory_message = 'No disponible'
    endif
  endif
%}
```

### 3. **Documentación de Snippets**
```liquid
{% comment %}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SNIPPET: product-price-display.liquid
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROPÓSITO:
Muestra el precio del producto con diferentes formatos y estilos

PARÁMETROS:
├── product (requerido): Objeto producto de Shopify
├── variant (opcional): Variante específica, por defecto usa la primera disponible
├── show_compare_price (opcional): Boolean, mostrar precio comparativo
├── show_unit_price (opcional): Boolean, mostrar precio por unidad
├── price_class (opcional): Clase CSS adicional para el precio
└── currency_format (opcional): 'symbol' o 'code', formato de moneda

SALIDA:
HTML con estructura de precios formateada y responsive

DEPENDENCIAS:
- Filtros de Shopify: money, money_with_currency
- CSS classes: .price, .price--compare, .price--unit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{% endcomment %}

{% comment %} Parámetros con valores por defecto {% endcomment %}
{% liquid
  assign target_variant = variant | default: product.selected_or_first_available_variant
  assign show_compare_price = show_compare_price | default: true
  assign show_unit_price = show_unit_price | default: false
  assign price_class = price_class | default: ''
  assign currency_format = currency_format | default: 'symbol'
%}
```

## 📋 **Checklist de Comentarios**

### Antes de Escribir Comentarios
- [ ] ¿Estoy dentro de un tag `{% liquid %}`? → NO comentar
- [ ] ¿Estoy dentro de `{% %}` individuales? → NO comentar
- [ ] ¿Es lógica compleja que necesita explicación? → SÍ comentar
- [ ] ¿Es un snippet que otros van a usar? → Documentar parámetros
- [ ] ¿Uso metafields o lógica específica? → Documentar dependencias

### Al Escribir el Código
- [ ] Comentarios ANTES de bloques `{% liquid %}`
- [ ] Un comentario por funcionalidad principal
- [ ] Explicar el "por qué", no el "qué"
- [ ] Usar formato consistente en todo el proyecto
- [ ] Actualizar comentarios cuando cambio código

### Para Snippets y Secciones
- [ ] Comentario de cabecera con propósito
- [ ] Lista de parámetros requeridos y opcionales
- [ ] Dependencias (metafields, configuraciones, assets)
- [ ] Ejemplos de uso cuando sea complejo
- [ ] Fecha de última actualización

## 🚀 **Mejores Prácticas**

### 1. **Jerarquía de Comentarios**
```liquid
{% comment %} 
═══════════════════════════════════════
NIVEL 1: Sección Principal
═══════════════════════════════════════
{% endcomment %}

{% comment %} --- NIVEL 2: Subsección --- {% endcomment %}

{% comment %} NIVEL 3: Funcionalidad específica {% endcomment %}
```

### 2. **Comentarios Condicionales**
```liquid
{% comment %} 
  TODO: Agregar soporte para múltiples monedas
  FIXME: El cálculo de descuento no funciona con productos en oferta
  NOTE: Esta lógica depende del metafield custom.special_price
{% endcomment %}
```

### 3. **Versionado en Comentarios**
```liquid
{% comment %}
  CHANGELOG:
  v1.0 - Implementación inicial
  v1.1 - Agregado soporte para variantes múltiples
  v1.2 - Corregido bug con precios en diferentes monedas
  v2.0 - Refactorizado para usar metafields
{% endcomment %}
```