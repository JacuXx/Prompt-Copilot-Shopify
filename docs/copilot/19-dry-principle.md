````markdown
# Principio DRY: Don't Repeat Yourself

## 🎯 REGLA FUNDAMENTAL: Evitar Duplicación Accidental de Código

### Principio Core
**NUNCA duplicar código, lógica o estilos.**  
Si necesitas usar algo más de una vez, créalo como componente reutilizable.

## ⚠️ Señales de Alerta de Duplicación

### 🚨 ANTES de escribir código, pregúntate:
- [ ] ¿Este código/funcionalidad ya existe en otro lugar?
- [ ] ¿Este snippet es similar a otro que ya creé?
- [ ] ¿Estoy copiando y pegando código de otra sección?
- [ ] ¿Esta lógica se repetirá en otros componentes?
- [ ] ¿Hay un snippet existente que pueda reutilizar?

## ❌ ANTI-PATRONES: Duplicación Común

### 1. Duplicación de Lógica de Productos

#### ❌ MAL: Código duplicado en múltiples secciones
```liquid
<!-- featured-products.liquid -->
{% for product in collection.products %}
  <div class="product-card">
    <img src="{{ product.featured_image | image_url: width: 300 }}">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
    {% if product.compare_at_price > product.price %}
      <span class="sale-badge">¡Oferta!</span>
    {% endif %}
  </div>
{% endfor %}

<!-- recommended-products.liquid -->
{% for product in recommendations.products %}
  <div class="product-card">
    <img src="{{ product.featured_image | image_url: width: 300 }}">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
    {% if product.compare_at_price > product.price %}
      <span class="sale-badge">¡Oferta!</span>
    {% endif %}
  </div>
{% endfor %}

<!-- recent-products.liquid -->
{% for product in recent_products %}
  <div class="product-card">
    <img src="{{ product.featured_image | image_url: width: 300 }}">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
    {% if product.compare_at_price > product.price %}
      <span class="sale-badge">¡Oferta!</span>
    {% endif %}
  </div>
{% endfor %}
```

#### ✅ BIEN: Un snippet reutilizable
```liquid
<!-- snippets/product-card.liquid -->
{% liquid
  assign image_width = image_width | default: 300
  assign show_vendor = show_vendor | default: false
  assign card_class = card_class | default: 'standard'
%}

<div class="product-card product-card--{{ card_class }}">
  <a href="{{ product.url }}" class="product-card__link">
    <img 
      src="{{ product.featured_image | image_url: width: image_width }}" 
      alt="{{ product.title }}"
      loading="lazy"
    >
    
    {% if product.compare_at_price > product.price %}
      <span class="product-card__badge product-card__badge--sale">¡Oferta!</span>
    {% endif %}
    
    {% if show_vendor and product.vendor != blank %}
      <p class="product-card__vendor">{{ product.vendor }}</p>
    {% endif %}
    
    <h3 class="product-card__title">{{ product.title }}</h3>
    
    <div class="product-card__price">
      <span class="product-card__price-current">{{ product.price | money }}</span>
      {% if product.compare_at_price > product.price %}
        <span class="product-card__price-compare">{{ product.compare_at_price | money }}</span>
      {% endif %}
    </div>
  </a>
</div>

<!-- USO en cualquier sección -->
{% for product in collection.products %}
  {% render 'product-card', product: product, image_width: 400 %}
{% endfor %}

{% for product in recommendations.products %}
  {% render 'product-card', product: product, show_vendor: true %}
{% endfor %}

{% for product in recent_products %}
  {% render 'product-card', product: product, card_class: 'compact' %}
{% endfor %}
```

### 2. Duplicación de Estilos CSS

#### ❌ MAL: Estilos repetidos en múltiples secciones
```liquid
<!-- hero-banner.liquid -->
<style>
  .hero-title {
    font-size: 48px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
</style>

<!-- featured-collection.liquid -->
<style>
  .collection-title {
    font-size: 48px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
</style>

<!-- about-section.liquid -->
<style>
  .about-heading {
    font-size: 48px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
</style>
```

