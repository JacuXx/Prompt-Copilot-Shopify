# Reglas de Código Limpio - CERO COMENTARIOS# Reglas de Comentarios en Liquid



## ⛔ REGLA ABSOLUTA: CÓDIGO SIN COMENTARIOS## Principio Fundamental: Código Autoexplicativo



### El código DEBE explicarse por sí solo### El código debe explicarse por sí solo

El código bien escrito NO necesita comentarios. Si sientes que necesitas agregar un comentario, significa que debes refactorizar el código para que sea más claro.- **Variables con nombres descriptivos**: `product_discount_percentage` en lugar de `discount`

- **Funciones y snippets con nombres claros**: `calculate-shipping-cost.liquid` en lugar de `shipping.liquid`

**Variables con nombres descriptivos:**- **Lógica simple y legible**: Evitar complejidad innecesaria

- ✅ `product_discount_percentage` - **Estructura organizada**: Agrupación lógica de funcionalidades

- ❌ `discount` o `d`

### Comentarios: Mínimos y Solo Cuando Aporten Valor Real

**Snippets con nombres claros:**- **NO para explicar QUÉ hace el código** (debe ser obvio)

- ✅ `calculate-shipping-cost.liquid`- **SÍ para explicar POR QUÉ se hace algo** (decisiones de negocio)

- ❌ `shipping.liquid` o `calc.liquid`- **SÍ para documentar dependencias críticas** (metafields, APIs externas)

- **SÍ para advertir sobre efectos secundarios** o comportamientos no obvios

**Lógica simple y directa:**

- Evitar complejidad innecesaria## CRÍTICO: Dónde NO se pueden usar comentarioseglas de Comentarios en Liquid

- Código que se lee como una historia

- Variables intermedias que explican el proceso## 🚫 CRÍTICO: Dónde NO se pueden usar comentarios



## 🚫 PROHIBIDO: Todo tipo de comentarios### ❌ **NUNCA comentar dentro de tags `{% liquid %}`**



### NUNCA uses estos comentarios:#### Incorrecto - ROMPERÁ el código:

```liquid```liquid

❌ {% comment %} Este es un comentario Liquid {% endcomment %}{% liquid

❌ <!-- Este es un comentario HTML -->  {% comment %} Esto NO funciona {% endcomment %}

❌ // Este es un comentario JavaScript  unless product

❌ /* Este es un comentario CSS */    assign product = section.settings.product

```  endunless

  

### Por qué NO comentarios:  {% comment %} Esto TAMPOCO funciona {% endcomment %}

- **Código obvio no necesita explicación** - Las variables descriptivas lo dicen todo  if block.settings.title == blank

- **Código confuso debe refactorizarse** - No agregar comentarios, mejorar el código    continue

- **Los comentarios mienten** - El código evoluciona, los comentarios quedan obsoletos  endif

- **Ruido visual** - Ensucian el código y dificultan la lectura%}

- **Mantenimiento doble** - Cambias código pero olvidas actualizar comentarios```



## ✅ Código Autoexplicativo - Ejemplos#### ❌ **NUNCA comentar dentro de tags individuales `{% %}`**

```liquid

### ❌ INCORRECTO: Con comentarios{% comment %} Esto NO funciona {% endcomment %}

```liquid{% unless product %}

{% liquid  {% comment %} Esto tampoco {% endcomment %}

  assign p = product  {% assign product = section.settings.product %}

  assign d = p.compare_at_price | minus: p.price{% endunless %}

  assign pct = d | times: 100 | divided_by: p.compare_at_price```

%}

```### ✅ **CORRECTO: Dónde SÍ se pueden usar comentarios**



### ✅ CORRECTO: Sin comentarios, nombres claros#### Fuera de los tags de Liquid:

```liquid```liquid

{% liquid{% comment %} 

  assign selected_product = product  Verificamos si existe un producto asignado

  assign price_difference = selected_product.compare_at_price | minus: selected_product.price  Si no existe, tomamos el producto de la configuración de sección

  assign discount_percentage = price_difference | times: 100 | divided_by: selected_product.compare_at_price | round{% endcomment %}

%}{% liquid

```  unless product

    assign product = section.settings.product

### ❌ INCORRECTO: Comentarios innecesarios  endunless

```liquid  if block.settings.title == blank or product.description == blank

{% assign cart_subtotal = cart.total_price %}    continue

{% assign shipping_threshold = 50000 %}  endif

{% assign remaining_for_free_shipping = shipping_threshold | minus: cart_subtotal %}%}



{% if remaining_for_free_shipping <= 0 %}{% comment %} 

  <p class="shipping-message success">¡Envío gratis!</p>  Ahora procesamos la información del producto

{% else %}{% endcomment %}

  <p class="shipping-message"><div class="product-info">

    Faltan {{ remaining_for_free_shipping | money }} para envío gratis  {{ product.title }}

  </p></div>

{% endif %}```

```

## 🎯 **Reglas Fundamentales de Comentarios**

### ✅ CORRECTO: Código limpio sin comentarios

```liquid### 1. **Tags `{% liquid %}` - Sin comentarios internos**

{% liquid```liquid

  assign cart_subtotal = cart.total_price{% comment %} 

  assign free_shipping_threshold = 50000  BLOQUE LIQUID: Procesamiento de variables de producto

  assign amount_remaining_for_free_shipping = free_shipping_threshold | minus: cart_subtotal  - Asigna producto desde settings si no existe

  assign qualifies_for_free_shipping = amount_remaining_for_free_shipping <= 0  - Valida que tengamos título y descripción

%}  - Sale del loop si falta información

{% endcomment %}

{% if qualifies_for_free_shipping %}{% liquid

  <p class="shipping-message success">¡Envío gratis aplicado!</p>  unless product

{% else %}    assign product = section.settings.product

  <p class="shipping-message progress">  endunless

    Te faltan {{ amount_remaining_for_free_shipping | money }} para envío gratis  

  </p>  if block.settings.title == blank or product.description == blank

{% endif %}    continue

```  endif

  

## JavaScript Sin Comentarios  assign product_price = product.price | money

  assign product_compare_price = product.compare_at_price | money

### ❌ INCORRECTO: Con comentarios%}

```javascript```

function addToCart(variantId, quantity) {

  const response = await fetch('/cart/add.js', {### 2. **Tags individuales - Comentarios externos**

    method: 'POST',```liquid

    headers: {{% comment %} Verificar si hay producto disponible {% endcomment %}

      'Content-Type': 'application/json',{% unless product %}

      'X-Requested-With': 'XMLHttpRequest'  {% comment %} Asignar producto desde configuración {% endcomment %}

    },  {% assign product = section.settings.product %}

    body: JSON.stringify({{% endunless %}

      items: [{

        id: variantId,{% comment %} Validar información requerida {% endcomment %}

        quantity: quantity{% if block.settings.title == blank or product.description == blank %}

      }]  {% continue %}

    }){% endif %}

  });```

  

  const data = await response.json();### 3. **HTML con Liquid - Comentarios mixtos**

  ```liquid

  updateCartUI(data);{% comment %} 

    Sección de información de producto

  return data;  Muestra título, precio y descripción si están disponibles

}{% endcomment %}

