# Índice de Guías para GitHub Copilot - Shopify Liquid

## 📚 Documentación Completa

Esta documentación proporciona guías específicas para que GitHub Copilot genere código Shopify Liquid siguiendo las mejores prácticas y estándares establecidos.

### 📋 Guías Disponibles

1. **[01-liquid-guidelines.md](./01-liquid-guidelines.md)**
   - Principios fundamentales de Liquid
   - Prioridad de Liquid sobre JavaScript
   - Uso de variables con `assign`
   - Condicionantes y loops en Liquid

2. **[02-sections-snippets.md](./02-sections-snippets.md)**
   - Creación de bloques mediante snippets
   - Uso de bloques anidados
   - Organización de archivos
   - Estructura completa de secciones

3. **[03-javascript-ajax.md](./03-javascript-ajax.md)**
   - Uso mínimo y optimizado de JavaScript
   - Análisis del tema actual para AJAX
   - Buenas prácticas de desarrollo
   - Limpieza de console.log

4. **[04-carousels-components.md](./04-carousels-components.md)**
   - Análisis de carruseles nativos del tema
   - Implementación usando librerías existentes
   - Configuración responsive
   - Mejores prácticas para componentes

5. **[05-customization-styles.md](./05-customization-styles.md)**
   - Personalización completa via schema
   - CSS responsivo con media queries
   - Variables Liquid para estilos
   - Opciones de configuración avanzadas

6. **[06-analysis-development.md](./06-analysis-development.md)**
   - Análisis de secciones existentes
   - Flujo de desarrollo recomendado
   - Integración con el tema actual
   - Checklist de desarrollo

7. **[07-optimal-prompts.md](./07-optimal-prompts.md)**
   - Comandos optimizados para GitHub Copilot
   - Templates de prompts efectivos
   - Palabras clave para mejores resultados
   - Estructura de solicitudes avanzadas

8. **[08-liquid-patterns.md](./08-liquid-patterns.md)**
   - Patrones recomendados de Liquid
   - Antipatrones a evitar
   - Técnicas de refactoring
   - Métricas de calidad de código

9. **[09-performance-optimization.md](./09-performance-optimization.md)**
   - Optimización de performance
   - Técnicas de lazy loading
   - Minimización de JavaScript
   - Caching y eficiencia

10. **[10-schema-templates.md](./10-schema-templates.md)**
    - Templates de schema completos
    - Configuraciones avanzadas
    - Validaciones y mejores prácticas
    - Patterns para personalización

11. **[11-git-commits-branches.md](./11-git-commits-branches.md)**
    - Commits semánticos para Shopify
    - Nomenclatura de ramas optimizada
    - Templates por tipo de componente
    - Mejores prácticas de versionado

12. **[12-editing-existing-components.md](./12-editing-existing-components.md)**
    - Metodología para editar código existente
    - Análisis de contexto obligatorio
    - Preservación de funcionalidad actual
    - Templates para modificaciones seguras

13. **[13-vscode-configuration.md](./13-vscode-configuration.md)**
    - Configuración de GitHub Copilot en VS Code
    - Instrucciones automáticas integradas
    - Settings optimizados para Shopify
    - Comandos de activación y uso

14. **[14-section-recommendations.md](./14-section-recommendations.md)**
    - 🆕 **Análisis inteligente de imágenes/descripciones**
    - **Recomendaciones automáticas de secciones**
    - **Matriz de tipos de contenido vs secciones**
    - **Prompts optimizados para análisis visual**
    - **Templates para casos complejos**

15. **[15-metafields-guide.md](./15-metafields-guide.md)**
    - 🆕 **Guía completa de Metafields en Shopify**
    - **Acceso correcto dentro y fuera del contexto del objeto**
    - **Uso de `product: product` en snippets**
    - **Tipos de metafields y validaciones**
    - **Patrones de uso avanzados y mejores prácticas**

16. **[16-liquid-comments-rules.md](./16-liquid-comments-rules.md)**
    - 🆕 **Reglas CRÍTICAS para comentarios en Liquid**
    - **❌ NUNCA comentar dentro de `{% liquid %}` tags**
    - **❌ NUNCA comentar dentro de `{% %}` individuales**
    - **✅ Dónde y cómo comentar correctamente**
    - **Estrategias de documentación y patrones recomendados**

17. **[17-direct-responses.md](./17-direct-responses.md)**
    - 🆕 **Guía para respuestas directas de código**
    - **❌ NO generar markdown cuando se pide código**
    - **✅ Responder con código directo y funcional**
    - **Verbos de acción = código, verbos de explicación = documentación**
    - **Principio "Código Primero" para eficiencia**

## 🎯 Objetivos Principales

### Prioridades de Desarrollo
1. **Liquid First**: Maximizar uso de Liquid para lógica y condicionantes
2. **Reutilización**: Analizar y reutilizar componentes existentes del tema
3. **Personalización**: Todo debe ser configurable via schema
4. **Performance**: Código optimizado y buenas prácticas
5. **Responsive**: Design móvil, tablet y desktop

### Estructura de Archivos
- **Un archivo por sección**: Todo integrado (HTML, CSS, JS, Schema)
- **Snippets modulares**: Para componentes reutilizables
- **Análisis previo**: Siempre revisar implementaciones existentes

### Estándares de Código

#### Liquid
- Usar `assign` para variables complejas
- Condicionantes en Liquid, no JavaScript
- Maximizar renderizado del lado del servidor

#### CSS
- Media queries: Desktop (1024px+), Tablet (768-1023px), Mobile (<768px)
- Variables del tema cuando estén disponibles
- Clases modulares y reutilizables

#### JavaScript
- Solo para casos donde Liquid no sea suficiente
- Código optimizado y con manejo de errores
- Console.log solo en desarrollo
- Reutilizar librerías del tema (Swiper, Glide, etc.)

## 🔧 Uso de las Guías

### Para GitHub Copilot
Estas guías están diseñadas para ser referenciadas por GitHub Copilot al generar código. Cada archivo contiene:

- Principios específicos
- Ejemplos de código completos
- Mejores prácticas
- Patrones a seguir

### Para Desarrolladores
Los desarrolladores pueden usar estas guías como:

- Referencia de estándares
- Templates de código
- Checklist de desarrollo
- Documentación de patrones

## ⚡ Flujo de Trabajo Recomendado

1. **Análisis**: Revisar secciones/snippets existentes del tema
2. **Planificación**: Identificar patrones y componentes reutilizables
3. **Desarrollo**: Seguir las guías específicas
4. **Personalización**: Implementar schema completo
5. **Testing**: Verificar responsive y funcionalidad
6. **Optimización**: Limpiar código y mejorar performance

## 📱 Consideraciones Responsive

### Breakpoints Estándar
- **Desktop**: 1024px y superior
- **Tablet**: 768px - 1023px
- **Mobile**: Hasta 767px

### Configuraciones por Dispositivo
- Diferentes layouts para cada breakpoint
- Optimización de imágenes por tamaño
- Navegación adaptativa
- Tipografía escalable

---

*Esta documentación está en constante evolución. Agregar nuevas guías según necesidades del proyecto.*