#### ✅ BIEN: Clases CSS reutilizables
```liquid
<!-- Definir una vez en una sección base o theme.css -->
<style>
  .section-heading {
    font-size: 48px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  
  .section-heading--large {
    font-size: 64px;
  }
  
  .section-heading--small {
    font-size: 32px;
  }
  
  .section-heading--center {
    text-align: center;
  }
</style>

<!-- USO en cualquier sección -->
<h2 class="section-heading section-heading--center">{{ section.settings.heading }}</h2>
<h2 class="section-heading section-heading--large">{{ section.settings.heading }}</h2>
<h2 class="section-heading section-heading--small">{{ section.settings.heading }}</h2>
```

### 3. Duplicación de Lógica JavaScript

#### ❌ MAL: Mismo código en múltiples secciones
```liquid
<!-- carousel-1.liquid -->
<script>
  const carousel1 = document.querySelector('.carousel-1');
  let currentSlide1 = 0;
  
  function nextSlide1() {
    currentSlide1 = (currentSlide1 + 1) % slides1.length;
    updateCarousel1();
  }
  
  function updateCarousel1() {
    // lógica del carousel
  }
</script>

<!-- carousel-2.liquid -->
<script>
  const carousel2 = document.querySelector('.carousel-2');
  let currentSlide2 = 0;
  
  function nextSlide2() {
    currentSlide2 = (currentSlide2 + 1) % slides2.length;
    updateCarousel2();
  }
  
  function updateCarousel2() {
    // lógica del carousel
  }
</script>
```

#### ✅ BIEN: Clase reutilizable
```liquid
<!-- snippets/carousel.liquid -->
<div class="custom-carousel" data-carousel="{{ carousel_id }}">
  <!-- contenido del carousel -->
</div>

<script>
  class CustomCarousel {
    constructor(element) {
      this.element = element;
      this.currentSlide = 0;
      this.slides = element.querySelectorAll('.carousel-slide');
      this.init();
    }
    
    init() {
      this.setupControls();
      this.autoPlay();
    }
    
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.updateCarousel();
    }
    
    updateCarousel() {
      this.slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentSlide);
      });
    }
    
    setupControls() {
      const nextBtn = this.element.querySelector('.carousel-next');
      const prevBtn = this.element.querySelector('.carousel-prev');
      
      if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
      if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    autoPlay() {
      setInterval(() => this.nextSlide(), 5000);
    }
  }
  
  // Inicializar todos los carousels
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    new CustomCarousel(carousel);
  });
</script>

<!-- USO en cualquier sección -->
{% render 'carousel', carousel_id: 'featured', slides: featured_slides %}
{% render 'carousel', carousel_id: 'testimonials', slides: testimonial_slides %}
```

### 4. Duplicación de Validaciones y Checks

#### ❌ MAL: Mismas validaciones repetidas
```liquid
<!-- add-to-cart-1.liquid -->
{% liquid
  assign is_available = false
  if product.available and product.selected_or_first_available_variant.available
    assign is_available = true
  endif
%}

<!-- add-to-cart-2.liquid -->
{% liquid
  assign is_available = false
  if product.available and product.selected_or_first_available_variant.available
    assign is_available = true
  endif
%}

<!-- quick-view.liquid -->
{% liquid
  assign is_available = false
  if product.available and product.selected_or_first_available_variant.available
    assign is_available = true
  endif
%}
```

#### ✅ BIEN: Snippet para validaciones comunes
```liquid
<!-- snippets/product-availability-check.liquid -->
{% liquid
  assign is_available = false
  assign availability_message = ''
  
  if product.available == false
    assign availability_message = 'Producto agotado'
  elsif product.selected_or_first_available_variant.available == false
    assign availability_message = 'Variante no disponible'
  else
    assign is_available = true
    assign availability_message = 'Disponible'
  endif
%}

<!-- USO en cualquier lugar -->
{% render 'product-availability-check', product: product %}
{% if is_available %}
  <button type="submit">Agregar al carrito</button>
{% else %}
  <button disabled>{{ availability_message }}</button>
{% endif %}
```

