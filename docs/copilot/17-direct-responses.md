# Guía: Respuestas Directas sin Markdown Innecesario

## Problema: Copilot Genera Documentación en Lugar de Código

### Comportamiento Problemático
Cuando se pide una función o tarea específica, GitHub Copilot a veces genera respuestas como:

```markdown
## Función de Carrusel de Productos

### Descripción
Esta función crea un carrusel de productos para tu tienda Shopify...

### Características
- Navegación con flechas
- Indicadores de página
- Responsive design
- Autoplay opcional

### Instalación
1. Crea el archivo...
2. Agrega el código...
```

### Comportamiento Deseado
Cuando se pide código, debe generar **directamente el código**, no documentación:

```liquid
{% comment %} Carrusel de productos responsive {% endcomment %}
<div class="product-carousel" data-autoplay="{{ section.settings.autoplay }}">
  <div class="carousel-track">
    {% for product in collection.products limit: section.settings.products_limit %}
      <div class="carousel-slide">
        {% render 'product-card', product: product %}
      </div>
    {% endfor %}
  </div>
</div>
```

## Reglas para Respuestas Directas

### SIEMPRE responder con código directo cuando se pide:
- "Crea una sección de..."
- "Genera un snippet para..."
- "Implementa una función de..."
- "Desarrolla un componente..."
- "Agrega funcionalidad para..."
- "Construye un carrusel..."
- "Haz un formulario..."

### SOLO generar markdown cuando específicamente se pida:
- "Explícame cómo..."
- "Documenta el proceso de..."
- "Crea una guía para..."
- "Describe las características de..."
- "Dame instrucciones para..."

## Ejemplos de Respuestas Correctas

### Petición: "Crea una sección de testimonios"

#### ❌ Respuesta Incorrecta (con markdown innecesario):
```markdown
# Sección de Testimonios

## Descripción
Esta sección muestra testimonios de clientes...

## Código:
```

#### ✅ Respuesta Correcta (código directo):
```liquid
{% comment %} Sección de testimonios con carrusel {% endcomment %}
<section class="testimonials-section">
  <div class="container">
    <h2>{{ section.settings.title }}</h2>
    <div class="testimonials-grid">
      {% for block in section.blocks %}
        <div class="testimonial-item">
          <p>"{{ block.settings.testimonial_text }}"</p>
          <cite>{{ block.settings.customer_name }}</cite>
        </div>
      {% endfor %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Testimonios",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Título",
      "default": "Lo que dicen nuestros clientes"
    }
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonio",
      "settings": [
        {
          "type": "textarea",
          "id": "testimonial_text",
          "label": "Testimonio"
        },
        {
          "type": "text",
          "id": "customer_name",
          "label": "Nombre del cliente"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Testimonios"
    }
  ]
}
{% endschema %}
```

### Petición: "Agrega un snippet para mostrar precio con descuento"

#### ❌ Respuesta Incorrecta:
```markdown
## Snippet de Precio con Descuento

### Funcionalidad
Este snippet calculará automáticamente...

### Parámetros necesarios...
```

#### ✅ Respuesta Correcta:
```liquid
{% comment %} 
  Snippet: price-with-discount.liquid
  Parámetros: product (requerido), show_savings (opcional)
{% endcomment %}

{% liquid
  assign current_variant = product.selected_or_first_available_variant
  assign has_discount = false
  
  if current_variant.compare_at_price > current_variant.price
    assign has_discount = true
    assign savings_amount = current_variant.compare_at_price | minus: current_variant.price
    assign savings_percent = savings_amount | times: 100 | divided_by: current_variant.compare_at_price | round
  endif
%}

<div class="price-container">
  {% if has_discount %}
    <span class="price price--sale">{{ current_variant.price | money }}</span>
    <span class="price price--compare">{{ current_variant.compare_at_price | money }}</span>
    
    {% if show_savings %}
      <span class="price-savings">
        Ahorras {{ savings_amount | money }} ({{ savings_percent }}%)
      </span>
    {% endif %}
  {% else %}
    <span class="price">{{ current_variant.price | money }}</span>
  {% endif %}
</div>
```

## Palabras Clave que Requieren Código Directo