```<div class="product-section">

  {% comment %} Título del producto {% endcomment %}

### ✅ CORRECTO: Sin comentarios, nombres claros  {% if product.title != blank %}

```javascript    <h2>{{ product.title }}</h2>

async function addProductToCart(variantId, quantity = 1) {  {% endif %}

  const cartResponse = await fetch('/cart/add.js', {  

    method: 'POST',  <!-- Este es un comentario HTML normal -->

    headers: {  {% comment %} Precio del producto con validación {% endcomment %}

      'Content-Type': 'application/json',  {% if product.price %}

      'X-Requested-With': 'XMLHttpRequest'    <p class="price">{{ product.price | money }}</p>

    },  {% endif %}

    body: JSON.stringify({</div>

      items: [{```

        id: variantId,

        quantity: quantity## 📝 **Estrategias de Documentación**

      }]

    })### 1. **Comentarios de Bloque Antes del Código**

  });```liquid

  {% comment %} 

  if (!cartResponse.ok) {  PROCESAMIENTO DE VARIANTES:

    throw new Error(`Error al agregar al carrito: ${cartResponse.status}`);  1. Obtiene todas las variantes del producto

  }  2. Filtra por disponibilidad

    3. Ordena por precio de menor a mayor

  const updatedCartData = await cartResponse.json();  4. Asigna la variante más barata disponible

  updateCartUserInterface(updatedCartData);{% endcomment %}

  {% liquid

  return updatedCartData;  assign available_variants = product.variants | where: 'available', true

}  assign sorted_variants = available_variants | sort: 'price'

```  assign cheapest_variant = sorted_variants | first

%}

## Estructura de Código Limpio```



### Variables intermedias que explican el proceso### 2. **Comentarios Útiles y Específicos**

```liquid```liquid

{% liquid{% comment %} Configuración inicial de sección {% endcomment %}

  assign original_price = product.compare_at_price{% liquid

  assign current_price = product.price  assign show_vendor = section.settings.show_vendor

  assign has_discount = original_price > current_price  assign show_type = section.settings.show_type

%}  assign image_ratio = section.settings.image_ratio

%}

{% if has_discount %}

  {% liquid{% liquid

    assign price_difference = original_price | minus: current_price  unless product

    assign discount_percentage = price_difference | times: 100 | divided_by: original_price | round    assign product = all_products[section.settings.product_handle]

  %}  endunless

    

  <span class="discount-badge">{{ discount_percentage }}% OFF</span>  if product == blank

{% endif %}    break

```  endif

%}

### Nombres de funciones descriptivas

```liquid{% comment %} Cálculo de descuento y porcentaje de ahorro {% endcomment %}

{% liquid{% liquid

  assign available_variants = product.variants | where: 'available', true  assign has_discount = false

  assign sorted_by_price = available_variants | sort: 'price'  if product.compare_at_price > product.price

  assign cheapest_available_variant = sorted_by_price | first    assign has_discount = true

%}    assign savings = product.compare_at_price | minus: product.price

    assign savings_percentage = savings | times: 100 | divided_by: product.compare_at_price | round

{% liquid  endif

  assign has_stock = cheapest_available_variant.inventory_quantity > 0%}

  assign allows_backorder = cheapest_available_variant.inventory_policy == 'continue'```

  assign can_be_purchased = has_stock or allows_backorder

%}### 3. **Documentación Limpia de Snippets**

```liquid

{% if can_be_purchased %}{% comment %}

  {% assign display_price = cheapest_available_variant.price | money %}  Product Card Enhanced

  <p class="price">{{ display_price }}</p>  

{% endif %}  Parámetros:

```  - product (requerido)

  - card_style: 'default', 'minimal', 'detailed'

## Principios de Código Limpio  - show_vendor: boolean, default false

  - show_description: boolean, default true

### 1. Nombres que eliminan comentarios  

- Variables con nombres largos y descriptivos  Usa metafields: custom.material, custom.care_instructions

- Funciones que dicen exactamente qué hacen{% endcomment %}

- Clases CSS con nombres semánticos{% liquid

  assign card_style = card_style | default: 'default'

### 2. División lógica clara  assign show_vendor = show_vendor | default: false

- Separar lógica compleja en pasos simples  assign show_description = show_description | default: true

- Variables intermedias para cada concepto%}

- Agrupar código relacionado visualmente```



### 3. Estructura que se lee sola## ⚠️ **Errores Comunes y Soluciones**

- Código que fluye de arriba a abajo

- Lógica que sigue un orden natural### Error 1: Comentarios dentro de `{% liquid %}`

- Condiciones que se leen como lenguaje natural```liquid

❌ INCORRECTO:

### 4. Consistencia en el proyecto{% liquid

- Mismo estilo en todo el código  {% comment %} Esto rompe el código {% endcomment %}

- Patrones reconocibles y repetibles  assign total = 0

- Convenciones claras de nomenclatura%}



## Checklist: Antes de Escribir Código✅ CORRECTO:

{% comment %} Inicializar total en cero {% endcomment %}

### Pregúntate SIEMPRE:{% liquid

- [ ] ¿Los nombres de variables explican completamente su propósito?  assign total = 0

- [ ] ¿La lógica es tan simple que cualquiera puede entenderla?%}

- [ ] ¿Puedo dividir esto en pasos más pequeños y claros?```

- [ ] ¿Las condiciones se leen como lenguaje natural?

- [ ] ¿Otro desarrollador entendería esto sin ayuda?### Error 2: Comentarios anidados

```liquid

### NUNCA:❌ INCORRECTO:

- [ ] Agregar comentarios tipo `{% comment %}`{% comment %} 

- [ ] Usar comentarios HTML `<!-- -->`  Esto es un comentario

- [ ] Incluir comentarios JavaScript `//` o `/* */`  {% comment %} Y esto otro {% endcomment %}

- [ ] Comentar código "por si acaso"{% endcomment %}

- [ ] Dejar código comentado en el repositorio

✅ CORRECTO:

### SIEMPRE:{% comment %} 

- [ ] Nombres largos y descriptivos sobre comentarios  Esto es un comentario principal

- [ ] Refactorizar código confuso en lugar de comentarlo  - Punto 1: Primera funcionalidad

- [ ] Código que se explica solo por su estructura  - Punto 2: Segunda funcionalidad

- [ ] Variables intermedias para claridad{% endcomment %}

- [ ] Funciones pequeñas con propósito único```



## Resumen Final### Error 3: Comentarios en loops complejos

```liquid

**La regla es simple: CERO COMENTARIOS en el código.**❌ INCORRECTO:

{% for product in collection.products %}

Si sientes que necesitas un comentario:  {% liquid

1. **Refactoriza el código** para que sea más claro    {% comment %} Proceso cada producto {% endcomment %}

2. **Usa mejores nombres** de variables y funciones    assign product_title = product.title

3. **Divide la lógica** en pasos más simples  %}

4. **Reorganiza la estructura** para que fluya mejor{% endfor %}



**El mejor código es el que no necesita explicación.**✅ CORRECTO:

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