### 5. Duplicación en Schemas

#### ❌ MAL: Mismos settings en múltiples secciones
```json
// hero-banner.liquid
{
  "settings": [
    {
      "type": "color",
      "id": "background_color",
      "label": "Color de fondo",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Color de texto",
      "default": "#000000"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Espaciado superior",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "default": 40
    }
  ]
}

// featured-products.liquid (mismos settings)
{
  "settings": [
    {
      "type": "color",
      "id": "background_color",
      "label": "Color de fondo",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Color de texto",
      "default": "#000000"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Espaciado superior",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "default": 40
    }
  ]
}
```

#### ✅ BIEN: Documentar patterns comunes
```liquid
<!-- Crear un archivo de referencia: snippets/common-section-settings.liquid -->
{% comment %}
  SETTINGS COMUNES PARA SECCIONES
  Copiar estos settings cuando crees una nueva sección
  
  COLORES:
  {
    "type": "color",
    "id": "background_color",
    "label": "Color de fondo",
    "default": "#ffffff"
  },
  {
    "type": "color",
    "id": "text_color",
    "label": "Color de texto",
    "default": "#000000"
  }
  
  ESPACIADO:
  {
    "type": "range",
    "id": "padding_top",
    "label": "Espaciado superior",
    "min": 0,
    "max": 100,
    "step": 5,
    "unit": "px",
    "default": 40
  },
  {
    "type": "range",
    "id": "padding_bottom",
    "label": "Espaciado inferior",
    "min": 0,
    "max": 100,
    "step": 5,
    "unit": "px",
    "default": 40
  }
  
  ALINEACIÓN:
  {
    "type": "select",
    "id": "text_alignment",
    "label": "Alineación del texto",
    "options": [
      { "value": "left", "label": "Izquierda" },
      { "value": "center", "label": "Centro" },
      { "value": "right", "label": "Derecha" }
    ],
    "default": "center"
  }
{% endcomment %}

<!-- Y aplicar estilos reutilizables -->
<style>
  .section-spacing {
    padding-top: {{ section.settings.padding_top }}px;
    padding-bottom: {{ section.settings.padding_bottom }}px;
  }
  
  .section-colors {
    background-color: {{ section.settings.background_color }};
    color: {{ section.settings.text_color }};
  }
  
  .text-align-{{ section.settings.text_alignment }} {
    text-align: {{ section.settings.text_alignment }};
  }
</style>
```

## ✅ PATRONES DRY: Buenas Prácticas

### 1. Snippets para Componentes Repetitivos

#### Crear snippets para:
- ✅ Tarjetas de producto
- ✅ Botones de acción (Add to Cart, Quick View)
- ✅ Badges y etiquetas
- ✅ Íconos SVG
- ✅ Formularios comunes
- ✅ Mensajes de error/éxito
- ✅ Breadcrumbs
- ✅ Pagination
- ✅ Social share buttons
- ✅ Rating stars

#### Ejemplo: Rating Stars
```liquid
<!-- snippets/rating-stars.liquid -->
{% liquid
  assign rating = rating | default: 0
  assign max_rating = max_rating | default: 5
  assign show_count = show_count | default: false
%}

<div class="rating-stars">
  {% for i in (1..max_rating) %}
    {% if i <= rating %}
      <span class="rating-stars__star rating-stars__star--filled">★</span>
    {% else %}
      <span class="rating-stars__star">☆</span>
    {% endif %}
  {% endfor %}
  
  {% if show_count and rating_count %}
    <span class="rating-stars__count">({{ rating_count }})</span>
  {% endif %}
</div>

<!-- USO -->
{% render 'rating-stars', rating: product.metafields.reviews.rating, show_count: true, rating_count: product.metafields.reviews.count %}
{% render 'rating-stars', rating: testimonial.rating %}
{% render 'rating-stars', rating: review.rating, max_rating: 5 %}
```

