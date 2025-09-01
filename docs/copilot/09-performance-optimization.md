# Performance y Optimización

## ⚡ Principios de Performance

### 1. Liquid Server-Side vs JavaScript Client-Side

#### ✅ Render en Servidor (Liquid)
```liquid
{% comment %} Renderizado una sola vez en el servidor {% endcomment %}
{% assign products_to_show = 8 %}
{% assign featured_products = collections.featured.products %}

<div class="products-grid">
  {% for product in featured_products limit: products_to_show %}
    {% assign product_on_sale = product.compare_at_price > product.price %}
    <div class="product-card {% if product_on_sale %}on-sale{% endif %}">
      {% render 'product-card', product: product, on_sale: product_on_sale %}
    </div>
  {% endfor %}
</div>
```

#### ❌ Procesamiento en Cliente (JavaScript)
```javascript
// Evitar: procesamiento pesado en el cliente
document.addEventListener('DOMContentLoaded', function() {
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    const comparePrice = parseFloat(product.dataset.comparePrice);
    const price = parseFloat(product.dataset.price);
    if (comparePrice > price) {
      product.classList.add('on-sale');
    }
  });
});
```

### 2. Optimización de Loops

#### ✅ Loops Eficientes
```liquid
{% comment %} Pre-calcular condiciones fuera del loop {% endcomment %}
{% assign collection_handle = section.settings.collection %}
{% assign products_limit = section.settings.products_limit | default: 8 %}
{% assign show_vendor = section.settings.show_vendor %}
{% assign show_rating = section.settings.show_rating %}

{% comment %} Loop optimizado {% endcomment %}
{% for product in collections[collection_handle].products limit: products_limit %}
  {% comment %} Variables específicas del producto {% endcomment %}
  {% assign product_id = product.id %}
  {% assign product_available = product.available %}
  
  <div class="product-item" data-product-id="{{ product_id }}">
    {% render 'product-card-optimized', 
       product: product,
       show_vendor: show_vendor,
       show_rating: show_rating,
       available: product_available %}
  </div>
{% endfor %}
```

#### ❌ Loops Ineficientes
```liquid
{% for product in collections[section.settings.collection].products limit: section.settings.products_limit %}
  <div class="product-item">
    {% if section.settings.show_vendor %}
      <span>{{ product.vendor }}</span>
    {% endif %}
    {% if section.settings.show_rating %}
      {% comment %} Procesamiento complejo dentro del loop {% endcomment %}
      <div class="rating">
        {% assign rating = product.metafields.reviews.rating %}
        {% for i in (1..5) %}
          {% if i <= rating %}★{% else %}☆{% endif %}
        {% endfor %}
      </div>
    {% endif %}
  </div>
{% endfor %}
```

### 3. Manejo Eficiente de Imágenes

#### ✅ Imágenes Optimizadas
```liquid
{% comment %} Configuración de imágenes responsive {% endcomment %}
{% assign image_sizes = '300x300,600x600,900x900' %}
{% assign image_widths = '300,600,900' %}

{% if product.featured_image %}
  {% assign image_alt = product.featured_image.alt | default: product.title %}
  
  <img 
    src="{{ product.featured_image | img_url: '300x300' }}"
    srcset="
      {{ product.featured_image | img_url: '300x300' }} 300w,
      {{ product.featured_image | img_url: '600x600' }} 600w,
      {{ product.featured_image | img_url: '900x900' }} 900w
    "
    sizes="(max-width: 767px) 300px, (max-width: 1023px) 600px, 900px"
    alt="{{ image_alt }}"
    loading="lazy"
    class="product-image">
{% else %}
  <div class="product-image-placeholder">
    {% render 'icon-placeholder' %}
  </div>
{% endif %}
```

### 4. Caching de Variables Costosas

#### ✅ Cache de Cálculos
```liquid
{% comment %} Cachear cálculos complejos {% endcomment %}
{% assign cart_total_items = cart.item_count %}
{% assign cart_total_price = cart.total_price %}
{% assign cart_has_items = cart_total_items > 0 %}
{% assign cart_shipping_threshold = 5000 %} <!-- $50.00 en centavos -->
{% assign cart_free_shipping = cart_total_price >= cart_shipping_threshold %}

{% comment %} Usar variables cacheadas {% endcomment %}
<div class="cart-summary">
  <span class="cart-count">{{ cart_total_items }}</span>
  <span class="cart-total">{{ cart_total_price | money }}</span>
  {% if cart_free_shipping %}
    <span class="free-shipping-badge">Free Shipping!</span>
  {% endif %}
</div>
```

