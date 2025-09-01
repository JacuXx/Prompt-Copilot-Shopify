# Guía de Commits Semánticos y Ramas

## 🔄 Commits Semánticos

### Estructura Básica
```
tipo(ámbito): descripción
```

El **ámbito** debe ser el **archivo**, **sección** o **snippet** tocado.

## 📋 Tipos de Commit

### `ft/feat` - Funcionalidad (Feature)
**Uso**: Algo nuevo para el usuario
```bash
ft(product-slider.liquid): agrega estructura de la nueva sección
ft(hero-banner): implementa video background con controles
ft(cart-drawer.liquid): añade quick add to cart con AJAX
ft(testimonials): crea carrusel con rating stars personalizable
```

### `fix` - Corrección
**Uso**: Arregla un error o bug
```bash
fix(cart-drawer.js): soluciona error de cálculo en el subtotal
fix(product-card): corrige display de variantes sin stock
fix(mobile-menu.liquid): arregla overlay en dispositivos iOS
fix(checkout-flow): resuelve problema de validación de cupones
```

### `estilo/style` - Estilos
**Uso**: Cambios estéticos (CSS, formato)
```bash
estilo(component-card.css): ajusta el borde y la sombra
estilo(hero-section): mejora responsive design para tablet
estilo(button-styles): actualiza hover effects y transiciones
estilo(typography): optimiza font-sizes para mobile
```

### `pers` - Personalización (Customizer)
**Uso**: Cambios en `settings_schema.json`
```bash
pers(settings_schema.json): añade opciones de color para el footer
pers(product-section): agrega configuración de layout grid
pers(hero-banner): implementa selector de efectos de fondo
pers(global-settings): crea opciones de tipografía personalizada
```

### `refactor` - Refactorización
**Uso**: Mejora interna sin cambiar funcionalidad
```bash
refactor(main.js): optimiza función de inicialización
refactor(product-form.liquid): reorganiza estructura de variantes
refactor(css-grid): mejora sistema de grids responsive
refactor(snippet-includes): consolida renders duplicados
```

### `tarea/chore` - Tareas
**Uso**: Build, dependencias, etc.
```bash
tarea: actualiza shopify-cli a la última versión
chore(assets): optimiza imágenes para mejor performance
tarea(build): configura pipeline de minificación CSS/JS
chore(dependencies): actualiza librerías de terceros
```

### `docs` - Documentación
**Uso**: Guías, README, etc.
```bash
docs: detalla flujo de previsualización en PRs
docs(setup): agrega instrucciones de instalación local
docs(api): documenta nuevos liquid filters personalizados
docs(components): crea guía de uso de snippets reutilizables
```

## 🌿 Nomenclatura de Ramas

### Estructura de Ramas
```
tipo/descripcion-corta
tipo/ambito-descripcion-corta
```

### Ejemplos por Tipo

#### Features
```bash
feature/product-quick-view
feature/hero-video-background
ft/cart-drawer-ajax
ft/testimonials-carousel
feat/mega-menu-navigation
```

#### Fixes
```bash
fix/cart-calculation-error
fix/mobile-menu-overlay
fix/product-variant-display
bugfix/checkout-validation
hotfix/critical-payment-issue
```

#### Estilos
```bash
style/button-hover-effects
style/responsive-grid-system
estilo/mobile-typography
design/color-scheme-update
ui/component-spacing
```

#### Personalización
```bash
customizer/footer-color-options
pers/hero-layout-settings
settings/global-typography
config/section-visibility-controls
```

#### Refactor
```bash
refactor/product-form-structure
refactor/css-grid-system
optimization/javascript-performance
cleanup/duplicate-code-removal
```

#### Documentación
```bash
docs/component-usage-guide
docs/setup-instructions
documentation/api-reference
guide/development-workflow
```

## 🎯 Mejores Prácticas

### Commits Atómicos
- **Un cambio por commit**
- **Descripción clara y específica**
- **Incluir contexto cuando sea necesario**

### Ejemplos Completos
```bash
# ✅ Buenos commits
ft(product-slider.liquid): agrega carrusel responsive con autoplay
fix(cart-drawer.js): corrige cálculo de descuentos en productos bundle
estilo(hero-section): mejora spacing y typography en mobile
pers(settings_schema.json): añade opciones de color para botones CTA

# ❌ Commits a evitar
feat: cambios varios
fix: arreglos
update: modificaciones
style: css
```

### Commits para Secciones Completas
```bash
ft(featured-products): implementa sección completa con carrusel
├── HTML structure con Liquid logic
├── CSS responsive (desktop/tablet/mobile)
├── JavaScript para carousel functionality
└── Schema con personalización completa

pers(featured-products): agrega configuraciones avanzadas
├── Color customization options
├── Layout variation settings
├── Animation control settings
└── Content management options
```

### Commits para Snippets
```bash
ft(product-card): crea snippet reutilizable para tarjetas de producto
├── Base HTML structure
├── Liquid parameters handling
├── Responsive styling
└── Hover effects y animations

refactor(product-card): optimiza performance y accesibilidad
├── Lazy loading implementation
├── Alt text management
├── Keyboard navigation support
└── Screen reader improvements
```

## 🔧 Comandos de Ejemplo

### Flujo de Desarrollo Típico
```bash
# Crear rama para nueva feature
git checkout -b ft/product-recommendations

# Commits durante desarrollo
git commit -m "ft(product-recommendations): crea estructura base de la sección"
git commit -m "estilo(product-recommendations): implementa grid responsive"
git commit -m "ft(product-recommendations.js): agrega funcionalidad de filtros"
git commit -m "pers(settings_schema.json): añade opciones de personalización"

# Commit final
git commit -m "ft(product-recommendations): completa sección con todas las funcionalidades"
```

### Commits de Mantenimiento
```bash
fix(cart-functionality): corrige error en actualización de cantidad
refactor(css-utilities): optimiza clases helper para mejor performance
docs(component-guide): actualiza documentación de snippets disponibles
tarea(build-process): mejora pipeline de compilación de assets
```

## 🎨 Templates de Commit por Componente

### Para Secciones
```bash
ft([nombre-seccion]): implementa [funcionalidad principal]
estilo([nombre-seccion]): mejora [aspecto visual específico]
pers([nombre-seccion]): agrega [opciones de personalización]
fix([nombre-seccion]): corrige [problema específico]
```

### Para Snippets
```bash
ft([nombre-snippet]): crea snippet para [propósito]
refactor([nombre-snippet]): optimiza [aspecto técnico]
fix([nombre-snippet]): resuelve [issue específico]
```

### Para Assets
```bash
estilo([archivo.css]): mejora [componente o sección]
refactor([archivo.js]): optimiza [funcionalidad]
fix([archivo.js]): corrige [bug específico]
```

### Para Configuración
```bash
pers(settings_schema.json): añade [nueva configuración]
config([archivo-config]): actualiza [configuración específica]
tarea(build): mejora [proceso de build]
```

## 📝 Notas Importantes

1. **Consistencia**: Siempre usar la misma estructura
2. **Claridad**: Descripción específica del cambio
3. **Contexto**: Incluir el archivo/componente afectado
4. **Idioma**: Usar español para descripciones
5. **Longitud**: Máximo 50-72 caracteres en la primera línea
