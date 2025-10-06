# Reglas de Comentarios en Liquid

## Principio Fundamental: Código Autoexplicativo

### El código debe explicarse por sí solo
- **Variables con nombres descriptivos**: `product_discount_percentage` en lugar de `discount`
- **Funciones y snippets con nombres claros**: `calculate-shipping-cost.liquid` en lugar de `shipping.liquid`
- **Lógica simple y legible**: Evitar complejidad innecesaria
- **Estructura organizada**: Agrupación lógica de funcionalidades

### Comentarios: Mínimos y Solo Cuando Aporten Valor Real
- **NO para explicar QUÉ hace el código** (debe ser obvio)
- **SÍ para explicar POR QUÉ se hace algo** (decisiones de negocio)
- **SÍ para documentar dependencias críticas** (metafields, APIs externas)
- **SÍ para advertir sobre efectos secundarios** o comportamientos no obvios

## CRÍTICO: Dónde NO se pueden usar comentarioseglas de Comentarios en Liquid

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

## **Checklist: Código Limpio para Otros Desarrolladores**

### ANTES de escribir un comentario, pregúntate:
- [ ] ¿Puedo hacer el código más claro con mejores nombres de variables?
- [ ] ¿Puedo simplificar la lógica para que sea más obvia?
- [ ] ¿Puedo dividir esto en funciones/snippets más pequeños y claros?
- [ ] ¿Este comentario realmente ayuda a otro desarrollador?

### NUNCA comentar:
- [ ] Código que cualquier desarrollador puede entender
- [ ] Lo que hace cada línea (debe ser autoexplicativo)
- [ ] Información obvia del contexto
- [ ] Dentro de tags `{% liquid %}` o `{% %}` (técnicamente imposible)

### SÍ comentar SOLO cuando:
- [ ] Hay lógica de negocio específica que no es técnicamente obvia
- [ ] Se requieren dependencias externas (metafields, apps, APIs)
- [ ] Hay limitaciones o efectos secundarios no obvios
- [ ] Es un snippet complejo que otros desarrolladores van a reutilizar
- [ ] Hay decisiones técnicas que necesitan justificación

### Para otros desarrolladores que lean tu código:
- [ ] ¿Entenderían la intención sin comentarios?
- [ ] ¿Los nombres de variables/funciones son descriptivos?
- [ ] ¿La estructura es lógica y clara?
- [ ] ¿Los comentarios que agregué realmente los ayudan?

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

### Código Autoexplicativo vs Comentarios Innecesarios

#### ❌ Código que NECESITA comentarios (mal diseñado)
```liquid
{% comment %} Asignar producto {% endcomment %}
{% assign p = section.settings.product %}

{% comment %} Calcular descuento {% endcomment %}
{% assign d = p.compare_at_price | minus: p.price | times: 100 | divided_by: p.compare_at_price %}

{% comment %} Mostrar si hay descuento {% endcomment %}
{% if d > 0 %}
  <span>{{ d }}%</span>
{% endif %}
```

#### ✅ Código autoexplicativo (bien diseñado)
```liquid
{% liquid
  assign featured_product = section.settings.product
  assign original_price = featured_product.compare_at_price
  assign current_price = featured_product.price
  assign discount_percentage = original_price | minus: current_price | times: 100 | divided_by: original_price | round
%}

{% if discount_percentage > 0 %}
  <span class="discount-badge">{{ discount_percentage }}% OFF</span>
{% endif %}
```

#### ✅ Comentarios SOLO cuando añaden valor real
```liquid
{% comment %} Fallback requerido por política de negocio: siempre mostrar un producto {% endcomment %}
{% unless featured_product %}
  {% assign featured_product = collections.featured.products.first %}
{% endunless %}

{% comment %} API externa: requiere token configurado en metafield shop.api_token {% endcomment %}
{% if shop.metafields.integrations.api_token %}
  {% render 'external-reviews', product: featured_product %}
{% endif %}
```

### Reglas de Oro para Código Limpio

