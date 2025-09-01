# Guía de Carruseles y Componentes Nativos

## Análisis de Carruseles Existentes

### ANTES de crear un carrusel, investigar:

1. **Verificar implementación nativa del tema**:
   - Buscar en `assets/theme.js` o archivos similares
   - Identificar librerías utilizadas (Swiper, Glide, Flickity, etc.)
   - Revisar secciones existentes con carruseles

2. **Patrones comunes a buscar**:
```javascript
// Buscar estos patrones en el código del tema
new Swiper()
new Glide()
new Flickity()
$('.carousel').slick()
```

3. **Estructura HTML nativa**:
```liquid
<!-- Analizar la estructura existente -->
<div class="carousel" data-carousel>
  <div class="carousel-container">
    <div class="carousel-slide"><!-- contenido --></div>
  </div>
</div>
```

### Implementación de Carrusel

#### Usando la librería nativa del tema
```liquid
<!-- sections/custom-carousel.liquid -->

{% assign products_to_show = section.settings.products_to_show | default: 4 %}
{% assign auto_play = section.settings.auto_play %}
{% assign show_arrows = section.settings.show_arrows %}

<section class="custom-carousel-section" data-section-id="{{ section.id }}">
  <div class="carousel-wrapper">
    {% if show_arrows %}
      <button class="carousel-arrow carousel-arrow--prev" data-carousel-prev>
        {% render 'icon-chevron-left' %}
      </button>
    {% endif %}
    
    <div class="carousel" 
         data-carousel
         data-slides-per-view="{{ products_to_show }}"
         data-auto-play="{{ auto_play }}"
         data-space-between="20">
      <div class="carousel-container">
        {% for product in collections[section.settings.collection].products limit: 12 %}
          <div class="carousel-slide">
            {% render 'product-card', 
               product: product, 
               show_vendor: section.settings.show_vendor,
               card_style: section.settings.card_style %}
          </div>
        {% endfor %}
      </div>
    </div>
    
    {% if show_arrows %}
      <button class="carousel-arrow carousel-arrow--next" data-carousel-next>
        {% render 'icon-chevron-right' %}
      </button>
    {% endif %}
  </div>
</section>

<style>
  .custom-carousel-section {
    padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;
    background-color: {{ section.settings.background_color }};
  }
  
  .carousel-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    background: {{ section.settings.arrow_background }};
    border: 2px solid {{ section.settings.arrow_border_color }};
    border-radius: {{ section.settings.arrow_border_radius }}px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .carousel-arrow:hover {
    background: {{ section.settings.arrow_background_hover }};
    border-color: {{ section.settings.arrow_border_color_hover }};
  }
  
  .carousel-arrow--prev {
    left: -22px;
  }
  
  .carousel-arrow--next {
    right: -22px;
  }
  
  /* Desktop */
  @media screen and (min-width: 1024px) {
    .carousel-slide {
      width: calc(100% / {{ products_to_show }});
    }
  }
  
  /* Tablet */
  @media screen and (max-width: 1023px) and (min-width: 768px) {
    .carousel-slide {
      width: calc(100% / {{ products_to_show | at_most: 3 }});
    }
    
    .carousel-arrow {
      width: 36px;
      height: 36px;
    }
  }
  
  /* Mobile */
  @media screen and (max-width: 767px) {
    .carousel-slide {
      width: calc(100% / {{ products_to_show | at_most: 2 }});
    }
    
    .carousel-arrow {
      display: none;
    }
    
    .carousel-wrapper {
      padding: 0 15px;
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('[data-section-id="{{ section.id }}"] [data-carousel]');
    if (!carousel) return;
    
    console.log('Inicializando carrusel personalizado');
    
    // Detectar la librería nativa del tema y usar su API
    if (typeof Swiper !== 'undefined') {
      initSwiperCarousel(carousel);
    } else if (typeof Glide !== 'undefined') {
      initGlideCarousel(carousel);
    } else {
      // Fallback a implementación básica
      initBasicCarousel(carousel);
    }
  });
  
  function initSwiperCarousel(element) {
    const config = {
      slidesPerView: parseInt(element.dataset.slidesPerView) || 4,
      spaceBetween: parseInt(element.dataset.spaceBetween) || 20,
      autoplay: element.dataset.autoPlay === 'true' ? {
        delay: 5000,
        disableOnInteraction: false
      } : false,
      navigation: {
        nextEl: element.parentNode.querySelector('[data-carousel-next]'),
        prevEl: element.parentNode.querySelector('[data-carousel-prev]')
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: Math.min(3, parseInt(element.dataset.slidesPerView)) },
        1024: { slidesPerView: parseInt(element.dataset.slidesPerView) }
      }
    };
    
    new Swiper(element, config);
    console.log('Carrusel Swiper inicializado');
  }
</script>

{% schema %}
{
  "name": "Carrusel Personalizado",
  "settings": [
    {
      "type": "collection",
      "id": "collection",
      "label": "Colección"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "min": 2,
      "max": 6,
      "step": 1,
      "default": 4,
      "label": "Productos por fila"
    },
    {
      "type": "checkbox",
      "id": "show_arrows",
      "default": true,
      "label": "Mostrar flechas"
    },
    {
      "type": "checkbox",
      "id": "auto_play",
      "default": false,
      "label": "Reproducción automática"
    },
    {
      "type": "color",
      "id": "background_color",
      "default": "#ffffff",
      "label": "Color de fondo"
    },
    {
      "type": "color",
      "id": "arrow_background",
      "default": "#ffffff",
      "label": "Fondo de flechas"
    },
    {
      "type": "color",
      "id": "arrow_border_color",
      "default": "#cccccc",
      "label": "Color de borde de flechas"
    },
    {
      "type": "range",
      "id": "arrow_border_radius",
      "min": 0,
      "max": 50,
      "step": 1,
      "default": 4,
      "label": "Radio de borde de flechas"
    }
  ],
  "presets": [
    {
      "name": "Carrusel Personalizado"
    }
  ]
}
{% endschema %}
```

### Mejores Prácticas para Carruseles

1. **Reutilizar la librería del tema** siempre que sea posible
2. **Responsive design** con diferentes configuraciones por dispositivo
3. **Accesibilidad** con navegación por teclado
4. **Performance** evitar múltiples instancias innecesarias
5. **Personalización completa** através del schema
