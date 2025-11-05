# 🚀 Shopify Development Workspace con GitHub Copilot

## ⛔ REGLA CRÍTICA #1: CÓDIGO SIN COMENTARIOS

**NUNCA agregues comentarios tipo `{% comment %}`, `<!-- -->`, `//` o `/* */` en el código.**

El código debe ser completamente autoexplicativo con:
- Variables con nombres largos y descriptivos
- Funciones y snippets con nombres claros
- Lógica simple dividida en pasos obvios
- Estructura que se lee como lenguaje natural

**Referencia completa**: Ver `docs/copilot/16-liquid-comments-rules.md`

---

Este workspace está optimizado para el desarrollo de temas de Shopify con GitHub Copilot, incluyendo guías completas, configuración de VS Code y snippets de código.

## 📋 Configuración Inicial

### 1. Instalar Extensiones Recomendadas
Al abrir este workspace, VS Code te sugerirá instalar las extensiones recomendadas. Las más importantes son:

- **GitHub Copilot** - Asistente de código IA
- **GitHub Copilot Chat** - Chat con Copilot
- **Shopify Theme Check** - Linting para Liquid
- **Prettier** - Formato de código
- **Tailwind CSS IntelliSense** - Autocompletado de CSS

### 2. Configuración de GitHub Copilot
La configuración de Copilot ya está optimizada en `.vscode/settings.json` con:
- Referencias a todas las guías de desarrollo
- Instrucciones específicas para Shopify Liquid
- Generación automática de commits semánticos
- Revisión de código automática

### 3. Estructura del Proyecto
```
├── docs/copilot/           # Guías para GitHub Copilot
├── .vscode/               # Configuración de VS Code
│   ├── settings.json      # Configuración de Copilot
│   ├── extensions.json    # Extensiones recomendadas
│   ├── shopify.code-snippets      # Snippets básicos
│   └── shopify-advanced.code-snippets  # Snippets avanzados
└── README.md             # Este archivo
```

## 🎯 Guías Disponibles

### Documentación Principal (`docs/copilot/`)
1. **01-introduccion.md** - Introducción y principios fundamentales
2. **02-liquid-fundamentals.md** - Fundamentos de Liquid templating
3. **03-estructura-archivos.md** - Estructura de archivos de Shopify
4. **04-sections-snippets.md** - Creación de secciones y snippets
5. **05-performance.md** - Optimización de rendimiento
6. **06-responsive-design.md** - Diseño responsive
7. **07-javascript-patterns.md** - Patrones de JavaScript
8. **08-css-best-practices.md** - Mejores prácticas de CSS
9. **09-git-workflow.md** - Flujo de trabajo con Git
10. **10-testing-debugging.md** - Testing y debugging
11. **11-deployment.md** - Despliegue y configuración
12. **12-schema-optimization.md** - Optimización de schemas
13. **13-seo-accessibility.md** - ✨ **SEO y Accesibilidad** (NUEVO)

## 🔧 Snippets de Código

### Snippets SEO-Optimizados (`.vscode/shopify-seo.code-snippets`) ✨ **NUEVO**
- `shopify-section` - Template SEO-optimizado para nueva sección (H2 para títulos)
- `shopify-products-seo` - Grid de productos con títulos H3 correctos
- `shopify-snippet` - Template para snippet con estructura SEO
- `schema-richtext` - Setting richtext para HTML editable
- `seo-emphasis` - Uso correcto de énfasis de texto
- `css-responsive-seo` - CSS responsive con clases accesibles

### Snippets Básicos (`.vscode/shopify.code-snippets`)
- `shopify-section` - Template completo para nueva sección
- `shopify-snippet` - Template para snippet reutilizable
- `liquid-assign` - Asignación de variable con fallback
- `liquid-if` - Condicional Liquid
- `liquid-for` - Loop Liquid
- `schema-setting` - Setting para schema
- `css-responsive` - Media queries responsive

### Snippets Avanzados (`.vscode/shopify-advanced.code-snippets`)
- `shopify-css` - Template para archivo CSS
- `shopify-js` - Template para archivo JavaScript
- `shopify-layout` - Template completo para layout
- `shopify-template` - Template básico para página
- `shopify-cart-ajax` - Función AJAX para carrito
- `shopify-product-form` - Formulario de producto completo

## 🚀 Uso de GitHub Copilot

### Comandos Básicos
1. **Ctrl+I** - Abrir chat inline de Copilot
2. **Ctrl+Shift+I** - Abrir panel de chat
3. **Tab** - Aceptar sugerencia de código
4. **Esc** - Rechazar sugerencia

### Prompts Optimizados
El sistema está configurado para responder a estos tipos de prompts:

```
// Crear nueva sección con SEO correcto
"Crear sección de testimonios con títulos H2 y productos H3"

// Optimizar para SEO y accesibilidad
"Revisar este código siguiendo reglas de SEO y accesibilidad"

// Generar commit
"Generar commit para estos cambios"

// Crear snippet con estructura semántica
"Crear snippet para mostrar precio con semántica correcta"

// Validar jerarquía de encabezados
"Verificar que esta sección cumple las reglas de SEO"
```

