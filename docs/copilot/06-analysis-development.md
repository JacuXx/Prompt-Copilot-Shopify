# Guía de Análisis y Desarrollo

## Análisis de Secciones Existentes

### ANTES de generar cualquier sección o snippet:

1. **Investigar la estructura del tema**:
   - Revisar secciones similares existentes
   - Identificar patrones de HTML y CSS
   - Analizar el schema utilizado
   - Verificar nomenclatura de clases CSS

2. **Comandos para análisis**:
```liquid
<!-- Buscar secciones relacionadas -->
{% comment %} Revisar: sections/product-recommendations.liquid {% endcomment %}
{% comment %} Revisar: sections/featured-collection.liquid {% endcomment %}
{% comment %} Revisar: snippets/product-card.liquid {% endcomment %}
```

3. **Patrones a identificar**:
   - Estructura de contenedores
   - Nomenclatura de clases CSS
   - Variables CSS personalizadas utilizadas
   - Grid systems implementados
   - Breakpoints utilizados

### Flujo de Desarrollo

#### 1. Análisis Inicial
```liquid
{% comment %}
  ANÁLISIS DE SECCIONES EXISTENTES:
  - Revisar sections/featured-collection.liquid para estructura de grid
  - Verificar snippets/product-card.liquid para componentes
  - Analizar assets/section-*.css para estilos
  - Identificar variables CSS globales en assets/theme.css
{% endcomment %}
```

#### 2. Planificación de Estructura
```liquid
{% comment %}
  PLANIFICACIÓN:
  - Reutilizar clases CSS existentes cuando sea posible
  - Mantener consistencia con el diseño del tema
  - Seguir patrones de nomenclatura identificados
  - Integrar con variables CSS globales
{% endcomment %}
```

#### 3. Implementación Modular
```liquid
<!-- sections/custom-section.liquid -->

{% comment %} === ANÁLISIS Y CONFIGURACIÓN === {% endcomment %}
{% comment %} Basado en: sections/featured-collection.liquid {% endcomment %}
{% comment %} Reutiliza: grid system del tema {% endcomment %}

{% assign container_class = 'page-width' %}
{% assign grid_class = 'grid grid--1-col grid--2-col-tablet grid--' | append: section.settings.columns_desktop | append: '-col-desktop' %}

{% comment %} === ESTRUCTURA HTML === {% endcomment %}
<div class="custom-section section-{{ section.id }}">
  <div class="{{ container_class }}">
    {% if section.settings.title != blank %}
      <h2 class="section-heading">{{ section.settings.title }}</h2>
    {% endif %}
    
    <div class="{{ grid_class }}">
      {% for block in section.blocks %}
        <div class="grid__item">
          {% render 'custom-block', block: block %}
        </div>
      {% endfor %}
    </div>
  </div>
</div>

{% comment %} === ESTILOS INTEGRADOS === {% endcomment %}
<style>
  .custom-section {
    /* Utilizar variables CSS del tema cuando existan */
    padding: var(--section-padding, 50px) 0;
    background: {{ section.settings.background_color }};
  }
  
  .section-{{ section.id }} {
    /* Estilos específicos de esta instancia */
  }
  
  /* Responsive siguiendo breakpoints del tema */
  @media screen and (min-width: 990px) {
    /* Desktop styles */
  }
  
  @media screen and (max-width: 989px) and (min-width: 750px) {
    /* Tablet styles */
  }
  
  @media screen and (max-width: 749px) {
    /* Mobile styles */
  }
</style>
```

### Mejores Prácticas de Análisis

#### 1. Verificación de Compatibilidad
```liquid
{% comment %}
  VERIFICAR ANTES DE IMPLEMENTAR:
  - ¿El tema usa CSS Grid o Flexbox?
  - ¿Cuáles son los breakpoints estándar?
  - ¿Existe un sistema de variables CSS?
  - ¿Hay componentes reutilizables disponibles?
{% endcomment %}
```

#### 2. Integración con el Tema
```liquid
{% comment %}
  INTEGRACIÓN:
  - Reutilizar utilities classes existentes
  - Mantener consistencia visual
  - Seguir patrones de espaciado
  - Usar iconografía del tema
{% endcomment %}
```

#### 3. Testing y Validación
```liquid
{% comment %}
  TESTING:
  - Verificar responsive design
  - Probar en diferentes dispositivos
  - Validar accesibilidad
  - Confirmar performance
{% endcomment %}
```

### Checklist de Desarrollo

#### Antes de comenzar:
- [ ] Analizar secciones similares existentes
- [ ] Identificar patrones del tema
- [ ] Verificar sistema de grid
- [ ] Revisar variables CSS disponibles

#### Durante el desarrollo:
- [ ] Usar Liquid para toda la lógica posible
- [ ] Implementar personalización completa
- [ ] Mantener consistencia visual
- [ ] Optimizar para performance

#### Antes de finalizar:
- [ ] Probar responsive design
- [ ] Verificar accesibilidad
- [ ] Limpiar console.log de JavaScript
- [ ] Documentar funcionalidades especiales

### Estructura de Archivo Completo

```liquid
<!-- sections/example-section.liquid -->

{% comment %}
=== DOCUMENTACIÓN ===
Sección: [Nombre de la sección]
Basada en: [Sección de referencia del tema]
Funcionalidades: [Lista de funcionalidades]
Dependencias: [Librerías o snippets requeridos]
{% endcomment %}

{% comment %} === CONFIGURACIÓN Y VARIABLES === {% endcomment %}
{% assign setting_var = section.settings.example | default: 'default_value' %}

{% comment %} === ESTRUCTURA HTML === {% endcomment %}
<section class="custom-section">
  <!-- HTML aquí -->
</section>

{% comment %} === ESTILOS CSS === {% endcomment %}
<style>
  /* CSS aquí con media queries */
</style>

{% comment %} === JAVASCRIPT (si es necesario) === {% endcomment %}
<script>
  // JavaScript optimizado aquí
</script>

{% comment %} === SCHEMA DE CONFIGURACIÓN === {% endcomment %}
{% schema %}
{
  "name": "Nombre de la Sección",
  "settings": [],
  "blocks": [],
  "presets": []
}
{% endschema %}
```