### 2. Funciones Liquid Reutilizables

```liquid
<!-- snippets/price-helpers.liquid -->
{% comment %}
  Helper para calcular descuentos
  Uso: {% render 'price-helpers', type: 'discount_percentage', compare_price: product.compare_at_price, price: product.price %}
{% endcomment %}

{% liquid
  if type == 'discount_percentage'
    assign discount = compare_price | minus: price
    assign discount_percentage = discount | times: 100 | divided_by: compare_price
    echo discount_percentage | round
  endif
  
  if type == 'savings_amount'
    assign savings = compare_price | minus: price
    echo savings | money
  endif
  
  if type == 'is_on_sale'
    if compare_price > price
      echo 'true'
    else
      echo 'false'
    endif
  endif
%}

<!-- USO -->
{% capture discount %}
  {% render 'price-helpers', type: 'discount_percentage', compare_price: product.compare_at_price, price: product.price %}
{% endcapture %}

{% if discount != blank and discount != '0' %}
  <span class="discount-badge">-{{ discount }}%</span>
{% endif %}
```

### 3. Mixins CSS con Variables CSS

```liquid
<style>
  :root {
    --spacing-xs: 10px;
    --spacing-sm: 20px;
    --spacing-md: 40px;
    --spacing-lg: 60px;
    --spacing-xl: 80px;
    
    --color-primary: #000000;
    --color-secondary: #666666;
    --color-accent: #FF5733;
    --color-background: #ffffff;
    
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 20px;
    --font-size-xl: 24px;
    --font-size-xxl: 32px;
    
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
  }
  
  /* Clases utilitarias reutilizables */
  .spacing-top-sm { padding-top: var(--spacing-sm); }
  .spacing-top-md { padding-top: var(--spacing-md); }
  .spacing-top-lg { padding-top: var(--spacing-lg); }
  
  .spacing-bottom-sm { padding-bottom: var(--spacing-sm); }
  .spacing-bottom-md { padding-bottom: var(--spacing-md); }
  .spacing-bottom-lg { padding-bottom: var(--spacing-lg); }
  
  .text-primary { color: var(--color-primary); }
  .text-secondary { color: var(--color-secondary); }
  .text-accent { color: var(--color-accent); }
  
  .bg-primary { background-color: var(--color-primary); }
  .bg-secondary { background-color: var(--color-secondary); }
  .bg-accent { background-color: var(--color-accent); }
  
  .rounded-sm { border-radius: var(--border-radius-sm); }
  .rounded-md { border-radius: var(--border-radius-md); }
  .rounded-lg { border-radius: var(--border-radius-lg); }
</style>

<!-- USO -->
<div class="spacing-top-md spacing-bottom-lg bg-primary rounded-md">
  <h2 class="text-accent">{{ section.settings.heading }}</h2>
</div>
```

### 4. Componentes JavaScript Reutilizables

