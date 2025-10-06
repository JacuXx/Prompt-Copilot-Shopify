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

### 2. **Comentarios Útiles y Específicos**
```liquid
{% comment %} Configuración inicial de sección {% endcomment %}
{% liquid
  assign show_vendor = section.settings.show_vendor
  assign show_type = section.settings.show_type
  assign image_ratio = section.settings.image_ratio
%}

{% liquid
  unless product
    assign product = all_products[section.settings.product_handle]
  endunless
  
  if product == blank
    break
  endif
%}

{% comment %} Cálculo de descuento y porcentaje de ahorro {% endcomment %}
{% liquid
  assign has_discount = false
  if product.compare_at_price > product.price
    assign has_discount = true
    assign savings = product.compare_at_price | minus: product.price
    assign savings_percentage = savings | times: 100 | divided_by: product.compare_at_price | round
  endif
%}
```

### 3. **Documentación Limpia de Snippets**
```liquid
{% comment %}
  Product Card Enhanced
  
  Parámetros:
  - product (requerido)
  - card_style: 'default', 'minimal', 'detailed'
  - show_vendor: boolean, default false
  - show_description: boolean, default true
  
  Usa metafields: custom.material, custom.care_instructions
{% endcomment %}
{% liquid
  assign card_style = card_style | default: 'default'
  assign show_vendor = show_vendor | default: false
  assign show_description = show_description | default: true
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

### 1. **Estructura Limpia de Comentarios**
```liquid
{% comment %}
  Hero Product Banner
  Muestra producto destacado con información completa
{% endcomment %}

{% liquid
  assign featured_product = all_products[section.settings.product]
  assign layout = section.settings.layout
  assign show_price = section.settings.show_price
%}

{% comment %} Validación y fallback de producto {% endcomment %}
{% liquid
  if featured_product == blank
    assign featured_product = collections.all.products.first
  endif
  
  unless featured_product
    break
  endunless
%}

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
  SNIPPET: product-price-display.liquid
  
  PARÁMETROS:
  - product (requerido): Objeto producto de Shopify
  - variant (opcional): Variante específica
  - show_compare_price (opcional): Boolean, mostrar precio comparativo
  - show_unit_price (opcional): Boolean, mostrar precio por unidad
  - price_class (opcional): Clase CSS adicional
  - currency_format (opcional): 'symbol' o 'code'
  
  DEPENDENCIAS:
  - Filtros: money, money_with_currency
  - CSS: .price, .price--compare, .price--unit
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

## **Reglas para Comentarios Útiles**

### NUNCA comentar:
- Código obvio o autoexplicativo
- Cada línea de código
- Lo que hace el código (es evidente)
- Dentro de tags `{% liquid %}` o `{% %}`

### SÍ comentar cuando:
- La lógica es compleja o no obvia
- Se usan metafields específicos
- Es un snippet que otros usarán (documentar parámetros)
- Hay lógica de negocio específica
- Se necesita explicar el "por qué", no el "qué"

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

## **Principios de Comentarios Profesionales**

### Comentarios Útiles vs Inútiles

#### ❌ Comentarios Inútiles
```liquid
{% comment %} Asignar producto {% endcomment %}
{% assign product = section.settings.product %}

{% comment %} Mostrar título del producto {% endcomment %}
<h2>{{ product.title }}</h2>

{% comment %} Precio del producto {% endcomment %}
<p>{{ product.price | money }}</p>
```

#### ✅ Comentarios Útiles
```liquid
{% comment %} Fallback a primer producto si no hay selección {% endcomment %}
{% unless product %}
  {% assign product = collections.all.products.first %}
{% endunless %}

{% comment %} Cálculo de descuento con validación de precio comparativo {% endcomment %}
{% liquid
  if product.compare_at_price > product.price
    assign discount_percentage = product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price | round
  endif
%}

{% comment %} Requiere metafield custom.shipping_info para mostrar información {% endcomment %}
{% if product.metafields.custom.shipping_info %}
  <p>{{ product.metafields.custom.shipping_info }}</p>
{% endif %}
```

### Reglas de Oro
1. **No expliques QUÉ hace el código** (es obvio al leerlo)
2. **Explica POR QUÉ lo haces** (lógica de negocio)
3. **Documenta dependencias** (metafields, configuraciones especiales)
4. **Marca TODOs y FIXMEs** cuando sea necesario
5. **Mantén comentarios actualizados** con el código

## **Mejores Prácticas**

### 1. **Comentarios Claros y Directos**
```liquid
{% comment %} Sección Principal {% endcomment %}

{% comment %} Subsección específica {% endcomment %}

{% comment %} Funcionalidad específica cuando sea necesario {% endcomment %}
```

### 2. **Comentarios de Desarrollo**
```liquid
{% comment %}
  TODO: Soporte para múltiples monedas
  FIXME: Cálculo de descuento con productos en oferta
  REQUIERE: metafield custom.special_price
{% endcomment %}
```

