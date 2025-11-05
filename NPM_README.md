# 🚀 Shopify Copilot Docs Sync

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)

Herramienta portable para sincronizar automáticamente las guías de desarrollo de Shopify con GitHub Copilot en tus proyectos.

## ✨ Características

- ✅ **100% Portable** - Funciona en Windows, Mac y Linux
- ✅ **Sin Dependencias** - Solo requiere Node.js
- ✅ **Fácil de Usar** - Un solo comando para sincronizar
- ✅ **Actualización Inteligente** - No sobrescribe archivos existentes por defecto
- ✅ **Offline-Friendly** - Descarga una vez, usa sin conexión

## 🚀 Uso Rápido

### Sin Instalación (Recomendado)

```bash
npx github:JacuXx/Prompt-Copilot-Shopify
```

### Con Instalación Global

```bash
# Instalar
npm install -g github:JacuXx/Prompt-Copilot-Shopify

# Usar
shopify-copilot-sync
# o el alias corto
scs
```

## 📖 Comandos

```bash
# Sincronizar documentación
npx shopify-copilot-sync

# Forzar actualización (sobrescribe existentes)
npx shopify-copilot-sync --force

# Ver ayuda
npx shopify-copilot-sync --help

# Ver versión
npx shopify-copilot-sync --version
```

## 📁 ¿Qué Descarga?

El comando descarga estas guías en `./docs/copilot/`:

- **01-liquid-guidelines.md** - Guías de Liquid templating
- **02-sections-snippets.md** - Creación de secciones y snippets
- **03-javascript-ajax.md** - Patrones de JavaScript y AJAX
- **04-carousels-components.md** - Componentes y carruseles
- **05-customization-styles.md** - Personalización y estilos
- **06-analysis-development.md** - Análisis y desarrollo
- **07-optimal-prompts.md** - Prompts optimizados para Copilot
- **08-liquid-patterns.md** - Patrones avanzados de Liquid
- **09-performance-optimization.md** - Optimización de rendimiento
- **10-schema-templates.md** - Templates de schemas
- **11-git-commits-branches.md** - Convenciones Git
- **12-editing-existing-components.md** - Edición de componentes
- **13-seo-accessibility.md** - SEO y accesibilidad
- **14-section-recommendations.md** - Recomendaciones de secciones
- **15-metafields-guide.md** - Guía de metafields
- **16-liquid-comments-rules.md** - Reglas de comentarios
- **17-direct-responses.md** - Respuestas directas
- **18-easy-to-change-principle.md** - Principio "fácil de cambiar"
- **README.md** - Índice de documentación

## 🎯 Casos de Uso

### 1. Nuevo Proyecto Shopify

```bash
cd mi-nuevo-tema
npx shopify-copilot-sync
```

### 2. Actualizar Docs Existentes

```bash
cd mi-tema-actual
npx shopify-copilot-sync --force
```

### 3. Automatizar en package.json

```json
{
  "scripts": {
    "postinstall": "shopify-copilot-sync",
    "docs:update": "shopify-copilot-sync --force"
  }
}
```

### 4. CI/CD Pipeline

```yaml
# .github/workflows/sync-docs.yml
- name: Sync Copilot Docs
  run: npx shopify-copilot-sync
```

## 🔧 Configuración con VS Code

Después de sincronizar, configura Copilot en `.vscode/settings.json`:

```json
{
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": "docs/copilot/**/*.md"
    }
  ]
}
```

## 💻 Requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0

## 🌍 Plataformas Soportadas

| Plataforma | Estado |
|------------|--------|
| Windows 10/11 | ✅ |
| macOS | ✅ |
| Linux | ✅ |
| PowerShell | ✅ |
| Bash | ✅ |
| Zsh | ✅ |

## 📝 Opciones

| Opción | Alias | Descripción |
|--------|-------|-------------|
| `--help` | `-h` | Muestra ayuda |
| `--version` | `-v` | Muestra versión |
| `--force` | `-f` | Sobrescribe archivos existentes |

## 🐛 Troubleshooting

Ver [INSTALL.md](./INSTALL.md) para guía detallada de solución de problemas.

## 📄 Licencia

MIT © [JacuXx](https://github.com/JacuXx)

## 🤝 Contribuir

¿Encontraste un bug o tienes una sugerencia?

1. Abre un [Issue](https://github.com/JacuXx/Prompt-Copilot-Shopify/issues)
2. Envía un Pull Request

## 🔗 Enlaces

- [Repositorio](https://github.com/JacuXx/Prompt-Copilot-Shopify)
- [Documentación Completa](./INSTALL.md)
- [Issues](https://github.com/JacuXx/Prompt-Copilot-Shopify/issues)

---

Hecho con ❤️ para la comunidad de Shopify