### Generación Automática
- **Commits**: Copilot genera commits semánticos en español
- **PR Descriptions**: Descripción automática de pull requests
- **Code Review**: Revisión automática siguiendo las guías

## 📝 Flujo de Trabajo Recomendado

### 1. Desarrollo de Nueva Funcionalidad
```bash
# 1. Crear rama para feature
git checkout -b feat/nueva-funcionalidad

# 2. Usar snippet SEO-optimizado
# Tipo: shopify-section (ahora incluye estructura H2/H3 correcta)

# 3. Desarrollar con ayuda de Copilot
# Usar prompts: "Crear sección siguiendo reglas de SEO"

# 4. Generar commit automático
# Copilot generará el mensaje siguiendo convenciones
```

### 2. Validación SEO
```bash
# 1. Verificar jerarquía de encabezados
# Prompt: "Revisar títulos H2/H3 en esta sección"

# 2. Validar textos editables
# Confirmar que se usan richtext/textarea

# 3. Comprobar accesibilidad
# Verificar alt text, contraste, navegación por teclado
```

### 3. Testing
```bash
# 1. Usar Shopify Theme Check para linting
# 2. Probar en diferentes dispositivos
# 3. Validar performance con Lighthouse
```

## 🎨 Configuración de Tema

### CSS Framework
El workspace está configurado para usar:
- **CSS Custom Properties** para variables
- **Media queries responsive** estándar
- **Utility classes** siguiendo principios de Tailwind

### JavaScript Patterns
- **Módulos ES6** con compatibilidad legacy
- **Event delegation** para performance
- **Lazy loading** para imágenes y componentes

## 🔍 Debugging y Testing

### Herramientas Incluidas
- **Shopify Theme Check** - Linting automático
- **Live Server** - Servidor local para testing
- **Rainbow CSV** - Visualización de datos
- **Todo Tree** - Seguimiento de tareas

### Comandos de Testing
```bash
# Linting con Theme Check
shopify theme check

# Testing local
shopify theme dev

# Deploy a desarrollo
shopify theme push --development
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [Shopify Liquid Reference](https://shopify.dev/docs/themes/liquid)
- [Theme Development Tools](https://shopify.dev/docs/themes/tools)
- [Performance Best Practices](https://shopify.dev/docs/themes/best-practices/performance)

### Extensiones Útiles
Todas las extensiones están listadas en `extensions.json` y se instalarán automáticamente.

## 📦 Sincronización Automática de Documentación

¿Quieres usar estas guías en tus proyectos Shopify? ¡Ahora es más fácil!

### Instalación y Uso Rápido

```bash
# Opción 1: Sin instalar (recomendado)
npx github:JacuXx/Prompt-Copilot-Shopify

# Opción 2: Instalación global
npm install -g github:JacuXx/Prompt-Copilot-Shopify
shopify-copilot-sync
```

Este comando descargará automáticamente todas las guías actualizadas en `./docs/copilot/` de cualquier proyecto donde lo ejecutes.

**Características:**
- ✅ Funciona en Windows, Mac y Linux
- ✅ No requiere dependencias adicionales
- ✅ Actualización inteligente (no sobrescribe archivos existentes)
- ✅ Portable y fácil de usar

**Documentación completa:**
- [INSTALL.md](./INSTALL.md) - Guía de instalación detallada
- [EXAMPLES.md](./EXAMPLES.md) - Ejemplos de uso en diferentes escenarios
- [PUBLISHING.md](./PUBLISHING.md) - Para contribuidores

### Automatizar en tu Proyecto

Agrega a tu `package.json`:

```json
{
  "scripts": {
    "postinstall": "npx github:JacuXx/Prompt-Copilot-Shopify",
    "docs:update": "npx github:JacuXx/Prompt-Copilot-Shopify --force"
  }
}
```

## 🤝 Contribución

### Compartir Configuración
Para usar esta configuración en otros proyectos:

1. Ejecuta `npx github:JacuXx/Prompt-Copilot-Shopify` en tu proyecto
2. Copia la carpeta `.vscode/` si quieres la configuración de VS Code
3. Abre el proyecto en VS Code
4. Instala las extensiones recomendadas

### Personalización
- Modifica `settings.json` para ajustar comportamientos de Copilot
- Añade nuevos snippets en los archivos `.code-snippets`
- Actualiza las guías en `docs/copilot/` según tus necesidades

## 🎯 Próximos Pasos

1. **Instalar todas las extensiones recomendadas**
2. **Revisar las guías en `docs/copilot/`**
3. **Probar los snippets de código**
4. **Configurar tu repositorio de Shopify**
5. **Comenzar a desarrollar con Copilot**

---

¡Disfruta desarrollando temas de Shopify con la potencia de GitHub Copilot! 🎉