#### PRIMERO: Haz que el código se explique solo
1. **Usa nombres descriptivos** para variables y snippets
2. **Estructura lógica clara** y organizada
3. **Evita complejidad innecesaria** y lógica confusa
4. **Agrupa funcionalidades relacionadas**

#### SEGUNDO: Comentarios mínimos y valiosos
1. **NO expliques QUÉ hace el código** (debe ser obvio)
2. **SÍ explica POR QUÉ lo haces** (decisiones de negocio)
3. **Documenta dependencias críticas** (metafields, APIs, configuraciones)
4. **Advierte sobre efectos no obvios** o limitaciones
5. **Marca TODOs/FIXMEs solo cuando sean accionables**

#### TERCERO: Menos es más
- **Un comentario que explica 20 líneas** es mejor que 20 comentarios de 1 línea
- **Sin comentarios es mejor** que comentarios obvios
- **Código claro sin comentarios** es mejor que código confuso con muchos comentarios

## **Escribir Código para Otros Desarrolladores**

### Principio: "El siguiente desarrollador podría ser tú en 6 meses"

#### Código que se explica solo
```liquid
{% liquid
  assign cart_subtotal = cart.total_price
  assign shipping_threshold = 50000
  assign remaining_for_free_shipping = shipping_threshold | minus: cart_subtotal
  assign qualifies_for_free_shipping = remaining_for_free_shipping <= 0
%}

{% if qualifies_for_free_shipping %}
  <p class="shipping-message success">¡Envío gratis aplicado!</p>
{% else %}
  <p class="shipping-message progress">
    Te faltan {{ remaining_for_free_shipping | money }} para envío gratis
  </p>
{% endif %}
```

#### Comentarios cuando realmente ayudan
```liquid
{% comment %} 
  Política de negocio: Envío gratis solo en Península, 
  Islas y Canarias requieren metafield shop.shipping_zones 
{% endcomment %}
{% if shop.metafields.custom.shipping_zones contains customer.default_address.province %}
  {% assign free_shipping_available = true %}
{% endif %}

{% comment %} 
  API limitation: Shopify cart total no incluye descuentos automáticos,
  se calculan en checkout. Usar cart.original_total_price para threshold real 
{% endcomment %}
{% liquid
  assign cart_total_with_discounts = cart.original_total_price
  for discount in cart.cart_level_discount_applications
    assign cart_total_with_discounts = cart_total_with_discounts | minus: discount.total_allocated_amount
  endfor
%}
```

### Nombres que eliminan la necesidad de comentarios
```liquid
{% comment %} MALO: Necesita comentarios {% endcomment %}
{% assign p = product %}
{% assign d = p.compare_at_price | minus: p.price %}
{% comment %} Calcular porcentaje de descuento {% endcomment %}
{% assign pct = d | times: 100 | divided_by: p.compare_at_price %}

{% comment %} BUENO: Se explica solo {% endcomment %}
{% liquid
  assign selected_product = product
  assign price_difference = selected_product.compare_at_price | minus: selected_product.price
  assign discount_percentage = price_difference | times: 100 | divided_by: selected_product.compare_at_price | round
%}
```

### Estructura que reduce comentarios
```liquid
{% comment %} MALO: Mucha lógica junta necesita explicación {% endcomment %}
{% liquid
  assign x = product.variants | where: 'available', true | sort: 'price' | first
  if x.inventory_management == 'shopify' and x.inventory_quantity > 0 or x.inventory_policy == 'continue'
    assign y = x.price | money
  endif
%}

{% comment %} BUENO: División lógica clara {% endcomment %}
{% liquid
  assign available_variants = product.variants | where: 'available', true
  assign cheapest_variant = available_variants | sort: 'price' | first
%}

{% liquid
  assign has_inventory = cheapest_variant.inventory_quantity > 0
  assign allows_backorder = cheapest_variant.inventory_policy == 'continue'
  assign is_purchasable = has_inventory or allows_backorder
%}

{% if is_purchasable %}
  {% assign display_price = cheapest_variant.price | money %}
{% endif %}
```

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