```liquid
<!-- snippets/modal.liquid -->
<div class="modal" data-modal="{{ modal_id }}" role="dialog" aria-modal="true">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__content">
    <button class="modal__close" data-modal-close aria-label="Cerrar">×</button>
    <div class="modal__body">
      {{ modal_content }}
    </div>
  </div>
</div>

<script>
  class Modal {
    constructor(modalElement) {
      this.modal = modalElement;
      this.closeButtons = this.modal.querySelectorAll('[data-modal-close]');
      this.init();
    }
    
    init() {
      this.closeButtons.forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });
    }
    
    open() {
      this.modal.classList.add('modal--active');
      document.body.style.overflow = 'hidden';
    }
    
    close() {
      this.modal.classList.remove('modal--active');
      document.body.style.overflow = '';
    }
    
    isOpen() {
      return this.modal.classList.contains('modal--active');
    }
  }
  
  // Auto-inicializar todos los modals
  document.querySelectorAll('[data-modal]').forEach(modalEl => {
    const modalId = modalEl.dataset.modal;
    window[`modal_${modalId}`] = new Modal(modalEl);
  });
  
  // Función helper para abrir modals
  function openModal(modalId) {
    const modal = window[`modal_${modalId}`];
    if (modal) modal.open();
  }
</script>

<!-- USO en cualquier sección -->
{% render 'modal', modal_id: 'quick-view', modal_content: product_details %}
{% render 'modal', modal_id: 'size-guide', modal_content: size_guide_content %}

<button onclick="openModal('quick-view')">Vista rápida</button>
<button onclick="openModal('size-guide')">Guía de tallas</button>
```

## 🔍 Checklist Anti-Duplicación

### Antes de escribir CUALQUIER código:

#### 1. **Buscar en el proyecto**
- [ ] ¿Existe un snippet similar que pueda reutilizar?
- [ ] ¿Hay clases CSS que hagan lo mismo?
- [ ] ¿Existe JavaScript similar en otra sección?
- [ ] ¿Hay un pattern establecido para esto?

#### 2. **Evaluar reutilización**
- [ ] ¿Este código se usará en más de un lugar?
- [ ] ¿Otros componentes podrían necesitar esta funcionalidad?
- [ ] ¿Es lo suficientemente genérico para ser snippet?
- [ ] ¿Debería parametrizarse?

#### 3. **Refactorizar si es necesario**
- [ ] ¿Hay código duplicado que deba consolidarse?
- [ ] ¿Puedo extraer esto a un snippet?
- [ ] ¿Debo crear una clase CSS reutilizable?
- [ ] ¿Es momento de crear un componente JavaScript?

## 📋 Estrategias de Refactorización

### Cuándo Refactorizar a Snippet

#### Regla del "Tres": 
**Si algo se repite 3 veces, créalo como snippet.**

```liquid
<!-- Si encuentras esto 3 veces en tu código -->
<div class="price-display">
  <span class="price-current">{{ product.price | money }}</span>
  {% if product.compare_at_price > product.price %}
    <span class="price-compare">{{ product.compare_at_price | money }}</span>
    <span class="price-save">Ahorra {{ product.compare_at_price | minus: product.price | money }}</span>
  {% endif %}
</div>

<!-- Conviértelo en snippet -->
<!-- snippets/price-display.liquid -->
{% liquid
  assign show_savings = show_savings | default: true
%}

<div class="price-display">
  <span class="price-display__current">{{ product.price | money }}</span>
  
  {% if product.compare_at_price > product.price %}
    <span class="price-display__compare">{{ product.compare_at_price | money }}</span>
    
    {% if show_savings %}
      {% assign savings = product.compare_at_price | minus: product.price %}
      <span class="price-display__save">Ahorra {{ savings | money }}</span>
    {% endif %}
  {% endif %}
</div>

<!-- USO -->
{% render 'price-display', product: product %}
{% render 'price-display', product: product, show_savings: false %}
```

### Proceso de Refactorización

#### Paso 1: Identificar duplicación
```bash
# Buscar patrones repetidos manualmente o con herramientas
# Revisar secciones similares
```

#### Paso 2: Extraer a snippet
```liquid
<!-- Crear snippets/nombre-componente.liquid -->
<!-- Mover código duplicado -->
<!-- Parametrizar diferencias -->
```

#### Paso 3: Reemplazar usos
```liquid
<!-- Reemplazar código duplicado con -->
{% render 'nombre-componente', param1: value1, param2: value2 %}
```

#### Paso 4: Probar
```liquid
<!-- Verificar que todos los usos funcionen correctamente -->
<!-- Testear diferentes variaciones de parámetros -->
```

## 🎯 Biblioteca de Snippets Comunes