### Verbos de Acción = Código Directo
- **Crea** una sección...
- **Genera** un snippet...
- **Desarrolla** un componente...
- **Implementa** una función...
- **Construye** un carrusel...
- **Agrega** funcionalidad...
- **Haz** un formulario...
- **Programa** una validación...
- **Codifica** una integración...

### Verbos de Explicación = Pueden incluir markdown
- **Explica** cómo funciona...
- **Describe** el proceso...
- **Documenta** los pasos...
- **Detalla** las características...
- **Lista** los requerimientos...

## Formato de Respuesta Ideal

### Para Peticiones de Código:

1. **Comentario breve** (si es necesario) explicando el propósito
2. **Código completo y funcional**
3. **Schema incluido** (si es sección)
4. **Estilos básicos** (si es necesario)
5. **Sin explicaciones adicionales** a menos que se pidan

### Estructura:
```liquid
{% comment %} Propósito breve del componente {% endcomment %}
[CÓDIGO LIQUID COMPLETO]

{% schema %}
[SCHEMA COMPLETO]
{% endschema %}

<style>
[ESTILOS BÁSICOS SI SON NECESARIOS]
</style>
```

## Casos Especiales

### Cuando SÍ incluir explicación breve:
- Código complejo que requiere configuración especial
- Dependencias específicas (metafields, apps, etc.)
- Consideraciones importantes de implementación

#### Ejemplo:
```liquid
{% comment %} 
  Requiere app de reviews instalada y metafield product.reviews configurado
  Usa AJAX para cargar reviews dinámicamente
{% endcomment %}
<div class="product-reviews" data-product-id="{{ product.id }}">
  [CÓDIGO...]
</div>
```

### Cuándo NO incluir explicaciones:
- Código estándar de Shopify
- Funcionalidad común y conocida
- Snippets simples
- Secciones básicas

## Prompt Templates para Respuestas Directas

### Para Secciones:
```
Crea una sección [nombre] que [funcionalidad]. Incluye schema completo y estilos básicos.
```

### Para Snippets:
```
Genera un snippet [nombre] que [funcionalidad]. Con parámetros [lista parámetros].
```

### Para Funciones JavaScript:
```
Implementa una función que [funcionalidad]. Usar vanilla JavaScript, compatible con todos los browsers.
```

## Configuración Mental para Copilot

### Principio: "Código Primero"
- Si se pide **crear/generar/implementar** → Respuesta = CÓDIGO
- Si se pide **explicar/documentar/describir** → Respuesta = EXPLICACIÓN
- Cuando hay dudas → Preguntar qué prefiere el usuario

### Estructura de Respuesta Eficiente:
1. **Identificar** si es petición de código o explicación
2. **Responder directamente** con lo solicitado
3. **Incluir solo contexto esencial**
4. **Evitar documentación innecesaria**

## Ejemplos de Prompts Efectivos

### Para Obtener Código Directo:
```
"Crea una sección de productos relacionados con carrusel"
"Genera un snippet para mostrar badges de producto"
"Implementa validación de formulario en JavaScript"
"Desarrolla un componente de búsqueda predictiva"
```

### Resultado Esperado: Código completo, funcional, sin documentación extra.

### Para Obtener Explicaciones:
```
"Explica cómo funciona el sistema de variantes en Shopify"
"Describe el proceso de optimización de imágenes"
"Documenta los pasos para configurar metafields"
```

### Resultado Esperado: Explicación detallada con ejemplos cuando sea necesario.

## Beneficios de Respuestas Directas

1. **Eficiencia**: Código listo para usar inmediatamente
2. **Productividad**: No perder tiempo leyendo documentación obvia
3. **Claridad**: Enfoque en la implementación, no en la teoría
4. **Practicidad**: Soluciones concretas a problemas específicos
5. **Velocidad**: Desarrollo más rápido con menos fricción

## Recordatorio para Implementadores

### Cuando generes código:
- **Ir directo al grano**
- **Código completo y funcional**
- **Comentarios mínimos y útiles**
- **Sin explicaciones obvias**
- **Incluir todo lo necesario para que funcione**

### El usuario valora:
- Código que funciona inmediatamente
- Menos texto, más acción
- Soluciones completas
- Eficiencia en la comunicación