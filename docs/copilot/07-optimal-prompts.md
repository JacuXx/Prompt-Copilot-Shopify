# Prompts Optimizados para GitHub Copilot

## 🚀 Comandos Rápidos y Eficientes

### Estructura de Prompts Recomendada

Para obtener resultados óptimos de GitHub Copilot, usar esta estructura:

```
[TIPO] + [FUNCIONALIDAD] + [ESTILO] + [PERSONALIZACIÓN]
```

### 📝 Templates de Prompts

#### Para Secciones Completas
```
Crea una sección de [TIPO] con [FUNCIONALIDAD ESPECÍFICA], estilo [TEMA], completamente personalizable, responsive, usando Liquid para toda la lógica, con schema completo
```

**Ejemplos efectivos:**
- `Crea una sección de productos destacados con carrusel, estilo moderno, completamente personalizable`
- `Genera una sección hero con video background, texto superpuesto, botón CTA personalizable`
- `Desarrolla una sección de testimonios con grid responsive, avatars, rating stars personalizables`

#### Para Snippets Específicos
```
Desarrolla un snippet de [COMPONENTE] que [FUNCIÓN], reutilizable, con parámetros [LISTA DE PARÁMETROS]
```

**Ejemplos efectivos:**
- `Desarrolla un snippet de tarjeta de producto que muestre precio, descuento, badges, reutilizable`
- `Crea un snippet de botón personalizable que soporte múltiples estilos, tamaños, con loading state`
- `Genera un snippet de rating stars que reciba calificación numérica, personalizable en color`

#### Para Funcionalidades AJAX
```
Implementa [FUNCIÓN AJAX] que [ACCIÓN], analiza el tema actual, optimizado, con manejo de errores
```

**Ejemplos efectivos:**
- `Implementa agregar al carrito con AJAX que muestre feedback visual, analiza el tema actual`
- `Desarrolla quick view de producto con AJAX que abra modal, carga datos dinámicamente`
- `Crea filtros de colección con AJAX que actualice productos sin recargar página`

### ⚡ Palabras Clave Mágicas

#### Para Optimización
- `completamente personalizable` - Genera schema completo
- `responsive` - Incluye media queries para todos los dispositivos
- `analiza el tema actual` - Revisa componentes existentes antes de generar
- `optimizado` - Aplica mejores prácticas de performance
- `reutilizable` - Crea componentes modulares

#### Para Estilo
- `moderno` - Design contemporáneo con gradientes y sombras
- `minimalista` - Design limpio con espacios amplios
- `elegante` - Tipografía sofisticada y colores neutros
- `colorido` - Paleta vibrante y elementos llamativos
- `profesional` - Design corporativo y formal

#### Para Funcionalidad
- `interactivo` - Incluye hover effects y animaciones
- `dinámico` - Contenido que cambia según condiciones
- `adaptable` - Se ajusta al contenido disponible
- `configurable` - Múltiples opciones de personalización

### 🎯 Prompts por Categoría

#### E-commerce Específico
```liquid
{% comment %}
PROMPTS EFECTIVOS PARA E-COMMERCE:

• "Crea una sección de productos relacionados con carrusel, badges de descuento, completamente personalizable"
• "Desarrolla una galería de productos con filtros por categoría, usando Liquid, responsive"
• "Genera una sección de colección featured con grid personalizable, lazy loading de imágenes"
• "Implementa un product quick view con AJAX, galería de imágenes, selector de variantes"
{% endcomment %}
```

#### Layout y Navegación
```liquid
{% comment %}
PROMPTS PARA LAYOUT:

• "Crea un header sticky con mega menu, carrito dropdown, búsqueda predictiva"
• "Desarrolla un footer multi-columna con enlaces, newsletter signup, redes sociales"
• "Genera breadcrumbs dinámicos que sigan la navegación del usuario"
• "Implementa un sidebar filtros que funcione con AJAX, colapsable en mobile"
{% endcomment %}
```

#### Contenido y Marketing
```liquid
{% comment %}
PROMPTS PARA CONTENIDO:

• "Crea una sección de blog grid con featured post, categorías, lectura estimada"
• "Desarrolla un banner promocional con countdown timer, completamente personalizable"
• "Genera una sección de FAQ con acordeón, búsqueda integrada, categorías"
• "Implementa testimonios con carrusel automático, rating visual, filtros por rating"
{% endcomment %}
```

### 🚫 Evitar Estos Prompts

#### Prompts Ineficientes
- ❌ `Crea algo para productos` (muy vago)
- ❌ `Hazme una sección` (sin contexto)
- ❌ `Genera código` (sin especificaciones)
- ❌ `Como el de la competencia` (sin referencias claras)

#### Prompts Que Generan Problemas
- ❌ `Con mucho JavaScript` (va contra nuestras prácticas)
- ❌ `Simple y básico` (genera código poco personalizable)
- ❌ `Sin CSS` (no incluye estilos necesarios)
- ❌ `Como Bootstrap` (no sigue patrones de Shopify)

### 📊 Estructura de Prompt Avanzada

#### Prompt Completo Optimal
```
Crea una [TIPO DE SECCIÓN] de [FUNCIONALIDAD PRINCIPAL] que incluya:

Funcionalidades:
- [Lista de funcionalidades específicas]
- [Interacciones requeridas]
- [Casos de uso especiales]

Personalización:
- [Elementos personalizables]
- [Opciones de estilo]
- [Configuraciones de comportamiento]

Técnico:
- Usar Liquid para toda la lógica
- Responsive (desktop, tablet, mobile)
- Schema completo con todas las opciones
- [Requerimientos técnicos específicos]
```

#### Ejemplo de Prompt Completo
```
Crea una sección de productos destacados que incluya:

Funcionalidades:
- Carrusel con navigation arrows y dots
- Filtros por categoría con tabs
- Quick add to cart con feedback visual
- Badges de descuento automáticos

Personalización:
- Colores de fondo, texto y botones
- Número de productos por fila
- Activar/desactivar autoplay
- Personalizar textos y etiquetas

Técnico:
- Usar Liquid para mostrar/ocultar elementos
- Responsive con breakpoints estándar
- Analizar carruseles existentes del tema
- Schema organizado por categorías
```

### ⏱️ Optimización de Tiempos

#### Prompts de Una Sola Iteración
Para evitar múltiples correcciones, incluir desde el inicio:

1. **Contexto completo**: Tipo de sección, funcionalidad, estilo
2. **Requerimientos técnicos**: Liquid first, responsive, personalizable
3. **Casos edge**: Qué pasa si no hay contenido, errores, etc.
4. **Integración**: Cómo debe integrarse con el tema existente

#### Prompts Modulares
Para proyectos grandes, dividir en módulos específicos:

```
1. "Crea el snippet base de product-card con estructura HTML y Liquid básico"
2. "Agrega personalización completa al snippet product-card con schema detallado"
3. "Implementa la sección que usa el snippet product-card en formato carrusel"
4. "Añade funcionalidades AJAX al carrusel de productos para filtros dinámicos"
```