### Snippets Esenciales que Deberías Crear

1. **`snippets/button.liquid`**
   - Botones consistentes en toda la tienda
   - Variaciones: primary, secondary, outline, ghost
   - Tamaños: small, medium, large
   
2. **`snippets/icon.liquid`**
   - Íconos SVG reutilizables
   - Parámetros: nombre, tamaño, color
   
3. **`snippets/image-responsive.liquid`**
   - Imágenes con srcset automático
   - Lazy loading incluido
   - Aspect ratio configurable
   
4. **`snippets/heading.liquid`**
   - Títulos consistentes
   - Niveles: h1-h6
   - Estilos visuales independientes del nivel semántico
   
5. **`snippets/badge.liquid`**
   - Badges/etiquetas (Sale, New, Limited, etc.)
   - Colores y estilos configurables
   
6. **`snippets/form-field.liquid`**
   - Campos de formulario consistentes
   - Manejo de errores incluido
   - Labels y placeholders
   
7. **`snippets/loading-spinner.liquid`**
   - Spinner de carga reutilizable
   - Tamaños y colores configurables
   
8. **`snippets/empty-state.liquid`**
   - Estado vacío (carrito, búsqueda, etc.)
   - Mensaje e icono personalizables

## 💡 Prompts para Evitar Duplicación

### Prompt: Crear Snippet Reutilizable
```
Crea un snippet reutilizable llamado [nombre] que [funcionalidad]. 
Debe aceptar los siguientes parámetros: [lista de parámetros].
Verifica primero si ya existe un snippet similar antes de crear uno nuevo.
Si existe, indica cómo podemos extenderlo o modificarlo.
```

### Prompt: Refactorizar Código Duplicado
```
He identificado código duplicado en [archivos]. Extrae la lógica común 
a un snippet reutilizable. Mantén la funcionalidad exacta pero hazla 
parametrizable para ambos casos de uso.
```

### Prompt: Verificar Duplicación
```
Antes de crear [componente], revisa si ya existe algo similar en el proyecto.
Busca en snippets/ y secciones/ por [funcionalidad relacionada].
Si encuentras duplicación, sugiere cómo consolidar el código.
```

### Prompt: Auditoría de Duplicación
```
Analiza todas las secciones en sections/ y busca patrones de código duplicado.
Identifica oportunidades de refactorización a snippets reutilizables.
Prioriza por frecuencia de duplicación.
```

## 🚀 Resumen de Reglas DRY

1. **Regla del Tres**: Si se repite 3 veces, créalo como snippet
2. **Snippets primero**: Antes de copiar código, piensa en snippet
3. **Parametrizar**: Haz los snippets flexibles con parámetros
4. **CSS reutilizable**: Usa clases utilitarias y variables CSS
5. **Componentes JS**: Crea clases para funcionalidad repetida
6. **Documentar patterns**: Mantén referencia de snippets comunes
7. **Buscar antes de crear**: Verifica existencia antes de duplicar
8. **Refactorizar temprano**: No esperes a tener mucha duplicación
9. **Nombres descriptivos**: Facilita encontrar snippets existentes
10. **Mantener DRY**: Revisa regularmente y consolida duplicaciones

## ⚡ Beneficios del Principio DRY

### Mantenimiento
- ✅ Un solo lugar para hacer cambios
- ✅ Menos bugs por inconsistencias
- ✅ Updates más rápidos

### Performance
- ✅ Menos código total
- ✅ Mejor caching
- ✅ Archivos más pequeños

### Desarrollo
- ✅ Desarrollo más rápido
- ✅ Menos testing necesario
- ✅ Código más limpio

### Calidad
- ✅ Consistencia visual
- ✅ Comportamiento predecible
- ✅ Menos errores

**El objetivo final: Escribir cada pieza de lógica, estilo o funcionalidad UNA SOLA VEZ y reutilizarla en todos los lugares necesarios.**

````