## 🚀 Técnicas de Optimización Avanzadas

### 1. Lazy Loading de Contenido

#### ✅ Implementación Eficiente
```liquid
{% comment %} Contenido above-the-fold inmediato {% endcomment %}
<div class="hero-section">
  {% render 'hero-content' %}
</div>

{% comment %} Contenido below-the-fold con lazy loading {% endcomment %}
<div class="lazy-content" data-lazy-load data-section="products">
  {% comment %} Placeholder mientras carga {% endcomment %}
  <div class="loading-placeholder">
    <div class="skeleton-loader"></div>
  </div>
</div>

<script>
  // JavaScript mínimo para lazy loading
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadSectionContent(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('[data-lazy-load]').forEach(el => {
    observer.observe(el);
  });
</script>
```

### 2. Minimización de Requests

#### ✅ Datos Consolidados
```liquid
{% comment %} Consolidar datos en una sola pasada {% endcomment %}
{% assign site_data = shop | json %}
{% assign cart_data = cart | json %}
{% assign customer_data = customer | json %}

<script>
  window.siteData = {
    shop: {{ site_data }},
    cart: {{ cart_data }},
    customer: {{ customer_data }},
    routes: {
      cart_add: '{{ routes.cart_add_url }}',
      cart_update: '{{ routes.cart_update_url }}',
      cart_change: '{{ routes.cart_change_url }}'
    }
  };
</script>
```

### 3. CSS Crítico Inline

#### ✅ CSS Above-the-Fold
```liquid
<style>
  /* CSS crítico inline solo para above-the-fold */
  .hero-section {
    height: 100vh;
    background: {{ section.settings.hero_bg }};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hero-title {
    font-size: 3rem;
    color: {{ section.settings.hero_text_color }};
    text-align: center;
  }
  
  /* Mobile-first approach */
  @media (max-width: 767px) {
    .hero-title {
      font-size: 2rem;
    }
  }
</style>

{% comment %} CSS no crítico cargado async {% endcomment %}
<link rel="preload" href="{{ 'section-hero.css' | asset_url }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 4. Prefetching y Preloading

#### ✅ Recursos Optimizados
```liquid
{% comment %} Preload recursos críticos {% endcomment %}
{% if section.settings.hero_image %}
  <link rel="preload" as="image" href="{{ section.settings.hero_image | img_url: '1920x' }}">
{% endif %}

{% comment %} Prefetch páginas probables {% endcomment %}
{% if template contains 'product' %}
  {% for related_product in product.related_products limit: 3 %}
    <link rel="prefetch" href="{{ related_product.url }}">
  {% endfor %}
{% endif %}

{% comment %} DNS prefetch para dominios externos {% endcomment %}
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
```

## 📊 Monitoring y Métricas

### 1. Performance Tracking

#### ✅ Métricas Embebidas
```liquid
{% comment %} Solo en desarrollo {% endcomment %}
{% if shop.domain contains 'myshopify.com' %}
<script>
  // Tracking de performance
  window.addEventListener('load', function() {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart, 'ms');
  });
</script>
{% endif %}
```

### 2. Error Tracking

#### ✅ Manejo de Errores
```liquid
<script>
  // Error tracking solo en producción
  {% unless shop.domain contains 'myshopify.com' %}
  window.addEventListener('error', function(e) {
    // Log errores para debugging
    fetch('/apps/error-log', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        url: window.location.href
      })
    }).catch(() => {}); // Silently fail
  });
  {% endunless %}
</script>
```

## ⚡ Checklist de Performance

### Antes del Desarrollo
- [ ] Identificar qué debe renderizarse server-side vs client-side
- [ ] Planificar lazy loading para contenido below-the-fold
- [ ] Definir estrategia de caching para datos costosos

### Durante el Desarrollo
- [ ] Usar variables para cálculos complejos fuera de loops
- [ ] Implementar responsive images con srcset
- [ ] Minimizar JavaScript y usar solo cuando sea necesario
- [ ] Cachear resultados de filtros y cálculos

### Después del Desarrollo
- [ ] Verificar que no hay JavaScript innecesario
- [ ] Comprobar que las imágenes tienen lazy loading
- [ ] Validar que el CSS crítico está inline
- [ ] Testing de performance en dispositivos móviles

### Optimizaciones Específicas de Shopify
- [ ] Usar `{% render %}` en lugar de `{% include %}`
- [ ] Aprovechar `{% liquid %}` para código compacto
- [ ] Implementar `{% paginate %}` para listas largas
- [ ] Usar `{% section %}` tags para modularidad
